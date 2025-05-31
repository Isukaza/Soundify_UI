import HlsLoader from "@/infrastructure/utils/HlsLoader";
import {useStore} from "@/stores";

import AbstractAudioPlayerService from "@/domain/services/types/AbstractAudioPlayerService";

class AudioPlayerService extends AbstractAudioPlayerService {
    private audioRef?: HTMLAudioElement;
    private readonly hlsLoader = new HlsLoader();

    public override async start(): Promise<void> {
        if (!this.audioRef) {
            this.audioRef = new Audio();
            this.attachListeners();
        }
    }

    public override async stop(): Promise<void> {
        if (this.audioRef) {
            this.detachListeners();
            this.audioRef.pause();
            this.audioRef.src = '';
            this.audioRef.load();
            this.audioRef = undefined;
        }

        this.hlsLoader.destroy();
    }

    public async loadTrack(musicName: string): Promise<void> {
        if (!this.audioRef)
            throw new Error('AudioPlayerService not started');

        await this.hlsLoader.loadToAudioElement(this.audioRef, musicName);
    }

    public async play(): Promise<void> {
        if (!this.audioRef)
            throw new Error('AudioPlayerService not started');

        await this.audioRef.play();
    }

    public pause(): void {
        this.audioRef?.pause();
    }

    public setTime(time: number): void {
        if (!this.audioRef)
            return;

        this.audioRef.currentTime = time;
    }

    public setVolume(volume: number): void {
        if (!this.audioRef)
            return;

        this.audioRef.volume = volume;
    }

    private attachListeners() {
        if (!this.audioRef)
            return;

        this.audioRef.addEventListener('timeupdate', this.onTimeUpdate);
        this.audioRef.addEventListener('ended', this.onEnded);
        this.audioRef.addEventListener('volumechange', this.onVolumeChange);
        this.audioRef.addEventListener('loadedmetadata', this.onLoadedMetadata);
    }

    private detachListeners() {
        if (!this.audioRef)
            return;

        this.audioRef.removeEventListener('timeupdate', this.onTimeUpdate);
        this.audioRef.removeEventListener('ended', this.onEnded);
        this.audioRef.removeEventListener('volumechange', this.onVolumeChange);
        this.audioRef.removeEventListener('loadedmetadata', this.onLoadedMetadata);
    }

    private onTimeUpdate = () => {
        if (!this.audioRef)
            return;

        const state = useStore.getState().player;
        if (this.audioRef.currentTime - state.currentTime > 0.5)
            state.setCurrentTime(this.audioRef.currentTime);
    };

    private onEnded = () => {
        const player = useStore.getState().player;
        player.setIsPlaying(false);
        player.setIsEnded(true);
    };

    private onVolumeChange = () => {
        if (!this.audioRef)
            return;

        useStore.getState().player.setVolume(this.audioRef.volume);
    };

    private onLoadedMetadata = () => {
        if (!this.audioRef)
            return;

        useStore.getState().player.setDuration(this.audioRef.duration);
    };
}

export default AudioPlayerService;