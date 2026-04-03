"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

import { cn, formatAddress } from "@/lib/utils";

type AddressCopyChipProps = {
  label: string;
  value: string;
  meta?: string;
};

export function AddressCopyChip({
  label,
  value,
  meta
}: AddressCopyChipProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeout = window.setTimeout(() => setCopied(false), 1400);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group rounded-[18px] border border-white/[0.07] bg-canvas/68 p-4 text-left transition hover:border-white/[0.12] hover:bg-white/[0.03]"
      aria-label={`Copy ${label}`}
      title={value}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="panel-label">{label}</p>
        <span className="text-[10px] uppercase tracking-[0.18em] text-muted/78">
          {copied ? "Copied" : meta ?? ""}
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="font-mono text-sm text-ink sm:text-[15px]">
          {formatAddress(value, 8, 8)}
        </p>
        <span
          className={cn(
            "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-muted/88 transition",
            copied && "border-accent/35 bg-accent/10 text-accent"
          )}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </span>
      </div>
    </button>
  );
}
