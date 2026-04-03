import type { RoadmapPhase } from "@/content/site-content";
import { cn } from "@/lib/utils";

type RoadmapRailProps = {
  phases: RoadmapPhase[];
};

export function RoadmapRail({ phases }: RoadmapRailProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-4">
      {phases.map((phase) => (
        <div
          key={phase.phase}
          className={cn(
            "panel p-5",
            phase.status === "current" && "border-accent/25 shadow-[0_0_0_1px_rgba(0,248,183,0.12),0_10px_30px_rgba(0,248,183,0.08)]"
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <p className="panel-label">{phase.phase}</p>
            <span
              className={cn(
                "rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]",
                phase.status === "current" && "border-accent/25 bg-accent/10 text-accent",
                phase.status === "next" && "border-cyan/25 bg-cyan/10 text-cyan",
                phase.status === "later" && "border-line bg-white/[0.04] text-muted"
              )}
            >
              {phase.status}
            </span>
          </div>
          <h3 className="mt-4 text-xl font-semibold leading-tight text-ink">{phase.title}</h3>
          <p className="mt-3 text-sm leading-7">{phase.body}</p>
        </div>
      ))}
    </div>
  );
}
