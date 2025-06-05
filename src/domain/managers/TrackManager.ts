import AbstractTrackManager from "@/domain/managers/Base/AbstractTrackManager";

import {Track} from "@/domain/models/Track";
import TrackFilterRequest from '@/domain/models/requests/TrackFilterRequest';

import TrackApi from "@/infrastructure/api/TrackAPI";

import {useStore} from '@/stores';

export default class TrackManager extends AbstractTrackManager {
    async LoadInitialTracksAsync(): Promise<Track[] | null> {
        try {
            const filter: TrackFilterRequest = {page: 1, size: 20};
            const {tracks, nextPage} = await TrackApi.GetTracksByFilterAsync(filter);

            useStore.getState().library.setTracks(tracks);
            useStore.getState().library.setNextPage(nextPage ?? 0);

            return tracks;
        } catch (error) {
            console.error('TrackManager: Failed to load initial tracks', error);
            throw error;
        }
    }

    async LoadNextPageAsync(size = 20): Promise<Track[] | null> {
        const nextPage = useStore.getState().library.nextPage;

        if (nextPage === null || nextPage === 0) {
            console.warn('TrackManager: No next page to load');
            return null;
        }

        try {
            const filter: TrackFilterRequest = {page: nextPage, size};
            const {tracks, nextPage: newNextPage} = await TrackApi.GetTracksByFilterAsync(filter);

            useStore.getState().library.addTracks(tracks);
            useStore.getState().library.setNextPage(newNextPage ?? 0);

            return tracks;
        } catch (error) {
            console.error('TrackManager: Failed to load next page', error);
            throw error;
        }
    }

    async LoadTracksByFilterAsync(filter: TrackFilterRequest): Promise<Track[] | null> {
        try {
            const {tracks, nextPage} = await TrackApi.GetTracksByFilterAsync(filter);

            useStore.getState().library.setTracks(tracks);
            useStore.getState().library.setNextPage(nextPage ?? 0);

            return tracks;
        } catch (error) {
            console.error('TrackManager: Failed to load tracks by filter', error);
            throw error;
        }
    }
}