import {Routes, Route} from 'react-router-dom';
import CssBaseline from "@mui/joy/CssBaseline";

import HomePage from "@/pages/HomePage.jsx";
import LoginPage from "@/pages/LoginPage.jsx";
import NotFoundPage from "@/pages/NotFoundPage.jsx";
import DetailsTrackPage from "@/pages/DetailsTrackPage.jsx";

import {ProtectedRoutes} from "@/hoc/ProtectedRoutes.jsx";
import RequireUnAuthenticated from "@/hoc/RequireUnAuthenticated.jsx";
import InDevelopPage from "@/pages/InDevelopPage.jsx";


export default function App() {
    return (
        <>
            <CssBaseline/>
            <Routes>
                <Route element={<ProtectedRoutes/>}>
                    <Route path="/" element={<HomePage/>}/>
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