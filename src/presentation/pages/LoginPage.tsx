import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import {Box, Divider, Sheet, Stack} from "@mui/joy";

import useInject from "@/domain/hooks/useInject";
import {TYPES} from "@/app/di/types";

import AbstractAuthManager from "@/domain/managers/Base/AbstractAuthManager";

import LoadingPage from "@/presentation/pages/LoadingPage";
import Logo from "@/presentation/components/common/Logo";
import ForgotPasswordLink from "@/presentation/components/pages/LoginPage/ForgotPasswordLink";
import GoogleLoginButton from "@/presentation/components/pages/LoginPage/GoogleLoginButton";
import LoginButton from "@/presentation/components/pages/LoginPage/LoginButton";
import LoginTitle from "@/presentation/components/pages/LoginPage/LoginTitle";
import EmailInput from "@/presentation/components/pages/LoginPage/EmailInput";
import PasswordInput from "@/presentation/components/pages/LoginPage/PasswordInput";
import SignUpLink from "@/presentation/components/pages/LoginPage/SignUpLink";

import {centerStyles} from "@/presentation/styles/common/centerStyles";
import {containerStyles} from "@/presentation/styles/login/styles";

export default function LoginPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const fromPage = location.state?.from?.pathname || "/";

    const authManager = useInject<AbstractAuthManager>(TYPES.AuthManager);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get("code");
        if (!code) return;

        setIsLoading(true);

        (async () => {
            const success = await authManager.handleGoogleCallback(code);
            if (success) {
                navigate(fromPage, {
                    replace: true,
                    state: {fromLogin: true},
                });
            } else {
                console.error("Google login failed");
                setIsLoading(false);
            }
        })();
    }, [authManager, navigate, fromPage]);

    if (isLoading) return <LoadingPage/>;

    return (
        <main className="main-container">
            <Sheet
                sx={{
                    height: {xs: "100%", sm: "auto"},
                    maxWidth: {xs: "100%", sm: "734px"},
                    width: "100%",
                    mx: {xs: "0%", sm: "auto"},
                    my: {xs: "0%", sm: "auto"},
                    py: 3,
                    px: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: {xs: "center", sm: "flex-start"},
                    alignItems: {xs: "center", sm: "stretch"},
                    gap: 2,
                    borderRadius: {xs: "0", sm: "lg"},
                    boxShadow: "md",
                }}
                variant="outlined"
            >
                <Stack direction="column" spacing={2} sx={[centerStyles, containerStyles]}>
                    <Logo/>
                    <LoginTitle/>
                </Stack>

                <Stack sx={containerStyles}>
                    <GoogleLoginButton/>
                </Stack>

                <Divider
                    sx={{
                        width: {xs: "324px", sm: "auto"},
                        my: "32px",
                        mx: {xs: "auto", sm: "100px"},
                    }}
                />

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