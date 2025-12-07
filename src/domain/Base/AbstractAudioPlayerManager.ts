import Track from "@/domain/DTO/Track";

export default abstract class AbstractAudioPlayerManager {
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