import {Index} from "@/stores";
import {Album} from '@/domain/models/Album';
import {Artist} from '@/domain/models/Artist';
import {Playlist} from '@/domain/models/Playlist';
import {Track} from '@/domain/models/Track';

import {createSliceSetters, SliceCreator} from '@/stores/utils';

export interface LibrarySlice {
    tracks: Track[];
    albums: Album[];
    artists: Artist[];
    playlists: Playlist[];
    currentTrack: Track | null;
    nextPage: number | null;

    setTracks: (tracks: Track[]) => void;
    setAlbums: (albums: Album[]) => void;
    setArtists: (artists: Artist[]) => void;
    setPlaylists: (playlists: Playlist[]) => void;
    setCurrentTrack: (track: Track | null) => void;
    setNextPage: (nextPage: number | null) => void;

    addTracks: (tracks: Track[]) => void;
}

const initialState: LibrarySlice = {
    tracks: [],
    albums: [],
    artists: [],
    playlists: [],
    currentTrack: null,
    nextPage: null,

    setTracks: () => {
    },
    setAlbums: () => {
    },
    setArtists: () => {
    },
    setPlaylists: () => {
    },
    setCurrentTrack: () => {
    },
    setNextPage: () => {
    },

    addTracks: () => {
    }
};

export const librarySlice: SliceCreator<LibrarySlice> = (set) => {
    const setters = createSliceSetters(set, 'library', initialState);
    return {
        ...initialState,
        ...setters,

        addTracks: (tracks: Track[]) => {
            set((state: Index) => {
                state.library.tracks.push(...tracks);
            });
        },
    };
};