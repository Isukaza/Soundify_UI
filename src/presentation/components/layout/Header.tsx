import AbstractAuthManager from "@/domain/managers/Base/AbstractAuthManager";
import {borderRadiusStyle} from "@/presentation/styles/common/borderRadiusStyle";
import {Box, Input} from '@mui/joy';
import {Search} from '@mui/icons-material';
import Button from "@mui/joy/Button";
import {useEffect, useState} from 'react';

import {useDebouncedValue} from '@/domain/hooks/useDebouncedValue';
import AbstractTrackManager from '@/domain/managers/Base/AbstractTrackManager';
import useInjectMap from '@/domain/hooks/useInjectMap';
import {TrackFilterRequest} from '@/domain/models/requests/TrackFilterRequest';
import HomeIcon from '@mui/icons-material/Home';
import {Link} from "react-router-dom";

export function Header() {
    const [searchText, setSearchText] = useState<string>('');
    const debouncedSearchText = useDebouncedValue<string>(searchText, 500);

    const {instances, loading} = useInjectMap({
        authManager: AbstractAuthManager,
        trackManager: AbstractTrackManager
    });

    useEffect(() => {
        const performSearch = async () => {
            if (loading || !instances.trackManager)
                return;

            if (debouncedSearchText.length >= 3) {
                const filter: TrackFilterRequest = {
                    page: 1,
                    size: 20,
                    trackName: debouncedSearchText
                };

                try {
                    console.info(JSON.stringify(await instances.trackManager.LoadTracksByFilterAsync(filter)));
                } catch (error) {
                    console.error('Header: Failed to perform search', error);
                }
            }
        };

        performSearch();
    }, [debouncedSearchText, loading]);

    const handleLogout = () => {
        if (!instances.authManager)
            return;

        instances.authManager.clearAuthData();
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