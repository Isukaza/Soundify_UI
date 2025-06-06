import dayjs from 'dayjs';
import {jwtDecode} from 'jwt-decode';

import UserRole from "@/domain/models/enums/UserRole";
import AbstractAuthManager from "@/domain/managers/Base/AbstractAuthManager";
import LoginResponse from '@/domain/models/responses/LoginResponse';

import AuthApi from '@/infrastructure/api/AuthApi';

import {useStore} from '@/stores';

export default class AuthManager extends AbstractAuthManager {

    constructor() {
        super();
    }

    async getGoogleSsoUrl(): Promise<string | null> {
        const resp = await AuthApi.GetLoginGoogleSsoURL();
        return resp.status ? resp.data : null;
    }

    async loginWithEmail(email: string, password: string): Promise<boolean> {
        return this.handleAuthResponse(() => AuthApi.login({Email: email, Password: password}));
    }

    async handleGoogleCallback(code: string): Promise<boolean> {
        return this.handleAuthResponse(() => AuthApi.HandleGoogleCallback(code));
    }

    async jwtRefresh(): Promise<boolean> {
        try {
            const {userId, refresh} = useStore.getState().auth;

            const isValid = refresh && userId && /^[0-9a-fA-F-]{36}$/.test(userId);
            if (!isValid) {
                this.clearAuthData();
                return false;
            }

            const tokens = await this.getRefreshedAuthTokens();
            if (!tokens) {
                this.clearAuthData();
                return false;
            }

            this.applyTokens(tokens);

            return this.isAuthDataValid();
        } catch (error) {
            console.error('[AuthManager] forceRefresh error:', error);
            return false;
        }
    }

    clearAuthData(): void {
        const state = useStore.getState().auth;

        state.setUserId('');
        state.setUserRole(null)
        state.setJwt('');
        state.setRefresh('');
        state.setExp(0);
        state.setIsAuthenticated(false);
    }

    isAuthDataValid(): boolean {
        const {userId, userRole, jwt, refresh, exp} = useStore.getState().auth;

        if (!jwt.trim() || !refresh.trim() || !/^[0-9a-f-]{36}$/i.test(userId) || exp <= 0)
            return false;

        if (userRole === null || userRole < UserRole.User || userRole > UserRole.SuperAdmin)
            return false;

        const now = dayjs();
        const expiration = dayjs(exp * 1000);

        return expiration.isAfter(now.add(30, 'second'));
    }

    private async handleAuthResponse(apiCall: () => Promise<LoginResponse>): Promise<boolean> {
        try {
            const token = await apiCall();
            if (!token)
                return false;

            if (!token.userId || token.userRole === null || !token.bearer || !token.refreshToken)
                return false;

            const exp = this.applyTokens(token);
            if (!exp || isNaN(exp)) {
                this.clearAuthData();
                return false;
            }

            return this.isAuthDataValid();
        } catch (error) {
            console.error('[AuthManager] handleAuthResponse error:', error);
            this.clearAuthData();
            return false;
        }
    }

    private async getRefreshedAuthTokens(): Promise<LoginResponse | null> {
        const {userId, refresh} = useStore.getState().auth;

        if (!refresh)
            return null;

        try {
            const tokens = await AuthApi.RefreshTokens({UserId: userId, RefreshToken: refresh});
            return !tokens ? null : tokens;
        } catch (error) {
            console.error('[AuthManager] Token refresh error:', error);
            return null;
        }
    }

    private applyTokens(loginResponse: LoginResponse): number {
        let exp = 0;
        try {
            exp = jwtDecode<{ exp: number }>(loginResponse.bearer)?.exp ?? 0;
        } catch (error) {
            console.error('[AuthManager] Failed to decode token', error);
            return 0;
        }

        const state = useStore.getState().auth;

        state.setUserId(loginResponse.userId);
        state.setUserRole(loginResponse.userRole);
        state.setJwt(loginResponse.bearer);
        state.setRefresh(loginResponse.refreshToken);
        state.setExp(exp);
        state.setIsAuthenticated(true);

        return exp;
    }
}