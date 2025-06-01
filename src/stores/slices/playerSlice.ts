import {createSliceSetters, SliceCreator} from '@/stores/utils';

export interface PlayerSlice {
    currentTrack: string;
    isPlaying: boolean;
    isEnded: boolean;
    currentTime: number;
    volume: number;
    prevVolume: number;
    duration: number;

    setCurrentTrack: (volume: string) => void;
    setIsPlaying: (value: boolean) => void;
    setIsEnded: (value: boolean) => void;
    setCurrentTime: (time: number) => void;
    setVolume: (volume: number) => void;
    setPrevVolume: (volume: number) => void;
    setDuration: (duration: number) => void;
}

const initialState: PlayerSlice = {
    currentTrack: '',
    isPlaying: false,
    isEnded: false,
    currentTime: 0,
    volume: 1,
    prevVolume: 1,
    duration: 0,

    setCurrentTrack: () => {
    },
    setIsPlaying: () => {
    },
    setIsEnded: () => {
    },
    setCurrentTime: () => {
    },
    setVolume: () => {
    },
    setPrevVolume: () => {
    },
    setDuration: () => {
    },
};

export const playerSlice: SliceCreator<PlayerSlice> = (set) => {
    const setters = createSliceSetters(set, 'player', initialState);
    return {
        ...initialState,
        ...setters,
    };
};