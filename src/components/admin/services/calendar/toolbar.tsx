import { LABELS } from "@/data/admin/calendar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { NavigateAction, View } from "react-big-calendar";
import { COLORS } from "@/data/tags";

interface props {
  onView: (view: View) => void;
  onNavigate: (navigate: NavigateAction) => void;
  date: Date;
  setTag: (tag: keyof typeof COLORS) => void;
}

const Toolbar = ({ onView, onNavigate, date, setTag }: props) => {
  const handleShortcuts = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
          onNavigate("NEXT");
          break;
        case "ArrowLeft":
          onNavigate("PREV");
          break;
      }
    },
    [onNavigate],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleShortcuts);
    return () => document.removeEventListener("keydown", handleShortcuts);
  }, [handleShortcuts]);

  return (
    <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center">
          <ChevronLeft
            onClick={() => onNavigate("PREV")}
            className="mx-2 hover:cursor-pointer"
          />
          <p className="mb-0 text-3xl font-semibold">
            {date.toLocaleString("default", { month: "short" })}{" "}
            {date.getFullYear()}
          </p>
          <ChevronRight
            onClick={() => onNavigate("NEXT")}
            className="mx-2 hover:cursor-pointer"
          />
        </div>
        <div className="flex items-center justify-center gap-x-2">
          <Badge type={"gray"} onClick={() => onView("month")}>
            month
          </Badge>
          <Badge type={"gray"} onClick={() => onView("week")}>
            week
          </Badge>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 md:items-end">
        <Badge onClick={() => setTag("all")} type={"gray"}>
          All Events
        </Badge>
        <div className="flex flex-wrap items-center justify-center gap-x-2 md:justify-end">
          {Object.entries(LABELS)
            .filter(([_, { type }]) => type === "leads")
            .map(([key], index) => (
              <Badge
                key={index}
                type={key as keyof typeof COLORS}
                onClick={() => setTag(key as keyof typeof COLORS)}
                className="capitalize"
              >
                {key}
              </Badge>
            ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-2 md:justify-end">
          {Object.entries(LABELS)
            .filter(([_, { type }]) => type !== "leads")
            .map(([key], index) => (
              <Badge
                key={index}
                type={key as keyof typeof COLORS}
                onClick={() => setTag(key as keyof typeof COLORS)}
                className="capitalize"
              >
                {key}
              </Badge>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
