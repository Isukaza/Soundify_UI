import { Typography } from '@mui/joy';

export function TrackDuration({ duration }: { duration: number; }) {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return (
        <Typography /*level="body2"*/ sx={{ opacity: 0.7 }}>
            {minutes}:{seconds.toString().padStart(2, '0')}
        </Typography>
    );
}