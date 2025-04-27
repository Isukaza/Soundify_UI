import {Stack} from "@mui/joy";

import Playback from "@/components/player/Playback.jsx";
import TrackInfo from "@/components/player/TrackInfo.jsx";
import Volume from "@/components/player/playbackControls/Volume.jsx";

export default function Player() {
    console.log("Player");

    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{width: "100%", height: "auto", position: "relative"}}
        >
            <TrackInfo sx={{position: "absolute", left: 0}}/>
            <Playback sx={{flex: 1, textAlign: "center"}}/>
            <Volume sx={{position: "absolute", right: 0}}/>
        </Stack>
    );
}