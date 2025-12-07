import { injectable } from "inversify";

import AbstractAuthManager from "@/domain/Base/AbstractAuthManager";
import AuthApi from "@/infrastructure/api/AuthApi";
import LoginResponse from "@/domain/DTO/responses/LoginResponse";

import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { useStore } from "@/stores";

@injectable()
export default class AuthManager extends AbstractAuthManager {

    constructor() {
        super();
    }

    public async getGoogleSsoUrl(): Promise<string | null> {
        const resp = await AuthApi.GetLoginGoogleSsoURL();
        return resp.status ? resp.data : null;
    }

    public async loginWithEmail(email: string, password: string): Promise<boolean> {
        return this.handleAuthResponse(() =>
            AuthApi.login({ Email: email, Password: password })
        );
    }

    public async handleGoogleCallback(code: string): Promise<boolean> {
        return this.handleAuthResponse(() =>
            AuthApi.HandleGoogleCallback(code)
        );
    }

    public async jwtRefresh(): Promise<boolean> {
        try {
            const { userId, refresh } = useStore.getState().auth;

            if (!refresh || !userId) {
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
            console.error("[AuthManager] refresh error:", error);
            return false;
        }
    }

    public clearAuthData(): void {
        const auth = useStore.getState().auth;

        auth.setUserId("");
        auth.setUserRole(null);
        auth.setJwt("");
        auth.setRefresh("");
        auth.setExp(0);
        auth.setIsAuthenticated(false);
    }

    public isAuthDataValid(): boolean {
        const { jwt, refresh, exp } = useStore.getState().auth;

        if (!jwt || !refresh || exp <= 0) return false;

        const now = dayjs();
        const expiration = dayjs(exp * 1000);

        return expiration.isAfter(now.add(30, "second"));
    }

    protected async handleAuthResponse(apiCall: () => Promise<LoginResponse>): Promise<boolean> {
        try {
            const token = await apiCall();
            if (!token?.bearer) return false;

            const exp = this.applyTokens(token);
            if (!exp) {
                this.clearAuthData();
                return false;
            }

            return this.isAuthDataValid();
        } catch (err) {
            console.error("[AuthManager] auth error:", err);
            this.clearAuthData();
            return false;
        }
    }

    protected async getRefreshedAuthTokens(): Promise<LoginResponse | null> {
        const { userId, refresh } = useStore.getState().auth;
        if (!refresh) return null;

        try {
            return await AuthApi.RefreshTokens({ UserId: userId, RefreshToken: refresh });
        } catch (err) {
            console.error("[AuthManager] refresh token error:", err);
            return null;
        }
    }

    protected applyTokens(data: LoginResponse): number {
        let exp = 0;

        try {
            exp = jwtDecode<{ exp: number }>(data.bearer)?.exp ?? 0;
        } catch {
            return 0;
        }

        const auth = useStore.getState().auth;

        auth.setUserId(data.userId);
        auth.setUserRole(data.userRole);
        auth.setJwt(data.bearer);
        auth.setRefresh(data.refreshToken);
        auth.setExp(exp);
        auth.setIsAuthenticated(true);

        return exp;
    }
}