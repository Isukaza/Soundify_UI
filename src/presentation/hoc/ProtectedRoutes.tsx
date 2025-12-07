import {useEffect, useState} from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";

import useInject from "@/presentation/hooks/useInject";
import {TYPES} from "@/app/di/types";

import AbstractAuthManager from "@/domain/Base/AbstractAuthManager";

import LoadingPage from "@/presentation/pages/LoadingPage";
import {useStore} from "@/stores";

export default function ProtectedRoutes() {
    const isAuthenticated = useStore((state) => state.auth.isAuthenticated);
    const setIsAuthenticated = useStore.getState().auth.setIsAuthenticated;

    const location = useLocation();

    const [checking, setChecking] = useState(true);
    const [isValid, setIsValid] = useState(false);
    const [hasTriedRefresh, setHasTriedRefresh] = useState(false);

    const authManager = useInject<AbstractAuthManager>(TYPES.AuthManager);

    useEffect(() => {
        checkAuth();
    }, [location.pathname]);

    async function checkAuth() {
        let valid = authManager.isAuthDataValid();

        if (!valid && !hasTriedRefresh) {
            const refreshed = await authManager.jwtRefresh();

            if (refreshed) {
                valid = true;
                setHasTriedRefresh(true);
            }
        }

        if (valid)
            setIsAuthenticated(true);

        setIsValid(valid);
        setChecking(false);
    }

    if (checking)
        return <LoadingPage/>;

    if (!isAuthenticated || !isValid) {
        return (
            <Navigate
                to="/login"
                replace
                state={{
                    from: {
                        pathname: location.pathname,
                        search: location.search,
                    },
                }}
            />
        );
    }

    return <Outlet/>;
}