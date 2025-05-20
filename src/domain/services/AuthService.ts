import {useStore} from '@/stores';
import AuthCoordinator from '@/domain/coordinators/AuthCoordinator';

import AuthServiceBase from "@/domain/services/types/AuthServiceBase";

class AuthService extends AuthServiceBase {
    private static instance: AuthService;

    private refreshTimer?: ReturnType<typeof setTimeout>;
    private isRefreshing = false;

    private constructor() {
        super();
    }

    public static getInstance(): AuthService {
        if (!this.instance)
            this.instance = new AuthService();

        return this.instance;
    }

    public start(): void {
        const delay = this.getTokenRefreshDelay();
        this.scheduleNextRefresh(delay);
    }

    public stop(): void {
        this.clearRefreshTimer();
    }

    public async forceRefreshNow(): Promise<void> {
        if (this.isRefreshing) {
            console.warn('[AuthService] Skipping force refresh — already running');
            return;
        }

        console.log('[AuthService] force refresh');
        this.clearRefreshTimer();
        await this.refresh();
    }

    public isRunning(): boolean {
        return this.refreshTimer !== undefined;
    }

    private async refresh(): Promise<void> {
        if (this.isRefreshing) {
            console.warn('[AuthService] Skipping refresh — already running');
            return;
        }

        this.isRefreshing = true;
        try {
            await AuthCoordinator.refreshToken();
        } catch (err) {
            console.warn('[AuthService] Error during scheduled refresh:', err);
        } finally {
            this.isRefreshing = false;
            const nextDelay = this.getTokenRefreshDelay();
            this.scheduleNextRefresh(nextDelay);
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
}

export default AuthService.getInstance();