import {Routes, Route} from 'react-router-dom';
import CssBaseline from "@mui/joy/CssBaseline";

import HomePage from "@/pages/HomePage.tsx";
import LoginPage from "@/pages/LoginPage.tsx";
import NotFoundPage from "@/pages/NotFoundPage.jsx";
import DetailsTrackPage from "@/pages/DetailsTrackPage.jsx";
import InDevelopPage from "@/pages/InDevelopPage.jsx";

import ProtectedRoutes from "@/hoc/ProtectedRoutes.jsx";
import RequireUnAuthenticated from "@/hoc/RequireUnAuthenticated.jsx";

import Layout from "@/components/layout/Layout.jsx";

export default function App() {
    return (
        <>
            <CssBaseline/>
            <Routes>
                <Route element={<ProtectedRoutes/>}>
                    <Route path="/" element={
                        <Layout>
                            <HomePage/>
                        </Layout>
                    }/>
                    <Route path="/DetailsTrack" element={<DetailsTrackPage/>}/>
                </Route>

                <Route element={<RequireUnAuthenticated/>}>
                    <Route path="/Login" element={<LoginPage/>}/>
                </Route>

                <Route path="/InDevelop" element={<InDevelopPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </>
    );
};