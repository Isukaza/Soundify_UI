import {Album} from '@/models/Album';
import {Artist} from '@/models/Artist';
import {Playlist} from '@/models/Playlist';
import {Track} from '@/models/Track';

import {createSliceSetters, SliceCreator} from '@/stores/utils';

export interface LibrarySlice {
    tracks: Track[];
    albums: Album[];
    artists: Artist[];
    playlists: Playlist[];
    currentTrack: Track | null;

    setTracks: (tracks: Track[]) => void;
    setAlbums: (albums: Album[]) => void;
    setArtists: (artists: Artist[]) => void;
    setPlaylists: (playlists: Playlist[]) => void;
    setCurrentTrack: (track: Track | null) => void;
}

const initialState: LibrarySlice = {
    tracks: [],
    albums: [],
    artists: [],
    playlists: [],
    currentTrack: null,

    setTracks: () => {
    },
    setAlbums: () => {
    },
    setArtists: () => {
    },
    setPlaylists: () => {
    },
    setCurrentTrack: () => {
    }
};

export const librarySlice: SliceCreator<LibrarySlice> = (set) => {
    const setters = createSliceSetters(set, 'library', initialState);
    return {
        ...initialState,
        ...setters,
    };
};