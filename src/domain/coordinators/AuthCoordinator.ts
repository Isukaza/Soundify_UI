import AuthManager from '@/domain/managers/AuthManager';

export default class AuthCoordinator {
    static async refreshToken() {
        const tokenResult = await AuthManager.getRefreshedAuthTokens();
        if (!tokenResult) {
            AuthManager.clearAuthData();
            return;
        }

        const {userId, jwt, refresh} = tokenResult;
        AuthManager.applyTokens(userId, jwt, refresh);
    }
}