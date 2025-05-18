import AuthManager from "@/managers/AuthManager";
import AuthService from "@/services/AuthService";

export class AuthCoordinator {
    static start(exp?: number) {
        const delay = exp
            ? Math.max(exp * 1000 - Date.now() - 30_000, 30_000)
            : 1000 * 60 * 4;

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