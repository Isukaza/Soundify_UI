import {Stack, Box} from '@mui/joy';
import {Outlet} from "react-router-dom";

import {Header} from '@/presentation/components/layout/Header';
import Footer from '@/presentation/components/layout/Footer';

const Layout = () => {
    return (
        <Stack
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Header/>

            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    padding: 2,
                    background: 'linear-gradient(rgba(255, 255, 255, 0.1) 0%, rgb(0, 0, 0) 100%)'
                }}
            >
                <Outlet/>
            </Box>

            <Footer/>
        </Stack>
    );
};

export default Layout;