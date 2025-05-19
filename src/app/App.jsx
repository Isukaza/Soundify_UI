import {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';

import CssBaseline from '@mui/joy/CssBaseline';

import Layout from '@/presentation/components/layout/Layout';

import ProtectedRoutes from '@/presentation/hoc/ProtectedRoutes';
import RequireUnAuthenticated from '@/presentation/hoc/RequireUnAuthenticated';

import AppDIManager from '@/app/di/AppDIManager';

import DetailsTrackPage from '@/presentation/pages/DetailsTrackPage';
import HomePage from '@/presentation/pages/HomePage';
import InDevelopPage from '@/presentation/pages/InDevelopPage';
import LoginPage from '@/presentation/pages/LoginPage';
import NotFoundPage from '@/presentation/pages/NotFoundPage';

import {useStore} from '@/stores/index';

export default function App() {
    const isAuthenticated = useStore(state => state.auth.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            AppDIManager.start();
        } else {
            AppDIManager.stop();
        }
    }, [isAuthenticated]);

    return (
        <>
            <CssBaseline/>
            <Routes>
                <Route element={<ProtectedRoutes/>}>
                    <Route element={<Layout/>}>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/DetailsTrack" element={<DetailsTrackPage/>}/>
                    </Route>
                </Route>

                <Route element={<RequireUnAuthenticated/>}>
                    <Route path="/Login" element={<LoginPage/>}/>
                </Route>

                <Route path="/InDevelop" element={<InDevelopPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </>
    );
}