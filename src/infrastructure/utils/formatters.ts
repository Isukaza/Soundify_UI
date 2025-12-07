import Track from "@/domain/models/Track";

export function formatTime(time: number, short: boolean = false): string {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    const pad = (num: number) => (num < 10 ? `0${num}` : num);

    if (hours > 0)
        return short ? `${hours}:${pad(minutes)}:${pad(seconds)}` : `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

    return short ? `${minutes}:${pad(seconds)}` : `${pad(minutes)}:${pad(seconds)}`;
}

export function getTrackPath(track: Track): string {
    return `${track.ArtistId}/${track.AlbumId}/${track.TrackId}`;
}