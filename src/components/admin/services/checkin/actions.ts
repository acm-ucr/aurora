import { api } from "@/utils/api";
import { Event } from "@/types/calendar";
export const getEvents = async () => {
  const { items } = await api({
    method: "GET",
    url: `https://www.googleapis.com/calendar/v3/calendars/${process.env.NEXT_PUBLIC_GOOGLE_CALENDAR}/events?key=${process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY}&singleEvents=true&orderBy=startTime`,
  });

  return items.map((event: Event) => ({
    id: event.id,
    name: event.summary,
    hidden: false,
  }));
};

export const getUser = async (user: string | null) => {
  const { items } = await api({
    method: "GET",
    url: `/api/checkin?uid=${user}`,
  });

  return items;
};
