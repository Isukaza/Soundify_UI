import React from 'react';
import {Button, CircularProgress, Typography} from '@mui/joy';

import useInject from "@/domain/hooks/useInject";

import AbstractAuthManager from "@/domain/managers/Base/AbstractAuthManager";

import GoogleIcon from '@/shared/assets/GoogleIcon';
import {borderRadiusStyle} from '@/presentation/styles/common/borderRadiusStyle';

export default function GoogleLoginButton() {
    const {instance: authManager, loading} = useInject(AbstractAuthManager);

    const handleClick = async () => {
        if (!authManager) return;

        const url = await authManager.getGoogleSsoUrl();
        if (url)
            window.location.href = url;
    };

    const isDisabled = loading || !authManager;

    return (
        <Button
            onClick={handleClick}
            size="lg"
            variant="outlined"
            disabled={isDisabled}
            sx={borderRadiusStyle}
            startDecorator={loading ? <CircularProgress size="sm"/> : <GoogleIcon/>}
        >
            <Typography>{loading ? 'Loading...' : 'Continue with Google'}</Typography>
        </Button>
    );
}