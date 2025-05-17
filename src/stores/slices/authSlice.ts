import {createSliceSetters, SliceCreator} from '@/stores/utils';

export interface AuthSlice {
    email: string;
    password: string;

    jwt: string;
    refresh: string;
    exp: number;

    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setJwt: (jwt: string) => void;
    setRefresh: (refresh: string) => void;
    setExp: (exp: number) => void;
}

const initialState: AuthSlice = {
    email: '',
    password: '',
    jwt: '',
    refresh: '',
    exp: 0,

    setEmail: () => {
    },
    setPassword: () => {
    },
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