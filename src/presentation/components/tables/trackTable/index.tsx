import React from "react";

import {AccessTimeRounded} from "@mui/icons-material";
import {Table} from "@mui/joy";

import {
    useReactTable,
    getCoreRowModel,
    createColumnHelper,
    flexRender
} from "@tanstack/react-table";

import Track from "@/domain/DTO/Track";
import AbstractAudioPlayerManager from "@/domain/Base/AbstractAudioPlayerManager";

import {useStore} from "@/stores";

import {TrackRow} from "./TrackRow";

import useInject from "@/presentation/hooks/useInject";
import {TYPES} from "@/app/di/types";

const columnStyles: Record<string, React.CSSProperties> = {
    indexOrPlay: {width: "32px", textAlign: "center"},
    trackInfo: {textAlign: "left", width: "40%"},
    album: {textAlign: "left", width: "20%"},
    addToPlaylist: {textAlign: "right", width: "32px"},
    duration: {textAlign: "center", width: "32px"},
    moreActions: {textAlign: "center", width: "32px"}
};

const columnHelper = createColumnHelper<Track>();

interface TrackTableProps {
    variant?: "album" | "track";
}

export default function TrackTable({variant = "track"}: TrackTableProps) {
    // Tracks from Zustand store
    const tracks = useStore((state) => state.track.tracks);

    // NEW DI — Sync manager (no loading, always defined)
    const audioPlayerManager = useInject<AbstractAudioPlayerManager>(
        TYPES.AudioPlayerManager
    );

    const columns = [
        columnHelper.display({
            id: "indexOrPlay",
            header: "#",
            cell: ({row}) => row.index + 1
        }),

        columnHelper.accessor((row) => row.Name, {
            id: "trackInfo",
            header: "Title",
            cell: ({row}) => row.original
        }),

        ...(variant !== "album"
            ? [
                columnHelper.accessor((row) => row.AlbumName, {
                    id: "album",
                    header: "Album",
                    cell: ({row}) => row.original
                })
            ]
            : []),

        columnHelper.display({id: "addToPlaylist", header: "", cell: () => null}),

        columnHelper.accessor((row) => row.duration, {
            id: "duration",
            header: () => (
                <AccessTimeRounded style={{fontSize: "1.125rem"}}/>
            ),
            cell: ({getValue}) => getValue()
        }),

        columnHelper.display({id: "moreActions", header: "", cell: () => null})
    ];

    const table = useReactTable({
        data: tracks,
        columns,
        getCoreRowModel: getCoreRowModel()
    });

    return (
        <Table
            borderAxis="none"
            sx={{
                backgroundColor: "transparent",
                width: "100%",
                borderSpacing: "0px 10px",
                borderCollapse: "separate",

                "& tbody tr": {
                    height: "52px",
                    transition: "background-color 0.2s"
                },
                "& tbody tr:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.08)"
                },
                "& tbody tr td:first-of-type": {
                    borderTopLeftRadius: "4px",
                    borderBottomLeftRadius: "4px"
                },
                "& tbody tr td:last-of-type": {
                    borderTopRightRadius: "4px",
                    borderBottomRightRadius: "4px"
                }
            }}
        >
            <thead>
            {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                        <th
                            key={header.id}
                            style={{
                                ...(columnStyles[header.id] ?? {}),
                                backgroundColor: "transparent",
                                border: "none",
                                borderBottom:
                                    "1px solid rgba(255, 255, 255, 0.1)"
                            }}
                        >
                            {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                        </th>
                    ))}
                </tr>
            ))}
            </thead>

            <tbody>
            {table.getRowModel().rows.map((row) => (
                <TrackRow
                    key={row.id}
                    row={row}
                    columnStyles={columnStyles}
                    variant={variant}
                    audioPlayerManager={audioPlayerManager}
                />
            ))}
            </tbody>
        </Table>
    );
}