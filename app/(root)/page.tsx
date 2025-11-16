import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import Hello from "@/components/Hello";
import { IEvent } from "@/database";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const Home = async () => {
  const response = await fetch(`${BASE_URL}/api/events`);
  const events = await response.json().then(data => data.events);
  return ( 
    <section className="text-center">
      <h1>
        The Hub for every tech <br /> event you cant miss!
      </h1>
      <p className="mt-5 text-center">Hackathons, Meetups and Conferences, All in a place</p>
      <ExploreBtn />
      <div className="mt-20 space-y-7">
        <ul className="events">
          {events && events.length > 0 && events.map((event: IEvent) => (
            <li key={event.title}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
   );
}
 
export default Home;