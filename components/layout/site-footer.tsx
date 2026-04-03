import Link from "next/link";

import { BrandLogo } from "@/components/brand/brand-logo";
import { siteConfig } from "@/lib/site-config";

type SiteFooterProps = {
  explorerLinks: {
    solscan: string;
    explorer: string;
    validatorsApp: string;
  };
};

export function SiteFooter({ explorerLinks }: SiteFooterProps) {
  return (
    <footer className="px-4 pb-8 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px] rounded-[32px] border border-line bg-canvas-elevated/72 p-7 shadow-panel sm:p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-lg">
            <BrandLogo className="text-white/90" />
            <p className="mt-4 max-w-md text-sm leading-7">
              Step now ships a validator-first surface: public identity, live metrics, and a clear
              delegation path.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={explorerLinks.explorer}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-line px-3 py-2 text-xs uppercase tracking-[0.2em] text-muted hover:bg-white/[0.05] hover:text-ink"
              >
                Open vote account
              </Link>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
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
                <Link href={explorerLinks.solscan} target="_blank" rel="noreferrer" className="text-sm text-muted hover:text-ink">
                  Solscan
                </Link>
                <Link href={explorerLinks.explorer} target="_blank" rel="noreferrer" className="text-sm text-muted hover:text-ink">
                  Solana Explorer
                </Link>
                <Link href={explorerLinks.validatorsApp} target="_blank" rel="noreferrer" className="text-sm text-muted hover:text-ink">
                  validators.app
                </Link>
              </div>
            </div>
            <div>
              <p className="panel-label mb-3">Site</p>
              <div className="flex flex-col gap-2">
                <Link href="/status" className="text-sm text-muted hover:text-ink">
                  Status
                </Link>
                <Link href="/legal/privacy" className="text-sm text-muted hover:text-ink">
                  Privacy
                </Link>
                <Link href="/legal/terms" className="text-sm text-muted hover:text-ink">
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
