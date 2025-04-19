import {Stack} from "@mui/joy";
import IconButton from "@mui/joy/IconButton";
import {Repeat, Shuffle, SkipNext, SkipPrevious} from "@mui/icons-material";
import PlayButton from "@/components/player/playbackControls/PlayButton.jsx";
import React from "react";

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
