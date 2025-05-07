import { X, MapPin, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AuroraEvent } from "@/types/calendar";

interface props {
  event: AuroraEvent | null;
  setEvent: (event: AuroraEvent | null) => void;
}

const Modal = ({ event, setEvent }: props) => {
  return (
    event && (
      <div className="absolute left-1/2 top-1/2 z-10 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded">
        <div
          className={`flex items-center justify-between rounded-t bg-hackathon-primary p-3 ${event.color}`}
        >
          <span className="text-3xl font-bold text-white">{event.summary}</span>
          <X
            onClick={() => setEvent(null)}
            className="text-xl text-white hover:cursor-pointer hover:!text-red-500"
          />
        </div>
        <div className="rounded-b border-x-2 border-b-2 border-hackathon-gray-300 bg-white px-3 py-2">
          <div className="flex items-center justify-between">
            <div>
              {event.startDate.toLocaleString("default", {
                month: "long",
                weekday: "long",
                day: "2-digit",
                year: "numeric",
              })}
              <br />
              {event.startDate.toLocaleString("default", {
                hour: "numeric",
                minute: "2-digit",
              })}
            </div>

            <div>
              <Badge> {event.category}</Badge>
            </div>
          </div>
          <div className="my-2 flex items-center">
            <MapPin className="mr-2" />
            {event.location ? event.location : "No Location Specified"}
          </div>
          <div className="my-2 flex items-center">
            <User className="mr-2" />
            {event.assignee}
          </div>
          <p className="mb-0">{event.description.split("\n")[1]}</p>
        </div>
      </div>
    )
  );
};

export default Modal;
