import {createSliceSetters, SliceCreator} from '@/stores/utils';
import Artist from '@/domain/DTO/Artist';
import {Index} from '@/stores';

export interface ArtistSlice {
    artists: Artist[];

    setArtists: (artists: Artist[]) => void;
    addArtists: (artists: Artist[]) => void;
}

const initialState: ArtistSlice = {
    artists: [],

    setArtists: () => {
    },
    addArtists: () => {
    },
};

export const artistSlice: SliceCreator<ArtistSlice> = (set) => {
    const setters = createSliceSetters(set, 'artist', initialState);

    return {
        ...initialState,
        ...setters,

        addArtists: (artists: Artist[]) => {
            set((state: Index) => {
                state.artist.artists.push(...artists);
            });
        }
    };
};