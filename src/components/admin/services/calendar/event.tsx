import React from "react";

interface EventProps {
  event: {
    startDate: Date;
    summary: string;
  };
  view: string;
}

const Event: React.FC<EventProps> = ({ event, view }) => {
  return (
    <div className="p-0.5">
      <p className="inline text-xs">
        {view === "month" && (
          <>
            {new Date(event.startDate).toLocaleTimeString(navigator.language, {
              hour: "2-digit",
              minute: "2-digit",
            })}
            {" - "}
          </>
        )}
        {event.summary}
      </p>
    </div>
  );
};

export default Event;
