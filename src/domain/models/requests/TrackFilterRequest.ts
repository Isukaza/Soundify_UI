export interface TrackFilterRequest {
    trackId?: string;
    trackName?: string;
    albumId?: string;
    albumName?: string;
    artistId?: string;
    artistName?: string;
    page: number;
    size: number;
}