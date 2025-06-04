import {Stack, Button, CircularProgress} from '@mui/joy';
import TrackTable from '@/presentation/components/tables/trackTable';
import useInjectMap from '@/domain/hooks/useInjectMap';
import AbstractTrackManager from '@/domain/managers/Base/AbstractTrackManager';
import {Sentinel} from '@/presentation/components/common/Sentinel';
import {useInfiniteScrollObserver} from '@/domain/hooks/useInfiniteScrollObserver';

export default function HomePage() {
    const {instances} = useInjectMap({
        trackManager: AbstractTrackManager
    });

    const {sentinelRef, isLoadingNextPage} = useInfiniteScrollObserver({
        loadMore: async () => {
            await instances.trackManager?.LoadNextPageAsync();
        }
    });

    return (
        <Stack
            sx={{
                width: '100%',
                maxWidth: '50%',
                margin: '0 auto',
            }}
        >
            <Stack direction="row" spacing={1} sx={{mb: 2}}>
                <Button>Track</Button>
                <Button>Album</Button>
                <Button>Artist</Button>
            </Stack>

            <TrackTable/>

            <Sentinel ref={sentinelRef} />

            {isLoadingNextPage && (
                <div style={{display: 'flex', justifyContent: 'center', padding: '10px'}}>
                    <CircularProgress size="sm" />
                </div>
            )}
        </Stack>
    );
}