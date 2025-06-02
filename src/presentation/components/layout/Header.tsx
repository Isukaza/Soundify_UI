import {Box, Input} from '@mui/joy';
import {Search} from '@mui/icons-material';
import {useEffect, useState} from 'react';

import Logo from '@/presentation/components/common/Logo';
import {useDebouncedValue} from '@/domain/hooks/useDebouncedValue';
import AbstractTrackManager from '@/domain/managers/Base/AbstractTrackManager';
import useInjectMap from '@/domain/hooks/useInjectMap';
import {TrackFilterRequest} from '@/domain/models/requests/TrackFilterRequest';

export default function Header() {
    const [searchText, setSearchText] = useState<string>('');
    const debouncedSearchText = useDebouncedValue<string>(searchText, 500);

    const {instances, loading} = useInjectMap({
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

    return (
        <Box
            sx={{
                padding: '10px 20px',
                backgroundColor: 'black',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0px 1px 3px 0px rgba(255, 255, 255, 0.1)'
            }}
        >
            <Logo/>

            <Input
                placeholder="What do you want to play?"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    borderRadius: '20px',
                    paddingX: '10px',
                    flexGrow: 1,
                    maxWidth: '500px',
                    marginLeft: '20px'
                }}
                startDecorator={<Search fontSize="large"/>}
            />

            <Logo/>
        </Box>
    );
}