import Link from "next/link";
import { ScrollArea } from "radix-ui";
import React, { Key, useEffect, useState } from "react";

interface Song {
    id: string;
    title: String;
    artist: String;
    ipfsHash: String;
    url: String;
}
export default function MusicList() {
    const [musicList, setMusicList] = useState<Song[]>([]);

    useEffect(() => {
        fetch("/api/music") // Replace with your API route
            .then((res) => res.json())
            .then((data) => setMusicList(data))
            .catch((err) => console.error("Error fetching music:", err));
    }, []);
    return (
        <ScrollArea.Root type="always" className="h-full flex-1">
            <ScrollArea.Viewport className=" h-full">
                <div className="flex flex-col gap-2">
                    {musicList.map((track) => (
                        <Link href={`?id=${track.id}`} key={track.id} className="  p-2  hover:bg-zinc-700  cursor-pointer">
                            <div className="text-sm font-medium">{track.title}</div>
                            <div className="text-xs text-muted-foreground">{track.artist}</div>
                        </Link>
                    ))}
                </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar orientation="vertical"></ScrollArea.Scrollbar>
        </ScrollArea.Root>
    );
}
