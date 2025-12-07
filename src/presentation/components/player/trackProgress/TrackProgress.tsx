import {Stack} from "@mui/joy";

import TrackDuration from "@/presentation/components/player/trackProgress/TrackDuration";
import TrackProgressSlider from "@/presentation/components/player/trackProgress/TrackProgressSlider";
import TrackProgressTime from "@/presentation/components/player/trackProgress/TrackProgressTime";

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