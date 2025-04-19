import {Album} from '@/models/Album';
import {Artist} from '@/models/Artist';
import {Playlist} from '@/models/Playlist';
import {Track} from '@/models/Track';

export interface LibraryState {
    tracks: Track[];
    albums: Album[];
    artists: Artist[];
    playlists: Playlist[];
    currentTrack: Track | null;
    setTracks: (tracks: Track[]) => void;
    setAlbums: (albums: Album[]) => void;
    setArtists: (artists: Artist[]) => void;
    setPlaylists: (playlists: Playlist[]) => void;
    setCurrentTrack: (track: Track) => void;
    addTrackToPlaylist: (playlistId: string, track: Track) => void;
    removeTrackFromPlaylist: (playlistId: string, trackId: string) => void;
}

export const createLibrarySlice = (set: any, get: any): LibraryState => ({
    tracks: [] as Track[],
    albums: [] as Album[],
    artists: [] as Artist[],
    playlists: [] as Playlist[],
    currentTrack: null,

    setTracks: (tracks) => set({tracks}),
    setAlbums: (albums) => set({albums}),
    setArtists: (artists) => set({artists}),
    setPlaylists: (playlists) => set({playlists}),
    setCurrentTrack: (track) => set({currentTrack: track}),

    addTrackToPlaylist: (playlistId, track) =>
        set((state: LibraryState) => {
            const updatedPlaylists = state.playlists.map((playlist: Playlist) => {
                if (playlist.PlayListId === playlistId) {
                    return {
                        ...playlist,
                        Tracks: [...playlist.Tracks, track],
                    };
                }
                return playlist;
            });
            return {playlists: updatedPlaylists};
        }),

    removeTrackFromPlaylist: (playlistId, trackId) =>
        set((state: LibraryState) => {
            const updatedPlaylists = state.playlists.map((playlist: Playlist) => {
                if (playlist.PlayListId === playlistId) {
                    return {
                        ...playlist,
                        Tracks: playlist.Tracks.filter((track: Track) => track.TrackId !== trackId),
                    };
                }
                return playlist;
            });
            return {playlists: updatedPlaylists};
        }),
});