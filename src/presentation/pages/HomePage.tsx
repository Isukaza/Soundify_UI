import AbstractTrackManager from "@/domain/managers/Base/AbstractTrackManager";
import {borderRadiusStyle} from "@/presentation/styles/common/borderRadiusStyle";
import {useEffect} from "react";
import {Button, Stack} from '@mui/joy';

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
        <Stack sx={{height: "auto", width: '50%', alignItems: 'center'}}>
            <Stack direction="row" spacing={1} sx={{width: '100%', justifyContent: 'flex-start', mt: 1}}>
                <Button sx={{...borderRadiusStyle}}>Track</Button>
                <Button sx={{...borderRadiusStyle}}>Album</Button>
                <Button sx={{...borderRadiusStyle}}>Artist</Button>
            </Stack>
            <TrackTable/>
        </Stack>
    );
}