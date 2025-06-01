import {CircularProgress, IconButton, Slider, Stack} from '@mui/joy';
import {VolumeDown, VolumeMute, VolumeOff, VolumeUp} from '@mui/icons-material';

import useInject from "@/domain/hooks/useInject";

import AbstractAudioPlayerManager from "@/domain/managers/Base/AbstractAudioPlayerManager";

import {useStore} from '@/stores';

// eslint-disable-next-line react/prop-types
export default function Volume({sx}) {
    const {instance: manager, loading} = useInject(AbstractAudioPlayerManager);
    const playerVolume = useStore(state => state.player.volume);

    const getVolumeIcon = (volume) => {
        if (volume === 0)
            return <VolumeOff/>;

        if (volume <= 0.33)
            return <VolumeMute/>;

        if (volume <= 0.66)
            return <VolumeDown/>;

        return <VolumeUp/>;
    };

    const handleToggleMute = async () => {
        if (!manager)
            return;

        try {
            await manager.toggleMute();
        } catch (err) {
            console.error("Failed to toggle mute:", err);
        }
    };

    const handleChangeVolume = async (_, value) => {
        if (!manager || typeof value !== 'number')
            return;

        try {
            await manager.setVolume(value);
        } catch (err) {
            console.error("Failed to set volume:", err);
        }
    };

    return (
        <Stack
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                ...sx
            }}
            direction="row"
            spacing={1}
        >
            {
                loading || !manager
                    ? <CircularProgress size="sm"/>
                    :
                    <>
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
                    </>
            }
        </Stack>
    );
}