import {Stack, Box} from '@mui/joy';

import Header from '@/components/layout/Header.jsx';
import Footer from '@/components/layout/Footer.jsx';

// eslint-disable-next-line react/prop-types
const Layout = ({children}) => {
    return (
        <Stack
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Header/>

            <Box
                sx={{
                    height: 'calc(100vh - 160px)',
                    flexGrow: 1,
                    overflowY: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    padding: 2,
                    background: 'linear-gradient(rgba(255, 255, 255, 0.1) 0%, rgb(0, 0, 0) 100%)'
                }}
            >
                {children}
            </Box>

            <Footer/>
        </Stack>
    );
};

export default Layout;