import {createSliceSetters, SliceCreator} from '@/stores/utils';

export interface AuthSlice {
    jwt: string;
    refresh: string;
    exp: number;

    setJwt: (jwt: string) => void;
    setRefresh: (refresh: string) => void;
    setExp: (exp: number) => void;
}

const initialState: AuthSlice = {
    jwt: '',
    refresh: '',
    exp: 0,

    setJwt: () => {
    },
    setRefresh: () => {
    },
    setExp: () => {
    },
};

export const authSlice: SliceCreator<AuthSlice> = (set) => {
    const setters = createSliceSetters(set, 'auth', initialState);
    return {
        ...initialState,
        ...setters,
    };
};