import {InsertPhoto} from '@mui/icons-material';
import {Stack, Typography} from '@mui/joy';

import {useStore} from '@/stores';
import {Link} from "react-router-dom";

export default function TrackInfo() {
    console.log("TrackInfo");

    const currentTrack = useStore(state => state.track.currentTrack);
    if (!currentTrack)
        return null;

    return (
        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
        >
            <InsertPhoto fontSize="xl4"/>
            <Stack
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                }}
            >

                <Typography
                    level="title-md"
                    component={Link}
                    to={`/track/123`}
                    sx={{
                        textDecoration: 'none',
                        '&:hover': {
                            textDecoration: 'underline'
                        }
                    }}
                >
                    {currentTrack.Name}
                </Typography>

                <Typography
                    component={Link}
                    to={`/artist/123`}
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
                    {currentTrack.ArtistName}
                </Typography>
            </Stack>
        </Stack>
    );
};