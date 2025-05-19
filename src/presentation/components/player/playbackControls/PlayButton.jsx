import Button from '@mui/joy/Button';
import {PlayArrow as PlayArrowIcon, Pause as PauseIcon} from '@mui/icons-material';

import {AudioPlayerManager} from '@/domain/managers/AudioPlayerManager';
import {useStore} from '@/stores/index';

export default function PlayButton() {
    const isPlaying = useStore(state => state.player.isPlaying);

    const handlePlay = () => {
        AudioPlayerManager.togglePlay();
    };

    return (
        <Button
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