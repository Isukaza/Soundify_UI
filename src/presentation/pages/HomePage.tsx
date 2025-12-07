import SectionNavigation from "@/presentation/components/common/SectionNavigation";
import {useEffect} from "react";
import {Stack, CircularProgress} from "@mui/joy";

import AbstractTrackManager from "@/domain/Base/AbstractTrackManager";
import FilterRequest from "@/domain/DTO/requests/FilterRequest";

import {useStore} from "@/stores";
import Sentinel from "@/presentation/components/common/Sentinel";
import TrackTable from "@/presentation/components/tables/trackTable";

import {useInfiniteScrollObserver} from "@/presentation/hooks/useInfiniteScrollObserver";

import useInject from "@/presentation/hooks/useInject";
import {TYPES} from "@/app/di/types";

export default function HomePage() {
    const trackManager = useInject<AbstractTrackManager>(TYPES.TrackManager);
    const {sentinelRef, isLoadingNextPage} = useInfiniteScrollObserver({
        loadMore: async () => {
            await trackManager.LoadNextPageAsync();
        },
    });

    const searchQuery = useStore((state) => state.app.searchQuery);

    useEffect(() => {
        const performSearch = async () => {
            const trimmed = searchQuery.trim();

            try {
                if (trimmed === "") {
                    await trackManager.LoadInitialTracksAsync();
                } else if (trimmed.length >= 3) {
                    const filter: FilterRequest = {
                        page: 1,
                        size: 20,
                        trackName: trimmed,
                    };

                    await trackManager.LoadTracksByFilterAsync(filter);
                }
            } catch (error) {
                console.error("HomePage: Failed to load tracks", error);
            }
        };

        performSearch();
    }, [searchQuery, trackManager]);

    return (
        <Stack
            sx={{
                width: "100%",
                maxWidth: "50%",
                margin: "0 auto",
            }}
        >
            <SectionNavigation/>

            <TrackTable/>

            <Sentinel ref={sentinelRef}/>

            {isLoadingNextPage && (
                <div style={{display: "flex", justifyContent: "center", padding: "10px"}}>
                    <CircularProgress size="sm"/>
                </div>
            )}
        </Stack>
    );
}