import {Navigate, Outlet, useLocation} from 'react-router-dom';

import AuthManager from '@/managers/AuthManager';

interface LocationState {
    from?: { pathname?: string; };
}

export default function RequireUnAuthenticated() {
    const location = useLocation();
    const state = location.state as LocationState | undefined;
    const nextPage = state?.from?.pathname || '/';

    const isValidToken = AuthManager.isAuthDataValid();
    return !isValidToken
        ? <Outlet/>
        : <Navigate to={nextPage} replace/>;
};