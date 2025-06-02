import {Track} from "@/domain/models/Track";
import TrackApi from "@/infrastructure/api/TrackAPI";
import {useStore} from '@/stores';
import {TrackFilterRequest} from '@/domain/models/requests/TrackFilterRequest';
import AbstractTrackManager from "@/domain/managers/Base/AbstractTrackManager";

export default class TrackManager extends AbstractTrackManager {
    async LoadInitialTracksAsync(): Promise<Track[] | null> {
        try {
            const filter: TrackFilterRequest = {page: 1, size: 20};
            return await this.LoadTracksByFilterAsync(filter);
        } catch (error) {
            console.error('TrackManager: Failed to load initial tracks', error);
            throw error;
        }
    }

    async LoadNextPageAsync(page: number, size: number): Promise<Track[] | null> {
        try {
            const filter: TrackFilterRequest = {
                page,
                size
            };

            const tracks = await TrackApi.GetTracksByFilterAsync(filter);
            useStore.getState().library.addTracks(tracks);

            return tracks;
        } catch (error) {
            console.error('TrackManager: Failed to load next page', error);
            throw error;
        }
    }

    async LoadTracksByFilterAsync(filter: TrackFilterRequest): Promise<Track[] | null> {
        try {
            const tracks = await TrackApi.GetTracksByFilterAsync(filter);
            useStore.getState().library.setTracks(tracks);

            return tracks;
        } catch (error) {
            console.error('TrackManager: Failed to load tracks by filter', error);
            throw error;
        }
    }
}