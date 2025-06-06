import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {persist} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';
import {subscribeWithSelector} from 'zustand/middleware';
import {mergeDeepLeft} from 'ramda';

import {authSlice, AuthSlice} from '@/stores/slices/authSlice';
import {librarySlice, LibrarySlice} from '@/stores/slices/librarySlice';
import {playerSlice, PlayerSlice} from '@/stores/slices/playerSlice';

export interface Index {
    player: PlayerSlice;
    library: LibrarySlice;
    auth: AuthSlice;
}

export const useStore = create<Index>()(
    devtools(
        persist(
            subscribeWithSelector(
                immer((...args) => ({
                    player: playerSlice(...args),
                    library: librarySlice(...args),
                    auth: authSlice(...args),
                }))
            ),
            {
                name: 'AppData',
                partialize: (state) => ({
                    auth: {
                        userId: state.auth.userId,
                        userRole: state.auth.userRole,
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