import InjectableBase from "@/app/di/Base/InjectableBase";
import TrackFilterRequest from "@/domain/models/requests/TrackFilterRequest";
import {Track} from "@/domain/models/Track";

export default abstract class AbstractTrackManager extends InjectableBase {
    abstract LoadInitialTracksAsync(): Promise<any>;

    abstract LoadNextPageAsync(page: number, size?: number): Promise<Track[] | null>;

    abstract LoadTracksByFilterAsync(filter: TrackFilterRequest): Promise<Track[] | null>;
}