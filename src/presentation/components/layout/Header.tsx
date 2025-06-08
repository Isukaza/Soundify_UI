import {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

import {Box, Input} from '@mui/joy';
import Button from "@mui/joy/Button";
import {Search} from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';

import AbstractAppManager from "@/domain/managers/Base/AbstractAppManager";
import AbstractAudioPlayerManager from "@/domain/managers/Base/AbstractAudioPlayerManager";
import AbstractAuthManager from "@/domain/managers/Base/AbstractAuthManager";
import {useDebouncedValue} from '@/domain/hooks/useDebouncedValue';
import useInjectMap from '@/domain/hooks/useInjectMap';

import {borderRadiusStyle} from "@/presentation/styles/common/borderRadiusStyle";

export function Header() {
    const [searchText, setSearchText] = useState<string>('');
    const debouncedSearchText = useDebouncedValue<string>(searchText, 500);

    const {instances, loading} = useInjectMap({
        appManager: AbstractAppManager,
        authManager: AbstractAuthManager,
        audioPlayerManager: AbstractAudioPlayerManager
    });

    useEffect(() => {
        if (instances.appManager)
            instances.appManager.updateSearchQuery(debouncedSearchText);
    }, [debouncedSearchText, instances.appManager]);

    const handleLogout = () => {
        if (!instances.authManager && !instances.audioPlayerManager)
            return;

        instances.audioPlayerManager?.resetPlayerState();
        instances.audioPlayerManager?.resetLibraryState();
        instances.authManager?.clearAuthData();
    };

    return (
        <Box
            sx={{
                position: 'relative',
                padding: '10px 20px',
                backgroundColor: 'black',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0px 1px 3px 0px rgba(255, 255, 255, 0.1)',
                height: '64px'
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
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    borderRadius: '20px',
                    paddingX: '10px',
                    width: '100%',
                    maxWidth: '500px',
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
                disabled={loading || !instances.authManager}
                sx={{
                    flexShrink: 0,
                    width: {xs: 'auto', sm: '90px'},
                    ...borderRadiusStyle,
                    '&:hover': {transform: 'scale(1.1)'},
                }}
            >
                Log Out
            </Button>
        </Box>
    );
}