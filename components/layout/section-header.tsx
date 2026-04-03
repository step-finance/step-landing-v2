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
      {eyebrow ? <p className="panel-label mb-3">{eyebrow}</p> : null}
      <h2 className="text-[2rem] font-semibold leading-[1.06] text-ink sm:text-[2.5rem]">{title}</h2>
      {body ? <p className="mt-3 max-w-2xl text-[15px] leading-7 sm:text-[17px]">{body}</p> : null}
    </div>
  );
}
