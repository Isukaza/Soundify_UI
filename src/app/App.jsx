import {startHostedServices, stopHostedServices} from "@/app/di/hostedServices.ts";
import {createSessionScope, destroySessionScope, getSessionContainer} from "@/app/di/session.scope.ts";
import {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';

import CssBaseline from '@mui/joy/CssBaseline';

import Layout from '@/presentation/components/layout/Layout';

import ProtectedRoutes from '@/presentation/hoc/ProtectedRoutes';
import RequireUnAuthenticated from '@/presentation/hoc/RequireUnAuthenticated';

import HomePage from '@/presentation/pages/HomePage';
import AlbumPage from "@/presentation/pages/AlbumPage";
import TrackDetailsPage from '@/presentation/pages/TrackDetailsPage.tsx';
import AlbumDetailsPage from "@/presentation/pages/AlbumDetailsPage";
import InDevelopPage from '@/presentation/pages/InDevelopPage.tsx';
import LoginPage from '@/presentation/pages/LoginPage';
import NotFoundPage from '@/presentation/pages/NotFoundPage.tsx';

import {useStore} from '@/stores/index';

export default function App() {
    const isAuthenticated = useStore(state => state.auth.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            const session = createSessionScope();
            startHostedServices(session);
        } else {
            const session = getSessionContainer();
            if (session) stopHostedServices(session);
            destroySessionScope();
        }
    }, [isAuthenticated]);

    return (
        <>
            <CssBaseline/>
                <Routes>
                    <Route element={<ProtectedRoutes/>}>
                        <Route element={<Layout/>}>
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/Album" element={<AlbumPage/>}/>
                            <Route path="/TrackDetails" element={<TrackDetailsPage/>}/>
                            <Route path="/AlbumDetails/:albumId" element={<AlbumDetailsPage/>} />
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