import {Stack} from "@mui/joy";

import PlaybackControls from "@/presentation/components/player/playbackControls/PlaybackControls";
import TrackProgress from "@/presentation/components/player/trackProgress/TrackProgress";

// eslint-disable-next-line react/prop-types
export default function Playback({sx}) {
    console.log("Playback");

    return (
        <Stack
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                maxWidth: "500px",
                ...sx,
            }}
        >
            <PlaybackControls/>
            <TrackProgress/>
        </Stack>
    );
};