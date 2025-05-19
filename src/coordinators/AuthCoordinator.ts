import AuthManager from "@/managers/AuthManager";
import AuthService from "@/services/AuthService";

export class AuthCoordinator {
    static start(exp?: number) {
        const now = Date.now();
        const expirationMs = (exp ?? Math.floor(now / 1000) + 5 * 60) * 1000;
        const refreshAtMs = expirationMs - 30_000;
        const delay = Math.max(0, refreshAtMs - now);

        AuthService.stopTokenAutoRefresh();
        AuthService.startTokenAutoRefresh(() => this.refreshToken(), delay);
    }

    static stop() {
        AuthService.stopTokenAutoRefresh();
    }

    static async refreshToken() {
        const tokenResult = await AuthManager.getRefreshedAuthTokens();
        if (!tokenResult) {
            AuthManager.clearAuthData();
            return;
        }

        const {userId, jwt, refresh} = tokenResult;
        const exp = AuthManager.applyTokens(userId, jwt, refresh);

        this.start(exp);
    }
}