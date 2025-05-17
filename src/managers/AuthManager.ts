import {jwtDecode} from "jwt-decode";
import {useStore} from "@/stores";
import AuthApi from '@/api/AuthApi.js';

export class AuthManager {
    private constructor() {
    }

    static async loginWithEmail(email: string, password: string): Promise<boolean> {
        const {setJwt, setRefresh, setExp} = useStore.getState().auth;

        const resp = await AuthApi.login(email, password);
        if (resp.status) {
            const {bearer, refreshToken} = resp.data;
            const exp = jwtDecode<{ exp: number }>(bearer).exp;

            setJwt(bearer);
            setRefresh(refreshToken);
            setExp(exp);

            return true;
        }
        return false;
    }

    static async redirectToGoogleSSO(): Promise<void> {
        const resp = await AuthApi.GetLoginGoogleSsoURL();
        if (resp.status) {
            window.location.href = resp.data;
        }
    }

    static async handleGoogleCallback(code: string): Promise<boolean> {
        const {setJwt, setRefresh, setExp} = useStore.getState().auth;

        const resp = await AuthApi.HandleGoogleCallback(code);
        if (resp.status) {
            const {bearer, refreshToken} = resp.data;
            const exp = jwtDecode<{ exp: number }>(bearer).exp;

            setJwt(bearer);
            setRefresh(refreshToken);
            setExp(exp);

            return true;
        } else {
            console.error('Google Auth Failed');
            return false;
        }
    }

    static refreshTokens(newJwt: string, newRefresh: string) {
        let newExp = 0;
        try {
            const decodedJwt = jwtDecode(newJwt);
            newExp = decodedJwt?.exp ?? 0;
        } catch (error) {
            console.error('Failed to decode token:', error);
        }

        const state = useStore.getState();
        state.auth.setEmail('');
        state.auth.setPassword('');

        state.auth.setJwt(newJwt);
        state.auth.setRefresh(newRefresh);
        state.auth.setExp(newExp);
    }

    static clearAuthData() {
        const state = useStore.getState();
        state.auth.setJwt('');
        state.auth.setRefresh('');
        state.auth.setExp(0);
    }
}