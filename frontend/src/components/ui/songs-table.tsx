"use client";

import { Button } from "@/components/ui/button";
import { Song } from "@/app/page";
import { Trash } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

import { SongCard } from "./song-card";

type SongsTableProps = {
  songs: Song[];
  removeSong: (id: number) => void;
};

export function SongsTable({ songs, removeSong }: SongsTableProps) {
  return (
    <>
      <h2 className="font-semibold">Added songs</h2>
      <ScrollArea className="w-full md:w-96 h-96 rounded-md border">
        <ul className="space-y-2 p-4">
          {songs.map((song) => (
            <SongCard song={song} key={song.id}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeSong(song.id)}
              >
                <Trash />
              </Button>
            </SongCard>
          ))}
        </ul>
      </ScrollArea>
    </>
  );
}
