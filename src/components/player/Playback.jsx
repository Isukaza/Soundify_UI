import {Stack} from "@mui/joy";

import PlaybackControls from "@/components/player/playbackControls/PlaybackControls.jsx";
import TrackProgress from "@/components/player/trackProgress/TrackProgress.jsx";


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
                maxWidth: "600px",
            }}
        >
            <PlaybackControls/>
            <TrackProgress/>
        </Stack>
    );
};