import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const playlist = await prisma.playlist.findUnique({
            where: { id: params.id },
            include: { songs: true },
        });

        if (playlist) {
            return NextResponse.json(playlist);
        } else {
            return NextResponse.json({ error: "Playlist not found" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error fetching playlist:", error);
        return NextResponse.json({ error: "Failed to fetch playlist" }, { status: 500 });
    }
}
