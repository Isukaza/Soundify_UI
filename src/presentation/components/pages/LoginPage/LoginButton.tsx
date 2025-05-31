import {useNavigate} from 'react-router-dom';

import {Button, CircularProgress} from '@mui/joy';

import useInject from "@/domain/hooks/useInject";
import {useFetching} from '@/domain/hooks/useFetching';

import {borderRadiusStyle} from '@/presentation/styles/common/borderRadiusStyle';

import AbstractAuthManager from "@/domain/managers/Base/AbstractAuthManager";

import {useStore} from '@/stores';

interface Props {
    redirectTo: string;
}

export default function LoginButton({redirectTo}: Props) {
    const navigate = useNavigate();
    const {instance: authManager, loading: authManagerLoading} = useInject(AbstractAuthManager);

    const [fetchAuth, isLoading] = useFetching(auth);

    async function auth() {
        if (!authManager)
            return;

        const {email, setEmail, password, setPassword} = useStore.getState().auth;
        const success = await authManager.loginWithEmail(email, password);

        if (success) {
            setEmail('');
            setPassword('');
            navigate(redirectTo, {replace: true, state: {fromLogin: true}});
        }
    }

    const isDisabled = isLoading || authManagerLoading || !authManager;

    return (
        <Button
            loading={isLoading || authManagerLoading}
            disabled={isDisabled}
            size="lg"
            onClick={fetchAuth}
            sx={{
                width: '100%',
                mt: 1,
                ...borderRadiusStyle,
                '&:hover': {transform: 'scale(1.1)'},
            }}
        >
            {authManagerLoading ? <CircularProgress size="sm"/> : 'Log in'}
        </Button>
    );
}