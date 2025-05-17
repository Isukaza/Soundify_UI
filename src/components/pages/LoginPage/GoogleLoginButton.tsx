import {Button, Typography} from '@mui/joy';
import GoogleIcon from '@/assets/GoogleIcon';
import {AuthManager} from '@/managers/AuthManager';
import React from 'react';
import {borderRadiusStyle} from "@/styles/common/borderRadiusStyle";

export default function GoogleLoginButton() {
    return (
        <Button
            onClick={AuthManager.redirectToGoogleSSO}
            size="lg"
            variant="outlined"
            sx={borderRadiusStyle}
        >
            <Typography startDecorator={<GoogleIcon/>}>
                Continue with Google
            </Typography>
        </Button>
    );
}