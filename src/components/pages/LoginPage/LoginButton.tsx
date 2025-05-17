import {Button} from '@mui/joy';
import {AuthManager} from '@/managers/AuthManager';
import {useFetching} from '@/hooks/useFetching';
import {useNavigate} from 'react-router-dom';
import {useStore} from '@/stores';
import {borderRadiusStyle} from '@/styles/common/borderRadiusStyle';

interface Props {
    redirectTo: string;
}

export default function LoginButton({redirectTo}: Props) {
    const navigate = useNavigate();

    const [fetchAuth, isLoading, error] = useFetching(auth);

    async function auth() {
        const {email, password} = useStore.getState().auth;

        const success = await AuthManager.loginWithEmail(email, password);
        if (success) {
            navigate(redirectTo, {replace: true});
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