import EventBooking from "@/components/EventBooking";
import Image from "next/image";
import { getSimilarEvents } from "@/lib/actions/event.action";
import { IEvent } from "@/database";
import EventCard from "@/components/EventCard";

const EventDetails = ({image, label, alt}: {image: string; label: string; alt: string}) => {
    return (
        <div className="flex flex-row gap-2 items-center">
            <Image src={image} alt={alt} width={20} height={20} />
            <span>{label}</span>
        </div>

    )
}

const EventAgenda = ({agendaItems}: {agendaItems:string[]}) => {
    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold">
                Agenda
            </h2>
            <ul>
                {agendaItems.map((agenda, index) => (
                    <li key={index}>{agenda}</li>
                ))}
            </ul>
        </div>
    )
}

const EventTags = ({tags}: {tags: string[]}) => {
    return (
        <div className="flex flex-row gap-1 flex-wrap mt-2">
            {tags.map((tag, index) => (
                <div className="pill" key={index}>
                    {tag}
                </div>
            ))}
        </div>
    )
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const EventPage = async ({params}: {params: Promise<{slug: String}>}) => {
    const {slug} = await params;
    const response = await fetch(`${BASE_URL}/api/events/${slug}`);
    const data = await response.json();
    const {event} = data;

    const similarEvents: IEvent[] = await getSimilarEvents(event.slug);


    return ( 
        <section>
            <h1>{event.title}</h1>
            <p>{event.description}</p>
            <div className="flex md:flex-row flex-col gap-4 mt-2">
                <div className="md:w-[800px]">
                    <Image
                        src={event.image}
                        alt={event.title}
                        width={800}
                        height={500}
                        className="banner"
                    />
                    <div className="flex flex-col gap-2 flex-wrap">
                        <h2 className="text-3xl font-bold">Event Overview</h2>
                        <p>{event.overview}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-3xl font-bold">Event Details</h2>
                        <EventDetails image="/icons/calendar.svg" alt="calendar" label={event.date} />
                        <EventDetails image="/icons/clock.svg" alt="clock" label={event.time} />
                        <EventDetails image="/icons/pin.svg" alt="pin" label={event.location} />
                        <EventDetails image="/icons/mode.svg" alt="mode" label={event.mode} />
                        <EventDetails image="/icons/audience.svg" alt="audience" label={event.audience} />
                    </div>
                    <EventAgenda agendaItems={event.agenda} />
                    <div className="flex flex-col gap-2">
                        <h2 className="text-3xl font-bold">About the Organizer</h2>
                        <p>{event.organizer}</p>
                    </div>
                    <EventTags tags = {event.tags} />
                </div>
                <div className="flex-1">
                    <div className="bg-white/5 bg-opacity-50  rounded-md p-4 sticky top-20">
                        <h2 className="text-3xl font-bold mb-2">Register for this Event</h2>
                        <EventBooking eventId={event._id} slug={event.slug} />
                    </div>
                </div>
            </div>
            <div className="flex w-full flex-col gap-5 pt-20">
                <h2 className="text-3xl font-bold">Similar Events You May Like</h2>
                <div className="events">
                    {similarEvents && similarEvents.length > 0 && 
                        similarEvents.map((event, index) => (
                            <EventCard key={index} {...event} />
                        ))
                    }
                </div>
            </div>
        </section>
     );
}
 
export default EventPage;