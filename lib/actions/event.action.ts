'use server';

import connectDB from "../mongodb";
import { Event } from "@/database";

export const getSimilarEvents = async (slug: string) => {
    try {
        await connectDB();
        let event = await Event.findOne({slug: slug});

        return Event.find({_id: {$ne: event._id}, tags: {$in : event.tags}}).lean();

    } catch {
        return [];
    }
}