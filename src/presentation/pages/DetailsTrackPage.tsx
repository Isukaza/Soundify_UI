import { Link } from 'react-router-dom';

import { Box } from '@mui/joy';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

import { borderRadiusStyle } from '@/presentation/styles/common/borderRadiusStyle';
import { centerStyles } from '@/presentation/styles/common/centerStyles';

export default function DetailsTrackPage() {
    return (
        <main className="main-container">
            <Box sx={{...centerStyles, gap: 3, width: '734px'}}>
                <Typography level="h1" sx={{wordBreak: 'break-word'}}>Unknown track</Typography>
                <Button
                    component={Link}
                    to="/"
                    variant="solid"
                    color="primary"
                    size='lg'
                    sx={{
                        width: '100%',
                        ...borderRadiusStyle,
                        [`&:hover`]: {transform: 'scale(1.1)'}
                    }}
                >
                    Other action
                </Button>
            </Box>
        </main>
    );
};