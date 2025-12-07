import {Navigate, Outlet, useLocation} from "react-router-dom";

import useInject from "@/presentation/hooks/useInject";
import {TYPES} from "@/app/di/types";

import AbstractAuthManager from "@/domain/Base/AbstractAuthManager";

interface LocationState {
    from?: { pathname?: string };
}

export default function RequireUnAuthenticated() {
    const location = useLocation();
    const state = location.state as LocationState | undefined;
    const nextPage = state?.from?.pathname || "/";

    const authManager = useInject<AbstractAuthManager>(TYPES.AuthManager);

    const isAuthenticated = authManager.isAuthDataValid();

    return isAuthenticated
        ? <Navigate to={nextPage} replace/>
        : <Outlet/>;
}