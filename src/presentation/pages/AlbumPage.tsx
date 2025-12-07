import React, {useEffect} from "react";
import {Box, CircularProgress, Stack} from "@mui/joy";

import {useStore} from "@/stores";
import {useInfiniteScrollObserver} from "@/domain/hooks/useInfiniteScrollObserver";

import AbstractAlbumManager from "@/domain/managers/Base/AbstractAlbumManager";
import FilterRequest from "@/domain/models/requests/FilterRequest";

import SectionNavigation from "@/presentation/components/common/SectionNavigation";
import AlbumCard from "../components/cards/AlbumCard.jsx";
import Sentinel from "@/presentation/components/common/Sentinel";

import useInject from "@/domain/hooks/useInject";
import {TYPES} from "@/app/di/types";

export default function AlbumPage() {
    const albumManager = useInject<AbstractAlbumManager>(TYPES.AlbumManager);

    const albums = useStore((state) => state.album.albums);
    const searchQuery = useStore((state) => state.app.searchQuery);

    const {sentinelRef, isLoadingNextPage} = useInfiniteScrollObserver({
        loadMore: async () => {
            await albumManager.LoadNextPageAsync();
        },
    });

    useEffect(() => {
        const performSearch = async () => {
            try {
                const trimmed = searchQuery.trim();

                if (trimmed === "") {
                    await albumManager.LoadInitialAlbumsAsync();
                } else if (trimmed.length >= 3) {
                    const filter: FilterRequest = {
                        page: 1,
                        size: 20,
                        albumName: trimmed,
                    };

                    await albumManager.LoadAlbumsByFilterAsync(filter);
                }
            } catch (error) {
                console.error("AlbumPage: Failed to load albums", error);
            }
        };

        performSearch();
    }, [searchQuery, albumManager]);

    return (
        <Stack>
            <SectionNavigation/>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: 0,
                }}
            >
                {albums.map((album) => (
                    <AlbumCard key={album.Id} album={album}/>
                ))}

                <Sentinel ref={sentinelRef}/>

                {isLoadingNextPage && (
                    <div style={{display: "flex", justifyContent: "center", padding: "10px"}}>
                        <CircularProgress size="sm"/>
                    </div>
                )}
            </Box>
        </Stack>
    );
}