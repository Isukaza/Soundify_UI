import {borderRadiusStyle} from "@/presentation/styles/common/borderRadiusStyle";
import {Button, Stack} from '@mui/joy';

import TrackTable from '@/presentation/components/tables/trackTable';

export default function HomePage() {
    return (
        <Stack
            sx={{
                width: '100%',
                maxWidth: '50%',
                margin: '0 auto',
            }}
        >
            <Stack direction="row" spacing={1} sx={{mb: 2}}>
                <Button sx={{...borderRadiusStyle}}>Track</Button>
                <Button sx={{...borderRadiusStyle}}>Album</Button>
                <Button sx={{...borderRadiusStyle}}>Artist</Button>
            </Stack>

            <TrackTable/>
        </Stack>

    );
}