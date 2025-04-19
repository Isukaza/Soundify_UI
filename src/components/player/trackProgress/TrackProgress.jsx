import {Stack} from "@mui/joy";

import TrackDuration from "@/components/player/trackProgress/TrackDuration.jsx";
import TrackProgressSlider from "@/components/player/trackProgress/TrackProgressSlider.jsx";
import TrackProgressTime from "@/components/player/trackProgress/TrackProgressTime.jsx";

const TrackProgress = () => {
    console.log("TrackProgress");

    return (
        <Stack
            direction="row"
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <TrackProgressTime/>
            <TrackProgressSlider/>
            <TrackDuration/>
        </Stack>
    );
};


export default TrackProgress;