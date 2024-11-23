import { Link } from "react-router-dom";

import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

import GoogleIcon from '@/assets/GoogleIcon.jsx';

import { borderRadiusStyle } from "@/styles/common/borderRadiusStyle.js";

export default function GoogleLoginButton() {
    return (
        <Button
            component={Link}
            to="/InDevelop"
            size='lg'
            variant="outlined"
            sx={borderRadiusStyle}>
            <Typography level="title-sm" sx={{fontWeight: 'bold'}} startDecorator={<GoogleIcon/>}>
                Continue with Google
            </Typography>
        </Button>
    );
};