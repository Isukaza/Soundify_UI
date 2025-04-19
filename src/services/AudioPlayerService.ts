import {useMusicStore} from '@/stores/useMusicStore/useMusicStore';
import HlsLoader from "@/utils/HlsLoader";

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
            if (this.audioRef.currentTime - useMusicStore.getState().currentTime > 0.5)
                useMusicStore.getState().setCurrentTime(this.audioRef.currentTime);
        });

        this.audioRef.addEventListener('ended', () => {
            useMusicStore.getState().setIsPlaying(false);
            useMusicStore.getState().setIsEnded(true);
        });

        this.audioRef.addEventListener('volumechange', () => {
            useMusicStore.getState().setVolume(this.audioRef.volume);
        });

        this.audioRef.addEventListener('loadedmetadata', () => {
            useMusicStore.getState().setDuration(this.audioRef.duration);
        });
    }

    public async loadSource(musicName: string) {
        await hlsLoader.loadToAudioElement(this.audioRef, musicName);
    }

    public play() {
        this.audioRef.play();
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