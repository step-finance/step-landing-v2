import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/lib/site-config";
import type { ValidatorSnapshot } from "@/lib/validator/schema";

type SiteShellProps = {
  children: ReactNode;
  snapshot: ValidatorSnapshot;
};

export function SiteShell({ children, snapshot }: SiteShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute left-[-10%] top-[-5%] h-72 w-72 rounded-full bg-cyan/20 blur-3xl" />
        <div className="absolute right-[-6%] top-[12%] h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 left-[28%] h-72 w-72 rounded-full bg-orange/10 blur-3xl" />
      </div>
      <SiteHeader
        items={siteConfig.nav}
        liveStatus={{
          label:
            snapshot.meta.freshnessState === "live"
              ? "Live validator data"
              : "Data delayed",
          status: snapshot.validator.health
        }}
      />
      <main>{children}</main>
      <SiteFooter explorerLinks={snapshot.validator.explorerUrls} />
    </div>
  );
}
