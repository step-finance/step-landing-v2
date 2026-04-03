import Image from "next/image";

import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  variant?: "color" | "mono-light" | "mono-dark";
  decorative?: boolean;
};

const variantMap = {
  color: "/brand/step/step-mark-color.svg",
  "mono-light": "/brand/step/step-mark-mono-light.svg",
  "mono-dark": "/brand/step/step-mark-mono-dark.svg"
} as const;

export function BrandMark({
  className,
  variant = "color",
  decorative = true
}: BrandMarkProps) {
  return (
    <Image
      src={variantMap[variant]}
      alt={decorative ? "" : "Step"}
      aria-hidden={decorative}
      width={1000}
      height={1000}
      className={cn("h-auto w-full", className)}
      priority
    />
  );
}
