"use client";
import { useState } from "react";
import Clock from "./clock";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type TimerType = {
  id: string;
};

const Timer = () => {
  const [timers, setTimers] = useState<TimerType[]>([]);

  const addTimer = () => {
    setTimers([
      {
        id: uuidv4(),
      },
      ...timers,
    ]);
  };

  const clearAll = () => {
    setTimers([]);
  };

  const deleteTimer = (id: string) => {
    setTimers(timers.filter((timer) => timer.id !== id));
  };

  return (
    <div className="flex h-full flex-col py-4 font-poppins">
      <div className="mb-4 flex gap-3">
        <Label className="pr-5 text-2xl font-bold">Timer</Label>

        <Button onClick={addTimer}>Add Timer</Button>
        <Button variant="destructive" onClick={clearAll}>
          clear all
        </Button>
      </div>
      <div className="flex h-full flex-col overflow-y-scroll p-4">
        {timers.length === 0 ? (
          <div className="flex h-full items-center justify-center text-2xl font-bold">
            No Timers
          </div>
        ) : (
          timers.map((timer) => (
            <Clock key={timer.id} onRemove={() => deleteTimer(timer.id)} />
          ))
        )}
      </div>
    </div>
  );
};

export default Timer;
