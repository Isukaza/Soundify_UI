import {InsertPhoto, PlaylistAdd} from '@mui/icons-material';
import {IconButton, Stack, Typography} from '@mui/joy';

export default function TrackInfo() {
    console.log("TrackInfo");

    return (
        <Stack
            direction="row"
            spacing={1}
            sx={{
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >

            <InsertPhoto fontSize="xl4"/>
            <Stack
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                }}
            >
                <Typography>Artist name</Typography>
                <Typography>Album name</Typography>
            </Stack>
            <IconButton>
                <PlaylistAdd fontSize="xl3"/>
            </IconButton>
        </Stack>
    );
};