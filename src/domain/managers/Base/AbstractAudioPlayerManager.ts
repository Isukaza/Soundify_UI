import InjectableBase from "@/app/di/Base/InjectableBase";
import {Track} from "@/domain/models/Track";

export default abstract class AbstractAudioPlayerManager extends InjectableBase {
    abstract play(): Promise<void>;

    abstract pause(): Promise<void>;

    abstract setCurrentTrack(track: Track): void;

    abstract setTime(time: number): Promise<void>;

    abstract setVolume(volume: number): Promise<void>;

    abstract togglePlay(): Promise<void>;

    abstract toggleMute(): Promise<void>;

    abstract resetLibraryState(): void;

    abstract resetPlayerState(): void;

    abstract resetLibraryBetweenPage(): void;
}