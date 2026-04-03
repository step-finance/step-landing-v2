import { ArrowUpRight } from "lucide-react";

import { ButtonLink } from "@/components/layout/button-link";

type StickyStakeBarProps = {
  href: string;
  statusLabel: string;
};

export function StickyStakeBar({ href, statusLabel }: StickyStakeBarProps) {
  return (
    <div className="sticky bottom-3 z-30 mt-8 px-2 sm:bottom-4 sm:px-0">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 rounded-[28px] border border-line bg-canvas-strong/92 p-4 shadow-panel backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="panel-label">Delegate</p>
          <p className="mt-1 text-sm leading-6 text-muted">{statusLabel}</p>
        </div>
        <ButtonLink href={href} external className="sm:min-w-[240px]">
          Delegate externally
          <ArrowUpRight className="h-4 w-4" />
        </ButtonLink>
      </div>
    </div>
  );
}
