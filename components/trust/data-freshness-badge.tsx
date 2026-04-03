import { cn, formatRelativeTime } from "@/lib/utils";
import type { FreshnessState } from "@/lib/validator/schema";

type DataFreshnessBadgeProps = {
  updatedAt: string | null;
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
        : "Live data unavailable";

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs text-muted/90">
      <span
        className={cn(
          "h-2 w-2 rounded-full",
          state === "live" && "bg-accent animate-pulse-soft",
          state === "delayed" && "bg-amber",
          state === "unavailable" && "bg-white/30"
        )}
      />
      <span>{copy}</span>
      {updatedAt ? (
        <>
          <span className="text-white/25">/</span>
          <span>{formatRelativeTime(updatedAt)}</span>
        </>
      ) : null}
    </div>
  );
}
