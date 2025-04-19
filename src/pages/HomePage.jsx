import { useEffect } from "react";
import { Link } from "react-router-dom";

import Button from "@mui/joy/Button";
import { Box } from "@mui/joy";
import Typography from "@mui/joy/Typography";

import Logo from "@/components/common/Logo.jsx";
import Player from "@/components/player/Player.jsx";
import AudioPlayerService from "@/services/AudioPlayerService";
import { borderRadiusStyle } from "@/styles/common/borderRadiusStyle.js";
import { centerStyles } from "@/styles/common/centerStyles.js";
import { useAuthStore } from "@/stores/useAuthStore.js";

export default function HomePage() {
    const {clearAuthData} = useAuthStore();
    const musicName = "tmpdob60llg";

    useEffect(() => {
        AudioPlayerService.loadSource(musicName);
    }, []);

    return (
        <main className="main-container">
            <Box sx={{...centerStyles, gap: 3, width: '734px'}}>
                <Logo/>

                <Typography level="h1" sx={{textAlign: 'center', fontWeight: 'bold'}}>
                    Thank you for visiting!</Typography>
                <Typography level="h1" sx={{textAlign: 'center', fontWeight: 'bold'}}>
                    {"We're in the early stages of developing something exciting, and we're glad you're here."}
                </Typography>
                <Typography level="h1" sx={{textAlign: 'center', fontWeight: 'bold'}}>
                    {"Our app is still under construction, but we're working hard to bring you a great experience."}
                </Typography>

                <Button
                    component={Link}
                    to="/Login"
                    onClick={() => clearAuthData()}
                    variant="solid"
                    color="primary"
                    size='lg'
                    sx={{
                        width: {xs: 'auto', sm: '25%'},
                        ...borderRadiusStyle,
                        [`&:hover`]: {transform: 'scale(1.1)'}
                    }}
                >
                    Log Out
                </Button>
                <Player/>
            </Box>
        </main>
    );
};