import React from "react";
import {useStore} from '@/stores';
import {Table} from '@mui/joy';
import {useReactTable, getCoreRowModel, createColumnHelper, flexRender} from '@tanstack/react-table';
import {AccessTimeRounded} from '@mui/icons-material';
import {Track} from '@/domain/models/Track';

import {TrackIndexOrPlayButton} from './TrackIndexOrPlayButton';
import {TrackInfo} from './TrackInfo';
import {TrackAlbum} from './TrackAlbum';
import {AddToPlaylistButton} from './AddToPlaylistButton';
import {TrackDuration} from './TrackDuration';
import {MoreActionsButton} from './MoreActionsButton';

const columnStyles: Record<string, React.CSSProperties> = {
    indexOrPlay: {width: '32px', textAlign: 'center'},
    trackInfo: {textAlign: 'left', width: '40%'},
    album: {textAlign: 'left', width: '20%'},
    addToPlaylist: {textAlign: 'right', width: '32px'},
    duration: {textAlign: 'center', width: '32px'},
    moreActions: {textAlign: 'center', width: '32px'},
};

const columnHelper = createColumnHelper<Track>();

const columns = [
    columnHelper.display({
        id: 'indexOrPlay',
        header: '#',
        cell: ({row}) => (
            <TrackIndexOrPlayButton
                index={row.index + 1}
                isPlaying={false}
            />
        ),
    }),
    columnHelper.accessor(row => row.Name, {
        id: 'trackInfo',
        header: 'Title',
        cell: ({row}) => (
            <TrackInfo
                thumbnail={`/covers/${row.original.AlbumId}.jpg`}
                trackName={row.original.Name}
                artistName={row.original.ArtistName}
            />
        ),
    }),
    columnHelper.accessor(row => row.AlbumName, {
        id: 'album',
        header: 'Album',
        cell: ({row}) => (
            <TrackAlbum albumName={row.original.AlbumName}/>
        ),
    }),
    columnHelper.display({
        id: 'addToPlaylist',
        header: '',
        cell: () => (
            <AddToPlaylistButton/>
        ),
    }),
    columnHelper.accessor(row => row.duration, {
        id: 'duration',
        header: () => (
            <AccessTimeRounded style={{fontSize: '1.125rem'}}/>
        ),
        cell: ({getValue}) => (
            <TrackDuration duration={getValue()}/>
        ),
    }),
    columnHelper.display({
        id: 'moreActions',
        header: '',
        cell: () => (
            <MoreActionsButton/>
        ),
    }),
];

export default function TrackTable() {
    const tracks = useStore(state => state.library.tracks);

    const table = useReactTable({
        data: tracks,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Table
            borderAxis="none"
            sx={{
                backgroundColor: 'transparent',
                width: '100%',
                borderSpacing: '0px 10px',
                borderCollapse: 'separate',
                '& thead th': {
                    padding: '4px 12px',
                },
                '& tbody tr': {
                    height: '52px',
                    transition: 'background-color 0.2s',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    },
                },
                '& tbody tr td:first-of-type': {
                    borderTopLeftRadius: '4px',
                    borderBottomLeftRadius: '4px',
                },
                '& tbody tr td:last-of-type': {
                    borderTopRightRadius: '4px',
                    borderBottomRightRadius: '4px',
                },
                '& tbody td': {
                    padding: '4px 12px',
                },
            }}
        >
            <thead>
            {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                        <th
                            key={header.id}
                            style={{
                                ...columnStyles[header.id] ?? {},
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                            }}
                        >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody>
            {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="track-row">
                    {row.getVisibleCells().map(cell => (
                        <td
                            key={cell.id}
                            style={{
                                ...columnStyles[cell.column.id] ?? {},
                            }}
                        >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </Table>
    );
}