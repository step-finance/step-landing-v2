type StatusFeed = {
  title: string;
  status: string;
  detail: string;
};

type Incident = {
  date: string;
  title: string;
  body: string;
};

type StatusPanelProps = {
  feeds: StatusFeed[];
  incidents: Incident[];
};

export function StatusPanel({ feeds, incidents }: StatusPanelProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
      <div className="panel-strong p-6">
        <p className="panel-label">System surfaces</p>
        <div className="mt-6 space-y-4">
          {feeds.map((feed) => (
            <div key={feed.title} className="rounded-[24px] border border-line bg-white/[0.03] p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-ink">{feed.title}</h3>
                <span className="rounded-full border border-line bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted">
                  {feed.status}
                </span>
              </div>
              <p className="mt-3 text-sm leading-7">{feed.detail}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="panel p-6">
        <p className="panel-label">Public notes</p>
        <div className="mt-6 space-y-4">
          {incidents.map((incident) => (
            <div key={`${incident.date}-${incident.title}`} className="rounded-[24px] border border-line bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">{incident.date}</p>
              <h3 className="mt-2 text-lg font-semibold text-ink">{incident.title}</h3>
              <p className="mt-3 text-sm leading-7">{incident.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
