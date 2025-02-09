import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { pinata } from "@/lib/pinata";

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: NextRequest) {
    if (!req.body) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const title = formData.get("title") as string;
        const artist = formData.get("artist") as string;
        if (!file || !title || !artist) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        console.log("Uploading to Pinata...");
        const uploadResult = await pinata.upload.file(file);

        const url = `https://${process.env.PINATA_URL}/ipfs/${uploadResult.IpfsHash}`;
        console.log(url);

        const song = await prisma.song.create({
            data: {
                title,
                artist,
                ipfsHash: uploadResult.IpfsHash,
                url,
            },
        });

        console.log("Upload successful:", uploadResult);
        return NextResponse.json({
            success: true,
            song,
            ipfsHash: uploadResult.IpfsHash,
            url,
            pinSize: uploadResult.PinSize,
            timestamp: uploadResult.Timestamp,
        });
    } catch (error) {
        console.error("Error uploading to Pinata:", error);
        return NextResponse.json({ error: "Error uploading to Pinata" }, { status: 500 });
    }
}
