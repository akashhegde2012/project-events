import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import Hello from "@/components/Hello";
import { time } from "console";

const events = [
  {image: '/images/event1.png', title: "Event 1", slug: "event-1", location: "location 1", date: "2024-07-01", time: "10:00 AM"},
  {image: '/images/event2.png', title: "Event 2", slug: "event-2", location: "location 2", date: "2024-08-15", time: "2:00 PM"},
  {image: '/images/event3.png', title: "Event 3", slug: "event-3", location: "location 3", date: "2024-09-10", time: "6:00 PM"},
  {image: '/images/event4.png', title: "Event 4", slug: "event-4", location: "location 4", date: "2024-10-05", time: "9:00 AM"},
  {image: '/images/event5.png', title: "Event 5", slug: "event-5", location: "location 5", date: "2024-11-20", time: "1:00 PM"},
  {image: '/images/event6.png', title: "Event 6", slug: "event-6", location: "location 6", date: "2024-12-15", time: "4:00 PM"},
]

const Home = () => {
  return ( 
    <section className="text-center">
      <h1>
        The Hub for every tech <br /> event you cant miss!
      </h1>
      <p className="mt-5 text-center">Hackathons, Meetups and Conferences, All in a place</p>
      <ExploreBtn />
      <div className="mt-20 space-y-7">
        <ul className="events">
          {events.map((event) => (
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