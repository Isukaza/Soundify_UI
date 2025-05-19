import {Track} from "@/domain/models/Track";

export interface Playlist {
    PlayListId: string;
    Name: string;
    Tracks: Track[];
}