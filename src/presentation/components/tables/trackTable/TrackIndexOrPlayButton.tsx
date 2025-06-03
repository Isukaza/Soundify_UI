import { Box } from '@mui/joy';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';

export function TrackIndexOrPlayButton({ index, isPlaying }: { index: number; isPlaying: boolean; }) {
    return (
        <Box
            className="track-index-play"
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
                color: 'white',
            }}
        >
            {isPlaying ? (
                <PlayArrowRounded
                    sx={{ fontSize: '20px' }}
                    onClick={(e) => {
                        e.stopPropagation();
                        alert(`Play track ${index}`);
                    }}
                />
            ) : (
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
                            color: 'white',
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            alert(`Play track ${index}`);
                        }}
                    >
                        <PlayArrowRounded sx={{ fontSize: '20px' }} />
                    </Box>
                </>
            )}
        </Box>
    );
}