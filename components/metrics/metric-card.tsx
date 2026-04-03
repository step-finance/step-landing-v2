import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

type MetricCardProps = {
  label: string;
  value: string;
  footnote?: string;
  href?: string;
  className?: string;
};

export function MetricCard({
  label,
  value,
  footnote,
  href,
  className
}: MetricCardProps) {
  const content = (
    <div className={cn("panel p-5", href && "group hover:border-white/20", className)}>
      <p className="panel-label">{label}</p>
      <p className="mt-4 font-mono text-2xl font-semibold tracking-[-0.03em] text-ink">
        {value}
      </p>
      {footnote ? (
        <div className="mt-4 inline-flex items-center gap-2 text-sm text-muted">
          <span>{footnote}</span>
          {href ? <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /> : null}
        </div>
      ) : null}
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} target="_blank" rel="noreferrer">
      {content}
    </Link>
  );
}
