import Track from "@/domain/models/Track";

export default interface Playlist {
    PlayListId: string;
    Name: string;
    Tracks: Track[];
}