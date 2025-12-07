import Track from "@/domain/DTO/Track";
import FilterRequest from "@/domain/DTO/requests/FilterRequest";

export default abstract class AbstractTrackManager {
    abstract LoadInitialTracksAsync(albumId?: string): Promise<any>;
    abstract LoadNextPageAsync(albumId?: string, size?: number): Promise<Track[] | null>;
    abstract LoadTracksByFilterAsync(filter: FilterRequest): Promise<Track[] | null>;
}