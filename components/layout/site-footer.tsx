import Link from "next/link";

import { BrandLogo } from "@/components/brand/brand-logo";
import { siteConfig } from "@/lib/site-config";

type SiteFooterProps = {
  explorerLinks: {
    solscan: string;
    explorer: string;
    validatorsApp: string;
  };
  externalStakeUrl: string;
};

export function SiteFooter({ explorerLinks, externalStakeUrl }: SiteFooterProps) {
  return (
    <footer className="px-4 pb-8 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px] rounded-[30px] border border-white/[0.07] bg-canvas-elevated/68 p-7 shadow-panel sm:p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-lg">
            <BrandLogo className="text-white/90" />
            <p className="mt-4 max-w-md text-sm leading-7">
              A long-running Solana validator backed by Step's work across the ecosystem since early 2021.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={externalStakeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-white/[0.08] px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-muted/88 hover:bg-white/[0.04] hover:text-ink"
              >
                Delegate to Step
              </Link>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="panel-label mb-3">Navigate</p>
              <div className="flex flex-col gap-2">
                {siteConfig.nav.map((item) => (
                  <Link key={item.href} href={item.href} className="text-sm text-muted hover:text-ink">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="panel-label mb-3">Validation</p>
              <div className="flex flex-col gap-2">
                <Link href={externalStakeUrl} target="_blank" rel="noreferrer" className="text-sm text-muted hover:text-ink">
                  Delegate
                </Link>
                <Link href={explorerLinks.solscan} target="_blank" rel="noreferrer" className="text-sm text-muted hover:text-ink">
                  Solscan
                </Link>
                <Link href={explorerLinks.explorer} target="_blank" rel="noreferrer" className="text-sm text-muted hover:text-ink">
                  Solana Explorer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
