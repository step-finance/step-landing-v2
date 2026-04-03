import { cn } from "@/lib/utils";

type PerformanceGaugeCardProps = {
  label: string;
  value: string;
  progress: number | null;
  tone?: "positive" | "warning" | "critical" | "neutral";
  footnote?: string;
};

const toneClasses: Record<NonNullable<PerformanceGaugeCardProps["tone"]>, string> = {
  positive: "text-accent",
  warning: "text-amber",
  critical: "text-orange",
  neutral: "text-muted/75"
};

function clamp(value: number) {
  return Math.max(0, Math.min(100, value));
}

export function PerformanceGaugeCard({
  label,
  value,
  progress,
  tone = "positive",
  footnote
}: PerformanceGaugeCardProps) {
  const radius = 44;
  const circumference = Math.PI * radius;
  const normalized = progress == null ? 0 : clamp(progress);
  const dashOffset = circumference - (normalized / 100) * circumference;

  return (
    <div className="rounded-[20px] border border-white/[0.07] bg-canvas/66 p-4">
      <div className="flex justify-center">
        <svg viewBox="0 0 120 72" className="h-[76px] w-[120px]" aria-hidden="true">
          <path
            d="M16 60 A44 44 0 0 1 104 60"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M16 60 A44 44 0 0 1 104 60"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className={cn("transition-all duration-500", toneClasses[tone])}
          />
        </svg>
      </div>
      <div className="-mt-2 text-center">
        <p className="font-mono text-[1.35rem] font-semibold tracking-[-0.04em] text-ink">{value}</p>
        <p className="mt-2 text-sm font-medium text-ink">{label}</p>
        {footnote ? <p className="mt-1 text-xs leading-5 text-muted/82">{footnote}</p> : null}
      </div>
    </div>
  );
}
