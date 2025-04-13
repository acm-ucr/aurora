import { useState } from "react";

interface props {
  onFilterChange: (value: "all" | "hackweek" | "hackathon") => void;
}

const Toolbar = ({ onFilterChange }: props) => {
  const [selected, setSelected] = useState("all");

  return (
    <div className="flex items-center justify-end">
      <div className="flex rounded border-2 bg-white">
        <button
          onClick={() => {
            setSelected("all");
            onFilterChange("all");
          }}
          className={`m-0.5 px-3 py-1 ${
            selected === "all"
              ? "rounded bg-hackathon-green-300 text-white"
              : "bg-white text-black"
          }`}
        >
          All Events
        </button>
        <button
          onClick={() => {
            setSelected("hackweek");
            onFilterChange("hackweek");
          }}
          className={`m-0.5 px-3 py-1 ${
            selected === "hackweek"
              ? "rounded bg-hackathon-green-300 text-white"
              : "bg-white text-black"
          }`}
        >
          HackWeek
        </button>
        <button
          onClick={() => {
            setSelected("hackathon");
            onFilterChange("hackathon");
          }}
          className={`m-0.5 px-3 py-1 ${
            selected === "hackathon"
              ? "rounded bg-hackathon-green-300 text-white"
              : "bg-white text-black"
          }`}
        >
          Hackathon
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
