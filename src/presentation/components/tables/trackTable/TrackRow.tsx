import React from "react";

import {flexRender, Row} from '@tanstack/react-table';

import AbstractAudioPlayerManager from "@/domain/managers/Base/AbstractAudioPlayerManager";
import {Track} from '@/domain/models/Track';

import {useStore} from '@/stores';

import {AddToPlaylistButton} from './AddToPlaylistButton';
import {MoreActionsButton} from './MoreActionsButton';
import {TrackAlbum} from './TrackAlbum';
import {TrackDuration} from './TrackDuration';
import {TrackIndexOrPlayButton} from './TrackIndexOrPlayButton';
import {TrackInfo} from './TrackInfo';

interface TrackRowProps {
    row: Row<Track>;
    columnStyles: Record<string, React.CSSProperties>;
    audioPlayerManager: AbstractAudioPlayerManager | null;
}

export const TrackRow = ({row, columnStyles, audioPlayerManager}: TrackRowProps) => {
    const isPlaying = useStore(state => state.player.isPlaying);
    const currentTrack = useStore(state => state.library.currentTrack);

    const isCurrent = currentTrack?.TrackId === row.original.TrackId;
    const isActive = isCurrent && isPlaying;

    const handlePlayPause = async (e: React.MouseEvent) => {
        e.stopPropagation();

        if (!audioPlayerManager) {
            console.warn('AudioPlayerManager is not available');
            return;
        }

        if (isCurrent) {
            await audioPlayerManager.togglePlay();
        } else {
            audioPlayerManager.setCurrentTrack(row.original);
            audioPlayerManager.resetPlayerState();
        }
    };

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
                            <TrackAlbum albumId={row.original.AlbumId} albumName={row.original.AlbumName}/>
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