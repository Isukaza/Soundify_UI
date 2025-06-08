import {createSliceSetters, SliceCreator} from '@/stores/utils';

export interface AppSlice {
    searchQuery: string;
    nextPage: number | null;

    setSearchQuery: (searchQuery: string) => void;
    setNextPage: (nextPage: number | null) => void;
}

const initialState: AppSlice = {
    searchQuery: '',
    nextPage: null,

    setSearchQuery: () => {
    },
    setNextPage: () => {
    },
};

export const appSlice: SliceCreator<AppSlice> = (set) => {
    const setters = createSliceSetters(set, 'app', initialState);
    return {
        ...initialState,
        ...setters
    };
};