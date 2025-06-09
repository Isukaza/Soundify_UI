import SectionNavigation from "@/presentation/components/common/SectionNavigation";
import {useEffect} from 'react';
import {Stack, Button, CircularProgress} from '@mui/joy';

import AbstractTrackManager from '@/domain/managers/Base/AbstractTrackManager';
import useInjectMap from '@/domain/hooks/useInjectMap';
import {useInfiniteScrollObserver} from '@/domain/hooks/useInfiniteScrollObserver';
import FilterRequest from '@/domain/models/requests/FilterRequest';

import {useStore} from '@/stores';

import Sentinel from '@/presentation/components/common/Sentinel';
import TrackTable from '@/presentation/components/tables/trackTable';
import {useNavigate} from "react-router-dom";

export default function HomePage() {
    const {instances} = useInjectMap({
        trackManager: AbstractTrackManager
    });

    const {sentinelRef, isLoadingNextPage} = useInfiniteScrollObserver({
        loadMore: async () => {
            await instances.trackManager?.LoadNextPageAsync();
        }
    });

    const navigate = useNavigate();
    const searchQuery = useStore(state => state.app.searchQuery);

    useEffect(() => {
        const performSearch = async () => {
            if (!instances.trackManager)
                return;

            try {
                if (searchQuery.trim() === '') {
                    await instances.trackManager.LoadInitialTracksAsync();
                } else if (searchQuery.length >= 3) {
                    const filter: FilterRequest = {
                        page: 1,
                        size: 20,
                        trackName: searchQuery
                    };

                    await instances.trackManager.LoadTracksByFilterAsync(filter);
                }
            } catch (error) {
                console.error('HomePage: Failed to load tracks', error);
            }
        };

        performSearch();
    }, [searchQuery, instances.trackManager]);

    return (
        <Stack
            sx={{
                width: '100%',
                maxWidth: '50%',
                margin: '0 auto',
            }}
        >
            <SectionNavigation/>

            <TrackTable/>

            <Sentinel ref={sentinelRef}/>

            {isLoadingNextPage && (
                <div style={{display: 'flex', justifyContent: 'center', padding: '10px'}}>
                    <CircularProgress size="sm"/>
                </div>
            )}
        </Stack>
    );
}