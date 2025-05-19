import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/joy';

import { useFetching } from '@/domain/hooks/useFetching';
import AuthManager from '@/domain/managers/AuthManager';
import { borderRadiusStyle } from '@/styles/common/borderRadiusStyle';
import { useStore } from '@/stores';

interface Props {
    redirectTo: string;
}

export default function LoginButton({redirectTo}: Props) {
    const navigate = useNavigate();

    const [fetchAuth, isLoading] = useFetching(auth);

    async function auth() {
        const {email, setEmail, password, setPassword} = useStore.getState().auth;

        const success = await AuthManager.loginWithEmail(email, password);
        if (success) {
            setEmail('');
            setPassword('');
            navigate(redirectTo, {replace: true, state: {fromLogin: true}});
        }
    }

    return (
        <Button
            loading={isLoading}
            size="lg"
            onClick={fetchAuth}
            sx={{
                width: '100%',
                mt: 1,
                ...borderRadiusStyle,
                [`&:hover`]: {transform: 'scale(1.1)'},
            }}
        >
            Log in
        </Button>
    );
}