import {Box} from "@mui/joy";

import Playback from "@/presentation/components/player/Playback";
import TrackInfo from "@/presentation/components/player/TrackInfo";
import Volume from "@/presentation/components/player/playbackControls/Volume";

export default function Player() {
    console.log("Player");

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '75px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 20px'
            }}
        >
            <Box sx={{flexShrink: 0}}>
                <TrackInfo/>
            </Box>

            <Box
                sx={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    maxWidth: '500px',
                    width: '100%',
                }}
            >
                <Playback/>
            </Box>

            <Box sx={{flexShrink: 0}}>
                <Volume/>
            </Box>
        </Box>
    );
}