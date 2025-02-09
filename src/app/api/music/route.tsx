import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const songs = await prisma.song.findMany();
    return NextResponse.json(songs);
  } catch (error) {
    console.error('Error fetching music:', error);
    return NextResponse.json({ error: 'Failed to fetch music' }, { status: 500 });
  }
}