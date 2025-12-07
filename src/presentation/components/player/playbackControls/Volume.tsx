import {CircularProgress, IconButton, Slider, Stack} from '@mui/joy';
import {VolumeDown, VolumeMute, VolumeOff, VolumeUp} from '@mui/icons-material';

import {useStore} from '@/stores';

import useInject from "@/domain/hooks/useInject";
import AbstractAudioPlayerManager from "@/domain/managers/Base/AbstractAudioPlayerManager";
import {TYPES} from "@/app/di/types";

export default function Volume() {
    const manager = useInject<AbstractAudioPlayerManager>(TYPES.AudioPlayerManager);

    const playerVolume = useStore(state => state.player.volume);
    const currentTrack = useStore(state => state.track.currentTrack);

    const getVolumeIcon = (volume: number) => {
        if (volume === 0) return <VolumeOff/>;
        if (volume <= 0.33) return <VolumeMute/>;
        if (volume <= 0.66) return <VolumeDown/>;
        return <VolumeUp/>;
    };

    const handleToggleMute = async () => {
        try {
            await manager.toggleMute();
        } catch (err) {
            console.error("Failed to toggle mute:", err);
        }
    };

    const handleChangeVolume = async (_: any, value: number | number[]) => {
        if (typeof value !== "number") return;

        try {
            await manager.setVolume(value);
        } catch (err) {
            console.error("Failed to set volume:", err);
        }
    };

    if (!currentTrack)
        return null;

    return (
        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
        >
            <IconButton
                sx={{height: '36px', width: '36px'}}
                onClick={handleToggleMute}
            >
                {getVolumeIcon(playerVolume)}
            </IconButton>

            <Slider
                sx={{'--Slider-thumbSize': '14px', width: '100px'}}
                min={0}
                max={1}
                step={0.01}
                value={playerVolume}
                onChange={handleChangeVolume}
            />
        </Stack>
    );
}