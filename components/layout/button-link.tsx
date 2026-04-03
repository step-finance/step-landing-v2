import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const buttonLinkStyles = cva(
  "inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold tracking-[0.01em] transition duration-200 focus-visible:outline-none",
  {
    variants: {
      variant: {
        primary:
          "border-accent/28 bg-accent text-canvas shadow-[0_0_0_1px_rgba(0,248,183,0.08),0_10px_28px_rgba(0,248,183,0.08)] hover:border-accent/42 hover:bg-[#46f7c7]",
        secondary:
          "border-white/[0.08] bg-white/[0.03] text-ink hover:border-white/[0.14] hover:bg-white/[0.05]",
        ghost:
          "border-transparent bg-transparent text-ink hover:border-white/[0.08] hover:bg-white/[0.04]"
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
