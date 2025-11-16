import { Event } from "@/database";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, {params}: {params: Promise<{slug: String}>}) => {
    try {
        const {slug} = await params;
        console.log(slug);

        await connectDB();

        const event = await Event.findOne({slug: slug.trim().toLowerCase()});

        return NextResponse.json({message: 'Event Fetched successrully', event}, {status: 200});
    } catch (e) {
        return NextResponse.json({message: 'Event not found'}, {status: 400});
    }
}