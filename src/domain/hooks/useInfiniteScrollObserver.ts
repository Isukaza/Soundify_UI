import {useCallback, useEffect, useRef, useState} from 'react';
import {useStore} from '@/stores';

interface UseInfiniteScrollObserverParams {
    loadMore: () => Promise<void>;
}

export function useInfiniteScrollObserver({loadMore}: UseInfiniteScrollObserverParams) {
    const nextPage = useStore(state => state.library.nextPage);
    const canLoadMore = nextPage !== null && nextPage !== 0;

    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const [isLoadingNextPage, setIsLoadingNextPage] = useState(false);

    const handleLoadMore = useCallback(async () => {
        if (!canLoadMore || isLoadingNextPage)
            return;

        setIsLoadingNextPage(true);
        try {
            await loadMore();
        } catch (error) {
            console.error('useInfiniteScrollObserver: Failed to load more', error);
        } finally {
            setIsLoadingNextPage(false);
        }
    }, [loadMore, canLoadMore, isLoadingNextPage]);

    useEffect(() => {
        if (!sentinelRef.current || !canLoadMore)
            return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    handleLoadMore();
                }
            }
        );

        observer.observe(sentinelRef.current);

        return () => {
            observer.disconnect();
        };
    }, [handleLoadMore, canLoadMore]);

    return {sentinelRef, isLoadingNextPage};
}