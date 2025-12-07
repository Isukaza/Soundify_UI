import Album from "@/domain/DTO/Album";
import FilterRequest from "@/domain/DTO/requests/FilterRequest";

export default abstract class AbstractAlbumManager {
    abstract LoadInitialAlbumByIdAsync(id: string): Promise<Album>;
    abstract LoadInitialAlbumsAsync(): Promise<Album[] | null>;

    abstract LoadNextPageAsync(size?: number): Promise<Album[] | null>;

    abstract LoadAlbumsByFilterAsync(filter: FilterRequest): Promise<Album[] | null>;
}