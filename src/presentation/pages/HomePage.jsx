import {Link} from 'react-router-dom';
import Button from '@mui/joy/Button';
import {Stack} from '@mui/joy';
import Typography from '@mui/joy/Typography';

import Logo from '@/presentation/components/common/Logo';
import {borderRadiusStyle} from '@/presentation/styles/common/borderRadiusStyle';

import useInject from '@/domain/hooks/useInject';
import AbstractAuthManager from '@/domain/managers/Base/AbstractAuthManager';

export default function HomePage() {
    const {instance: authManager, loading} = useInject(AbstractAuthManager);

    const handleLogout = () => {
        if (!authManager)
            return;

        authManager.clearAuthData();
    };

    return (
        <Stack spacing={2} sx={{height: "auto", width: '734px', alignItems: 'center'}}>
            <Logo/>

            <Typography level="h1" sx={{textAlign: 'center', fontWeight: 'bold'}}>
                Thank you for visiting!
            </Typography>
            <Typography level="h1" sx={{textAlign: 'center', fontWeight: 'bold'}}>
                We're in the early stages of developing something exciting, and we're glad you're here.
            </Typography>
            <Typography level="h1" sx={{textAlign: 'center', fontWeight: 'bold'}}>
                Our app is still under construction, but we're working hard to bring you a great experience.
            </Typography>

            <Button
                component={Link}
                to="/Login"
                onClick={handleLogout}
                variant="solid"
                color="primary"
                size="lg"
                disabled={loading || !authManager}
                sx={{
                    width: {xs: 'auto', sm: '25%'},
                    ...borderRadiusStyle,
                    '&:hover': {transform: 'scale(1.1)'},
                }}
            >
                Log Out
            </Button>
        </Stack>
    );
}