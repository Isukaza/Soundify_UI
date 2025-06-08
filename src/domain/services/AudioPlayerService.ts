import AbstractAudioPlayerService from "@/domain/services/types/AbstractAudioPlayerService";

import HlsLoader from "@/infrastructure/utils/HlsLoader";
import {getTrackPath} from "@/infrastructure/utils/formatters";

import {useStore} from "@/stores";

class AudioPlayerService extends AbstractAudioPlayerService {
    private audioRef?: HTMLAudioElement;
    private readonly hlsLoader = new HlsLoader();
    private subscriptions: Array<() => void> = [];

    public override async start(): Promise<void> {
        if (!this.audioRef) {
            this.audioRef = new Audio();
            this.attachListeners();
            this.setupSubscriptions();
        }
    }

    public override async stop(): Promise<void> {
        try {
            if (this.audioRef)
                this.detachListeners();

            this.unsubscribe();
            this.disposable();
            this.audioRef = undefined;
        } catch (ex) {
            console.error('Error while stopping AudioPlayerService', ex);
        }
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

    private setupSubscriptions() {
        const subscribeIsPlaying = useStore.subscribe(
            (state) => state.player.isPlaying,
            async (isPlaying: boolean) => {
                if (!this.audioRef)
                    return;

                if (isPlaying) {
                    try {
                        await this.audioRef.play();
                    } catch (ex) {
                        console.error('Audio play failed', ex);
                    }
                } else {
                    this.audioRef.pause();
                }
            }
        );

        const subscribeIsLoadingTrack = useStore.subscribe(
            (state) => state.player.isLoadingTrack,
            async (isLoading) => {
                if (isLoading) {
                    const currentTrack = useStore.getState().track.currentTrack;
                    if (!currentTrack || !this.audioRef)
                        return;

                    try {
                        this.disposable();
                        const currentTrackId = currentTrack.TrackId;

                        await this.hlsLoader
                            .loadToAudioElement(this.audioRef, getTrackPath(currentTrack), currentTrack.TrackId);

                        const latestTrack = useStore.getState().track.currentTrack;
                        if (latestTrack?.TrackId !== currentTrackId)
                            return;

                        this.setTrackAsLoaded();
                    } catch (err) {
                        console.error('Failed to load track', err);
                    } finally {
                        useStore.getState().player.setIsLoadingTrack(false);
                    }
                }
            }
        );

        const subscribeVolume = useStore.subscribe(
            (state) => state.player.volume,
            (volume: number) => {
                if (this.audioRef)
                    this.audioRef.volume = volume;
            }
        );

        const subscribeCurrentTime = useStore.subscribe(
            (state) => state.player.currentTime,
            (time: number) => {
                if (this.audioRef && Math.abs(this.audioRef.currentTime - time) > 0.5)
                    this.audioRef.currentTime = time;
            }
        );

        this.subscriptions.push(
            subscribeIsPlaying,
            subscribeIsLoadingTrack,
            subscribeVolume,
            subscribeCurrentTime
        );
    }

    private setTrackAsLoaded() {
        const player = useStore.getState().player;
        player.setIsTrackLoaded(true);
        player.setIsEnded(false);
        player.setIsPlaying(true);
    }

    private unsubscribe() {
        this.subscriptions.forEach((unsubscribe) => unsubscribe());
        this.subscriptions = [];
    }

    private disposable() {
        this.hlsLoader.destroy();

        if (this.audioRef) {
            this.audioRef.pause();
            this.audioRef.src = '';
            this.audioRef.load();
        }
    }
}

export default AudioPlayerService;