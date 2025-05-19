import {createSliceSetters, SliceCreator} from '@/stores/utils';

export interface AuthSlice {
    userId: string;
    isAuthenticated: boolean;

    email: string;
    password: string;

    jwt: string;
    refresh: string;
    exp: number;

    setUserId: (userId: string) => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void;

    setEmail: (email: string) => void;
    setPassword: (password: string) => void;

    setJwt: (jwt: string) => void;
    setRefresh: (refresh: string) => void;
    setExp: (exp: number) => void;
}

const initialState: AuthSlice = {
    userId: '',
    isAuthenticated: false,

    email: '',
    password: '',

    jwt: '',
    refresh: '',
    exp: 0,

    setUserId: () => {
    },
    setIsAuthenticated: () => {
    },

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