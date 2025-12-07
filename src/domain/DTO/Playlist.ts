import Track from "@/domain/DTO/Track";

export default interface Playlist {
    PlayListId: string;
    Name: string;
    Tracks: Track[];
}