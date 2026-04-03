import type { ValueProp } from "@/content/site-content";
import { cn } from "@/lib/utils";

type WhyStakeGridProps = {
  items: ValueProp[];
};

const accents = {
  accent: "border-accent/20 bg-accent/10 text-accent",
  mint: "border-mint/20 bg-mint/10 text-mint",
  cyan: "border-cyan/20 bg-cyan/10 text-cyan",
  amber: "border-amber/20 bg-amber/10 text-amber",
  orange: "border-orange/20 bg-orange/10 text-orange"
};

export function WhyStakeGrid({ items }: WhyStakeGridProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <div key={item.title} className="panel h-full p-5">
          <div className={cn("inline-flex rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.22em]", accents[item.accent])}>
            Proof
          </div>
          <h3 className="mt-4 text-xl font-semibold leading-tight text-ink">{item.title}</h3>
          <p className="mt-3 text-sm leading-7">{item.body}</p>
          <div className="mt-5 rounded-[20px] border border-line bg-white/[0.03] p-4">
            <p className="panel-label">What the site shows</p>
            <p className="mt-3 text-sm leading-7 text-ink">{item.proof}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
