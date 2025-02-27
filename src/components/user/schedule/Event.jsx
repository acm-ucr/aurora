import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Event = ({ event }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="rounded bg-white p-3 text-black shadow-sm">
          <div className="text-left text-sm font-extrabold">
            {event.summary}
          </div>
          <div className="w-full text-left text-xs font-semibold md:text-sm">
            {event.location}
          </div>
          <div
            className={`${
              event.start < new Date()
                ? event.end > new Date()
                  ? "animate-bounce bg-white/30"
                  : "opacity-70"
                : "bg-white/20"
            } flex w-full py-0`}
          >
            <div className={`text-center text-xs md:text-sm`}>
              {event.start.getHours() === 12 ? 12 : event.start.getHours() % 12}
              :{event.start.getMinutes() < 10 && "0"}
              {event.start.getMinutes()}{" "}
              {event.start.getHours() >= 12 ? "PM " : "AM "}
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {event.summary} <br />
            <p className="text-sm">
              {event.location} from{" "}
              {new Date(event.start).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              to{" "}
              {new Date(event.end.dateTime).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </DialogTitle>
          <DialogDescription>
            {event.description.split("\n")[1]}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Event;
