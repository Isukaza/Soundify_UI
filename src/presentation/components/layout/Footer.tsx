import {useEffect, useRef} from 'react';
import {Box} from '@mui/joy';

import useInject from "@/domain/hooks/useInject";

import AbstractAudioPlayerManager from "@/domain/managers/Base/AbstractAudioPlayerManager";

import {useStore} from '@/stores';

import Player from '@/presentation/components/player/Player';

const Footer = () => {
    const isAuthenticated = useStore(state => state.auth.isAuthenticated);
    const musicName: string = "tmpdob60llg";

    const {instance: manager, loading} = useInject(AbstractAudioPlayerManager);

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
                if (!manager) {
                    console.warn("[Footer] Manager not yet ready, skipping...");
                    return;
                }

                await manager.loadTrack(musicName);
                isRetrying.current = false;
            } catch (err) {
                console.error("[Footer] AudioPlayerManager.loadTrack failed, retrying in 100ms...", err);

                if (!isCancelled) {
                    isRetrying.current = true;
                    clearTimer();
                    refreshTimer.current = setTimeout(loadWithRetry, 100);
                }
            }
        };

        if (isAuthenticated && !loading && manager && !isRetrying.current)
            loadWithRetry();

        return () => {
            isCancelled = true;
            clearTimer();
        };
    }, [isAuthenticated, loading, manager]);

    return (
        <Box sx={{
            padding: '10px 20px',
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'black',
            color: 'white',
            boxShadow: '0px -1px 3px 0px rgba(255, 255, 255, 0.2)',
            position: 'relative'
        }}>
            <Player/>
        </Box>
    );
};

export default Footer;