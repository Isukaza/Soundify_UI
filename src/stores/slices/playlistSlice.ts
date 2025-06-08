import {createSliceSetters, SliceCreator} from '@/stores/utils';
import {Playlist} from '@/domain/models/Playlist';
import {Index} from '@/stores';

export interface PlaylistSlice {
    playlists: Playlist[];

    setPlaylists: (playlists: Playlist[]) => void;
    addPlaylists: (playlists: Playlist[]) => void;
}

const initialState: PlaylistSlice = {
    playlists: [],

    setPlaylists: () => {
    },
    addPlaylists: () => {
    },
};

export const playlistSlice: SliceCreator<PlaylistSlice> = (set) => {
    const setters = createSliceSetters(set, 'playlist', initialState);

    return {
        ...initialState,
        ...setters,

        addPlaylists: (playlists: Playlist[]) => {
            set((state: Index) => {
                state.playlist.playlists.push(...playlists);
            });
        }
    };
};