import {createSliceSetters, SliceCreator} from '@/stores/utils';
import Album from '@/domain/DTO/Album';
import {Index} from '@/stores';

export interface AlbumSlice {
    albums: Album[];
    currentAlbum: Album | null;

    setAlbums: (albums: Album[]) => void;
    addAlbums: (albums: Album[]) => void;
    setCurrentAlbum: (album: Album | null) => void;
}

const initialState: AlbumSlice = {
    albums: [],
    currentAlbum: null,

    setAlbums: () => {
    },
    addAlbums: () => {
    },
    setCurrentAlbum: () => {
    },
};

export const albumSlice: SliceCreator<AlbumSlice> = (set) => {
    const setters = createSliceSetters(set, 'album', initialState);

    return {
        ...initialState,
        ...setters,

        addAlbums: (albums: Album[]) => {
            set((state: Index) => {
                state.album.albums.push(...albums);
            });
        }
    };
};