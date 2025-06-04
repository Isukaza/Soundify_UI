import {Box} from '@mui/joy';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import PauseRounded from '@mui/icons-material/PauseRounded';
import React from "react";

export function TrackIndexOrPlayButton({index, isPlaying, playPauseHandler}: {
    index: number;
    isPlaying: boolean;
    playPauseHandler: (e: React.MouseEvent) => void;
}) {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
                color: 'white',
                '&:hover .track-index-play-icon': {
                    opacity: 1,
                },
            }}
            onClick={playPauseHandler}
        >
            {isPlaying
                ? (<PauseRounded sx={{fontSize: '24px'}}/>)
                : (
                    <>
                        <span className="track-index-number">{index}</span>
                        <Box
                            className="track-index-play-icon"
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                opacity: 0,
                                transition: 'opacity 0.2s',
                            }}
                        >
                            <PlayArrowRounded sx={{fontSize: '24px'}}/>
                        </Box>
                    </>
                )}
        </Box>
    );
}