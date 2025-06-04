import {Box} from '@mui/joy';
import React from "react";
import ControlPoint from '@mui/icons-material/ControlPoint';

export function AddToPlaylistButton({trackId}: { trackId: string }) {
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        console.log('Add to playlist:', trackId);
    };

    return (
        <Box
            className="row-action-button"
            sx={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
                color: 'rgba(255, 255, 255, 0.7)',
                opacity: 0,
                transform: 'scale(1)',
                transition: 'opacity 0.2s, transform 0.2s, color 0.2s',
                '&:hover': {
                    transform: 'scale(1.2)',
                    color: '#ffffff',
                },
            }}
            onClick={handleClick}
        >
            <ControlPoint sx={{fontSize: '20px'}}/>
        </Box>
    );
}