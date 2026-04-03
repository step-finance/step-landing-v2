import type { ValidatorSource } from "@/lib/validator/schema";
import { formatRelativeTime } from "@/lib/utils";

type DataSourceDisclosureProps = {
  sources: ValidatorSource[];
};

export function DataSourceDisclosure({ sources }: DataSourceDisclosureProps) {
  return (
    <div className="panel p-6">
      <div>
        <div>
          <p className="panel-label">Sources</p>
          <p className="mt-3 max-w-xl text-sm leading-7">
            Validator metrics are normalized on the server so the site stays fast and explicit about
            freshness.
          </p>
        </div>
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
