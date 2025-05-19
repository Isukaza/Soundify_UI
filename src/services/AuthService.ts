class AuthService {
    private static instance: AuthService;

    private refreshTimer?: ReturnType<typeof setTimeout>;
    private refreshCallback?: () => Promise<void>;
    private isRefreshing = false;

    private constructor() {
    }

    public static getInstance(): AuthService {
        if (!this.instance) {
            this.instance = new AuthService();
        }
        return this.instance;
    }

    public startTokenAutoRefresh(callback: () => Promise<void>, delay: number) {
        this.stopTokenAutoRefresh();

        this.refreshCallback = async () => {
            if (this.isRefreshing) {
                console.warn('[AuthService] Skipping refresh – already running');
                return;
            }

            this.isRefreshing = true;
            try {
                await callback();
            } catch (err) {
                console.warn('[AuthService] Error during scheduled refresh:', err);
            } finally {
                this.isRefreshing = false;
            }
        };

        this.refreshTimer = setTimeout(() => {
            this.refreshCallback?.();
        }, delay);
    }

    public async forceRefreshNow(): Promise<void> {
        if (!this.refreshCallback) {
            console.warn('[AuthService] Cannot force refresh — callback not set.');
            return;
        }

        if (this.isRefreshing) {
            console.warn('[AuthService] Skipping force refresh — already running');
            return;
        }

        this.stopTokenAutoRefresh();

        this.isRefreshing = true;
        try {
            await this.refreshCallback();
        } catch (err) {
            console.warn('[AuthService] Error during forceRefreshNow:', err);
        } finally {
            this.isRefreshing = false;
        }
    }

    public stopTokenAutoRefresh() {
        if (this.refreshTimer) {
            clearTimeout(this.refreshTimer);
            this.refreshTimer = undefined;
        }

        this.refreshCallback = undefined;
    }

    public isRunning(): boolean {
        return this.refreshTimer !== undefined;
    }
}

export default AuthService.getInstance();