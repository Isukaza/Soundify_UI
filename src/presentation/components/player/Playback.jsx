import {Stack} from "@mui/joy";

import PlaybackControls from "@/presentation/components/player/playbackControls/PlaybackControls";
import TrackProgress from "@/presentation/components/player/trackProgress/TrackProgress";

export default function Playback() {
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
            }}
        >
            <PlaybackControls/>
            <TrackProgress/>
        </Stack>
    );
};