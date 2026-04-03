import { Copy, ExternalLink } from "lucide-react";
import Link from "next/link";

import { ButtonLink } from "@/components/layout/button-link";
import { cn } from "@/lib/utils";

type ValidatorIdentityCardProps = {
  name: string;
  voteAccount: string;
  identityPubkey: string;
  commission: string;
  healthLabel: string;
  externalStakeUrl: string;
  explorerUrls: {
    solscan: string;
    explorer: string;
    validatorsApp: string;
  };
};

export function ValidatorIdentityCard({
  name,
  voteAccount,
  identityPubkey,
  commission,
  healthLabel,
  externalStakeUrl,
  explorerUrls
}: ValidatorIdentityCardProps) {
  return (
    <div className="panel-strong p-7">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="panel-label">Validator identity</p>
          <h1 className="mt-3 text-4xl font-semibold text-ink">{name}</h1>
          <p className="mt-4 max-w-xl text-base leading-7">
            Public validator identity, explorer-verifiable links, and an external delegation path
            that keeps MVP simple.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-[24px] border border-line bg-white/[0.03] p-4">
              <p className="panel-label">Vote account</p>
              <p className="mt-3 break-all font-mono text-sm text-ink">{voteAccount}</p>
            </div>
            <div className="rounded-[24px] border border-line bg-white/[0.03] p-4">
              <p className="panel-label">Identity</p>
              <p className="mt-3 break-all font-mono text-sm text-ink">{identityPubkey}</p>
            </div>
          </div>
        </div>
        <div className="w-full max-w-md rounded-[28px] border border-line bg-canvas/80 p-5">
          <p className="panel-label">Delegate</p>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between rounded-2xl border border-line bg-white/[0.03] px-4 py-3">
              <span className="text-sm text-muted">Commission</span>
              <span className="font-mono text-sm text-ink">{commission}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-line bg-white/[0.03] px-4 py-3">
              <span className="text-sm text-muted">Current state</span>
              <span className="text-sm text-ink">{healthLabel}</span>
            </div>
          </div>
          <ButtonLink href={externalStakeUrl} external className="mt-5 w-full">
            Delegate on external staking page
          </ButtonLink>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            {[
              { href: explorerUrls.solscan, label: "Solscan" },
              { href: explorerUrls.explorer, label: "Solana Explorer" },
              { href: explorerUrls.validatorsApp, label: "validators.app" }
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border border-line px-3 py-2 text-muted hover:bg-white/5 hover:text-ink"
                )}
              >
                {item.label}
                <ExternalLink className="h-4 w-4" />
              </Link>
            ))}
          </div>
          <p className="mt-4 inline-flex items-center gap-2 text-xs text-muted">
            <Copy className="h-4 w-4" />
            Copy actions can be added later when wallet and account flows land.
          </p>
        </div>
      </div>
    </div>
  );
}
