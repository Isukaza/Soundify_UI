import AbstractAudioPlayerManager from "@/domain/managers/Base/AbstractAudioPlayerManager";
import {useStore} from "@/stores";

export default class AudioPlayerManager extends AbstractAudioPlayerManager {
    async play(): Promise<void> {
        const player = useStore.getState().player;
        if (!player.isPlaying) {
            player.setIsEnded(false);
            player.setIsPlaying(true);
        }
    }

    async pause(): Promise<void> {
        const player = useStore.getState().player;
        if (player.isPlaying)
            player.setIsPlaying(false);
    }

    async setTime(time: number): Promise<void> {
        useStore.getState().player.setCurrentTime(time);
    }

    async setVolume(volume: number): Promise<void> {
        useStore.getState().player.setVolume(volume);
    }

    async togglePlay(): Promise<void> {
        useStore.getState().player.isPlaying ? await this.pause() : await this.play();
    }

    async toggleMute(): Promise<void> {
        const player = useStore.getState().player;
        if (player.volume > 0) {
            player.setPrevVolume(player.volume);
            player.setVolume(0);
        } else {
            const restoredVolume = player.prevVolume || 1;
            player.setVolume(restoredVolume);
        }
    }

    async loadTrack(musicName: string): Promise<void> {
        useStore.getState().player.setCurrentTrack(musicName);
    }
}