import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getValidatorConfig } from "@/lib/validator/config";
import { siteConfig } from "@/lib/site-config";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const validator = getValidatorConfig();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute left-[-10%] top-[-5%] h-72 w-72 rounded-full bg-cyan/10 blur-3xl" />
        <div className="absolute right-[-6%] top-[12%] h-80 w-80 rounded-full bg-accent/6 blur-3xl" />
        <div className="absolute bottom-0 left-[28%] h-72 w-72 rounded-full bg-orange/5 blur-3xl" />
      </div>
      <SiteHeader
        items={siteConfig.nav}
        primaryCtaHref={validator.externalStakeUrl}
      />
      <main>{children}</main>
      <SiteFooter
        explorerLinks={validator.explorerUrls}
        externalStakeUrl={validator.externalStakeUrl}
      />
    </div>
  );
}
