import {injectable} from "inversify";

import AbstractTrackManager from "@/domain/Base/AbstractTrackManager";
import TrackApi from "@/infrastructure/api/TrackAPI";
import Track from "@/domain/DTO/Track";
import FilterRequest from "@/domain/DTO/requests/FilterRequest";

import {useStore} from "@/stores";

@injectable()
export default class TrackManager extends AbstractTrackManager {

    override async LoadInitialTracksAsync(albumId?: string): Promise<Track[] | null> {
        const filter: FilterRequest = {page: 1, size: 20, albumId};
        const {tracks, nextPage} = await TrackApi.GetTracksByFilterAsync(filter);

        useStore.getState().track.setTracks(tracks);
        useStore.getState().app.setNextPage(nextPage ?? 0);

        return tracks;
    }

    override async LoadNextPageAsync(albumId?: string, size = 20): Promise<Track[] | null> {
        const nextPage = useStore.getState().app.nextPage;
        if (!nextPage) return null;

        const filter: FilterRequest = {page: nextPage, size, albumId};
        const {tracks, nextPage: newNext} = await TrackApi.GetTracksByFilterAsync(filter);

        useStore.getState().track.addTracks(tracks);
        useStore.getState().app.setNextPage(newNext ?? 0);

        return tracks;
    }

    override async LoadTracksByFilterAsync(filter: FilterRequest): Promise<Track[] | null> {
        const {tracks, nextPage} = await TrackApi.GetTracksByFilterAsync(filter);

        useStore.getState().track.setTracks(tracks);
        useStore.getState().app.setNextPage(nextPage ?? 0);

        return tracks;
    }
}