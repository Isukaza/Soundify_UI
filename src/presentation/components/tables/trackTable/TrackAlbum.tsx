import { Typography } from '@mui/joy';

export function TrackAlbum({ albumName }: { albumName: string; }) {
    return (
        <Typography /*level="body2"*/ sx={{ opacity: 0.8 }}>{albumName}</Typography>
    );
}