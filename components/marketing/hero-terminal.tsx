import { ArrowUpRight, ShieldCheck, Waves } from "lucide-react";

import { ButtonLink } from "@/components/layout/button-link";
import { DataFreshnessBadge } from "@/components/trust/data-freshness-badge";
import { cn, formatAddress, formatCompact, formatPercent, formatRelativeTime } from "@/lib/utils";
import type { ValidatorSnapshot } from "@/lib/validator/schema";

type HeroTerminalProps = {
  snapshot: ValidatorSnapshot;
  headline: string;
  subheadline: string;
};

export function HeroTerminal({
  snapshot,
  headline,
  subheadline
}: HeroTerminalProps) {
  return (
    <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-canvas-strong/88 p-8 shadow-panel sm:p-10 lg:p-12">
      <div className="pointer-events-none absolute inset-0 bg-hero-grid bg-[length:72px_72px] opacity-[0.08]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-accent/8 to-transparent" />
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full">
        <div className="absolute right-[8%] top-[16%] h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute left-[5%] top-[32%] h-40 w-40 rounded-full bg-cyan/10 blur-3xl" />
      </div>

      <div className="relative grid gap-8 xl:grid-cols-[1.18fr,0.82fr]">
        <div className="max-w-3xl">
          <p className="panel-label">STEP VALIDATOR</p>
          <h1 className="mt-4 max-w-2xl text-[3rem] font-semibold leading-[0.98] text-ink sm:text-[4rem]">
            {headline}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 sm:text-lg">{subheadline}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href="/validator">Delegate to Step</ButtonLink>
            <ButtonLink href="/metrics" variant="secondary">
              View Step metrics
            </ButtonLink>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <DataFreshnessBadge
              updatedAt={snapshot.meta.updatedAt}
              state={snapshot.meta.freshnessState}
            />
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-3 py-2 text-xs text-muted">
              <ShieldCheck className="h-4 w-4 text-accent" />
              Public by default
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-3 py-2 text-xs text-muted">
              <Waves className="h-4 w-4 text-cyan" />
              Solana mainnet
            </div>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              {
                label: "Step commission",
                value: formatPercent(snapshot.validator.commission),
                tone: "text-accent",
                note: "Current commission"
              },
              {
                label: "Step stake",
                value: `${formatCompact(snapshot.validator.activatedStakeSol)} SOL`,
                tone: "text-ink",
                note: "Activated stake"
              },
              {
                label: "Vote uptime",
                value: formatPercent(snapshot.validator.uptime),
                tone: "text-cyan",
                note: "Recent voting health"
              }
            ].map((item) => (
              <div key={item.label} className="rounded-[24px] border border-line bg-white/[0.03] p-4">
                <p className="panel-label">{item.label}</p>
                <p className={cn("mt-3 font-mono text-2xl font-semibold", item.tone)}>{item.value}</p>
                <p className="mt-2 text-xs leading-6 text-muted">{item.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative panel-strong overflow-hidden p-6">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
          <div className="flex items-center justify-between">
            <div>
              <p className="panel-label">STEP VOTE ACCOUNT</p>
              <h2 className="mt-3 text-2xl font-semibold text-ink">Live Step validator snapshot</h2>
            </div>
            <a
              href={snapshot.validator.explorerUrls.validatorsApp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-accent hover:text-[#5fffd3]"
            >
              Open vote account
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-6 grid gap-3">
            <div className="rounded-[22px] border border-line bg-canvas/76 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="panel-label">Step vote account</p>
                <span className="text-xs uppercase tracking-[0.2em] text-muted">Mainnet</span>
              </div>
              <p className="mt-3 font-mono text-sm text-ink">{formatAddress(snapshot.validator.voteAccount, 8, 8)}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "Step rank", value: `#${snapshot.validator.stakeRank}` },
                { label: "Last vote age", value: formatRelativeTime(snapshot.validator.lastVoteAt) },
                { label: "Est. yield", value: formatPercent(snapshot.validator.apyEstimate) },
                {
                  label: "Epoch rewards",
                  value: `${formatCompact(snapshot.validator.recentEpochRewardsSol, 2)} SOL`
                }
              ].map((item) => (
                <div key={item.label} className="rounded-[22px] border border-line bg-canvas/70 p-4">
                  <p className="panel-label">{item.label}</p>
                  <p className="mt-3 font-mono text-xl text-ink">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 grid gap-3 border-t border-white/10 pt-5 text-sm sm:grid-cols-3">
            {[
              { label: "Vote slot", value: `${snapshot.validator.lastVoteSlot}` },
              { label: "Snapshot age", value: formatRelativeTime(snapshot.meta.updatedAt) },
              { label: "Validator state", value: snapshot.validator.health }
            ].map((item) => (
              <div key={item.label}>
                <p className="panel-label">{item.label}</p>
                <p className="mt-2 font-mono text-sm text-ink">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
