import {createSliceSetters, SliceCreator} from '@/stores/utils';

import Track from '@/domain/DTO/Track';

import {Index} from "@/stores";

export interface TrackSlice {
    tracks: Track[];
    currentTrack: Track | null;

    setTracks: (tracks: Track[]) => void;
    addTracks: (tracks: Track[]) => void;
    setCurrentTrack: (track: Track | null) => void;
}

const initialState: TrackSlice = {
    tracks: [],
    currentTrack: null,

    setTracks: () => {
    },
    addTracks: () => {
    },
    setCurrentTrack: () => {
    },
};

export const trackSlice: SliceCreator<TrackSlice> = (set) => {
    const setters = createSliceSetters(set, 'track', initialState);

    return {
        ...initialState,
        ...setters,

        addTracks: (tracks: Track[]) => {
            set((state: Index) => {
                state.track.tracks.push(...tracks);
            });
        }
    };
};