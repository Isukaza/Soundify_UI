import dayjs from 'dayjs';
import {jwtDecode} from 'jwt-decode';

import AuthApi from '@/infrastructure/api/AuthApi.js';
import AppDIManager from '@/app/di/AppDIManager';
import DIContainer from '@/app/di/DIContainer';
import {useStore} from '@/stores';

import AuthServiceBase from "@/domain/services/types/AuthServiceBase";

export default class AuthManager {
    private constructor() {
    }

    private static getAuthServiceFromDI(): AuthServiceBase {
        if (!AppDIManager.isInitialized())
            throw new Error("[AuthManager] AppDIManager is not started");

        return DIContainer.get('authService');
    }

    static async loginWithEmail(email: string, password: string): Promise<boolean> {
        const {setJwt, setRefresh, setExp, setIsAuthenticated, setUserId} = useStore.getState().auth;

        const resp = await AuthApi.login({Email: email, Password: password});
        if (!resp.status)
            return false;

        const {userId, bearer, refreshToken} = resp.data;
        if (!bearer || !refreshToken || !userId)
            return false;

        let exp = 0;
        try {
            exp = jwtDecode<{ exp: number }>(bearer)?.exp ?? 0;
        } catch (error) {
            return false;
        }

        if (!exp || isNaN(exp))
            return false;

        setJwt(bearer.trim());
        setUserId(userId.trim());
        setRefresh(refreshToken.trim());
        setExp(exp);
        setIsAuthenticated(true);

        return true;
    }

    static async getGoogleSsoUrl(): Promise<string | null> {
        const resp = await AuthApi.GetLoginGoogleSsoURL();
        return resp.status ? resp.data : null;
    }

    static async handleGoogleCallback(code: string): Promise<boolean> {
        const {setJwt, setRefresh, setExp, setIsAuthenticated, setUserId} = useStore.getState().auth;

        const resp = await AuthApi.HandleGoogleCallback(code);
        if (resp.status) {
            const {userId, bearer, refreshToken} = resp.data;
            const exp = jwtDecode<{ exp: number }>(bearer).exp;

            setUserId(userId.trim());
            setJwt(bearer.trim());
            setRefresh(refreshToken.trim());
            setExp(exp);
            setIsAuthenticated(true);

            return true;
        } else {
            console.error('Google Auth Failed');
            return false;
        }
    }

    static async forceRefresh(): Promise<boolean> {
        try {
            const {refresh, userId} = useStore.getState().auth;

            const isValidRefresh = refresh && userId && /^[0-9a-f-]{36}$/.test(userId);
            if (!isValidRefresh)
                return false;

            if (AppDIManager.isInitialized()) {
                const authService = this.getAuthServiceFromDI();
                if (authService.isRunning())
                    await authService.forceRefreshNow();
            } else {
                const tokenResult = await AuthManager.getRefreshedAuthTokens();
                if (!tokenResult) {
                    AuthManager.clearAuthData();
                    return false;
                }

                const {userId, jwt, refresh} = tokenResult;
                this.applyTokens(userId, jwt, refresh);
            }

            return this.isAuthDataValid();
        } catch (error) {
            console.error('[AuthManager] Unexpected error in forceRefresh:', error);
            return false;
        }
    }

    static async getRefreshedAuthTokens(): Promise<{ userId: string, jwt: string, refresh: string } | null> {
        const {userId, refresh} = useStore.getState().auth;

        if (!refresh)
            return null;

        try {
            const resp = await AuthApi.RefreshTokens({UserId: userId, RefreshToken: refresh});
            if (resp.status) {
                const {userId, bearer, refreshToken} = resp.data;
                return {userId: userId, jwt: bearer, refresh: refreshToken};
            } else {
                return null;
            }
        } catch (error) {
            console.error('[AuthManager] Refresh error', error);
            return null;
        }
    }

    static applyTokens(userId: string, jwt: string, refresh: string): number {
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

    static clearAuthData() {
        const state = useStore.getState().auth;
        state.setIsAuthenticated(false);
        state.setUserId('');
        state.setJwt('');
        state.setRefresh('');
        state.setExp(0);
    }

    static isAuthDataValid(): boolean {
        const {jwt, refresh, userId, exp} = useStore.getState().auth;

        const isValidJwt = jwt.trim().length > 0;
        const isValidRefresh = refresh.trim().length > 0;
        const isValidUserId = /^[0-9a-f-]{36}$/i.test(userId);
        const isValidExp = exp > 0;

        if (!isValidJwt || !isValidRefresh || !isValidUserId || !isValidExp)
            return false;

        const now = dayjs();
        const expiration = dayjs(exp * 1000);

        return expiration.isAfter(now.add(30, 'second'));
    }
}