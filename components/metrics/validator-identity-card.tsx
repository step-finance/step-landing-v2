import { Copy, ExternalLink } from "lucide-react";
import Link from "next/link";

import { ButtonLink } from "@/components/layout/button-link";
import { cn, formatAddress } from "@/lib/utils";

type ValidatorIdentityCardProps = {
  name: string;
  voteAccount: string;
  identityPubkey: string;
  commission: string;
  healthLabel: string;
  lastVoteLabel: string;
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
  lastVoteLabel,
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
            Public validator identity, explorer-verifiable links, and a direct delegation path for
            the current MVP.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-[24px] border border-line bg-white/[0.03] p-4">
              <p className="panel-label">Vote account</p>
              <p className="mt-3 break-all font-mono text-sm text-ink">{voteAccount}</p>
              <p className="mt-2 text-xs text-muted">{formatAddress(voteAccount, 8, 8)}</p>
            </div>
            <div className="rounded-[24px] border border-line bg-white/[0.03] p-4">
              <p className="panel-label">Node identity</p>
              <p className="mt-3 break-all font-mono text-sm text-ink">{identityPubkey}</p>
              <p className="mt-2 text-xs text-muted">{formatAddress(identityPubkey, 8, 8)}</p>
            </div>
          </div>
        </div>
        <div className="w-full max-w-md rounded-[28px] border border-line bg-canvas/80 p-5">
          <p className="panel-label">Delegation</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-white/[0.03] px-4 py-3">
              <span className="text-sm text-muted">Commission</span>
              <p className="mt-2 font-mono text-lg text-ink">{commission}</p>
            </div>
            <div className="rounded-2xl border border-line bg-white/[0.03] px-4 py-3">
              <span className="text-sm text-muted">Health</span>
              <p className="mt-2 text-lg capitalize text-ink">{healthLabel}</p>
            </div>
            <div className="rounded-2xl border border-line bg-white/[0.03] px-4 py-3 sm:col-span-2">
              <span className="text-sm text-muted">Last vote</span>
              <p className="mt-2 font-mono text-lg text-ink">{lastVoteLabel}</p>
            </div>
          </div>
          <ButtonLink href={externalStakeUrl} external className="mt-5 w-full">
            Delegate to Step
          </ButtonLink>
          <p className="mt-3 text-xs leading-6 text-muted">
            Opens an external delegation page for the current MVP. Direct on-site staking comes
            later.
          </p>
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
            Wallet-native controls are intentionally deferred until the staking flow is ready.
          </p>
        </div>
      </div>
    </div>
  );
}
