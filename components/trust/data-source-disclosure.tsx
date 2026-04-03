import Link from "next/link";

import type { ValidatorSource } from "@/lib/validator/schema";
import { formatRelativeTime } from "@/lib/utils";

type DataSourceDisclosureProps = {
  sources: ValidatorSource[];
  methodologyHref?: string;
};

export function DataSourceDisclosure({
  sources,
  methodologyHref = "/docs/metrics-methodology"
}: DataSourceDisclosureProps) {
  return (
    <div className="panel p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="panel-label">Sources</p>
          <p className="mt-3 max-w-xl text-sm leading-7">
            Metrics are normalized on the server so the UI can stay fast, static-first, and clear
            about freshness.
          </p>
        </div>
        <Link href={methodologyHref} className="text-sm font-medium text-accent hover:text-[#5fffd3]">
          Read methodology
        </Link>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {sources.map((source) => (
          <div key={`${source.label}-${source.kind}`} className="rounded-[22px] border border-line bg-white/[0.03] p-4">
            <p className="text-sm font-medium text-ink">{source.label}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">{source.kind}</p>
            <p className="mt-3 text-sm text-muted">Updated {formatRelativeTime(source.updatedAt)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
