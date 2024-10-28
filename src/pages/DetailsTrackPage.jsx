import {Link} from 'react-router-dom';

import Button from "@mui/joy/Button";
import {Box} from "@mui/joy";
import Typography from "@mui/joy/Typography";

import {centerStyles} from "@/styles/common/centerStyles.js";
import {borderRadiusStyle} from "@/styles/common/borderRadiusStyle.js";

import {useAuthStore} from "@/stores/useAuthStore.js";

export default function DetailsTrackPage() {
    const {clearAuthData} = useAuthStore();

    return (
        <main className="main-container">
            <Box sx={{...centerStyles, gap: 3, width: '734px'}}>
                <Typography level="h1" sx={{wordBreak: 'break-word'}}>Unknown track</Typography>
                <Button
                    component={Link}
                    to="/"
                    onClick={() => clearAuthData()}
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