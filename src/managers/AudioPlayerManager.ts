import audioPlayerProvider from "@/services/AudioPlayerService";
import {useMusicStore} from "@/stores/useMusicStore/useMusicStore";

export class AudioPlayerManager {
    private constructor() {
    }

    static play() {
        if (!useMusicStore.getState().isPlaying) {
            audioPlayerProvider.play();
            useMusicStore.getState().setIsPlaying(true);
        }
    }

    static pause() {
        if (useMusicStore.getState().isPlaying) {
            audioPlayerProvider.pause();
            useMusicStore.getState().setIsPlaying(false);
        }
    }

    static setTime(time: number) {
        audioPlayerProvider.setTime(time);
        useMusicStore.getState().setCurrentTime(time);
    }

    static setVolume(volume: number) {
        audioPlayerProvider.setVolume(volume);
        useMusicStore.getState().setVolume(volume);
    }

    static togglePlay() {
        const isPlaying = useMusicStore.getState().isPlaying;
        isPlaying ? AudioPlayerManager.pause() : AudioPlayerManager.play();
    }

    static toggleMute() {
        const state = useMusicStore.getState();
        if (state.playerVolume > 0) {
            state.setPrevVolume(state.playerVolume);
            state.setVolume(0);
            audioPlayerProvider.setVolume(0);
        } else {
            audioPlayerProvider.setVolume(state.prevVolume || 1);
            state.setVolume(state.playerVolume);
        }
    }

    static isPlaying() {
        return useMusicStore.getState().isPlaying;
    }

    static isEnded() {
        return useMusicStore.getState().isEnded;
    }
}