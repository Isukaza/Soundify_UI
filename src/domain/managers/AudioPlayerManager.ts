import {useStore} from "@/stores";
import AppDIManager from "@/app/di/AppDIManager";
import DIContainer from "@/app/di/DIContainer";

import AudioPlayerServiceBase from "@/domain/services/types/AudioPlayerServiceBase";

export default class AudioPlayerManager {
    private constructor() {
    }

    private static getInjected(): AudioPlayerServiceBase {
        if (!AppDIManager.isInitialized())
            throw new Error("[AudioPlayerManager] AppDIManager is not started");

        return DIContainer.get('audioPlayerService');
    }

    static async play() {
        const state = useStore.getState().player;
        if (!state.isPlaying) {
            state.setIsEnded(false);

            await this.getInjected().play();
            state.setIsPlaying(true);
        }
    }

    static pause() {
        const state = useStore.getState().player;
        if (state.isPlaying) {
            this.getInjected().pause();
            state.setIsPlaying(false);
        }
    }

    static setTime(time: number) {
        this.getInjected().setTime(time);
        useStore.getState().player.setCurrentTime(time);
    }

    static setVolume(volume: number) {
        this.getInjected().setVolume(volume);
        useStore.getState().player.setVolume(volume);
    }

    static togglePlay() {
        const isPlaying = useStore.getState().player.isPlaying;
        isPlaying ? this.pause() : this.play();
    }

    static toggleMute() {
        const state = useStore.getState();
        const service = this.getInjected();

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

    static async loadTrack(musicName: string) {
        await this.getInjected().loadTrack(musicName);
    }
}