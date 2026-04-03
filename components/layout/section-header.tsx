import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  body,
  align = "left"
}: SectionHeaderProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? <p className="panel-label mb-2.5">{eyebrow}</p> : null}
      <h2 className="max-w-[14ch] text-balance text-[1.95rem] font-semibold leading-[1.02] text-ink sm:text-[2.35rem] lg:text-[2.6rem]">
        {title}
      </h2>
      {body ? (
        <p className="mt-3.5 max-w-[42rem] text-[15px] leading-[1.8] text-muted/92 sm:text-[16px]">
          {body}
        </p>
      ) : null}
    </div>
  );
}
