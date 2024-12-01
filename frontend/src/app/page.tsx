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
    <div className="h-screen mx-4 lg:max-w-3xl xl:max-w-2xl lg:mx-auto font-sans flex flex-col py-4 pt-12">
      <main className="flex flex-col flex-grow items-center space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Attachment Lyrics Matcher</h1>
          <p className="mt-2 text-lg text-gray-600">
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
      <footer className="flex items-center space-x-4 justify-center">
        <p className="text-sm text-gray-600">
          For a more sophisticated test check out the
          <a
            className="hover:underline hover:underline-offset-4 ml-1"
            href="https://www.attachmentproject.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Attachment Project
          </a>
        </p>
        <a
          className="flex items-center hover:underline hover:underline-offset-4 text-sm text-gray-600"
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
