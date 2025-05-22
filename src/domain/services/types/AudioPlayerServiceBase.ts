import HostedService from "@/domain/services/types/HostedService";

export default abstract class AudioPlayerServiceBase extends HostedService {
    abstract loadTrack(musicName: string): Promise<void>;
    abstract play(): Promise<void>;
    abstract pause(): void;
    abstract setTime(time: number): void;
    abstract setVolume(volume: number): void;
}