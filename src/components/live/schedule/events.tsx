"use client";
import { GoogleEvent } from "@/types/calendar";
import { useState } from "react";

interface props {
  events: GoogleEvent[];
  totalDays: string[];
}

const Events = ({ events, totalDays }: props) => {
  const [selectedDay, setSelectedDay] = useState(
    new Date() > new Date(events[0].start.dateTime)
      ? new Date().toLocaleString("en-US", {
          timeZone: "America/Los_Angeles",
          weekday: "long",
        })
      : "Monday",
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mx-auto grid w-10/12 grid-cols-7 items-center justify-between rounded border-2 border-black text-base">
        {totalDays.map((day) => (
          <button
            key={day}
            className={`flex justify-center rounded p-2 text-black focus:outline-none ${
              selectedDay === day ? "bg-hackathon-blue-100" : "bg-transparent"
            }`}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </button>
        ))}
      </div>
      <div className="mt-6 h-full w-10/12">
        {events.filter(
          ({ start }) =>
            new Date(start.dateTime).toLocaleString("en-US", {
              timeZone: "America/Los_Angeles",
              weekday: "long",
            }) === selectedDay,
        ).length == 0 ? (
          <div className="flex flex-row justify-center text-lg font-semibold">
            No events Available
          </div>
        ) : (
          <>
            {events
              .filter(
                ({ start }) =>
                  new Date(start.dateTime).toLocaleString("en-US", {
                    timeZone: "America/Los_Angeles",
                    weekday: "long",
                  }) === selectedDay,
              )
              .map(({ start, summary, description, location }, index) => (
                <div
                  key={index}
                  className="font-workSans grid w-full grid-cols-4 items-center justify-center px-4 py-3 text-lg font-semibold"
                >
                  <p>
                    {new Date(new Date(start.dateTime)).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: "America/Los_Angeles",
                      },
                    )}
                  </p>
                  <p className="flex w-full justify-center">{summary}</p>
                  <p className="flex justify-center">
                    {description.split("\n")[0].slice(1)}
                  </p>
                  <p className="flex justify-center">{location}</p>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Events;
