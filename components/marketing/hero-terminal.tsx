import { ArrowUpRight, ShieldCheck, Waves } from "lucide-react";

import { ButtonLink } from "@/components/layout/button-link";
import { DataFreshnessBadge } from "@/components/trust/data-freshness-badge";
import { cn, formatCompact, formatPercent } from "@/lib/utils";
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
    <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-canvas-strong/85 p-8 shadow-panel sm:p-10 lg:p-14">
      <div className="pointer-events-none absolute inset-0 bg-hero-grid bg-[length:72px_72px] opacity-[0.08]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-accent/10 to-transparent" />
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full">
        <div className="absolute right-[8%] top-[16%] h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute left-[5%] top-[32%] h-48 w-48 rounded-full bg-cyan/15 blur-3xl" />
      </div>

      <div className="relative grid gap-10 xl:grid-cols-[1.15fr,0.85fr]">
        <div className="max-w-3xl">
          <p className="panel-label">STEP VALIDATOR</p>
          <h1 className="mt-5 text-5xl font-semibold leading-[1.02] text-ink sm:text-6xl">
            {headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8">{subheadline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/validator">Stake with Step</ButtonLink>
            <ButtonLink href="/metrics" variant="secondary">
              View Live Metrics
            </ButtonLink>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
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
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                label: "Commission",
                value: formatPercent(snapshot.validator.commission),
                tone: "text-accent"
              },
              {
                label: "Delegated stake",
                value: `${formatCompact(snapshot.validator.activatedStakeSol)} SOL`,
                tone: "text-ink"
              },
              {
                label: "Uptime",
                value: formatPercent(snapshot.validator.uptime),
                tone: "text-cyan"
              }
            ].map((item) => (
              <div key={item.label} className="rounded-[24px] border border-line bg-white/[0.03] p-4">
                <p className="panel-label">{item.label}</p>
                <p className={cn("mt-3 font-mono text-2xl font-semibold", item.tone)}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative panel-strong overflow-hidden p-6">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-10 animate-scan-line bg-gradient-to-b from-accent/10 to-transparent" />
          <div className="flex items-center justify-between">
            <div>
              <p className="panel-label">Terminal preview</p>
              <h2 className="mt-3 text-2xl font-semibold text-ink">Live validator snapshot</h2>
            </div>
            <a
              href={snapshot.validator.explorerUrls.validatorsApp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-accent hover:text-[#5fffd3]"
            >
              Explorer links
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { label: "Stake rank", value: `#${snapshot.validator.stakeRank}` },
              { label: "Last vote", value: `${snapshot.validator.lastVoteSlot}` },
              { label: "Est. APY", value: formatPercent(snapshot.validator.apyEstimate) },
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
      </div>
    </div>
  );
}
