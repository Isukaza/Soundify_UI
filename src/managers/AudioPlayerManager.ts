import audioPlayerProvider from "@/services/AudioPlayerService";
import {useStore} from "@/stores";

export class AudioPlayerManager {
    private constructor() {
    }

    static play() {
        if (!useStore.getState().player.isPlaying) {
            useStore.getState().player.setIsEnded(false);

            audioPlayerProvider.play();
            useStore.getState().player.setIsPlaying(true);
        }
    }

    static pause() {
        if (useStore.getState().player.isPlaying) {
            audioPlayerProvider.pause();
            useStore.getState().player.setIsPlaying(false);
        }
    }

    static setTime(time: number) {
        audioPlayerProvider.setTime(time);
        useStore.getState().player.setCurrentTime(time);
    }

    static setVolume(volume: number) {
        audioPlayerProvider.setVolume(volume);
        useStore.getState().player.setVolume(volume);
    }

    static togglePlay() {
        const isPlaying = useStore.getState().player.isPlaying;
        isPlaying ? AudioPlayerManager.pause() : AudioPlayerManager.play();
    }

    static toggleMute() {
        const state = useStore.getState();
        if (state.player.volume > 0) {
            state.player.setPrevVolume(state.player.volume);
            state.player.setVolume(0);
            audioPlayerProvider.setVolume(0);
        } else {
            audioPlayerProvider.setVolume(state.player.prevVolume || 1);
            state.player.setVolume(state.player.volume);
        }
    }

    static async loadSource(musicName: string) {
        await audioPlayerProvider.loadSource(musicName);
    }
}