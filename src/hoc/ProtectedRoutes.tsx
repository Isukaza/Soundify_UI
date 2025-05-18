import {useEffect, useState} from 'react';

import {CircularProgress} from '@mui/joy';
import {Navigate, Outlet, useLocation} from 'react-router-dom';

import AuthManager from '@/managers/AuthManager';
import {useStore} from '@/stores';

interface ProtectedRouteState {
    fromLogin?: boolean;
}

export default function ProtectedRoutes() {
    const setIsAuthenticated = useStore.getState().auth.setIsAuthenticated;
    const location = useLocation();
    const state = location.state as ProtectedRouteState | undefined;
    const fromLogin = state?.fromLogin;

    const [checking, setChecking] = useState<boolean>(true);
    const [isValid, setIsValid] = useState<boolean>(false);
    const [hasTriedRefresh, setHasTriedRefresh] = useState<boolean>(false);

    useEffect(() => {
        const checkAuth = async () => {
            if (fromLogin === true) {
                setIsValid(true);
                setChecking(false);
                return;
            }

            let valid = AuthManager.isAuthDataValid();
            if (!valid && !hasTriedRefresh) {
                const refreshed = await AuthManager.forceRefresh();
                if (refreshed)
                    setHasTriedRefresh(true);

                valid = refreshed;
            }

            if (valid)
                setIsAuthenticated(true);

            setIsValid(valid);
            setChecking(false);
        };

        checkAuth();
    }, []);

    if (checking)
        return (
            <main
                className="main-container"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress/>
            </main>
        );

    return isValid
        ? <Outlet/>
        : <Navigate
            to="/login"
            replace={true}
            state={{
                from: {
                    pathname: location.pathname,
                    search: location.search
                }
            }}/>;
}