import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/tailwind";

import { COLORS } from "@/data/tags";

const badgeVariants = cva(
  "inline-flex items-center rounded border border-slate-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-slate-300",
  {
    variants: {
      variant: {
        default:
          "border-transparent text-slate-50 dark:bg-slate-50 dark:text-slate-900",
        secondary:
          "border-transparent bg-slate-100 text-slate-900  dark:bg-slate-800 dark:text-slate-50",
        destructive:
          "border-transparent bg-red-500 text-slate-50 dark:bg-red-900 dark:text-slate-50",
        outline: "text-slate-950 dark:text-slate-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  type?: keyof typeof COLORS;
}

function Badge({ className, variant, type = "gray", ...props }: BadgeProps) {
  const { background, text, hover } = COLORS[type];

  return (
    <div
      className={cn(
        badgeVariants({ variant }),
        className,
        background,
        text,
        hover,
        "border-4 text-black",
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
