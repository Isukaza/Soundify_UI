import {useInfiniteScrollObserver} from "@/domain/hooks/useInfiniteScrollObserver";
import useInjectMap from "@/domain/hooks/useInjectMap";
import AbstractAlbumManager from "@/domain/managers/Base/AbstractAlbumManager";
import FilterRequest from "@/domain/models/requests/FilterRequest";
import SectionNavigation from "@/presentation/components/common/SectionNavigation";
import Sentinel from "@/presentation/components/common/Sentinel";
import {useStore} from "@/stores";
import React, {useEffect} from 'react';
import {Box, CircularProgress, Stack} from '@mui/joy';
import AlbumCard from "../components/cards/AlbumCard.jsx";

export default function AlbumPage() {
    const {instances} = useInjectMap({
        albumManager: AbstractAlbumManager,
    });


    const albums = useStore(state => state.album.albums);
    const searchQuery = useStore(state => state.app.searchQuery);

    const {sentinelRef, isLoadingNextPage} = useInfiniteScrollObserver({
        loadMore: async () => {
            if (!instances.albumManager) return;

            await instances.albumManager.LoadNextPageAsync();
        }
    });

    useEffect(() => {
        const performSearch = async () => {
            if (!instances.albumManager)
                return;

            try {
                if (searchQuery.trim() === '') {
                    await instances.albumManager.LoadInitialAlbumsAsync();
                } else if (searchQuery.length >= 3) {
                    const filter: FilterRequest = {
                        page: 1,
                        size: 20,
                        albumName: searchQuery
                    };

                    await instances.albumManager.LoadAlbumsByFilterAsync(filter);
                }
            } catch (error) {
                console.error('AlbumDetailsPage: Failed to load album or tracks', error);
            }
        };

        performSearch();
    }, [instances.albumManager, searchQuery]);

    return (
        <Stack>
            <SectionNavigation/>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: 0
                }}
            >
                {albums.map((album) => (
                    <AlbumCard key={album.Id} album={album}/>
                ))}

                <Sentinel ref={sentinelRef}/>

                {isLoadingNextPage && (
                    <div style={{display: 'flex', justifyContent: 'center', padding: '10px'}}>
                        <CircularProgress size="sm"/>
                    </div>
                )}
            </Box>
        </Stack>
    );
};