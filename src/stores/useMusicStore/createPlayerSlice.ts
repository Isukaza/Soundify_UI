export interface PlayerState {
    isPlaying: boolean;
    isEnded: boolean;
    currentTime: number;
    playerVolume: number;
    prevVolume: number;
    duration: number;
    setIsPlaying: (value: boolean) => void;
    setIsEnded: (value: boolean) => void;
    setCurrentTime: (value: number) => void;
    setVolume: (value: number) => void;
    setPrevVolume: (value: number) => void;
    setDuration: (value: number) => void;
    restorePrevVolume: () => void;
    reset: () => void;
}

export const createPlayerSlice = (set: any, get: any): PlayerState => ({
    isPlaying: false,
    isEnded: false,
    currentTime: 0,
    playerVolume: 1,
    prevVolume: 1,
    duration: 0,

    setIsPlaying: (value) => {
        if (get().isPlaying !== value) set({ isPlaying: value });
    },
    setIsEnded: (value) => {
        if (get().isEnded !== value) set({ isEnded: value });
    },
    setCurrentTime: (value) => {
        if (Math.abs(get().currentTime - value) > 0.25) {
            set({ currentTime: value });
        }
    },
    setVolume: (value) => {
        if (get().playerVolume !== value) set({ playerVolume: value });
    },
    setPrevVolume: (value) => {
        if (get().prevVolume !== value) set({ prevVolume: value });
    },
    setDuration: (val) => {
        set({duration: val});  // Set the duration
    },
    restorePrevVolume: () => {
        const prev = get().prevVolume || 0.33;
        set({ playerVolume: prev });
    },
    reset: () => {
        set({
            isPlaying: false,
            isEnded: false,
            currentTime: 0,
            playerVolume: 1,
            prevVolume: 1,
            duration: 0,
        });
    },
});