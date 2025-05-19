import {Link} from 'react-router-dom';

import Button from "@mui/joy/Button";
import {Box} from "@mui/joy";
import Typography from "@mui/joy/Typography";

import Logo from "@/presentation/components/common/Logo";
import {centerStyles} from "@/presentation/styles/common/centerStyles";
import {borderRadiusStyle} from "@/presentation/styles/common/borderRadiusStyle";

export default function NotFoundPage() {
    return (
        <main className="main-container">
            <Box sx={{...centerStyles, gap: 3}}>
                <Logo/>

                <Typography level="h1" sx={{fontWeight: 'bold'}}>Page not found</Typography>

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
                    Home page
                </Button>
            </Box>
        </main>
    );
};