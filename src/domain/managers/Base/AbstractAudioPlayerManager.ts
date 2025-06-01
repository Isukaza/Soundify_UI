import InjectableBase from "@/app/di/Base/InjectableBase";

export default abstract class AbstractAudioPlayerManager extends InjectableBase {
    abstract play(): Promise<void>;

    abstract pause(): Promise<void>;

    abstract setTime(time: number): Promise<void>;

    abstract setVolume(volume: number): Promise<void>;

    abstract togglePlay(): Promise<void>;

    abstract toggleMute(): Promise<void>;

    abstract loadTrack(musicName: string): Promise<void>;
}