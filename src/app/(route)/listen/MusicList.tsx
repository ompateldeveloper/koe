"use client";
import { AnimatedGrid, AnimatedGridCell } from "@/components/ui/animated-grid";
import Link from "next/link";
import { Avatar, ScrollArea } from "radix-ui";
import React, { useEffect, useState } from "react";

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
        <ScrollArea.Root type="always" className="pt-4">
            <ScrollArea.Viewport className="">
                <AnimatedGrid>
                    {musicList.map((track, i) => (
                        <AnimatedGridCell key={track.id}>
                            <Link href={`?id=${track.id}`} className=" cursor-pointer">
                                <div className=" hover:bg-zinc-800 p-2 rounded">
                                    <Avatar.Root>
                                        <Avatar.AvatarImage></Avatar.AvatarImage>
                                        <Avatar.Fallback>
                                            <div className="w-30 aspect-square bg-coral rounded-md flex-shrink-0" />
                                        </Avatar.Fallback>
                                    </Avatar.Root>
                                    <div className="text-sm font-medium truncate max-w-30 pt-2">{track.title}</div>
                                    <div className="text-xs text-zinc-400 truncate">{track.artist}</div>
                                </div>
                            </Link>
                        </AnimatedGridCell>
                    ))}
                </AnimatedGrid>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar className="bg-zinc-800"></ScrollArea.Scrollbar>
        </ScrollArea.Root>
    );
}

{
    /* <SmoothScroll >
</SmoothScroll> */
}
