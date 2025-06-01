import dayjs from 'dayjs';
import {jwtDecode} from 'jwt-decode';

import AbstractAuthManager from "@/domain/managers/Base/AbstractAuthManager";
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
            const {refresh: currentRefresh, userId: currentUserId} = useStore.getState().auth;

            const isValid = currentRefresh && currentUserId && /^[0-9a-fA-F-]{36}$/.test(currentUserId);
            if (!isValid) {
                this.clearAuthData();
                return false;
            }

            const tokens = await this.getRefreshedAuthTokens();
            if (!tokens) {
                this.clearAuthData();
                return false;
            }

            const {userId: newUserId, jwt, refresh: newRefresh} = tokens;
            this.applyTokens(newUserId, jwt, newRefresh);

            return this.isAuthDataValid();
        } catch (error) {
            console.error('[AuthManager] forceRefresh error:', error);
            return false;
        }
    }

    clearAuthData(): void {
        const state = useStore.getState().auth;
        state.setUserId('');
        state.setJwt('');
        state.setRefresh('');
        state.setExp(0);
        state.setIsAuthenticated(false);
    }

    isAuthDataValid(): boolean {
        const {jwt, refresh, userId, exp} = useStore.getState().auth;

        if (!jwt.trim() || !refresh.trim() || !/^[0-9a-f-]{36}$/i.test(userId) || exp <= 0)
            return false;

        const now = dayjs();
        const expiration = dayjs(exp * 1000);

        return expiration.isAfter(now.add(30, 'second'));
    }

    private async handleAuthResponse(apiCall: () => Promise<any>): Promise<boolean> {
        try {
            const resp = await apiCall();
            if (!resp.status)
                return false;

            const {userId, bearer, refreshToken} = resp.data;
            if (!bearer || !refreshToken || !userId)
                return false;

            const exp = this.applyTokens(userId.trim(), bearer.trim(), refreshToken.trim());
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

    private async getRefreshedAuthTokens(): Promise<{ userId: string; jwt: string; refresh: string } | null> {
        const {userId: uid, refresh} = useStore.getState().auth;

        if (!refresh)
            return null;

        try {
            const resp = await AuthApi.RefreshTokens({UserId: uid, RefreshToken: refresh});
            if (!resp.status)
                return null;

            const {userId, bearer, refreshToken} = resp.data;
            return {userId, jwt: bearer, refresh: refreshToken};
        } catch (error) {
            console.error('[AuthManager] Token refresh error:', error);
            return null;
        }
    }

    private applyTokens(userId: string, jwt: string, refresh: string): number {
        let exp = 0;
        try {
            exp = jwtDecode<{ exp: number }>(jwt)?.exp ?? 0;
        } catch (error) {
            console.error('[AuthManager] Failed to decode token', error);
        }

        const state = useStore.getState().auth;
        state.setUserId(userId);
        state.setJwt(jwt);
        state.setRefresh(refresh);
        state.setExp(exp);
        state.setIsAuthenticated(true);

        return exp;
    }
}