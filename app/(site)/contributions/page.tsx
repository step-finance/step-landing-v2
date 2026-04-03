import type { Metadata } from "next";
import Link from "next/link";

import {
  contributionHighlights,
  contributionMilestones,
  contributionReferences
} from "@/content/site-content";
import { ButtonLink } from "@/components/layout/button-link";
import { PageSection } from "@/components/layout/page-section";
import { SectionHeader } from "@/components/layout/section-header";
import { LegacyTimeline } from "@/components/marketing/legacy-timeline";
import { getValidatorConfig } from "@/lib/validator/config";

export const metadata: Metadata = {
  title: "Contributions | Step Validator",
  description:
    "Step's history across Solana products, analytics, media, events, and education since early 2021."
};

export default function ContributionsPage() {
  const validator = getValidatorConfig();

  return (
    <>
      <PageSection id="top" className="pb-4 pt-8 sm:pb-5 sm:pt-9 lg:pb-6">
        <div className="grid gap-6 xl:grid-cols-[0.94fr,1.06fr] xl:items-start">
          <SectionHeader
            eyebrow="CONTRIBUTIONS"
            title="Step's contributions to Solana."
            body="Step has been building on Solana since early 2021 across product, data, media, events, and education."
          />
          <div className="panel-strong p-5 sm:p-6">
            <p className="panel-label">OVERVIEW</p>
            <p className="mt-4 text-sm leading-[1.9] text-muted/92">
              Early Solana dashboard, analytics and API work, SolanaFloor, Crossroads, Allstars Academy, and later RWA work through Remora Markets.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                { label: "Started", value: "Early 2021" },
                { label: "Consumer product", value: "Portfolio dashboard" },
                { label: "Data", value: "Analytics + API" },
                { label: "RWA expansion", value: "Remora Markets" },
                { label: "Ecosystem work", value: "Media, events, education" }
              ].map((item) => (
                <div key={item.label} className="rounded-[20px] border border-white/[0.07] bg-white/[0.025] p-4">
                  <p className="panel-label">{item.label}</p>
                  <p className="mt-3 text-[1.02rem] font-semibold text-ink">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <ButtonLink href={validator.externalStakeUrl} external>
                Delegate to Step
              </ButtonLink>
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection tone="elevated" className="py-5 lg:py-6">
        <div className="space-y-6">
          <SectionHeader
            eyebrow="CORE WORK"
            title="Products, media, events, and education."
            body="A brief record of the main areas Step contributed to across Solana."
          />
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {contributionHighlights.map((item) => (
              <div key={item.title} className="rounded-[24px] border border-white/[0.07] bg-white/[0.02] p-5">
                <p className="panel-label">{item.period}</p>
                <h2 className="mt-3 text-[1.1rem] font-semibold text-ink">{item.title}</h2>
                <p className="mt-3 text-sm leading-[1.85] text-muted/92">{item.body}</p>
                <p className="mt-4 border-t border-white/[0.07] pt-4 text-xs leading-[1.8] text-muted/82">
                  {item.proof}
                </p>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection className="pb-6 pt-4 sm:pb-8">
        <div className="grid gap-5 xl:grid-cols-[0.72fr,1.28fr]">
          <SectionHeader
            eyebrow="TIMELINE"
            title="Step on Solana since 2021."
            body="A short timeline of the products, media, events, and community work behind the brand."
          />
          <LegacyTimeline items={contributionMilestones} />
        </div>
      </PageSection>

      <PageSection tone="elevated" className="pb-8 pt-4 sm:pb-10">
        <div className="space-y-6">
          <SectionHeader
            eyebrow="PUBLIC REFERENCES"
            title="Selected coverage and references."
            body="Official docs and external coverage tied to the work above."
          />
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {contributionReferences.map((item) => (
              <div key={`${item.source}-${item.title}`} className="rounded-[24px] border border-white/[0.07] bg-white/[0.02] p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="panel-label">{item.source}</p>
                  <span className="text-[11px] text-muted/80">{item.year}</span>
                </div>
                <h2 className="mt-3 text-[1.02rem] font-semibold text-ink">{item.title}</h2>
                <p className="mt-3 text-sm leading-[1.85] text-muted/92">{item.body}</p>
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center text-sm font-medium text-accent/92 hover:text-[#5fffd3]"
                >
                  Open source
                </Link>
              </div>
            ))}
          </div>
        </div>
      </PageSection>
    </>
  );
}
