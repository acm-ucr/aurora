"use client";
import { useState } from "react";
import Toolbar from "./Toolbar";
import Event from "./Event";
import { Label } from "@/components/ui/label";
import data from "@/data/config";
import { GoogleEvent } from "@/types/calendar.js";

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const date = new Date(data.date);

interface props {
  eventList: GoogleEvent[];
}

const Schedule = ({ eventList }: props) => {
  const [filteredEvents, setFilteredEvents] = useState(eventList);

  const filterChange = (filterType: "all" | "hackweek" | "hackathon") => {
    if (filterType === "hackweek") {
      setFilteredEvents(
        eventList.filter(
          (event) =>
            new Date(event.start.dateTime).getDay() >= 1 &&
            new Date(event.start.dateTime).getDay() <= 5,
        ),
      );
    } else if (filterType === "hackathon") {
      setFilteredEvents(
        eventList.filter(
          (event) =>
            new Date(event.start.dateTime).getDay() == 6 ||
            new Date(event.start.dateTime).getDay() == 0,
        ),
      );
    } else {
      setFilteredEvents(eventList);
    }
  };

  return (
    <>
      <div className="sticky top-0 z-10 flex w-full flex-col bg-gray-100 pt-4">
        <Label className="flex gap-3 py-4 pr-5 text-2xl font-bold">
          Schedule
        </Label>
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
                const GoogleDay = new Date(event.start.dateTime).getDay();

                if (day === "SUN" && GoogleDay === 0) return true;
                if (day === "SAT" && GoogleDay === 6) return true;
                return GoogleDay === dayIndex + 1;
              })
              .map((eventList, eventIndex) => (
                <Event event={eventList} key={eventIndex} />
              ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Schedule;
