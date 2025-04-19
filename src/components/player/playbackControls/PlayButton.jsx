import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Button from "@mui/joy/Button";

import { useMusicStore } from '@/stores/useMusicStore/useMusicStore';
import { AudioPlayerManager } from '@/managers/AudioPlayerManager';

export default function PlayButton() {
    const isPlaying = useMusicStore(state => state.isPlaying);

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
                ? <PauseIcon sx={{ color: 'black' }} fontSize="xl2" />
                : <PlayArrowIcon sx={{ color: 'black' }} fontSize="xl2" />
            }
        </Button>
    );
}
