import Button from '@mui/joy/Button';
import {PlayArrow as PlayArrowIcon, Pause as PauseIcon} from '@mui/icons-material';

import AbstractAudioPlayerManager from "@/domain/managers/Base/AbstractAudioPlayerManager";

import useInject from "@/domain/hooks/useInject";

import {useStore} from '@/stores';

export default function PlayButton() {
    const isPlaying = useStore(state => state.player.isPlaying);
    const {instance: manager, loading} = useInject(AbstractAudioPlayerManager);
    const currentTrack = useStore(state => state.track.currentTrack);

    const handlePlay = async () => {
        if (!manager)
            return;

        try {
            await manager.togglePlay();
        } catch (err) {
            console.error("Failed to toggle play:", err);
        }
    };

    const isDisabled = loading || !manager || !currentTrack;

    return (
        <Button
            disabled={isDisabled}
            sx={{
                borderRadius: '50%',
                width: "36px",
                height: "36px",
                padding: 0,
            }}
            onClick={handlePlay}
        >
            {isPlaying
                ? <PauseIcon sx={{color: 'black'}} fontSize="xl2"/>
                : <PlayArrowIcon sx={{color: 'black'}} fontSize="xl2"/>
            }
        </Button>
    );
}