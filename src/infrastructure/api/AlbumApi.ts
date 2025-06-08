import Album from "@/domain/models/Album";
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
}