import type { Metadata } from "next";

import { PageSection } from "@/components/layout/page-section";
import { SectionHeader } from "@/components/layout/section-header";
import { getValidatorSnapshot } from "@/lib/validator/queries";

export const metadata: Metadata = {
  title: "Metrics Methodology"
};

export default async function MetricsMethodologyPage() {
  const snapshot = await getValidatorSnapshot();

  return (
    <PageSection className="pt-10">
      <div className="grid gap-8 xl:grid-cols-[0.8fr,1.2fr]">
        <SectionHeader
          eyebrow="METHODOLOGY"
          title="Validator data should be understandable, not just visible."
          body="This page explains where data comes from, how often it refreshes, and how the UI responds when sources become delayed."
        />
        <div className="space-y-4">
          <div className="panel p-6">
            <p className="panel-label">Primary source</p>
            <p className="mt-4 text-base leading-7 text-ink">
              The canonical path is Solana RPC. The site is structured so a paid primary RPC and a
              backup RPC can feed a normalized snapshot without exposing raw third-party dependencies
              in the browser.
            </p>
          </div>
          <div className="panel p-6">
            <p className="panel-label">Current freshness policy</p>
            <p className="mt-4 text-base leading-7 text-ink">
              Snapshot data is considered delayed after {snapshot.meta.staleAfterMinutes} minutes.
              When live refresh fails, the UI should serve last-known-good data and mark it clearly.
            </p>
          </div>
          <div className="panel p-6">
            <p className="panel-label">Comparison metrics</p>
            <p className="mt-4 text-base leading-7 text-ink">
              Rank, performance comparisons, and other derivative fields can use secondary sources
              as enrichment, but they should never be the only source of truth.
            </p>
          </div>
        </div>
      </div>
    </PageSection>
  );
}
