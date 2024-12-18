"use client";

import React, { useEffect, useState } from "react";
import { Github } from "lucide-react";
import { SongSearch } from "@/components/ui/song-search";
import { SongsTable } from "@/components/ui/songs-table";
import { AttachmentStyleViewer } from "@/components/ui/attachment-style-viewer";
import { OnlineStatus } from "@/components/ui/online-status";

export type Song = {
  id: number;
  title: string;
  artist: string;
};

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const pingUrl = "http://127.0.0.1:8000/ping";
  const [status, setStatus] = useState("loading");
  const [, setError] = useState<string | null>(null);

  const checkStatus = async () => {
    try {
      const response = await fetch(pingUrl);
      if (response.ok) {
        setStatus("online");
        setError(null);
      } else {
        setStatus("offline");
        setError("Failed to ping the server");
      }
    } catch (err) {
      console.log(err);
      setStatus("offline");
      setError("Failed to reach the server");
    }
  };

  useEffect(() => {
    checkStatus();
  }, [pingUrl]);

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
        <SongSearch
          addSong={addSong}
          songs={songs}
          disabled={status === "offline"}
        />
        {songs.length > 0 && (
          <>
            <SongsTable songs={songs} removeSong={removeSong} />
            <AttachmentStyleViewer songs={songs} />
          </>
        )}
      </main>
      <footer className="flex flex-col items-center space-y-4 justify-center">
        <OnlineStatus status={status} />
        <p className="text-sm text-gray-600">
          For a more sophisticated test check out the
          <a
            className="ml-1 underline"
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
          <Github size={16} />
          Source
        </a>
      </footer>
    </div>
  );
}
