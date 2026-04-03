import { ArrowUpRight } from "lucide-react";

import { ButtonLink } from "@/components/layout/button-link";
import { AddressCopyChip } from "@/components/metrics/address-copy-chip";
import { PerformanceGaugeCard } from "@/components/metrics/performance-gauge-card";
import { formatCompact, formatPercent, formatRelativeTime } from "@/lib/utils";
import type { ValidatorSnapshot } from "@/lib/validator/schema";

type HeroTerminalProps = {
  snapshot: ValidatorSnapshot;
  headline: string;
  subheadline: string;
};

function formatMetricValue(value: number | null, formatter: (value: number) => string) {
  return value == null ? "Unavailable" : formatter(value);
}

function formatHealth(value: ValidatorSnapshot["validator"]["health"]) {
  if (value === "unavailable") {
    return "Unavailable";
  }

  return value[0].toUpperCase() + value.slice(1);
}

function healthProgress(value: ValidatorSnapshot["validator"]["health"]) {
  if (value === "healthy") {
    return 100;
  }

  if (value === "degraded") {
    return 62;
  }

  if (value === "stale") {
    return 28;
  }

  return null;
}

function healthTone(value: ValidatorSnapshot["validator"]["health"]) {
  if (value === "healthy") {
    return "positive" as const;
  }

  if (value === "degraded") {
    return "warning" as const;
  }

  if (value === "stale") {
    return "critical" as const;
  }

  return "neutral" as const;
}

