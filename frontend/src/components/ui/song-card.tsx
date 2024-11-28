import { Song } from "@/app/page";
import { ReactElement } from "react";

export function SongCard({
  song,
  children,
}: {
  song: Song;
  children: ReactElement;
}) {
  return (
    <li
      key={song.id}
      className="p-2 rounded-md flex justify-between items-center"
    >
      <div>
        <div className="font-medium">{song.title}</div>
        <div className="text-sm text-gray-500">{song.artist}</div>
      </div>
      <div className="flex space-x-2">{children}</div>
    </li>
  );
}
