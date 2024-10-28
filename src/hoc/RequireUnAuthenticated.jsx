import {Navigate, Outlet, useLocation} from 'react-router-dom';
import useAuthTokenValidator from '@/hooks/useAuthTokenValidator.js';

const RequireUnAuthenticated = () => {
    const location = useLocation();
    const nextPage = location.state?.from?.pathname || '/';

    const isValidToken = useAuthTokenValidator();
    return !isValidToken()
        ? <Outlet/>
        : <Navigate to={nextPage} replace={true}/>
};

export default RequireUnAuthenticated;