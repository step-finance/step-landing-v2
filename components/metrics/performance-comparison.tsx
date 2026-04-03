import { cn, formatPercent } from "@/lib/utils";

type PerformanceComparisonProps = {
  validator: number;
  networkAverage: number;
  label: string;
};

export function PerformanceComparison({
  validator,
  networkAverage,
  label
}: PerformanceComparisonProps) {
  const max = Math.max(validator, networkAverage);
  const delta = validator - networkAverage;

  return (
    <div className="panel p-6">
      <p className="panel-label">{label}</p>
      <div className="mt-3 flex items-end justify-between gap-4">
        <div>
          <p className="text-3xl font-semibold text-ink">{delta >= 0 ? "+" : ""}{delta.toFixed(2)} pts</p>
          <p className="mt-2 text-sm leading-7">Current spread between Step and the network baseline.</p>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        {[
          { key: "Step", value: validator, tone: "bg-accent" },
          { key: "Network avg", value: networkAverage, tone: "bg-cyan" }
        ].map((row) => (
          <div key={row.key}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-muted">{row.key}</span>
              <span className="font-mono text-ink">{formatPercent(row.value)}</span>
            </div>
            <div className="h-2 rounded-full bg-white/5">
              <div
                className={cn("h-2 rounded-full", row.tone)}
                style={{ width: `${(row.value / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
