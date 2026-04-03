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
        "section-shell px-4 py-12 sm:px-6 lg:px-8 lg:py-16",
        tone === "frame" && "grid-frame",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-[1400px]",
          tone === "elevated" &&
            "rounded-[36px] border border-line bg-canvas-elevated/55 p-6 shadow-panel sm:p-8 lg:p-10"
        )}
      >
        {children}
      </div>
    </section>
  );
}
