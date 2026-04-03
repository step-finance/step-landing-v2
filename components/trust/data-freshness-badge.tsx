import { cn, formatRelativeTime } from "@/lib/utils";
import type { FreshnessState } from "@/lib/validator/schema";

type DataFreshnessBadgeProps = {
  updatedAt: string;
  state: FreshnessState;
};

export function DataFreshnessBadge({
  updatedAt,
  state
}: DataFreshnessBadgeProps) {
  const copy =
    state === "live"
      ? "Live data"
      : state === "delayed"
        ? "Data delayed"
        : "Fallback data";

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-3 py-2 text-xs text-muted">
      <span
        className={cn(
          "h-2.5 w-2.5 rounded-full",
          state === "live" && "bg-accent animate-pulse-soft",
          state === "delayed" && "bg-amber",
          state === "fallback" && "bg-orange"
        )}
      />
      <span>{copy}</span>
      <span className="text-white/25">/</span>
      <span>{formatRelativeTime(updatedAt)}</span>
    </div>
  );
}
