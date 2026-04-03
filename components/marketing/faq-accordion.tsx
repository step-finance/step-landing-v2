import type { FAQItem } from "@/content/site-content";

type FAQAccordionProps = {
  items: FAQItem[];
};

export function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details key={item.question} className="panel group p-5">
          <summary className="cursor-pointer list-none text-[1.02rem] font-semibold leading-[1.35] text-ink">
            <span className="flex items-center justify-between gap-4">
              {item.question}
              <span className="text-muted/78 transition group-open:rotate-45">+</span>
            </span>
          </summary>
          <p className="mt-4 max-w-3xl text-sm leading-[1.8] text-muted/92">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
