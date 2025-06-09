import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Stack, CircularProgress, Box, Typography, Button} from '@mui/joy';
import {InsertPhoto} from '@mui/icons-material';

import AbstractAlbumManager from '@/domain/managers/Base/AbstractAlbumManager';
import AbstractTrackManager from '@/domain/managers/Base/AbstractTrackManager';
import useInjectMap from '@/domain/hooks/useInjectMap';
import {useInfiniteScrollObserver} from '@/domain/hooks/useInfiniteScrollObserver';
import FilterRequest from '@/domain/models/requests/FilterRequest';

import {useStore} from '@/stores';

import Sentinel from '@/presentation/components/common/Sentinel';
import TrackTable from '@/presentation/components/tables/trackTable';
import SectionNavigation from '../components/common/SectionNavigation';

export default function AlbumDetailsPage() {
    const {instances} = useInjectMap({
        trackManager: AbstractTrackManager,
        albumManager: AbstractAlbumManager,
    });

    const {albumId} = useParams();

    const currentAlbum = useStore(state => state.album.currentAlbum);
    const searchQuery = useStore(state => state.app.searchQuery);

    const {sentinelRef, isLoadingNextPage} = useInfiniteScrollObserver({
        loadMore: async () => {
            if (!instances.trackManager || !currentAlbum?.Id) return;

            await instances.trackManager.LoadNextPageAsync(currentAlbum.Id);
        }
    });

    useEffect(() => {
        const performSearch = async () => {
            if (!instances.albumManager || !instances.trackManager || !albumId) return;

            try {
                const album = await instances.albumManager.LoadInitialAlbumByIdAsync(albumId);
                if (searchQuery.trim() === '') {
                    await instances.trackManager.LoadInitialTracksAsync(album.Id);
                } else if (searchQuery.length >= 3) {
                    const filter: FilterRequest = {
                        page: 1,
                        size: 20,
                        trackName: searchQuery,
                        albumId: album.Id
                    };

                    await instances.trackManager.LoadTracksByFilterAsync(filter);
                }
            } catch (error) {
                console.error('AlbumDetailsPage: Failed to load album or tracks', error);
            }
        };

        performSearch();
    }, [albumId, instances.albumManager, instances.trackManager, searchQuery]);

    return (
        <Stack
            sx={{
                width: '100%',
                maxWidth: '50%',
                margin: '0 auto',
            }}
        >
            <SectionNavigation/>

            <Box sx={{display: 'flex', flexDirection: 'row', mb: 2}}>
                <Box sx={{px: 4}}>
                    <InsertPhoto sx={{fontSize: '16rem'}}/>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        paddingBottom: 4
                    }}
                >
                    <Typography level="title-sm">Album</Typography>
                    <Typography level="h1">{currentAlbum?.Title}</Typography>
                    <Typography level="title-lg">{currentAlbum?.ArtistName}</Typography>
                </Box>
            </Box>

            <TrackTable variant="album"/>

            <Sentinel ref={sentinelRef}/>

            {isLoadingNextPage && (
                <div style={{display: 'flex', justifyContent: 'center', padding: '10px'}}>
                    <CircularProgress size="sm"/>
                </div>
            )}
        </Stack>
    );
}