import type { Metadata } from "next";

import { faqItems } from "@/content/site-content";
import { ButtonLink } from "@/components/layout/button-link";
import { PageSection } from "@/components/layout/page-section";
import { SectionHeader } from "@/components/layout/section-header";
import { FAQAccordion } from "@/components/marketing/faq-accordion";
import { getValidatorSnapshot } from "@/lib/validator/queries";

export const metadata: Metadata = {
  title: "FAQ"
};

export default async function FAQPage() {
  await getValidatorSnapshot();

  return (
    <PageSection className="pt-10">
      <div className="grid gap-8 xl:grid-cols-[0.85fr,1.15fr]">
        <div>
          <SectionHeader
            eyebrow="FAQ"
            title="Clear answers for new stakers, former users, and validator shoppers."
            body="This page answers the core questions without sending users into extra docs."
          />
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/validator">View Validator</ButtonLink>
            <ButtonLink href="/metrics" variant="secondary">
              View Metrics
            </ButtonLink>
          </div>
        </div>
        <FAQAccordion items={faqItems} />
      </div>
    </PageSection>
  );
}
