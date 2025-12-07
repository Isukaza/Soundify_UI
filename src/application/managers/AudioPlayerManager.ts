import {injectable} from "inversify";

import AbstractAudioPlayerManager from "@/domain/Base/AbstractAudioPlayerManager";
import Track from "@/domain/DTO/Track";
import {useStore} from "@/stores";

@injectable()
export default class AudioPlayerManager extends AbstractAudioPlayerManager {

    async play(): Promise<void> {
        const player = useStore.getState().player;
        if (!useStore.getState().track.currentTrack) return;

        if (!player.isTrackLoaded) {
            if (!player.isLoadingTrack) player.setIsLoadingTrack(true);
            return;
        }

        if (player.isEnded) player.setCurrentTime(0);

        if (!player.isPlaying) {
            player.setIsEnded(false);
            player.setIsPlaying(true);
        }
    }

    async pause(): Promise<void> {
        const player = useStore.getState().player;
        if (player.isPlaying) player.setIsPlaying(false);
    }

    setCurrentTrack(track: Track): void {
        useStore.getState().track.setCurrentTrack(track);
    }

    async setTime(time: number): Promise<void> {
        useStore.getState().player.setCurrentTime(time);
    }

    async setVolume(volume: number): Promise<void> {
        useStore.getState().player.setVolume(volume);
    }

    async togglePlay(): Promise<void> {
        const player = useStore.getState().player;
        player.isPlaying ? await this.pause() : await this.play();
    }

    async toggleMute(): Promise<void> {
        const player = useStore.getState().player;
        if (player.volume > 0) {
            player.setPrevVolume(player.volume);
            player.setVolume(0);
        } else {
            player.setVolume(player.prevVolume || 1);
        }
    }

    resetLibraryState(): void {
        const s = useStore.getState();
        s.track.setTracks([]);
        s.track.setCurrentTrack(null);
        s.album.setAlbums([]);
        s.artist.setArtists([]);
        s.playlist.setPlaylists([]);
        s.app.setNextPage(null);
    }

    resetPlayerState(): void {
        const p = useStore.getState().player;
        p.setIsPlaying(false);
        p.setIsTrackLoaded(false);
        p.setIsLoadingTrack(true);
        p.setCurrentTime(0);
        p.setDuration(0);
        p.setIsEnded(false);
    }

    resetLibraryBetweenPage(): void {
        const s = useStore.getState();
        s.track.setTracks([]);
        s.album.setAlbums([]);
        s.artist.setArtists([]);
        s.playlist.setPlaylists([]);
        s.app.setNextPage(null);
    }
}