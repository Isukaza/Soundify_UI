import Button from '@mui/joy/Button';

import {useFetching} from '@/hooks/useFetching.js';
import AuthApi from '@/api/AuthApi.js';
import {AuthManager} from '@/managers/AuthManager';

import {borderRadiusStyle} from '@/styles/common/borderRadiusStyle.js';

// eslint-disable-next-line react/prop-types
export default function LoginButton({email, pass, callback}) {
    const [fetchAuth, isLoading] = useFetching(auth);

    async function auth(email, pass) {
        let resp = await AuthApi.login(email, pass);
        if (resp.status) {
            AuthManager.refreshTokens(resp.data.bearer, resp.data.refreshToken);
            callback();
        }
    }

    return (
        <Button
            loading={isLoading}
            size='lg'
            onClick={async () => await fetchAuth(email, pass)}
            sx={{
                width: '100%',
                mt: 1,
                ...borderRadiusStyle,
                [`&:hover`]: {transform: 'scale(1.1)'}
            }}
        >
            Log in
        </Button>
    );
};