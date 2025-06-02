import {Track} from "@/domain/models/Track";
import {trackAPI} from './configs.js';
import {TrackFilter} from '@/domain/models/requests/TrackFilterRequest';

export default class TrackApi {
    static async GetTracksByFilterAsync(filter: TrackFilter): Promise<Track[]> {
        const response = await trackAPI.post('/get-tracks-by-filter', filter);

        const rawTracks = Array.isArray(response.data)
            ? response.data
            : response.data.items;

        return rawTracks.map((item: any) => ({
            TrackId: item.trackId,
            Name: item.trackName,
            ArtistId: item.artistId,
            ArtistName: item.artistName,
            AlbumId: item.albumId,
            AlbumName: item.albumName,
            duration: item.duration
        }));
    }
}