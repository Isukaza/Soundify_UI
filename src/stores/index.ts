import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {persist} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';
import {mergeDeepLeft} from 'ramda';

import {playerSlice, PlayerSlice} from '@/stores/slices/playerSlice';
import {librarySlice, LibrarySlice} from '@/stores/slices/librarySlice';
import {authSlice, AuthSlice} from '@/stores/slices/authSlice';

export interface Index {
    player: PlayerSlice;
    library: LibrarySlice;
    auth: AuthSlice;
}

export const useStore = create<Index>()(
    devtools(
        persist(
            immer((...args) => ({
                player: playerSlice(...args),
                library: librarySlice(...args),
                auth: authSlice(...args),
            })),
            {
                name: 'AppData',
                partialize: (state) => ({
                    auth: {
                        jwt: state.auth.jwt,
                        refresh: state.auth.refresh,
                        exp: state.auth.exp,
                    },
                }),
                merge: (persistedState, currentState) =>
                    mergeDeepLeft(persistedState as Partial<Index>, currentState as Index)
            }),
        {name: 'AppStore'}
    )
);