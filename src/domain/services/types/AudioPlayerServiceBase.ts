import BackTaskBase from "@/domain/services/types/BackTaskBase";

export default abstract class AudioPlayerServiceBase extends BackTaskBase {
    abstract loadTrack(musicName: string): Promise<void>;
    abstract play(): Promise<void>;
    abstract pause(): void;
    abstract setTime(time: number): void;
    abstract setVolume(volume: number): void;
}