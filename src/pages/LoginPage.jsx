import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import Divider from '@mui/joy/Divider';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import {Box} from "@mui/joy";

import {containerStyles} from "@/styles/login/styles.js";
import {centerStyles} from "@/styles/common/centerStyles.js";

import EmailInput from "@/components/login/EmailInput.jsx";
import ForgotPasswordLink from "@/components/login/ForgotPasswordLink.jsx";
import GoogleLoginButton from "@/components/login/GoogleLoginButton.jsx";
import LoginButton from "@/components/login/LoginButton.jsx";
import LoginTitle from "@/components/login/LoginTitle.jsx";
import Logo from "@/components/common/Logo.jsx";
import PasswordInput from "@/components/login/PasswordInput.jsx";
import SignUpLink from "@/components/login/SignUpLink.jsx";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const fromPage = location.state?.from?.pathname || '/';
    const nextPage = () => navigate(fromPage, {replace: true});

    return (
        <main className="main-container">
            <Sheet
                sx={{
                    maxWidth: '734px',
                    width: '100%',
                    mx: 'auto',
                    my: 'auto',
                    py: 3,
                    px: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    borderRadius: 'lg',
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

                <Divider sx={{my: '32px', mx: '100px'}} orientation="horizontal"/>

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