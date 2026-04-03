import type { Milestone } from "@/content/site-content";

type LegacyTimelineProps = {
  items: Milestone[];
};

export function LegacyTimeline({ items }: LegacyTimelineProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {items.map((item) => (
        <div key={item.year} className="rounded-[24px] border border-line/80 bg-white/[0.02] p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted">{item.year}</p>
          <h3 className="mt-3 text-xl font-semibold text-ink">{item.title}</h3>
          <p className="mt-3 text-sm leading-7">{item.body}</p>
        </div>
      ))}
    </div>
  );
}
