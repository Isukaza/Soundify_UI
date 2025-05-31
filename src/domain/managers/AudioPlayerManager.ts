import AbstractAudioPlayerManager from "@/domain/managers/Base/AbstractAudioPlayerManager";
import AbstractAudioPlayerService from "@/domain/services/types/AbstractAudioPlayerService";
import {useStore} from "@/stores";

export default class AudioPlayerManager extends AbstractAudioPlayerManager {
    static inject = [AbstractAudioPlayerService];

    constructor(private readonly service: AbstractAudioPlayerService) {
        super();
    }

    async play(): Promise<void> {
        const state = useStore.getState().player;
        if (!state.isPlaying) {
            state.setIsEnded(false);
            await this.service.play();
            state.setIsPlaying(true);
        }
    }

    async pause(): Promise<void> {
        const state = useStore.getState().player;
        if (state.isPlaying) {
            this.service.pause();
            state.setIsPlaying(false);
        }
    }

    async setTime(time: number): Promise<void> {
        this.service.setTime(time);
        useStore.getState().player.setCurrentTime(time);
    }

    async setVolume(volume: number): Promise<void> {
        this.service.setVolume(volume);
        useStore.getState().player.setVolume(volume);
    }

    async togglePlay(): Promise<void> {
        const isPlaying = useStore.getState().player.isPlaying;
        isPlaying ? await this.pause() : await this.play();
    }

    async toggleMute(): Promise<void> {
        const state = useStore.getState();
        if (state.player.volume > 0) {
            state.player.setPrevVolume(state.player.volume);
            state.player.setVolume(0);
            this.service.setVolume(0);
        } else {
            const restoredVolume = state.player.prevVolume || 1;
            state.player.setVolume(restoredVolume);
            this.service.setVolume(restoredVolume);
        }
    }

    async loadTrack(musicName: string): Promise<void> {
        await this.service.loadTrack(musicName);
    }
}