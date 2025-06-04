import {InsertPhoto, PlaylistAdd} from '@mui/icons-material';
import {IconButton, Stack, Typography} from '@mui/joy';
import {useStore} from '@/stores';

export default function TrackInfo() {
    console.log("TrackInfo");

    const currentTrack = useStore(state => state.library.currentTrack);
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
                <Typography>{currentTrack.Name}</Typography>
                <Typography>{currentTrack.ArtistName}</Typography>
            </Stack>
            <IconButton>
                <PlaylistAdd fontSize="xl3"/>
            </IconButton>
        </Stack>
    );
};