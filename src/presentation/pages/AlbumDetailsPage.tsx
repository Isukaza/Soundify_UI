import {useEffect} from "react";
import {useParams} from "react-router-dom";

import {Stack, CircularProgress, Box, Typography} from "@mui/joy";
import {InsertPhoto} from "@mui/icons-material";

import useInject from "@/presentation/hooks/useInject";
import {TYPES} from "@/app/di/types";

import AbstractAlbumManager from "@/domain/Base/AbstractAlbumManager";
import AbstractTrackManager from "@/domain/Base/AbstractTrackManager";

import {useStore} from "@/stores";

import {useInfiniteScrollObserver} from "@/presentation/hooks/useInfiniteScrollObserver";
import FilterRequest from "@/domain/DTO/requests/FilterRequest";

import SectionNavigation from "../components/common/SectionNavigation";
import TrackTable from "@/presentation/components/tables/trackTable";
import Sentinel from "@/presentation/components/common/Sentinel";

export default function AlbumDetailsPage() {
    const albumManager = useInject<AbstractAlbumManager>(TYPES.AlbumManager);
    const trackManager = useInject<AbstractTrackManager>(TYPES.TrackManager);

    const {albumId} = useParams();

    const currentAlbum = useStore((state) => state.album.currentAlbum);
    const searchQuery = useStore((state) => state.app.searchQuery);

    const {sentinelRef, isLoadingNextPage} = useInfiniteScrollObserver({
        loadMore: async () => {
            if (!currentAlbum?.Id) return;
            await trackManager.LoadNextPageAsync(currentAlbum.Id);
        },
    });

    useEffect(() => {
        if (!albumId) return;

        const performSearch = async () => {
            try {
                const album = await albumManager.LoadInitialAlbumByIdAsync(albumId);

                const trimmed = searchQuery.trim();

                if (trimmed === "") {
                    await trackManager.LoadInitialTracksAsync(album.Id);
                } else if (trimmed.length >= 3) {
                    const filter: FilterRequest = {
                        page: 1,
                        size: 20,
                        trackName: trimmed,
                        albumId: album.Id,
                    };

                    await trackManager.LoadTracksByFilterAsync(filter);
                }
            } catch (error) {
                console.error("AlbumDetailsPage: Failed to load album or tracks", error);
            }
        };

        performSearch();
    }, [albumId, searchQuery, albumManager, trackManager]);

    return (
        <Stack
            sx={{
                width: "100%",
                maxWidth: "50%",
                margin: "0 auto",
            }}
        >
            <SectionNavigation/>

            {/* Album header */}
            <Box sx={{display: "flex", flexDirection: "row", mb: 2}}>
                <Box sx={{px: 4}}>
                    <InsertPhoto sx={{fontSize: "16rem"}}/>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        paddingBottom: 4,
                    }}
                >
                    <Typography level="title-sm">Album</Typography>
                    <Typography level="h1">{currentAlbum?.Title}</Typography>
                    <Typography level="title-lg">{currentAlbum?.ArtistName}</Typography>
                </Box>
            </Box>

            {/* Tracks */}
            <TrackTable variant="album"/>

            {/* Infinite scroll sentinel */}
            <Sentinel ref={sentinelRef}/>

            {isLoadingNextPage && (
                <Box sx={{display: "flex", justifyContent: "center", py: 2}}>
                    <CircularProgress size="sm"/>
                </Box>
            )}
        </Stack>
    );
}