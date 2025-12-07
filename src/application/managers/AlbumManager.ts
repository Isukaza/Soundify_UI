import {injectable} from "inversify";

import AbstractAlbumManager from "@/domain/Base/AbstractAlbumManager";
import AlbumApi from "@/infrastructure/api/AlbumApi";
import FilterRequest from "@/domain/DTO/requests/FilterRequest";
import Album from "@/domain/DTO/Album";

import {useStore} from "@/stores";

@injectable()
export default class AlbumManager extends AbstractAlbumManager {

    override async LoadInitialAlbumByIdAsync(id: string): Promise<Album> {
        const album = await AlbumApi.GetAlbumByIdAsync(id);
        useStore.getState().album.setCurrentAlbum(album);
        return album;
    }

    override async LoadInitialAlbumsAsync(): Promise<Album[] | null> {
        const filter: FilterRequest = {page: 1, size: 20};
        const {albums, nextPage} = await AlbumApi.GetAlbumsByFilterAsync(filter);

        useStore.getState().album.setAlbums(albums);
        useStore.getState().app.setNextPage(nextPage ?? 0);

        return albums;
    }

    override async LoadNextPageAsync(size = 20): Promise<Album[] | null> {
        const nextPage = useStore.getState().app.nextPage;
        if (!nextPage) return null;

        const filter: FilterRequest = {page: nextPage, size};
        const {albums, nextPage: newNext} = await AlbumApi.GetAlbumsByFilterAsync(filter);

        useStore.getState().album.addAlbums(albums);
        useStore.getState().app.setNextPage(newNext ?? 0);

        return albums;
    }

    override async LoadAlbumsByFilterAsync(filter: FilterRequest): Promise<Album[] | null> {
        const {albums, nextPage} = await AlbumApi.GetAlbumsByFilterAsync(filter);

        useStore.getState().album.setAlbums(albums);
        useStore.getState().app.setNextPage(nextPage ?? 0);

        return albums;
    }
}