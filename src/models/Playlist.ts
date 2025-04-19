import {Track} from "@/models/Track";

export interface Playlist {
    PlayListId: string;
    Name: string;
    Tracks: Track[];
}