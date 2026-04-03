import { ShieldCheck } from "lucide-react";

import type { DisclosureItem } from "@/content/site-content";

type SecurityChecklistProps = {
  items: DisclosureItem[];
};

export function SecurityChecklist({ items }: SecurityChecklistProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <div key={item.title} className="panel p-5">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl border border-accent/20 bg-accent/10 p-3 text-accent">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-7">{item.body}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
