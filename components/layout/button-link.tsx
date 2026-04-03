import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const buttonLinkStyles = cva(
  "inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold tracking-[0.02em] transition duration-200 focus-visible:outline-none",
  {
    variants: {
      variant: {
        primary:
          "border-accent/40 bg-accent text-canvas shadow-[0_0_0_1px_rgba(0,248,183,0.16),0_14px_44px_rgba(0,248,183,0.12)] hover:border-accent hover:bg-[#5fffd3]",
        secondary:
          "border-line bg-white/[0.04] text-ink hover:border-white/20 hover:bg-white/[0.08]",
        ghost:
          "border-transparent bg-transparent text-ink hover:border-line hover:bg-white/5"
      }
    },
    defaultVariants: {
      variant: "primary"
    }
  }
);

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
} & VariantProps<typeof buttonLinkStyles>;

export function ButtonLink({
  href,
  children,
  className,
  external,
  variant
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(buttonLinkStyles({ variant }), className)}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {children}
    </Link>
  );
}
