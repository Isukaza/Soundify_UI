import AbstractHostedService from "@/app/di/Base/AbstractHostedService";

export default abstract class AbstractAudioPlayerService extends AbstractHostedService {
    abstract loadTrack(musicName: string): Promise<void>;

    abstract play(): Promise<void>;

    abstract pause(): void;

    abstract setTime(time: number): void;

    abstract setVolume(volume: number): void;
}