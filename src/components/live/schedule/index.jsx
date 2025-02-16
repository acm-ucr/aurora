import { api } from "@/utils/api";
import Events from "./events";
import Title from "@/components/ui/title";

const Schedule = async () => {
  const { items } = await api({
    url: `https://www.googleapis.com/calendar/v3/calendars/${process.env.NEXT_PUBLIC_GOOGLE_CALENDAR}/events?key=${process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY}&singleEvents=true&orderBy=startTime`,
    method: "GET",
  });

  items.forEach((event) => {
    event.start = new Date(event.start.dateTime);
    event.end = new Date(event.end.dateTime);
    event.day = event.start.toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
      weekday: "long",
    });
  });

  const totalDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div>
      {" "}
      <Title text="Schedule" /> <Events events={items} totalDays={totalDays} />
    </div>
  );
};

export default Schedule;
