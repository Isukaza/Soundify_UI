import AppDIManager from "@/app/di/AppDIManager";
import DIContainer from "@/app/di/DIContainer";

import AudioPlayerService from "@/domain/services/AudioPlayerService";
import AudioPlayerServiceBase from "@/domain/services/types/AudioPlayerServiceBase";

import {useStore} from "@/stores";

export default class AudioPlayerManager {
    private constructor() {
    }

    private static async getAudioPlayerServiceFromDI(): Promise<AudioPlayerServiceBase> {
        if (!AppDIManager.isInitialized())
            throw new Error("[AuthManager] AppDIManager is not started");

        return await DIContainer.get<AudioPlayerServiceBase>(AudioPlayerService);
    }

    static async play(): Promise<void> {
        const state = useStore.getState().player;
        if (!state.isPlaying) {
            state.setIsEnded(false);

            const service = await this.getAudioPlayerServiceFromDI();
            await service.play();
            state.setIsPlaying(true);
        }
    }

    static async pause(): Promise<void> {
        const state = useStore.getState().player;
        if (state.isPlaying) {
            const service = await this.getAudioPlayerServiceFromDI();
            service.pause();
            state.setIsPlaying(false);
        }
    }

    static async setTime(time: number): Promise<void> {
        const service = await this.getAudioPlayerServiceFromDI();
        service.setTime(time);
        useStore.getState().player.setCurrentTime(time);
    }

    static async setVolume(volume: number): Promise<void> {
        const service = await this.getAudioPlayerServiceFromDI();
        service.setVolume(volume);
        useStore.getState().player.setVolume(volume);
    }

    static async togglePlay(): Promise<void> {
        const isPlaying = useStore.getState().player.isPlaying;
        isPlaying ? await this.pause() : await this.play();
    }

    static async toggleMute(): Promise<void> {
        const state = useStore.getState();
        const service = await this.getAudioPlayerServiceFromDI();
        if (state.player.volume > 0) {
            state.player.setPrevVolume(state.player.volume);
            state.player.setVolume(0);
            service.setVolume(0);
        } else {
            const restoredVolume = state.player.prevVolume || 1;
            state.player.setVolume(restoredVolume);
            service.setVolume(restoredVolume);
        }
    }

    static async loadTrack(musicName: string): Promise<void> {
        const service = await this.getAudioPlayerServiceFromDI();
        await service.loadTrack(musicName);
    }
}