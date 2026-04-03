import { contributionPreview, faqItems, heroCopy } from "@/content/site-content";
import { ButtonLink } from "@/components/layout/button-link";
import { PageSection } from "@/components/layout/page-section";
import { SectionHeader } from "@/components/layout/section-header";
import { FAQAccordion } from "@/components/marketing/faq-accordion";
import { HeroTerminal } from "@/components/marketing/hero-terminal";
import { getValidatorSnapshot } from "@/lib/validator/queries";

export const revalidate = 60;

export default async function HomePage() {
  const snapshot = await getValidatorSnapshot();

  return (
    <>
      <PageSection id="top" className="pb-4 pt-8 sm:pb-5 sm:pt-9 lg:pb-6">
        <HeroTerminal
          snapshot={snapshot}
          headline={heroCopy.title}
          subheadline={heroCopy.body}
        />
      </PageSection>

      <PageSection tone="elevated" className="pb-6 pt-3 lg:pb-7 lg:pt-4">
        <div className="grid gap-5 xl:grid-cols-[0.72fr,1.28fr] xl:items-start">
          <SectionHeader
            eyebrow={contributionPreview.eyebrow}
            title={contributionPreview.title}
            body={contributionPreview.body}
          />
          <div className="panel p-5 sm:p-6">
            <div className="flex flex-wrap gap-2">
              {contributionPreview.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[11px] font-medium tracking-[0.08em] text-muted/90"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-5 max-w-2xl text-sm leading-[1.8] text-muted/92">
              Step has shipped across Solana since early 2021.
            </p>
            <div className="mt-5">
              <ButtonLink href="/contributions" variant="secondary">
                Open Contributions
              </ButtonLink>
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection id="faq" className="pb-8 pt-5 sm:pb-10">
        <div className="grid gap-6 xl:grid-cols-[0.9fr,1.1fr] xl:gap-8">
          <div>
            <SectionHeader
              eyebrow="FAQ"
              title="FAQ"
              body="Validator details, live data, and what changed."
            />
          </div>
          <FAQAccordion items={faqItems} />
        </div>
      </PageSection>
    </>
  );
}
