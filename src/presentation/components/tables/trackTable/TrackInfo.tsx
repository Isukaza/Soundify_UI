import {useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';

import {InsertPhoto} from '@mui/icons-material';
import {Link, Stack} from '@mui/joy';

export function TrackInfo({thumbnail, trackId, trackName, artistId, artistName}: {
    thumbnail?: string;
    trackId: string;
    trackName: string;
    artistId: string;
    artistName: string;
}) {
    const [imgError, setImgError] = useState(false);

    const showPlaceholderIcon = imgError || !thumbnail;

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            {showPlaceholderIcon ? (
                <InsertPhoto sx={{width: 32, height: 32}} />
            ) : (
                <img
                    src={thumbnail}
                    onError={() => setImgError(true)}
                    alt={trackName}
                    style={{width: 32, height: 32, borderRadius: 4}}
                />
            )}

            <Stack>
                <Link
                    component={RouterLink}
                    to={`/track/${trackId}`}
                    underline="none"
                    color="neutral"
                    sx={{
                        fontSize: '1rem',
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    }}
                >
                    {trackName}
                </Link>

                <Link
                    component={RouterLink}
                    to={`/artist/${artistId}`}
                    underline="none"
                    color="neutral"
                    sx={{
                        opacity: 0.7,
                        '&:hover': {
                            textDecoration: 'underline',
                            opacity: 1,
                        },
                    }}
                >
                    {artistName}
                </Link>
            </Stack>
        </Stack>
    );
}