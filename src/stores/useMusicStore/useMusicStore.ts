import { create } from 'zustand';
import { createPlayerSlice, PlayerState } from '@/stores/useMusicStore/createPlayerSlice';
import { createLibrarySlice, LibraryState } from '@/stores/useMusicStore/createLibrarySlice';

interface MusicStore extends PlayerState, LibraryState {}

export const useMusicStore = create<MusicStore>((set, get) => ({
    ...createPlayerSlice(set, get),
    ...createLibrarySlice(set, get),
}));