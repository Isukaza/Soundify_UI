import {useEffect} from "react";
import {useParams} from "react-router-dom";
import TrackTable from "@/presentation/components/tables/trackTable";
import {Sentinel} from "@/presentation/components/common/Sentinel";
import Box from "@mui/joy/Box";
import {CircularProgress} from "@mui/joy";
import Typography from "@mui/joy/Typography";

import useInjectMap from "@/domain/hooks/useInjectMap";
import AbstractTrackManager from "@/domain/managers/Base/AbstractTrackManager";
import AbstractAlbumManager from "@/domain/managers/Base/AbstractAlbumManager";
import {useInfiniteScrollObserver} from "@/domain/hooks/useInfiniteScrollObserver";
import {useStore} from "@/stores";

import {InsertPhoto} from "@mui/icons-material";

export default function AlbumPage() {
    const {instances, loading} = useInjectMap({
        trackManager: AbstractTrackManager,
        albumManager: AbstractAlbumManager,
    });
    const {albumId} = useParams();

    const currentAlbum = useStore(state => state.library.currentAlbum);

    useEffect(() => {
        (async () => {
            if (!instances.albumManager || !albumId || !instances.trackManager)
                return;

            const album = await instances.albumManager.LoadInitialAlbumByIdAsync(albumId);
            instances.albumManager.SetCurrentAlbum(album);

            await instances.trackManager.LoadInitialTracksAsync(album.Id);
        })();
    }, [loading]);

    const {sentinelRef, isLoadingNextPage} = useInfiniteScrollObserver({
        loadMore: async () => {
            await instances.trackManager?.LoadNextPageAsync(albumId);
        }
    });

    return (
        <Box sx={{px: 8}}>
            <Box sx={{display: 'flex', flexDirection: 'row', py: 3}}>
                <Box sx={{px: 4}}>
                    <InsertPhoto sx={{fontSize: "16rem"}}/>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 4}}>
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
        </Box>
    );
}