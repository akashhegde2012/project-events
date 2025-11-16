import { Event } from "@/database";
import connectDB from "@/lib/mongodb";
import { lstat } from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const formData = await req.formData();
        let event;
        try {
            event = Object.fromEntries(formData.entries());
        }
        catch (error) {
            return NextResponse.json({message: "Invalid JSON data format"}, {status: 400})
        }
        const file = formData.get('image') as File;
        if(!file) {
            return NextResponse.json({message: 'Image file required'}, {status: 400});
            
        }
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64String = buffer.toString("base64");

        // Optional: Add the MIME type for embedding (recommended)
        const mimeType = file.type; // e.g. "image/png" or "image/jpeg"
        const base64WithPrefix = `data:${mimeType};base64,${base64String}`;
        event.image = base64WithPrefix;
        const tags = JSON.parse(formData.get('tags') as string);
        event.tags = tags;

        const agenda = JSON.parse(formData.get('agenda') as string);
        event.agenda = agenda;
        const createdEvent = await Event.create(event);
        return NextResponse.json({message: "event created successfully", event: createdEvent}, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({messsage: "event creation failed", error: error instanceof Error? error.message : "unknown"}, {status: 500});
    }
}

export const GET = async () => {
    try {
        await connectDB();

        const events = await Event.find().sort({createdAt: -1});

        return NextResponse.json({message: 'Events Fetched successrully', events}, {status: 200});
        
    } catch (e) {
        return NextResponse.json({message: 'Failed to fetch events', error: e}, {status: 500});
    }
}