import AbstractAudioPlayerManager from "@/domain/managers/Base/AbstractAudioPlayerManager";
import React from "react";
import {useStore} from '@/stores';
import {flexRender, Row} from '@tanstack/react-table';
import {Track} from '@/domain/models/Track';
import {TrackIndexOrPlayButton} from './TrackIndexOrPlayButton';
import {TrackInfo} from './TrackInfo';
import {TrackAlbum} from './TrackAlbum';
import {AddToPlaylistButton} from './AddToPlaylistButton';
import {TrackDuration} from './TrackDuration';
import {MoreActionsButton} from './MoreActionsButton';

interface TrackRowProps {
    row: Row<Track>;
    columnStyles: Record<string, React.CSSProperties>;
    audioPlayerManager: AbstractAudioPlayerManager | null;
}

export const TrackRow = ({row, columnStyles, audioPlayerManager}: TrackRowProps) => {
    const isPlaying = useStore(state => state.player.isPlaying);
    const currentTrack = useStore(state => state.library.currentTrack);
    const setCurrentTrack = useStore(state => state.library.setCurrentTrack);

    const isCurrent = currentTrack?.TrackId === row.original.TrackId;
    const isActive = isCurrent && isPlaying;

    const handlePlayPause = async (e: React.MouseEvent) => {
        e.stopPropagation();

        if (isCurrent) {
            await audioPlayerManager?.togglePlay();
        } else {
            setCurrentTrack(row.original);
            await audioPlayerManager?.play();
        }
    };

    console.log("TrackRow rendered", row.index + 1);

    return (
        <tr className={`track-row ${isActive ? 'active' : ''}`}>
            {row.getVisibleCells().map(cell => {
                let content: React.ReactNode = null;

                switch (cell.column.id) {
                    case 'indexOrPlay':
                        content = (
                            <TrackIndexOrPlayButton
                                index={row.index + 1}
                                isPlaying={isActive}
                                playPauseHandler={handlePlayPause}
                            />
                        );
                        break;
                    case 'trackInfo':
                        content = (
                            <TrackInfo
                                thumbnail={`/covers/${row.original.AlbumId}.jpg`}
                                trackId={row.original.TrackId}
                                trackName={row.original.Name}
                                artistId={row.original.ArtistId}
                                artistName={row.original.ArtistName}
                            />
                        );
                        break;
                    case 'album':
                        content = (
                            <TrackAlbum
                                albumId={row.original.AlbumId}
                                albumName={row.original.AlbumName}
                            />
                        );
                        break;
                    case 'addToPlaylist':
                        content = <AddToPlaylistButton trackId={row.original.TrackId}/>;
                        break;
                    case 'duration':
                        content = <TrackDuration duration={row.original.duration}/>;
                        break;
                    case 'moreActions':
                        content = <MoreActionsButton trackId={row.original.TrackId}/>;
                        break;
                    default:
                        content = flexRender(cell.column.columnDef.cell, cell.getContext());
                        break;
                }

                return (
                    <td key={cell.id} style={columnStyles[cell.column.id] ?? {}}>
                        {content}
                    </td>
                );
            })}
        </tr>
    );
};