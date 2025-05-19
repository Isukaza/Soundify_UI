import {useEffect, useState} from 'react';
import {CircularProgress} from '@mui/joy';
import {Navigate, Outlet, useLocation} from 'react-router-dom';

import AuthManager from '@/managers/AuthManager';
import {useStore} from '@/stores';

export default function ProtectedRoutes() {
    const isAuthenticated = useStore(state => state.auth.isAuthenticated);
    const setIsAuthenticated = useStore.getState().auth.setIsAuthenticated;
    const location = useLocation();

    const [checking, setChecking] = useState(true);
    const [isValid, setIsValid] = useState(false);
    const [hasTriedRefresh, setHasTriedRefresh] = useState(false);

    const redirectToLogin = (
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

    useEffect(() => {
        const checkAuth = async () => {
            let valid = AuthManager.isAuthDataValid();

            if (!valid && !hasTriedRefresh) {
                const refreshed = await AuthManager.forceRefresh();
                if (refreshed) {
                    setHasTriedRefresh(true);
                    valid = true;
                }
            }

            if (valid) {
                setIsAuthenticated(true);
            }

            setIsValid(valid);
            setChecking(false);
        };

        checkAuth();
    }, [location.pathname]);

    if (checking) {
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
    }

    if (!isAuthenticated || !isValid)
        return redirectToLogin;

    return <Outlet/>;
}