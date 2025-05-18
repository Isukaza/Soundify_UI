class AuthService {
    private static instance: AuthService;

    private refreshTimer?: ReturnType<typeof setTimeout>;
    private refreshCallback?: () => Promise<void>;

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

        this.refreshCallback = callback;
        this.refreshTimer = setTimeout(callback, delay);
    }

    public async forceRefreshNow(): Promise<void> {
        if (typeof this.refreshCallback !== 'function')
            return;

        this.stopTokenAutoRefresh();

        await this.refreshCallback();
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