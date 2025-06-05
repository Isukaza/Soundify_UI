import AbstractAudioPlayerManager from "@/domain/managers/Base/AbstractAudioPlayerManager";
import {Track} from "@/domain/models/Track";

import {useStore} from "@/stores";

export default class AudioPlayerManager extends AbstractAudioPlayerManager {
    async play(): Promise<void> {
        const player = useStore.getState().player;
        const library = useStore.getState().library;

        if (!library.currentTrack)
            return;

        if (!player.isTrackLoaded) {
            if (!player.isLoadingTrack)
                player.setIsLoadingTrack(true);

            return;
        }

        if (player.isEnded)
            player.setCurrentTime(0);

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

    setCurrentTrack(track: Track): void {
        useStore.getState().library.setCurrentTrack(track);
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

    resetLibraryState(): void {
        const library = useStore.getState().library;

        library.setTracks([]);
        library.setAlbums([]);
        library.setArtists([]);
        library.setPlaylists([]);
        library.setCurrentTrack(null);
        library.setNextPage(null);
    }

    resetPlayerState(): void {
        const player = useStore.getState().player;

        player.setIsPlaying(false);
        player.setIsTrackLoaded(false);
        player.setIsLoadingTrack(true);
        player.setCurrentTime(0);
        player.setDuration(0);
        player.setIsEnded(false);
    }
}