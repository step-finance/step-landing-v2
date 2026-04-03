import { MetricCard } from "@/components/metrics/metric-card";

type SnapshotGridProps = {
  items: {
    label: string;
    value: string;
    footnote?: string;
    href?: string;
  }[];
};

export function SnapshotGrid({ items }: SnapshotGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <MetricCard key={item.label} {...item} />
      ))}
    </div>
  );
}
