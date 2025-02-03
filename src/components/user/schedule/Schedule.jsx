"use client";
import { useState } from "react";
import Toolbar from "./Toolbar";
import Event from "./Event";
import data from "@/data/config";

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const date = new Date(data.date);

const Schedule = ({ eventList }) => {
  const [events, setEvents] = useState(eventList);
  const [filteredEvents, setFilteredEvents] = useState(eventList);

  const filterChange = (filterType) => {
    if (filterType === "hackweek") {
      setFilteredEvents(
        events.filter((event) => event.day >= 1 && event.day <= 5),
      );
    } else if (filterType === "hackathon") {
      setFilteredEvents(
        events.filter((event) => event.day == 6 || event.day == 0),
      );
    } else {
      setFilteredEvents(events);
    }
  };

  return (
    <>
      <div className="sticky top-0 z-10 flex w-full flex-col bg-gray-100 pt-4 text-white">
        <Toolbar onFilterChange={filterChange} />
        <div className="flex">
          {days.map((day, index) => {
            const currentDate = new Date(date);
            currentDate.setDate(currentDate.getDate() + index);
            return (
              <div
                className="font-montserrat m-5 ml-0 flex flex-grow items-center justify-start border-b-[1px] border-black text-sm font-light text-black md:text-lg"
                key={index}
              >
                {day} -{" "}
                {currentDate.toLocaleString("default", {
                  month: "numeric",
                  day: "numeric",
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div className="mr-4 flex">
        {days.map((day, dayIndex) => (
          <div
            key={dayIndex}
            className="m-2 flex w-full flex-col items-start space-y-3"
          >
            {filteredEvents
              .filter((event) => {
                if (day === "SUN" && event.day === 0) return true;
                if (day === "SAT" && event.day === 6) return true;
                return event.day === dayIndex + 1;
              })
              .map((events, eventIndex) => (
                <Event event={events} setEvents={setEvents} key={eventIndex} />
              ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Schedule;
