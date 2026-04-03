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
    <div
      className={cn(
        "panel p-4 sm:p-5",
        href && "group transition-colors hover:border-white/[0.14]",
        className
      )}
    >
      <p className="panel-label">{label}</p>
      <p className="mt-3 font-mono text-[1.75rem] font-semibold tracking-[-0.045em] text-ink sm:text-[2.02rem]">
        {value}
      </p>
      {footnote ? (
        <div className="mt-2.5 inline-flex items-center gap-2 text-[13px] leading-6 text-muted/88">
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
