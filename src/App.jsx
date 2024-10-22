import {Routes, Route} from 'react-router-dom';
import CssBaseline from "@mui/joy/CssBaseline";

import Login from './pages/Login';
import NotFound from "@/pages/NotFound.jsx";

export default function App() {
    return (
        <>
            <CssBaseline/>
            <Routes>
                <Route path="/"  element={<Login />}/>
                <Route path="*"  element={<NotFound />}/>
            </Routes>
        </>
    );
};