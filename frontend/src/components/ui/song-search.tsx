"use client";

import React, { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Plus } from "lucide-react";
import { Song } from "@/app/page";
import { SongCard } from "./song-card";

type SongSearchProps = {
  songs: Song[];
  addSong: (song: Song) => void;
  disabled: boolean;
};

export function SongSearch({ songs, addSong, disabled }: SongSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Song[]>([]);
  const [, setLoading] = useState(false);

  const addedSongIds = songs.map((song) => song.id);

  const fetchSongs = async (searchQuery: string) => {
    if (searchQuery.length == 0) {
      setSuggestions([]);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8000/search?q=${searchQuery}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch songs");
      }
      const data = await response.json();
      setSuggestions(data);
      setIsOpen(true);
    } catch (error) {
      console.error("Error fetching songs:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.length >= 0) {
      const timeoutId = setTimeout(() => {
        fetchSongs(query);
      }, 500);

      return () => clearTimeout(timeoutId);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="w-full md:w-96">
      <Popover
        modal={true}
        open={isOpen && suggestions.length > 0}
        onOpenChange={setIsOpen}
      >
        <PopoverTrigger asChild disabled={disabled}>
          <Input
            disabled={disabled}
            type="text"
            placeholder="Search for songs..."
            value={query}
            onChange={handleInputChange}
            className="w-full"
          />
        </PopoverTrigger>
        <PopoverContent
          className="mt-2"
          style={{
            width: "var(--radix-popover-trigger-width)",
          }}
        >
          <ul className="space-y-2">
            {suggestions.map((song) => (
              <SongCard song={song} key={song.id}>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={addedSongIds.includes(song.id)}
                  onClick={() => addSong(song)}
                >
                  {addedSongIds.includes(song.id) ? <Check /> : <Plus />}
                </Button>
              </SongCard>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
      {disabled && (
        <div className="text-center text-red-500 text-sm mt-4">
          App is currently offline.
        </div>
      )}
    </div>
  );
}
