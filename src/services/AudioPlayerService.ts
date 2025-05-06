import HlsLoader from "@/utils/HlsLoader";
import {useStore} from '@/stores';

const hlsLoader = new HlsLoader();

class AudioPlayerService {
    private static instance: AudioPlayerService;
    private readonly audioRef: HTMLAudioElement;

    private constructor() {
        this.audioRef = new Audio();
        this.attachListeners();
    }

    public static getInstance(): AudioPlayerService {
        if (!this.instance)
            this.instance = new AudioPlayerService();

        return this.instance;
    }

    private attachListeners() {
        this.audioRef.addEventListener('timeupdate', () => {
            if (this.audioRef.currentTime - useStore.getState().player.currentTime > 0.5)
                useStore.getState().player.setCurrentTime(this.audioRef.currentTime);
        });

        this.audioRef.addEventListener('ended', () => {
            useStore.getState().player.setIsPlaying(false);
            useStore.getState().player.setIsEnded(true);
        });

        this.audioRef.addEventListener('volumechange', () => {
            useStore.getState().player.setVolume(this.audioRef.volume);
        });

        this.audioRef.addEventListener('loadedmetadata', () => {
            useStore.getState().player.setDuration(this.audioRef.duration);
        });
    }

    public async loadSource(musicName: string) {
        await hlsLoader.loadToAudioElement(this.audioRef, musicName);
    }

    public async play() {
        await this.audioRef.play();
    }

    public pause() {
        this.audioRef.pause();
    }

    public setTime(time: number) {
        this.audioRef.currentTime = time;
    }

    public setVolume(volume: number) {
        this.audioRef.volume = volume;
    }
}

export default AudioPlayerService.getInstance();