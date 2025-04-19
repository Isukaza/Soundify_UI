import {Stack} from "@mui/joy";

import Playback from "@/components/player/Playback.jsx";
import TrackInfo from "@/components/player/TrackInfo.jsx";
import Volume from "@/components/player/playbackControls/Volume.jsx";


export default function Player() {
    console.log("Player");

    return (
        <Stack
            direction="row"
            sx={{
                height: "auto",
                width: "100%",
                justifyContent: "space-between",
                paddingX: 3
            }}>
            <TrackInfo/>
            <Playback/>
            <Volume/>
        </Stack>
    );
}