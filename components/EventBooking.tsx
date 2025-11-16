'use client';

import { createBooking } from "@/lib/actions/booking.action";
import React, { useState } from "react";
const EventBooking = ({eventId, slug}: {eventId: string, slug: string}) => {
    const [email, setEmail] = useState('');
    const [submited, setSubmited] = useState(false);
    return ( 
        <div >
            <form action="">
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-bold">Email</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} id="email" name="email" className="bg-gray-950 p-2 rounded-md hover:bg-gray-800" placeholder="Enter your email" required />
                </div>
                <button type="submit" className="text-center p-2 bg-sky-500 font-bold mt-2 rounded w-full hover:cursor-pointer" onClick={async (e) => {
                    e.preventDefault();
                    const {success}= await createBooking({eventId, slug, email});
                    if (success)
                    {
                        setSubmited(true);
                    }
                    else {
                        console.error("Booking failed");
                    }
                }}>Submit</button>
                {submited &&
                    <p className="text-green-600 mt-2">Thank you for booking! We have received your request.</p>
                }
            </form>
        </div>
     );
}
 
export default EventBooking;