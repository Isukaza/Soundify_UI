import {jwtDecode} from "jwt-decode";
import {useStore} from "@/stores";

export class AuthManager {
    private constructor() {
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