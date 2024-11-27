"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Check, Plus } from "lucide-react";
import { Song } from "@/app/page";

// Mocked song data
const mockedSongs = [
  { id: 1, title: "Shape of You", artist: "Ed Sheeran" },
  { id: 2, title: "Blinding Lights", artist: "The Weeknd" },
  { id: 3, title: "Bad Guy", artist: "Billie Eilish" },
  { id: 4, title: "Rolling in the Deep", artist: "Adele" },
  { id: 5, title: "Stay", artist: "Justin Bieber, The Kid LAROI" },
];

type SongSearchProps = {
  songs: Song[];
  addSong: (song: Song) => void;
};

export function SongSearch({ songs, addSong }: SongSearchProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<typeof mockedSongs>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered = mockedSongs.filter((song) =>
        song.title.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    }
  };

  const addedSongIds = songs.map((song) => song.id);

  return (
    <div className="w-full md:w-96 py-12">
      <Popover>
        <PopoverTrigger asChild>
          <Input
            type="text"
            placeholder="Search for songs..."
            value={query}
            onChange={handleInputChange}
            className="w-full"
          />
        </PopoverTrigger>
        <PopoverContent className="w-full md:w-96">
          {suggestions.length > 0 ? (
            <ul className="space-y-2">
              {suggestions.map((song) => (
                <li
                  key={song.id}
                  className="p-2 rounded-md flex justify-between items-center"
                >
                  <div>
                    <div className="font-medium">{song.title}</div>
                    <div className="text-sm text-gray-500">{song.artist}</div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={addedSongIds.includes(song.id)}
                      onClick={() => addSong(song)}
                    >
                      {addedSongIds.includes(song.id) ? <Check /> : <Plus />}
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No suggestions found</p>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
