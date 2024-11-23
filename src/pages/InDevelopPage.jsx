import { Link } from 'react-router-dom';

import Button from "@mui/joy/Button";
import { Box } from "@mui/joy";
import Typography from "@mui/joy/Typography";

import Logo from "@/components/common/Logo.jsx";

import { centerStyles } from "@/styles/common/centerStyles.js";
import { borderRadiusStyle } from "@/styles/common/borderRadiusStyle.js";

export default function InDevelopPage() {
    return (
        <main className="main-container">
            <Box sx={{...centerStyles, gap: 3}}>
                <Logo/>

                <Typography level="h1" sx={{textAlign: 'center',fontWeight: 'bold'}}>
                    Thank you for your interest!
                </Typography>
                <Typography level="h1" sx={{textAlign: 'center',fontWeight: 'bold'}}>
                    This page is currently under development.
                </Typography>
                <Typography level="h1" sx={{textAlign: 'center',fontWeight: 'bold'}}>
                    {"We're working hard to provide you with valuable and relevant information."}
                </Typography>

                <Button
                    component={Link}
                    to="/"
                    variant="solid"
                    color="primary"
                    size='lg'
                    sx={{
                        width: '25%',
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