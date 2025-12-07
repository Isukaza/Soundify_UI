import Album from "@/domain/DTO/Album";
import FilterRequest from "@/domain/DTO/requests/FilterRequest";
import {albumAPI} from "@/infrastructure/api/configs";

export default class AlbumApi {
    static async GetAlbumByIdAsync(id: string): Promise<Album> {
        const response = await albumAPI.get(`/${id}`);

        return {
            Id: response.data.id,
            ArtistId: response.data.artistId,
            ArtistName: response.data.artistName,
            Title: response.data.title,
            ReleaseDate: response.data.releaseDate,
            CoverFilePath: response.data.coverFilePath,
        }
    }

    static async GetAlbumsByFilterAsync(filter: FilterRequest): Promise<{ albums: Album[], nextPage: number | null }> {
        const response = await albumAPI.post('/get-albums-by-filter', filter);
        const rawAlbums = Array.isArray(response.data)
            ? response.data
            : response.data.items;

        const albums = rawAlbums.map((item: any) => ({
            Id: item.id,
            ArtistId: item.artistId,
            ArtistName: item.artistName,
            Title: item.title,
            ReleaseDate: item.releaseDate,
            CoverFilePath: item.coverFilePath
        }));

        const nextPageHeader = response.headers['x-next-page'];
        const nextPage = nextPageHeader !== undefined ? parseInt(nextPageHeader, 10) : null;

        return {
            albums,
            nextPage
        };
    }
}