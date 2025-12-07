import Button from "@mui/joy/Button";
import { PlayArrow as PlayArrowIcon, Pause as PauseIcon } from "@mui/icons-material";

import { useStore } from "@/stores";
import AbstractAudioPlayerManager from "@/domain/managers/Base/AbstractAudioPlayerManager";

import useInject from "@/domain/hooks/useInject";
import { TYPES } from "@/app/di/types";

export default function PlayButton() {
    const isPlaying = useStore(state => state.player.isPlaying);
    const currentTrack = useStore(state => state.track.currentTrack);

    // DI: строгая типизация
    const manager = useInject<AbstractAudioPlayerManager>(TYPES.AudioPlayerManager);

    const handlePlay = async () => {
        try {
            await manager.togglePlay();
        } catch (err) {
            console.error("Failed to toggle play:", err);
        }
    };

    return (
        <Button
            disabled={!currentTrack}
            sx={{
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                padding: 0
            }}
            onClick={handlePlay}
        >
            {isPlaying ? (
                <>
                    {/* @ts-ignore */}
                    <PauseIcon sx={{ color: "black" }} fontSize="xl2" />
                </>
            ) : (
                <>
                    {/* @ts-ignore */}
                    <PlayArrowIcon sx={{ color: "black" }} fontSize="xl2" />
                </>
            )}
        </Button>
    );
}