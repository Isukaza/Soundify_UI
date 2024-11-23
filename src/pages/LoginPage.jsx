import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import Divider from '@mui/joy/Divider';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import {Box} from "@mui/joy";

import {containerStyles} from "@/styles/login/styles.js";
import {centerStyles} from "@/styles/common/centerStyles.js";

import EmailInput from "@/components/login/EmailInput.jsx";
import PasswordInput from "@/components/login/PasswordInput.jsx";
import ForgotPasswordLink from "@/components/login/ForgotPasswordLink.jsx";
import SignUpLink from "@/components/login/SignUpLink.jsx";
import GoogleLoginButton from "@/components/login/GoogleLoginButton.jsx";
import LoginButton from "@/components/login/LoginButton.jsx";
import LoginTitle from "@/components/login/LoginTitle.jsx";
import Logo from "@/components/common/Logo.jsx";

import AuthProvider from "@/api/AuthProvider.js";
import {useAuthStore} from "@/stores/useAuthStore.js";
import {useFetching} from "@/hooks/useFetching.js";


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const {refreshAuthTokens} = useAuthStore();

    const fromPage = location.state?.from?.pathname || '/';
    const nextPage = () => navigate(fromPage, {replace: true});

    const [fetching, isLoading] = useFetching(async (code) => {
        const resp = await AuthProvider.HandleGoogleCallback(code);

        if (!resp.status || !resp.data) {
            throw new Error("Failed to authenticate");
        }

        refreshAuthTokens(resp.data.bearer, resp.data.refreshToken);
        nextPage();
    });

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const code = queryParams.get('code');

        if (code) {
            console.log("Code parameter found:", code);
            (async () => {
                try {
                    await fetching(code);
                } catch (e) {
                    console.error("Error fetching credentials:", e.message);
                }
            })();
        }
    }, []);

    if (isLoading) {
        return (<main className="main-container"></main>)
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
                    <EmailInput setEmail={setEmail}/>
                    <PasswordInput setPass={setPass}/>
                    <LoginButton email={email} pass={pass} callback={nextPage}/>
                    <ForgotPasswordLink/>
                    <SignUpLink/>
                </Box>
            </Sheet>
        </main>
    );
};