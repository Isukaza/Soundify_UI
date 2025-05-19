import React from 'react';

import {Button, Typography} from '@mui/joy';

import GoogleIcon from '@/shared/assets/GoogleIcon';
import AuthManager from '@/domain/managers/AuthManager';
import {borderRadiusStyle} from '@/styles/common/borderRadiusStyle';

export default function GoogleLoginButton() {
    const handleClick = async () => {
        const url = await AuthManager.getGoogleSsoUrl();
        if (url) {
            window.location.href = url;
        }
    };

    return (
        <Button
            onClick={handleClick}
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