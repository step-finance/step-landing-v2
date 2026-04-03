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
      {eyebrow ? <p className="panel-label mb-4">{eyebrow}</p> : null}
      <h2 className="text-3xl font-semibold text-ink sm:text-4xl">{title}</h2>
      {body ? <p className="mt-4 text-base leading-7 sm:text-lg">{body}</p> : null}
    </div>
  );
}
