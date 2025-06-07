import InjectableBase from "@/app/di/Base/InjectableBase";
import Album from "@/domain/models/Album";

export default abstract class AbstractAlbumManager extends InjectableBase {
    abstract LoadInitialAlbumByIdAsync(id: string): Promise<any>;

    abstract SetCurrentAlbum(album: Album): void;
}