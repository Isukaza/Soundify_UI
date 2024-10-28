import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import {jwtDecode} from "jwt-decode";

export const useAuthStore = create(persist(
    (set) => ({
        jwt: "",
        refresh: "",
        exp: 0,
        refreshAuthTokens: (newJwt, newRefresh) => {
            let newExp = 0;

            try {
                const decodedJwt = jwtDecode(newJwt);
                newExp = decodedJwt?.exp ?? 0;
            } catch (error) {
                console.error("Failed to decode refresh token:", error);
            }

            set({
                jwt: newJwt,
                refresh: newRefresh,
                exp: newExp
            });
        },
        clearAuthData: () => {
            set({
                jwt: "",
                refresh: "",
                exp: 0
            });
            localStorage.removeItem("authData");
        }
    }), {name: "authData"}
))