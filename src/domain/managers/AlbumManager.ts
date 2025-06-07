import AbstractAlbumManager from "@/domain/managers/Base/AbstractAlbumManager";

import Album from "@/domain/models/Album";

import {useStore} from '@/stores';
import AlbumApi from "@/infrastructure/api/AlbumApi";

export default class AlbumManager extends AbstractAlbumManager {
    async LoadInitialAlbumByIdAsync(id: string): Promise<Album> {
        try {
            const album = await AlbumApi.GetAlbumByIdAsync(id);

            useStore.getState().library.setCurrentAlbum(album);

            return album;
        } catch (error) {
            console.error('AlbumManager: Failed to load initial tracks', error);
            throw error;
        }
    }

    SetCurrentAlbum(album: Album) {
        useStore.getState().library.setCurrentAlbum(album);
    }
}