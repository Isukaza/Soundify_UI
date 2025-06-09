import AbstractAlbumManager from "@/domain/managers/Base/AbstractAlbumManager";
import Album from "@/domain/models/Album";
import FilterRequest from "@/domain/models/requests/FilterRequest";
import AlbumApi from "@/infrastructure/api/AlbumApi";

import {useStore} from '@/stores';

export default class AlbumManager extends AbstractAlbumManager {
    override async LoadInitialAlbumByIdAsync(id: string): Promise<Album> {
        try {
            const album = await AlbumApi.GetAlbumByIdAsync(id);

            useStore.getState().album.setCurrentAlbum(album);

            return album;
        } catch (error) {
            console.error('AlbumManager: Failed to load initial album by ID', error);
            throw error;
        }
    }

    override async LoadInitialAlbumsAsync(): Promise<Album[] | null> {
        try {
            const filter: FilterRequest = {page: 1, size: 20};
            const {albums, nextPage} = await AlbumApi.GetAlbumsByFilterAsync(filter);

            useStore.getState().album.setAlbums(albums);
            useStore.getState().app.setNextPage(nextPage ?? 0);

            return albums;
        } catch (error) {
            console.error('AlbumManager: Failed to load initial albums', error);
            throw error;
        }
    }

    override async LoadNextPageAsync(size = 20): Promise<Album[] | null> {
        const nextPage = useStore.getState().app.nextPage;

        if (nextPage === null || nextPage === 0) {
            console.warn('AlbumManager: No next page to load');
            return null;
        }

        try {
            const filter: FilterRequest = {page: nextPage, size};
            const {albums, nextPage: newNextPage} = await AlbumApi.GetAlbumsByFilterAsync(filter);

            useStore.getState().album.addAlbums(albums);
            useStore.getState().app.setNextPage(newNextPage ?? 0);

            return albums;
        } catch (error) {
            console.error('AlbumManager: Failed to load next page', error);
            throw error;
        }
    }

    override async LoadAlbumsByFilterAsync(filter: FilterRequest): Promise<Album[] | null> {
        try {
            const {albums, nextPage} = await AlbumApi.GetAlbumsByFilterAsync(filter);

            useStore.getState().album.setAlbums(albums);
            useStore.getState().app.setNextPage(nextPage ?? 0);

            return albums;
        } catch (error) {
            console.error('AlbumManager: Failed to load albums by filter', error);
            throw error;
        }
    }
}