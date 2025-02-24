import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Pause, Play } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const Timer = ({ onRemove }) => {
  const [play, setPlay] = useState(false);
  const [total, setTotal] = useState(60000);
  const [original, setOriginal] = useState(0);

  const onChange = (value) => {
    if (play) return;

    const [minutes, seconds] = value.match(/.{2}/g);

    if (!isNaN(minutes) && !isNaN(seconds)) {
      setTotal(parseInt(minutes) * (1000 * 60) + parseInt(seconds) * 1000);
    }
  };

  useEffect(() => {
    const id = setInterval(() => {
      if (!play) return;
      setTotal((prev) => prev - 1000);
      setOriginal((prev) => prev + 1000);
    }, 1000);

    return () => clearInterval(id);
  }, [play, total]);

  const minutes = Math.max(Math.floor((total / 1000 / 60) % 60), 0)
    .toString()
    .padStart(2, "0");

  const seconds = Math.max(Math.floor((total / 1000) % 60), 0)
    .toString()
    .padStart(2, "0");

  return (
    <div className="mb-4 flex scroll-m-4 flex-col items-center justify-between rounded bg-white p-4">
      <div className="flex w-full items-center justify-between">
        <input
          disabled={play}
          className="flex-grow bg-transparent pl-2 text-3xl font-semibold outline-none"
          placeholder="Untitled Timer"
        />
        <Trash2
          onClick={onRemove}
          className="hover:cursor-pointer hover:text-red-500"
        />
      </div>

      <InputOTP
        disabled={play}
        maxLength={4}
        onChange={onChange}
        value={minutes + seconds}
        className="mt-4"
      >
        <div className="mr-11 flex flex-col items-center">
          <InputOTPGroup className="">
            <InputOTPSlot
              index={0}
              className="mx-1 my-3 h-20 w-14 rounded bg-slate-200 text-4xl font-bold"
            />
            <InputOTPSlot
              index={1}
              className="mx-1 my-3 h-20 w-14 rounded bg-slate-200 text-4xl font-bold"
            />
          </InputOTPGroup>
          <p className="text-xl font-semibold">Minutes</p>
        </div>

        <div className="flex flex-col items-center">
          <InputOTPGroup className="">
            <InputOTPSlot
              index={2}
              className="mx-1 my-3 h-20 w-14 rounded bg-slate-200 text-4xl font-bold"
            />
            <InputOTPSlot
              index={3}
              className="mx-1 my-3 h-20 w-14 rounded bg-slate-200 text-4xl font-bold"
            />
          </InputOTPGroup>
          <p className="text-xl font-semibold">Seconds</p>
        </div>
      </InputOTP>

      <div className="mt-4">
        {play && (
          <Pause
            onClick={() => setPlay(false)}
            className="hover:cursor-pointer"
          />
        )}
        {!play && (
          <Play
            onClick={() => setPlay(true)}
            className="hover:cursor-pointer"
          />
        )}
      </div>

      <Progress value={(total / (original + total)) * 100} className="mt-4" />
    </div>
  );
};

export default Timer;
