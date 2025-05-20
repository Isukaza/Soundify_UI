import {useStore} from "@/stores/index";
import {useEffect, useRef} from 'react';
import {Box} from '@mui/joy';

import Player from '@/presentation/components/player/Player';
import AudioPlayerManager from '@/domain/managers/AudioPlayerManager';

const Footer = () => {
    const isAuthenticated = useStore(state => state.auth.isAuthenticated);
    const musicName: string = "tmpdob60llg";

    const refreshTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const isRetrying = useRef(false);

    useEffect(() => {
        let isCancelled = false;
        const clearTimer = () => {
            if (refreshTimer.current) {
                clearTimeout(refreshTimer.current);
                refreshTimer.current = undefined;
            }
        };

        const loadWithRetry = async () => {
            try {
                await AudioPlayerManager.loadTrack(musicName);
                isRetrying.current = false;
            } catch (err) {
                console.error("[Footer] AudioPlayerManager.loadSource failed, retrying in 100ms...", err);

                if (!isCancelled) {
                    isRetrying.current = true;

                    clearTimer();
                    refreshTimer.current = setTimeout(() => {
                        loadWithRetry();
                    }, 100);
                }
            }
        };

        if (isAuthenticated && !isRetrying.current)
            loadWithRetry();


        return () => {
            isCancelled = true;
            clearTimer();
        };
    }, [isAuthenticated]);

    return (
        <Box
            sx={{
                padding: '10px 20px',
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: 'black',
                color: 'white',
                boxShadow: '0px -1px 3px 0px rgba(255, 255, 255, 0.2)',
                position: 'relative'
            }}
        >
            <Player/>
        </Box>
    );
};

export default Footer;