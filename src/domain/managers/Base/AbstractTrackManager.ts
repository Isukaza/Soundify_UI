import InjectableBase from "@/app/di/Base/InjectableBase";

import Track from "@/domain/models/Track";
import FilterRequest from "@/domain/models/requests/FilterRequest";

export default abstract class AbstractTrackManager extends InjectableBase {
    abstract LoadInitialTracksAsync(albumId?: string): Promise<any>;

    abstract LoadNextPageAsync(albumId?: string, size?: number): Promise<Track[] | null>;

    abstract LoadTracksByFilterAsync(filter: FilterRequest): Promise<Track[] | null>;
}