export function HeroTerminal({
  snapshot,
  headline,
  subheadline
}: HeroTerminalProps) {
  return (
    <div className="relative overflow-hidden rounded-[36px] border border-white/[0.08] bg-canvas-strong/88 p-7 shadow-panel sm:p-9 lg:p-10">
      <div className="pointer-events-none absolute inset-0 bg-hero-grid bg-[length:72px_72px] opacity-[0.05]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.03] to-transparent" />
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full">
        <div className="absolute right-[10%] top-[12%] h-48 w-48 rounded-full bg-accent/6 blur-3xl" />
        <div className="absolute left-[6%] top-[28%] h-36 w-36 rounded-full bg-cyan/7 blur-3xl" />
      </div>

      <div className="relative grid gap-6 xl:grid-cols-[1.16fr,0.84fr] xl:gap-7">
        <div className="max-w-3xl">
          <p className="panel-label">STEP VALIDATOR</p>
          <h1 className="mt-4 max-w-[11ch] text-balance text-[2.85rem] font-semibold leading-[0.96] text-ink sm:text-[3.65rem] lg:text-[4rem]">
            {headline}
          </h1>
          <p className="mt-5 max-w-[38rem] text-[15px] leading-[1.82] text-muted/92 sm:text-[17px]">
            {subheadline}
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            <ButtonLink href={snapshot.validator.externalStakeUrl} external>
              Delegate to Step
            </ButtonLink>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {[
              {
                label: "Commission",
                value: formatMetricValue(snapshot.validator.commission, (value) => formatPercent(value, 0)),
                note: "Current validator commission"
              },
              {
                label: "MEV / Jito commission",
                value: formatMetricValue(snapshot.validator.mevCommission, (value) => formatPercent(value, 0)),
                note: "Jito tip commission"
              },
              {
                label: "Activated stake",
                value: formatMetricValue(snapshot.validator.activatedStakeSol, (value) => `${formatCompact(value)} SOL`),
                note: "Live delegated stake"
              },
              {
                label: "Estimated APY",
                value: formatMetricValue(snapshot.validator.estimatedApy, (value) => formatPercent(value, 2)),
                note:
                  snapshot.validator.jitoApy == null
                    ? "Live StakeWiz estimate"
                    : `Includes ~${formatPercent(snapshot.validator.jitoApy, 2)} Jito MEV`
              },
              {
                label: "Stake rank",
                value: snapshot.validator.stakeRank == null ? "Unavailable" : `#${snapshot.validator.stakeRank}`,
                note: "Current position by activated stake"
              },
              {
                label: "Validator age",
                value: snapshot.validator.ageEpochs == null ? `Epoch ${snapshot.validator.firstStakeEpoch}+` : `${snapshot.validator.ageEpochs} epochs`,
                note:
                  snapshot.validator.ageHuman == null
                    ? `Since first stake in epoch ${snapshot.validator.firstStakeEpoch}`
                    : `${snapshot.validator.ageHuman} since first stake`
              }
            ].map((item) => (
              <div key={item.label} className="rounded-[22px] border border-white/[0.07] bg-white/[0.024] p-4">
                <p className="panel-label">{item.label}</p>
                <p className="mt-3 font-mono text-[1.8rem] font-semibold tracking-[-0.04em] text-ink">
                  {item.value}
                </p>
                <p className="mt-2 text-xs leading-6 text-muted/84">{item.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative panel-strong overflow-hidden p-5 sm:p-6">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="panel-label">LIVE SNAPSHOT</p>
              <h2 className="mt-3 text-[1.65rem] font-semibold leading-[1.08] text-ink sm:text-[1.85rem]">
                Public validator identity
              </h2>
            </div>
            <a
              href={snapshot.validator.explorerUrls.solscan}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-accent/92 hover:text-[#5fffd3]"
            >
              Open explorer
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-6 grid gap-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <AddressCopyChip
                label="Vote account"
                value={snapshot.validator.voteAccount}
                meta="Mainnet"
              />
              <AddressCopyChip
                label="Node identity"
                value={snapshot.validator.identityPubkey}
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <PerformanceGaugeCard
                label="Skip rate"
                value={snapshot.validator.skipRate == null ? "Unavailable" : formatPercent(snapshot.validator.skipRate, 1)}
                progress={snapshot.validator.skipRate == null ? null : 100 - snapshot.validator.skipRate}
                tone={
                  snapshot.validator.skipRate == null
                    ? "neutral"
                    : snapshot.validator.skipRate <= 1
                      ? "positive"
                      : snapshot.validator.skipRate <= 3
                        ? "warning"
                        : "critical"
                }
                footnote="Lower is better"
              />
              <PerformanceGaugeCard
                label="Voting rate"
                value={snapshot.validator.votingRate == null ? "Unavailable" : formatPercent(snapshot.validator.votingRate, 1)}
                progress={snapshot.validator.votingRate}
                tone={
                  snapshot.validator.votingRate == null
                    ? "neutral"
                    : snapshot.validator.votingRate >= 95
                      ? "positive"
                      : snapshot.validator.votingRate >= 90
                        ? "warning"
                        : "critical"
                }
                footnote="StakeWiz vote success"
              />
              <PerformanceGaugeCard
                label="Uptime (30d)"
                value={snapshot.validator.uptime30d == null ? "Unavailable" : formatPercent(snapshot.validator.uptime30d, 2)}
                progress={snapshot.validator.uptime30d}
                tone={
                  snapshot.validator.uptime30d == null
                    ? "neutral"
                    : snapshot.validator.uptime30d >= 99
                      ? "positive"
                      : snapshot.validator.uptime30d >= 97
                        ? "warning"
                        : "critical"
                }
                footnote="StakeWiz 30 day uptime"
              />
              <PerformanceGaugeCard
                label="Health"
                value={formatHealth(snapshot.validator.health)}
                progress={healthProgress(snapshot.validator.health)}
                tone={healthTone(snapshot.validator.health)}
                footnote={
                  snapshot.validator.lastVoteAt
                    ? `Last vote ${formatRelativeTime(snapshot.validator.lastVoteAt)}`
                    : "Derived from recent vote activity"
                }
              />
            </div>
          </div>
          {!snapshot.meta.liveDataAvailable ? (
            <div className="mt-5 border-t border-white/[0.08] pt-4">
              <p className="text-sm leading-[1.8] text-muted/92">
                Live RPC data is unavailable right now. The vote account, identity, and explorer links remain available for verification.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
