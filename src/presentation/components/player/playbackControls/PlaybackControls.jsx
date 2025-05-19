import React from "react";
import {Repeat, Shuffle, SkipNext, SkipPrevious} from "@mui/icons-material";
import {IconButton, Stack} from "@mui/joy";

import PlayButton from "@/presentation/components/player/playbackControls/PlayButton";

const PlaybackControls = React.memo(function PlaybackControls() {
    console.log("PlaybackControls");

    return (
        <Stack direction="row" spacing={1}>
            <IconButton>
                <Shuffle/>
            </IconButton>
            <IconButton>
                <SkipPrevious/>
            </IconButton>
            <PlayButton/>
            <IconButton>
                <SkipNext/>
            </IconButton>
            <IconButton>
                <Repeat/>
            </IconButton>
        </Stack>
    );
});

export default PlaybackControls;
