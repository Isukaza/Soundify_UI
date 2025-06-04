import {Link as RouterLink} from 'react-router-dom';
import {Link} from '@mui/joy';

export function TrackAlbum({albumId, albumName}: { albumId: string; albumName: string; }) {
    return (
        <Link
            component={RouterLink}
            to={`/album/${albumId}`}
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