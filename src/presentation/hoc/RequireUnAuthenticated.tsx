import {Navigate, Outlet, useLocation} from 'react-router-dom';
import useInject from "@/domain/hooks/useInject";
import AbstractAuthManager from "@/domain/managers/Base/AbstractAuthManager";
import LoadingPage from "@/presentation/pages/LoadingPage";

interface LocationState {
    from?: { pathname?: string };
}

export default function RequireUnAuthenticated() {
    const location = useLocation();
    const state = location.state as LocationState | undefined;
    const nextPage = state?.from?.pathname || '/';

    const {instance: authManager, loading} = useInject(AbstractAuthManager);

    if (loading)
        return <LoadingPage/>;

    return authManager?.isAuthDataValid() ? <Navigate to={nextPage} replace/> : <Outlet/>;
}