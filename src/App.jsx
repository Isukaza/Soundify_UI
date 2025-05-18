import {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';

import CssBaseline from '@mui/joy/CssBaseline';

import Layout from '@/components/layout/Layout.jsx';

import ProtectedRoutes from '@/hoc/ProtectedRoutes';
import RequireUnAuthenticated from '@/hoc/RequireUnAuthenticated';

import AppDIManager from '@/di/AppDIManager';

import DetailsTrackPage from '@/pages/DetailsTrackPage.tsx';
import HomePage from '@/pages/HomePage';
import InDevelopPage from '@/pages/InDevelopPage.jsx';
import LoginPage from '@/pages/LoginPage';
import NotFoundPage from '@/pages/NotFoundPage.jsx';

import {useStore} from '@/stores';

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