import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import {InsertPhoto} from '@mui/icons-material';
import {Stack, Typography} from '@mui/joy';

export function TrackInfo({thumbnail, trackId, trackName, artistId, artistName, variant}: {
    thumbnail?: string;
    trackId: string;
    trackName: string;
    artistId: string;
    artistName: string;
    variant: string;
}) {
    const [imgError, setImgError] = useState(false);

    const showPlaceholderIcon = true;//imgError || !thumbnail;

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            {variant !== "album" ? (
                showPlaceholderIcon
                    ? <InsertPhoto sx={{width: 32, height: 32}}/>
                    : <img
                        src={thumbnail}
                        onError={() => setImgError(true)}
                        alt={trackName}
                        style={{width: 32, height: 32, borderRadius: 4}}
                    />

            ) : null}

            <Stack>
                <Typography
                    level="title-md"
                    component={Link}
                    to={`/track/${trackId}`}
                    sx={{
                        textDecoration: 'none',
                        '&:hover': {
                            textDecoration: 'underline'
                        }
                    }}
                >
                    {trackName}
                </Typography>

                <Typography
                    component={Link}
                    to={`/artist/${artistId}`}
                    color="neutral"
                    sx={{
                        opacity: 0.7,
                        textDecoration: 'none',
                        '&:hover': {
                            textDecoration: 'underline',
                            opacity: 1,
                        },
                    }}
                >
                    {artistName}
                </Typography>
            </Stack>
        </Stack>
    );
}