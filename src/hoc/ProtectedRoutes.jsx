import {Navigate, Outlet, useLocation} from 'react-router-dom';
import useAuthTokenValidator from '@/hooks/useAuthTokenValidator.js';

const ProtectedRoutes = () => {
    const isValidToken = useAuthTokenValidator();
    const location = useLocation();

    console.log(`ProtectedRoutes info: ${JSON.stringify(location)}`);

    return isValidToken()
        ? <Outlet/>
        : <Navigate to="/login" replace={true} state={{from: location}}/>;
};

export {ProtectedRoutes};