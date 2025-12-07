import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import {Box, Input} from "@mui/joy";
import Button from "@mui/joy/Button";
import {Search} from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";

import {useDebouncedValue} from "@/domain/hooks/useDebouncedValue";
import useInject from "@/domain/hooks/useInject";

import {TYPES} from "@/app/di/types";

import AbstractAppManager from "@/domain/managers/Base/AbstractAppManager";
import AbstractAuthManager from "@/domain/managers/Base/AbstractAuthManager";
import AbstractAudioPlayerManager from "@/domain/managers/Base/AbstractAudioPlayerManager";

import {borderRadiusStyle} from "@/presentation/styles/common/borderRadiusStyle";

export function Header() {
    const [searchText, setSearchText] = useState("");
    const debouncedSearchText = useDebouncedValue(searchText, 500);

    // NEW DI — synchronous, always available
    const appManager = useInject<AbstractAppManager>(TYPES.AppManager);
    const authManager = useInject<AbstractAuthManager>(TYPES.AuthManager);
    const audioPlayerManager = useInject<AbstractAudioPlayerManager>(TYPES.AudioPlayerManager);

    // Update search query
    useEffect(() => {
        appManager.updateSearchQuery(debouncedSearchText);
    }, [debouncedSearchText, appManager]);

    // Logout logic
    const handleLogout = () => {
        audioPlayerManager.resetPlayerState();
        audioPlayerManager.resetLibraryState();
        authManager.clearAuthData();
    };

    return (
        <Box
            sx={{
                position: "relative",
                padding: "10px 20px",
                backgroundColor: "black",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0px 1px 3px rgba(255, 255, 255, 0.1)",
                height: "64px",
            }}
        >
            <Box sx={{flexShrink: 0}}>
                {// @ts-ignore
                    <HomeIcon fontSize="xl4"/>
                }
            </Box>

            <Input
                placeholder="What do you want to play?"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                sx={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "white",
                    borderRadius: "20px",
                    paddingX: "10px",
                    width: "100%",
                    maxWidth: "500px",
                }}
                startDecorator={<Search fontSize="large"/>}
            />

            <Button
                component={Link}
                to="/Login"
                onClick={handleLogout}
                variant="solid"
                color="primary"
                size="md"
                sx={{
                    flexShrink: 0,
                    width: {xs: "auto", sm: "90px"},
                    ...borderRadiusStyle,
                    "&:hover": {transform: "scale(1.1)"},
                }}
            >
                Log Out
            </Button>
        </Box>
    );
}