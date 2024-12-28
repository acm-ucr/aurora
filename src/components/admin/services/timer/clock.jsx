import { useState, useEffect } from "react";
import Controls from "./controls";
import { Progress } from "@/components/ui/progress";
import { Pause, Play } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const Timer = ({ onRemove }) => {
  const [edit, setEdit] = useState(true);
  const [play, setPlay] = useState(false);
  const [total, setTotal] = useState(60000);
  const [original, setOriginal] = useState(0);

  const onChange = (value) => {
    if (!edit) return;

    const [hours, minutes, seconds] = value.match(/.{2}/g);

    setTotal(
      parseInt(hours) * (1000 * 60 * 60) +
        parseInt(minutes) * (1000 * 60) +
        parseInt(seconds) * 1000,
    );
  };

  useEffect(() => {
    const id = setInterval(() => {
      if (!play) return;
      setTotal((prev) => prev - 1000);
      setOriginal((prev) => prev + 1000);
    }, 1000);

    return () => clearInterval(id);
  }, [play, total]);

  const hours = Math.max(Math.floor((total / (1000 * 60 * 60)) % 24), 0)
    .toString()
    .padStart(2, "0");

  const minutes = Math.max(Math.floor((total / 1000 / 60) % 60), 0)
    .toString()
    .padStart(2, "0");

  const seconds = Math.max(Math.floor((total / 1000) % 60), 0)
    .toString()
    .padStart(2, "0");

  return (
    <div className="mb-4 flex scroll-m-4 flex-col items-center justify-between rounded-md bg-white p-4">
      <div className="flex w-full items-center justify-between">
        <input
          disabled={!edit}
          className="flex-grow bg-transparent pl-2 text-3xl font-semibold outline-none"
          placeholder="Untitled Timer"
        />
        <Controls edit={edit} setEdit={setEdit} onRemove={onRemove} />
      </div>

      <InputOTP
        disabled={!edit}
        maxLength={6}
        onChange={onChange}
        value={hours + minutes + seconds}
        className="mt-4"
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
        <InputOTPGroup>
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
        <InputOTPGroup>
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      <div className="mt-4">
        {play && (
          <Pause
            onClick={() => !edit && setPlay(false)}
            className="hover:cursor-pointer"
          />
        )}
        {!play && (
          <Play
            onClick={() => !edit && setPlay(true)}
            className="hover:cursor-pointer"
          />
        )}
      </div>

      <Progress
        value={(total / (original + total)) * 100}
        className="mt-4 w-full"
      />
    </div>
  );
};

export default Timer;
