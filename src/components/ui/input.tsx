import * as React from "react";

import { cn } from "@/utils/tailwind";
import { X } from "lucide-react";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-hackathon-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export interface InputWithClearProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear: () => void;
}

const InputWithClear = React.forwardRef<HTMLInputElement, InputWithClearProps>(
  ({ className, type, onClear, ...props }, ref) => {
    return (
      <div className="flex w-full items-center rounded border border-slate-200 bg-white px-3 py-2">
        <input
          type={type}
          className={cn(
            "flex w-full text-sm placeholder:text-slate-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />

        <X
          className="text-xl text-hackathon-gray-300 hover:cursor-pointer hover:text-red-500"
          onClick={onClear}
        />
      </div>
    );
  },
);
InputWithClear.displayName = "InputWithClear";

export { Input, InputWithClear };
