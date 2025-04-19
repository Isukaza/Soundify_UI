import {Slider, IconButton, Stack} from '@mui/joy';
import {VolumeDown, VolumeMute, VolumeOff, VolumeUp} from '@mui/icons-material';
import {useMusicStore} from '@/stores/useMusicStore/useMusicStore.ts';
import {AudioPlayerManager} from '@/managers/AudioPlayerManager';

const Volume = () => {
    console.log("Volume");

    const playerVolume = useMusicStore((state) => state.playerVolume);

    const getVolumeIcon = (volume) => {
        if (volume === 0) {
            return <VolumeOff />;
        } else if (volume <= 0.33) {
            return <VolumeMute />;
        } else if (volume <= 0.66) {
            return <VolumeDown />;
        } else {
            return <VolumeUp />;
        }
    };

    return (
        <Stack
            sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            direction="row"
            spacing={1}
        >
            {/* Иконка для отключения звука */}
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

export default Volume;