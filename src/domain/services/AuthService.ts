import AbstractAuthManager from "@/domain/managers/Base/AbstractAuthManager";
import AbstractAuthService from "@/domain/services/types/AbstractAuthService";
import {useStore} from '@/stores';

class AuthService extends AbstractAuthService {
    static override inject = [AbstractAuthManager];

    private refreshTimer?: ReturnType<typeof setTimeout>;
    private isRefreshing = false;
    private readonly authManager: AbstractAuthManager;
    private subscriptions: Array<() => void> = [];

    constructor(authManager: AbstractAuthManager) {
        super();
        this.authManager = authManager;
    }

    public override async start(): Promise<void> {
        this.setupSubscriptions();

        if (useStore.getState().auth.isAuthenticated)
            this.scheduleNextRefresh(this.getTokenRefreshDelay());
    }

    public override async stop(): Promise<void> {
        try {
            this.clearRefreshTimer();
            this.unsubscribe();
        } catch (ex) {
            console.error('Error while stopping AuthService', ex);
        }
    }

    private async refresh(): Promise<void> {
        if (this.isRefreshing) {
            console.warn('[AuthService] Skipping refresh — already running');
            return;
        }

        this.isRefreshing = true;
        try {
            await this.authManager.jwtRefresh();
        } catch (err) {
            console.warn('[AuthService] Error during scheduled refresh:', err);
        } finally {
            this.isRefreshing = false;

            if (useStore.getState().auth.isAuthenticated) {
                const nextDelay = this.getTokenRefreshDelay();
                this.scheduleNextRefresh(nextDelay);
            } else {
                console.warn('[AuthService] Skipping next refresh — user is not authenticated');
            }
        }
    }

    private scheduleNextRefresh(delay: number): void {
        this.clearRefreshTimer();
        this.refreshTimer = setTimeout(() => {
            this.refresh();
        }, delay);
    }

    private clearRefreshTimer(): void {
        if (this.refreshTimer) {
            clearTimeout(this.refreshTimer);
            this.refreshTimer = undefined;
        }
    }

    private getTokenRefreshDelay(): number {
        const {exp} = useStore.getState().auth;
        const now = Date.now();
        const expirationMs = (exp ?? Math.floor(now / 1000) + 5 * 60) * 1000;
        const refreshAtMs = expirationMs - 30_000;

        return Math.max(0, refreshAtMs - now);
    }

    private setupSubscriptions() {
        const subscribeIsAuth = useStore.subscribe(
            (state) => state.auth.isAuthenticated,
            (isAuthenticated: boolean) => {
                if (isAuthenticated) {
                    this.scheduleNextRefresh(this.getTokenRefreshDelay());
                } else {
                    this.clearRefreshTimer();
                }
            }
        );

        this.subscriptions.push(subscribeIsAuth);
    }

    private unsubscribe() {
        this.subscriptions.forEach((unsubscribe) => unsubscribe());
        this.subscriptions = [];
    }
}

export default AuthService;