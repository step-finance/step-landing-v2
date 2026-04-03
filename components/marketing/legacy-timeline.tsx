import type { Milestone } from "@/content/site-content";

type LegacyTimelineProps = {
  items: Milestone[];
};

export function LegacyTimeline({ items }: LegacyTimelineProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {items.map((item) => (
        <div key={item.year} className="rounded-[22px] border border-white/[0.06] bg-white/[0.018] p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted/82">{item.year}</p>
          <h3 className="mt-3 text-[1.05rem] font-semibold text-ink">{item.title}</h3>
          <p className="mt-3 text-sm leading-[1.8] text-muted/92">{item.body}</p>
        </div>
      ))}
    </div>
  );
}
