import {Link} from 'react-router-dom';

import Button from "@mui/joy/Button";
import {Box} from "@mui/joy";
import Typography from "@mui/joy/Typography";

import {centerStyles} from "@/styles/common/centerStyles.js";
import {borderRadiusStyle} from "@/styles/common/borderRadiusStyle.js";

import Logo from "@/components/common/Logo.jsx";

import {useAuthStore} from "@/stores/useAuthStore.js";

export default function HomePage() {
    const {clearAuthData} = useAuthStore();

    return (
        <main className="main-container">
            <Box sx={{...centerStyles, gap: 3, width: '734px'}}>
                <Logo/>

                <Typography level="h1" sx={{fontWeight: 'bold'}}>Thank you for visiting!</Typography>
                <Typography level="h1" sx={{fontWeight: 'bold'}}>{"We're in the early stages of developing something exciting, and we're glad you're here."}</Typography>
                <Typography level="h1" sx={{fontWeight: 'bold'}}>{"Our app is still under construction, but we're working hard to bring you a great experience."}</Typography>

                <Button
                    component={Link}
                    to="/Login"
                    onClick={() => clearAuthData()}
                    variant="solid"
                    color="primary"
                    size='lg'
                    sx={{
                        width: '25%',
                        ...borderRadiusStyle,
                        [`&:hover`]: {transform: 'scale(1.1)'}
                    }}
                >
                    Log Out
                </Button>
            </Box>
        </main>
    );
};