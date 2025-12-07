import InjectableBase from "@/app/di/Base/InjectableBase";
import Album from "@/domain/models/Album";
import FilterRequest from "@/domain/models/requests/FilterRequest";
import Track from "@/domain/models/Track";

export default abstract class AbstractAlbumManager extends InjectableBase {
    abstract LoadInitialAlbumByIdAsync(id: string): Promise<Album>;
    abstract LoadInitialAlbumsAsync(): Promise<Album[] | null>;

    abstract LoadNextPageAsync(size?: number): Promise<Album[] | null>;

    abstract LoadAlbumsByFilterAsync(filter: FilterRequest): Promise<Album[] | null>;
}