"use client";
import { useEffect, useState } from "react";
import moment from "moment";
import {
  Calendar as ReactBigCalendar,
  View,
  momentLocalizer,
} from "react-big-calendar";
import Toolbar from "./toolbar";
import Event from "./event";
import Modal from "./modal";
import { getEvents } from "./actions";
import { useQuery } from "@tanstack/react-query";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AuroraEvent } from "@/types/calendar";
import { COLORS } from "@/data/tags";

const Calendar = () => {
  const mLocalizer = momentLocalizer(moment);

  const [event, setEvent] = useState<AuroraEvent | null>(null);
  const [view, setView] = useState<View>("month");
  const [date, setDate] = useState(new Date());
  const [tag, setTag] = useState<keyof typeof COLORS>("all");

  const { data: events } = useQuery({
    queryKey: ["/admin/calendar"],
    queryFn: async () => getEvents(),
  });

  const handleShortcuts = (e: KeyboardEvent) => {
    switch (e.key) {
      case "m":
        setView("month");
        break;
      case "w":
        setView("week");
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleShortcuts);

    return () => {
      document.removeEventListener("keydown", handleShortcuts);
    };
  }, []);

  return (
    <>
      {event && <Modal event={event} setEvent={setEvent} />}
      <ReactBigCalendar
        startAccessor="startDate"
        endAccessor="endDate"
        date={date}
        view={view}
        className="py-4"
        step={15}
        events={
          tag === "all"
            ? events
            : events.filter((event: AuroraEvent) => event.category === tag)
        }
        localizer={mLocalizer}
        defaultView="month"
        views={["month", "week"]}
        formats={{
          eventTimeRangeFormat: ({ start }: { start: Date }) =>
            mLocalizer.format(start, "hh:mm A\n"),
        }}
        onNavigate={(newDate: Date) => setDate(newDate)}
        onView={(newView: View) => setView(newView)}
        components={{
          event: ({ event }: { event: AuroraEvent }) => (
            <Event event={event} view={view} />
          ),
          toolbar: ({ onView, onNavigate, date }) => (
            <Toolbar
              onView={onView}
              onNavigate={onNavigate}
              date={date}
              setTag={setTag}
            />
          ),
        }}
        eventPropGetter={(event: AuroraEvent) => {
          return {
            style: {
              border: "0px",
            },
            className: event.color,
          };
        }}
        dayPropGetter={(event: Date) => {
          const bg =
            event.toLocaleDateString() == new Date().toLocaleDateString()
              ? "!bg-hackathon-green-100"
              : "!bg-white";
          return {
            className: bg,
            style: {
              margin: 0,
              padding: 0,
            },
          };
        }}
        onSelectEvent={(event: AuroraEvent) => setEvent(event)}
        onDrillDown={() => setView("week")}
      />
    </>
  );
};

export default Calendar;
