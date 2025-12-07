import Track from "@/domain/DTO/Track";
import FilterRequest from '@/domain/DTO/requests/FilterRequest';

import {trackAPI} from './configs.js';

export default class TrackApi {
    static async GetTracksByFilterAsync(filter: FilterRequest):
        Promise<{
            tracks: Track[],
            nextPage: number | null
        }> {
        const response = await trackAPI.post('/get-tracks-by-filter', filter);

        const rawTracks = Array.isArray(response.data)
            ? response.data
            : response.data.items;

        const tracks = rawTracks.map((item: any) => ({
            TrackId: item.trackId,
            Name: item.trackName,
            ArtistId: item.artistId,
            ArtistName: item.artistName,
            AlbumId: item.albumId,
            AlbumName: item.albumName,
            duration: item.duration
        }));

        const nextPageHeader = response.headers['x-next-page'];
        const nextPage = nextPageHeader !== undefined ? parseInt(nextPageHeader, 10) : null;

        return {
            tracks,
            nextPage
        };
    }
}