import InjectableBase from "@/app/di/Base/InjectableBase";

import {Track} from "@/domain/models/Track";
import TrackFilterRequest from "@/domain/models/requests/TrackFilterRequest";

export default abstract class AbstractTrackManager extends InjectableBase {
    abstract LoadInitialTracksAsync(): Promise<any>;

    abstract LoadNextPageAsync(size?: number): Promise<Track[] | null>;

    abstract LoadTracksByFilterAsync(filter: TrackFilterRequest): Promise<Track[] | null>;
}