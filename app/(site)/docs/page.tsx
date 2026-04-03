import type { Metadata } from "next";

import { docsCards } from "@/content/site-content";
import { ButtonLink } from "@/components/layout/button-link";
import { PageSection } from "@/components/layout/page-section";
import { SectionHeader } from "@/components/layout/section-header";
import { getValidatorSnapshot } from "@/lib/validator/queries";

export const metadata: Metadata = {
  title: "Docs"
};

export default async function DocsPage() {
  await getValidatorSnapshot();

  return (
    <>
      <PageSection className="pb-6 pt-10">
        <div className="panel-strong p-8 lg:p-10">
          <SectionHeader
            eyebrow="DOCS"
            title="Educational content for staking, metrics, and transparency."
            body="Docs should make staking mechanics and validator methodology understandable without oversimplifying the technical reality."
          />
        </div>
      </PageSection>
      <PageSection>
        <div className="grid gap-4 lg:grid-cols-3">
          {docsCards.map((card) => (
            <div key={card.href} className="panel p-6">
              <p className="panel-label">Guide</p>
              <h2 className="mt-4 text-2xl font-semibold text-ink">{card.title}</h2>
              <p className="mt-4 text-sm leading-7">{card.body}</p>
              <ButtonLink href={card.href} variant="secondary" className="mt-6">
                {card.cta}
              </ButtonLink>
            </div>
          ))}
        </div>
      </PageSection>
    </>
  );
}
