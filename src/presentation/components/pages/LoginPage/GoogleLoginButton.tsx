import React from "react";
import {Button, CircularProgress, Typography} from "@mui/joy";

import useInject from "@/domain/hooks/useInject";
import {TYPES} from "@/app/di/types";

import AbstractAuthManager from "@/domain/managers/Base/AbstractAuthManager";

import GoogleIcon from "@/shared/assets/GoogleIcon";
import {borderRadiusStyle} from "@/presentation/styles/common/borderRadiusStyle";

export default function GoogleLoginButton() {
    const authManager = useInject<AbstractAuthManager>(TYPES.AuthManager);

    const [isLoading, setIsLoading] = React.useState(false);

    const handleClick = async () => {
        try {
            setIsLoading(true);

            const url = await authManager.getGoogleSsoUrl();
            if (url)
                window.location.href = url;

        } catch (err) {
            console.error("GoogleLoginButton error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            onClick={handleClick}
            size="lg"
            variant="outlined"
            disabled={isLoading}
            sx={borderRadiusStyle}
            startDecorator={
                isLoading ? <CircularProgress size="sm"/> : <GoogleIcon/>
            }
        >
            <Typography>{isLoading ? "Loading..." : "Continue with Google"}</Typography>
        </Button>
    );
}