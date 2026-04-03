import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageSectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "default" | "elevated" | "frame";
};

export function PageSection({
  id,
  children,
  className,
  tone = "default"
}: PageSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "section-shell px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12",
        tone === "frame" && "grid-frame",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-[1400px]",
          tone === "elevated" &&
            "rounded-[34px] border border-white/[0.07] bg-canvas-elevated/48 p-5 shadow-panel sm:p-6 lg:p-8"
        )}
      >
        {children}
      </div>
    </section>
  );
}
