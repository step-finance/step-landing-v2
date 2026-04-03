"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ButtonLink } from "@/components/layout/button-link";
import { cn } from "@/lib/utils";

type MobileNavSheetProps = {
  items: { href: string; label: string }[];
};

export function MobileNavSheet({ items }: MobileNavSheetProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      document.body.style.removeProperty("overflow");
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.removeProperty("overflow");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/5 text-ink"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      <button
        type="button"
        aria-hidden={!open}
        tabIndex={open ? 0 : -1}
        className={cn(
          "fixed inset-0 z-40 bg-canvas/70 backdrop-blur-sm transition",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setOpen(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "fixed inset-x-4 top-20 z-50 rounded-[28px] border border-line bg-canvas-strong/96 p-5 shadow-panel backdrop-blur-md transition",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <nav className="flex flex-col gap-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl border border-transparent px-4 py-3 text-sm font-medium text-ink hover:border-line hover:bg-white/5"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <ButtonLink href="/validator" className="mt-5 w-full">
          Delegate to Step
        </ButtonLink>
      </div>
    </div>
  );
}
