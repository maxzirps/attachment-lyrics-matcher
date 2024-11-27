"use client";

import React, { useState } from "react";
import { Github } from "lucide-react";
import { SongSearch } from "@/components/ui/song-search";
import { SongsTable } from "@/components/ui/songs-table";
import { AttachmentStyleViewer } from "@/components/ui/attachment-style-viewer";

export type Song = {
  id: number;
  title: string;
  artist: string;
};

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);

  const addSong = (song: Song) => {
    setSongs(songs.concat(song));
  };
  const removeSong = (songId: number) => {
    setSongs(songs.filter((song) => song.id !== songId));
  };
  return (
    <div className="h-screen mx-4 lg:max-w-[60%] xl:max-w-[40%] lg:mx-auto font-[family-name:var(--font-geist-sans)] flex flex-col py-12">
      <main className="flex flex-col items-center flex-grow space-y-4">
        <div className="text-center">
          <h1 className="text-2xl">Attachment Lyrics Matcher</h1>
          <p className="mt-2">
            Learn your attachment style based on the songs you love
          </p>
        </div>
        <SongSearch addSong={addSong} songs={songs} />
        {songs.length > 0 && (
          <>
            <SongsTable songs={songs} removeSong={removeSong} />
            <AttachmentStyleViewer songs={songs} />
          </>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/maxzirps/attachment-lyrics-matcher"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          Source
        </a>
      </footer>
    </div>
  );
}
