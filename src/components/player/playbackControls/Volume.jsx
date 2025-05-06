import {Slider, IconButton, Stack} from '@mui/joy';
import {VolumeDown, VolumeMute, VolumeOff, VolumeUp} from '@mui/icons-material';

import {useStore} from '@/stores/index';
import {AudioPlayerManager} from '@/managers/AudioPlayerManager';

// eslint-disable-next-line react/prop-types
export default function Volume({sx}) {
    console.log("Volume");

    const playerVolume = useStore((state) => state.player.volume);

    const getVolumeIcon = (volume) => {
        if (volume === 0) {
            return <VolumeOff/>;
        } else if (volume <= 0.33) {
            return <VolumeMute/>;
        } else if (volume <= 0.66) {
            return <VolumeDown/>;
        } else {
            return <VolumeUp/>;
        }
    };

    return (
        <Stack
            sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', ...sx}}
            direction="row"
            spacing={1}
        >
            <IconButton
                sx={{height: '36px', width: '36px'}}
                onClick={() => AudioPlayerManager.toggleMute()}
            >
                {getVolumeIcon(playerVolume)}
            </IconButton>

            <Slider
                sx={{'--Slider-thumbSize': '14px', width: '100px'}}
                min={0}
                max={1}
                step={0.01}
                value={playerVolume}
                onChange={(_, value) => {
                    if (typeof value === 'number') {
                        AudioPlayerManager.setVolume(value);
                    }
                }}
            />
        </Stack>
    );
};