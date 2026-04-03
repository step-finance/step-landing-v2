import Link from "next/link";

import { BrandLogo } from "@/components/brand/brand-logo";
import { ButtonLink } from "@/components/layout/button-link";
import { MobileNavSheet } from "@/components/layout/mobile-nav-sheet";

type SiteHeaderProps = {
  items: { href: string; label: string }[];
  primaryCtaHref: string;
};

export function SiteHeader({ items, primaryCtaHref }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between rounded-full border border-white/[0.08] bg-canvas-strong/72 px-4 py-3 shadow-panel backdrop-blur-md sm:px-5">
        <BrandLogo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm text-muted/88 hover:bg-white/[0.04] hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <ButtonLink href={primaryCtaHref} external>
            Delegate to Step
          </ButtonLink>
        </div>
        <MobileNavSheet items={items} primaryCtaHref={primaryCtaHref} />
      </div>
    </header>
  );
}
