import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { pinata } from "@/lib/pinata";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const song = await prisma.song.findUnique({
            where: { id: params.id },
        });

        if (song) {
            return NextResponse.json(song);
        } else {
            return NextResponse.json({ error: "Song not found" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error fetching song metadata:", error);
        return NextResponse.json({ error: "Failed to fetch song metadata" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const song = await prisma.song.findUnique({
            where: { id: params.id },
        });

        if (!song) {
            return NextResponse.json({ error: "Song not found" }, { status: 404 });
        }

        // Remove the file from Pinata
        await pinata.unpin([song.ipfsHash]);

        // Delete the song from the database
        await prisma.song.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ message: "Song deleted successfully" });
    } catch (error) {
        console.error("Error deleting song:", error);
        return NextResponse.json({ error: "Failed to delete song" }, { status: 500 });
    }
}
