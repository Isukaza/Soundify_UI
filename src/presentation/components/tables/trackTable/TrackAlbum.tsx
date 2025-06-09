import {Link} from '@mui/joy';
import {Link as RouterLink} from 'react-router-dom';

export function TrackAlbum({albumId, albumName}: { albumId: string; albumName: string; }) {
    return (
        <Link
            component={RouterLink}
            to={`/AlbumDetails/${albumId}`}
            underline="none"
            color="neutral"
            sx={{
                opacity: 0.8,
                '&:hover': {
                    textDecoration: 'underline',
                    opacity: 1,
                },
            }}
        >
            {albumName}
        </Link>
    );
}