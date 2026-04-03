import Link from "next/link";

import { BrandMark } from "@/components/brand/brand-mark";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  href?: string;
  condensed?: boolean;
};

export function BrandLogo({
  className,
  href = "/",
  condensed = false
}: BrandLogoProps) {
  const content = (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span className={cn("relative block shrink-0", condensed ? "h-7 w-7" : "h-8 w-8")}>
        <BrandMark decorative variant="color" />
      </span>
      {!condensed ? (
        <span className="flex flex-col leading-none">
          <span className="font-display text-base font-bold tracking-[0.24em] text-ink">
            STEP
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
            Validator
          </span>
        </span>
      ) : null}
    </span>
  );

  return (
    <Link aria-label="Step home" href={href}>
      {content}
    </Link>
  );
}
