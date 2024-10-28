import {Link} from 'react-router-dom';
import {jwtDecode} from "jwt-decode";

import Button from "@mui/joy/Button";
import {Box} from "@mui/joy";
import Typography from "@mui/joy/Typography";

import {centerStyles} from "@/styles/common/centerStyles.js";
import {borderRadiusStyle} from "@/styles/common/borderRadiusStyle.js";

import Logo from "@/components/common/Logo.jsx";

import {useAuthStore} from "@/stores/useAuthStore.js";

export default function HomePage() {
    const {jwt, refresh, clearAuthData} = useAuthStore();

    let decodedJwt
    try {
        decodedJwt = JSON.stringify(jwtDecode(jwt));
    } catch {
        decodedJwt = "no data";
    }

    return (
        <main className="main-container">
            <Box sx={{...centerStyles, gap: 3, width: '734px'}}>
                <Logo/>

                <Typography level="body-md" sx={{wordBreak: 'break-word',}}>{decodedJwt}</Typography>
                <Typography level="body-md" sx={{wordBreak: 'break-word',}}>{refresh}</Typography>

                <Button
                    component={Link}
                    to="/DetailsTrack"
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