import React from "react";

import {Repeat, Shuffle, SkipNext, SkipPrevious} from "@mui/icons-material";
import {IconButton, Stack} from "@mui/joy";

import {useStore} from "@/stores";

import PlayButton from "@/presentation/components/player/playbackControls/PlayButton";

const PlaybackControls = React.memo(function PlaybackControls() {
    console.log("PlaybackControls");

    const currentTrack = useStore(state => state.library.currentTrack);
    const isDisabled = !currentTrack;

    return (
        <Stack direction="row" spacing={1}>
            <IconButton disabled={isDisabled}>
                <Shuffle/>
            </IconButton>
            <IconButton disabled={isDisabled}>
                <SkipPrevious/>
            </IconButton>
            <PlayButton/>
            <IconButton disabled={isDisabled}>
                <SkipNext/>
            </IconButton>
            <IconButton disabled={isDisabled}>
                <Repeat/>
            </IconButton>
        </Stack>
    );
});

export default PlaybackControls;
