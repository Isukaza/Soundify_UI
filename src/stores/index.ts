import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {persist} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';
import {subscribeWithSelector} from 'zustand/middleware';
import {mergeDeepLeft} from 'ramda';

import {appSlice, AppSlice} from '@/stores/slices/appSlice';
import {authSlice, AuthSlice} from '@/stores/slices/authSlice';
import {playerSlice, PlayerSlice} from '@/stores/slices/playerSlice';
import {trackSlice, TrackSlice} from '@/stores/slices/trackSlice';
import {albumSlice, AlbumSlice} from '@/stores/slices/albumSlice';
import {artistSlice, ArtistSlice} from '@/stores/slices/artistSlice';
import {playlistSlice, PlaylistSlice} from '@/stores/slices/playlistSlice';

export interface Index {
    player: PlayerSlice;
    auth: AuthSlice;
    app: AppSlice;

    track: TrackSlice;
    album: AlbumSlice;
    artist: ArtistSlice;
    playlist: PlaylistSlice;
}

export const useStore = create<Index>()(
    devtools(
        persist(
            subscribeWithSelector(
                immer((...args) => ({
                    player: playerSlice(...args),
                    auth: authSlice(...args),
                    app: appSlice(...args),

                    track: trackSlice(...args),
                    album: albumSlice(...args),
                    artist: artistSlice(...args),
                    playlist: playlistSlice(...args),
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
            }
        ),
        {name: 'AppStore'}
    )
);