import type { ReactNode } from "react";

type ChartPanelProps = {
  title: string;
  body: string;
  meta: string;
  children: ReactNode;
};

export function ChartPanel({ title, body, meta, children }: ChartPanelProps) {
  return (
    <div className="panel-strong overflow-hidden p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="max-w-lg">
          <p className="panel-label">{meta}</p>
          <h3 className="mt-3 text-2xl font-semibold text-ink">{title}</h3>
          <p className="mt-3 text-sm leading-7">{body}</p>
        </div>
      </div>
      <div className="mt-8 h-64">{children}</div>
    </div>
  );
}
