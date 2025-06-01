import {useEffect, useState} from 'react';

import {Navigate, Outlet, useLocation} from 'react-router-dom';

import useInject from "@/domain/hooks/useInject";

import AbstractAuthManager from "@/domain/managers/Base/AbstractAuthManager";

import LoadingPage from "@/presentation/pages/LoadingPage";

import {useStore} from '@/stores';

export default function ProtectedRoutes() {
    const isAuthenticated = useStore(state => state.auth.isAuthenticated);
    const setIsAuthenticated = useStore.getState().auth.setIsAuthenticated;
    const location = useLocation();

    const [checking, setChecking] = useState(true);
    const [isValid, setIsValid] = useState(false);
    const [hasTriedRefresh, setHasTriedRefresh] = useState(false);

    const {instance: authManager, loading} = useInject(AbstractAuthManager);

    useEffect(() => {
        checkAuth();
    }, [authManager, loading, location.pathname]);

    const checkAuth = async () => {
        if (loading || !authManager)
            return;

        let valid = authManager.isAuthDataValid();
        if (!valid && !hasTriedRefresh) {
            const refreshed = await authManager.jwtRefresh();
            if (refreshed) {
                setHasTriedRefresh(true);
                valid = true;
            }
        }

        if (valid)
            setIsAuthenticated(true);

        setIsValid(valid);
        setChecking(false);
    };

    if (checking)
        return <LoadingPage/>

    if (!isAuthenticated || !isValid)
        return <Navigate
            to="/login"
            replace
            state={{
                from: {
                    pathname: location.pathname,
                    search: location.search,
                },
            }}
        />;

    return <Outlet/>;
}