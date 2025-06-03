import {Stack, Typography} from '@mui/joy';
// @ts-ignore
import placeholder from '@/shared/assets/placeholder.png';

export function TrackInfo({thumbnail, trackName, artistName}: {
    thumbnail?: string;
    trackName: string;
    artistName: string;
}) {
    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <img
                src={thumbnail || placeholder}
                onError={(e) => { e.currentTarget.src = placeholder; }}
                alt={trackName}
                style={{ width: 32, height: 32, borderRadius: 4 }}
            />
            <Stack>
                <Typography level="body1" sx={{ fontSize: '1rem' }}>{trackName}</Typography>
                <Typography level="body2" sx={{ opacity: 0.7 }}>{artistName}</Typography>
            </Stack>
        </Stack>
    );
}