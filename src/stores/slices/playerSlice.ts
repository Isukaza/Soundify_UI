import {createSliceSetters, SliceCreator} from '@/stores/utils';

export interface PlayerSlice {
    isLoadingTrack: boolean;
    isPlaying: boolean;
    isTrackLoaded: boolean;
    isEnded: boolean;
    currentTime: number;
    volume: number;
    prevVolume: number;
    duration: number;

    setIsLoadingTrack: (value: boolean) => void;
    setIsPlaying: (value: boolean) => void;
    setIsTrackLoaded: (value: boolean) => void;
    setIsEnded: (value: boolean) => void;
    setCurrentTime: (time: number) => void;
    setVolume: (volume: number) => void;
    setPrevVolume: (volume: number) => void;
    setDuration: (duration: number) => void;
}

const initialState: PlayerSlice = {
    isLoadingTrack: false,
    isPlaying: false,
    isTrackLoaded: false,
    isEnded: false,
    currentTime: 0,
    volume: 1,
    prevVolume: 1,
    duration: 0,

    setIsLoadingTrack: () => {
    },
    setIsPlaying: () => {
    },
    setIsTrackLoaded: () => {
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
    }
};

export const playerSlice: SliceCreator<PlayerSlice> = (set) => {
    const setters = createSliceSetters(set, 'player', initialState);
    return {
        ...initialState,
        ...setters,
    };
};