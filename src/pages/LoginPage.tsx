import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import Divider from '@mui/joy/Divider';
import {Box, Stack, Sheet, CircularProgress} from '@mui/joy';

import {containerStyles} from '@/styles/login/styles.js';
import {centerStyles} from '@/styles/common/centerStyles.js';

import EmailInput from '@/components/pages/LoginPage/EmailInput';
import PasswordInput from '@/components/pages/LoginPage/PasswordInput';
import ForgotPasswordLink from '@/components/pages/LoginPage/ForgotPasswordLink';
import SignUpLink from '@/components/pages/LoginPage/SignUpLink';
import GoogleLoginButton from '@/components/pages/LoginPage/GoogleLoginButton';
import LoginButton from '@/components/pages/LoginPage/LoginButton';
import LoginTitle from '@/components/pages/LoginPage/LoginTitle';
import Logo from '@/components/common/Logo';

import {AuthManager} from '@/managers/AuthManager';

export default function LoginPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const fromPage = location.state?.from?.pathname || '/';

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code');

        if (code) {
            AuthManager.handleGoogleCallback(code)
                .then((success) => {
                    if (success) {
                        navigate(fromPage, {replace: true});
                    } else {
                        console.error('Google login failed');
                        setIsLoading(false);
                    }
                });
        } else {
            setIsLoading(false);
        }
    }, []);

    if (isLoading) {
        return (
            <main
                className="main-container"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh'
                }}>
                <CircularProgress/>
            </main>
        );
    }

    return (
        <main className="main-container">
            <Sheet
                sx={{
                    height: {xs: '100%', sm: 'auto'},
                    maxWidth: {xs: '100%', sm: '734px'},
                    width: '100%',
                    mx: {xs: '0%', sm: 'auto'},
                    my: {xs: '0%', sm: 'auto'},
                    py: 3,
                    px: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: {xs: 'center', sm: 'flex-start'},
                    alignItems: {xs: 'center', sm: 'stretch'},
                    gap: 2,
                    borderRadius: {xs: '0', sm: 'lg'},
                    boxShadow: 'md',
                }}
                variant="outlined"
            >
                <Stack
                    direction="column"
                    spacing={2}
                    sx={[centerStyles, containerStyles]}
                >
                    <Logo/>
                    <LoginTitle/>
                </Stack>

                {/*SSO login*/}
                <Stack sx={containerStyles}>
                    <GoogleLoginButton/>
                </Stack>

                <Divider
                    sx={{
                        width: {xs: '324px', sm: 'auto'},
                        my: '32px',
                        mx: {xs: 'auto', sm: '100px'},
                    }}
                    orientation="horizontal"
                />

                {/*Email&Pass login*/}
                <Box sx={containerStyles}>
                    <EmailInput/>
                    <PasswordInput/>
                    <LoginButton redirectTo={fromPage}/>
                    <ForgotPasswordLink/>
                    <SignUpLink/>
                </Box>
            </Sheet>
        </main>
    );
}