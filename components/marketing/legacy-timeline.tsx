import type { Milestone } from "@/content/site-content";

type LegacyTimelineProps = {
  items: Milestone[];
};

export function LegacyTimeline({ items }: LegacyTimelineProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {items.map((item) => (
        <div key={item.year} className="panel p-6">
          <p className="font-mono text-sm uppercase tracking-[0.24em] text-accent">{item.year}</p>
          <h3 className="mt-4 text-2xl font-semibold text-ink">{item.title}</h3>
          <p className="mt-4 text-sm leading-7">{item.body}</p>
        </div>
      ))}
    </div>
  );
}
