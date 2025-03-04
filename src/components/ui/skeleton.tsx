import { cn } from "@/utils/tailwind";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded bg-slate-100 dark:bg-slate-800",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
