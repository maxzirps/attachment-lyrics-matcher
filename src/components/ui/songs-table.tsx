"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Song } from "@/app/page";
import { Trash } from "lucide-react";
import { DataTable } from "./data-table";

type SongsTableProps = {
  songs: Song[];
  removeSong: (id: number) => void;
};

export function SongsTable({ songs, removeSong }: SongsTableProps) {
  const columns: ColumnDef<Song>[] = [
    {
      accessorKey: "title",
    },
    {
      accessorKey: "artist",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const song = row.original;
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => removeSong(song.id)}
          >
            <Trash />
          </Button>
        );
      },
    },
  ];

  return (
    <div className="w-full">
      <DataTable columns={columns} data={songs} />
    </div>
  );
}
