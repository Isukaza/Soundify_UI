import React from 'react';
import {Box, Card, Typography} from '@mui/joy';
import {Link, useNavigate} from 'react-router-dom';
import Album from '@/domain/DTO/Album';
// @ts-ignore
import placeholderSvg from '@/shared/assets/imagePlaceholder.svg';

type AlbumCardProps = {
    album: Album;
};

export default function AlbumCard({album}: AlbumCardProps) {
    const navigate = useNavigate();

    return (
        <Card
            key={album.Id}
            variant="plain"
            className="album-card"
            onClick={() => navigate(`/AlbumDetails/${album.Id}`)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                cursor: 'pointer',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    aspectRatio: '1 / 1',
                    borderRadius: '8px',
                    backgroundImage: `url("${placeholderSvg}")`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}
            />

            <Typography
                level="title-md"
                component={Link}
                to={`/AlbumDetails/${album.Id}`}
                sx={{
                    textAlign: 'left',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    textDecoration: 'none',
                    '&:hover': {
                        textDecoration: 'underline'
                    }
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {album.Title}
            </Typography>

            <Typography
                level="body-sm"
                color="neutral"
                sx={{
                    textAlign: 'left',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}
            >
                {new Date(album.ReleaseDate).getFullYear()} • {album.ArtistName}
            </Typography>
        </Card>
    );
}