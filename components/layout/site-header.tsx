import Link from "next/link";

import { BrandLogo } from "@/components/brand/brand-logo";
import { ButtonLink } from "@/components/layout/button-link";
import { MobileNavSheet } from "@/components/layout/mobile-nav-sheet";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  items: { href: string; label: string }[];
  liveStatus: {
    label: string;
    status: "healthy" | "degraded" | "stale";
  };
};

export function SiteHeader({ items, liveStatus }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between rounded-full border border-line bg-canvas-strong/70 px-5 py-3 shadow-panel backdrop-blur-md">
        <BrandLogo />
        <nav className="hidden items-center gap-1 lg:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-muted hover:bg-white/5 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-3 py-2 text-xs text-muted">
            <span
              className={cn(
                "h-2.5 w-2.5 rounded-full",
                liveStatus.status === "healthy" && "bg-accent animate-pulse-soft",
                liveStatus.status === "degraded" && "bg-amber",
                liveStatus.status === "stale" && "bg-orange"
              )}
            />
            <span>{liveStatus.label}</span>
          </div>
          <ButtonLink href="/validator">Stake with Step</ButtonLink>
        </div>
        <MobileNavSheet items={items} />
      </div>
    </header>
  );
}
