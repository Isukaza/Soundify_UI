import {borderRadiusStyle} from "@/styles/common/borderRadiusStyle.js";
import {useAuthStore} from "@/stores/useAuthStore.js";
import Button from "@mui/joy/Button";

import {useFetching} from "@/hooks/useFetching.js";

import AuthProvider from "@/api/AuthProvider.js";

// eslint-disable-next-line react/prop-types
export default function LoginButton({email, pass, callback}) {
    const {refreshAuthTokens} = useAuthStore();
    const [fetchAuth, isLoading] = useFetching(auth);

    async function auth(email, pass) {
        let resp = await AuthProvider.login(email, pass);
        if (resp.status) {
            refreshAuthTokens(resp.data.bearer, resp.data.refreshToken);

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