import AbstractTrackManager from "@/domain/managers/Base/AbstractTrackManager";
import {useEffect} from "react";
import {Link} from 'react-router-dom';
import Button from '@mui/joy/Button';
import {Stack} from '@mui/joy';
import Typography from '@mui/joy/Typography';

import Logo from '@/presentation/components/common/Logo';
import {borderRadiusStyle} from '@/presentation/styles/common/borderRadiusStyle';

import useInjectMap from "@/domain/hooks/useInjectMap";
import AbstractAuthManager from '@/domain/managers/Base/AbstractAuthManager';

import TrackTable from '@/presentation/components/tables/trackTable';

export default function HomePage() {
    const {instances, loading} = useInjectMap({
        authManager: AbstractAuthManager,
        trackManager: AbstractTrackManager
    });

    const handleLogout = () => {
        if (!instances.authManager)
            return;

        instances.authManager.clearAuthData();
    };

    useEffect(() => {
        if (!instances.trackManager)
            return;

        const fetchTrack = async () => {
            const t = await instances.trackManager?.LoadInitialTracksAsync();
            console.log(JSON.stringify(t));
        };

        fetchTrack();
    }, [instances.trackManager]);

    return (
        <Stack spacing={2} sx={{height: "auto", width: '1734px', alignItems: 'center'}}>
            <Logo/>

            <Typography level="h1" sx={{textAlign: 'center', fontWeight: 'bold'}}>
                Thank you for visiting!
            </Typography>
            <Typography level="h1" sx={{textAlign: 'center', fontWeight: 'bold'}}>
                {"We're in the early stages of developing something exciting, and we're glad you're here."}
            </Typography>
            <Typography level="h1" sx={{textAlign: 'center', fontWeight: 'bold'}}>
                {'Our app is still under construction, but we\'re working hard to bring you a great experience.'}
            </Typography>

            <Button
                component={Link}
                to="/Login"
                onClick={handleLogout}
                variant="solid"
                color="primary"
                size="lg"
                disabled={loading || !instances.authManager}
                sx={{
                    width: {xs: 'auto', sm: '25%'},
                    ...borderRadiusStyle,
                    '&:hover': {transform: 'scale(1.1)'},
                }}
            >
                Log Out
            </Button>

            <TrackTable/>

        </Stack>
    );
}