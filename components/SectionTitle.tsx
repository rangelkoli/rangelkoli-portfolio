import React from "react";

type SectionHeader = {
  title: string;
  accentWord: string | null;
  meta: { index: string; label: string } | null;
  align: "left" | "center" | "right";
  size: "lg" | "sm";
};

type SectionTitleProps = {
  title: string;
  accentWord?: string | null;
  index?: string;
  eyebrow?: string;
  description?: React.ReactNode;
  align?: SectionHeader["align"];
  size?: SectionHeader["size"];
  action?: React.ReactNode;
  className?: string;
  as?: "h1" | "h2";
};

const alignMap: Record<
  SectionHeader["align"],
  { root: string; meta: string; title: string; desc: string }
> = {
  left: { root: "text-left", meta: "justify-start", title: "text-left", desc: "text-left mr-auto" },
  center: { root: "text-center", meta: "justify-center", title: "text-center", desc: "text-center mx-auto" },
  right: { root: "text-right", meta: "justify-end", title: "text-right", desc: "text-right ml-auto" },
};

const sizeMap: Record<SectionHeader["size"], string> = {
  lg: "text-[32px] sm:text-[38px] md:text-[44px] leading-[1.25] tracking-[-0.02em]",
  sm: "text-[24px] sm:text-[28px] md:text-[32px] leading-[1.25] tracking-[-0.02em]",
};

function toHeader(props: SectionTitleProps): SectionHeader {
  const accentWord = props.accentWord ?? null;
  const label = (props.eyebrow ?? "").trim();
  const index = (props.index ?? "").trim();
  return {
    title: props.title,
    accentWord,
    meta: label || index ? { index, label } : null,
    align: props.align ?? "left",
    size: props.size ?? "lg",
  };
}

function splitHead(title: string, accentWord: string | null) {
  if (!accentWord) return { head: title, tail: null as string | null };
  const idx = title.trimEnd().lastIndexOf(accentWord);
  if (idx <= 0) return { head: title, tail: null as string | null };
  return { head: title.slice(0, idx).trimEnd(), tail: accentWord };
}

export default function SectionTitle(props: SectionTitleProps) {
  const { description, action, className = "", as = "h2" } = props;
  const header = toHeader(props);
  const align = alignMap[header.align];
  const { head, tail } = splitHead(header.title, header.accentWord);
  const TitleTag = as === "h1" ? "h1" : "h2";
  const metaText = header.meta
    ? [header.meta.index, header.meta.label].filter(Boolean).join(" — ")
    : null;

  return (
    <div className={`relative mb-8 md:mb-10 ${align.root} ${className}`}>
      <div className={action ? "flex items-center justify-between gap-6" : "block"}>
        <div className="min-w-0 flex-1">
          {metaText ? (
            <div className={`flex items-baseline gap-4 mb-4 md:mb-5 ${align.meta}`}>
              <span className="font-instrument text-[11px] font-medium uppercase tracking-[0.28em] text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {metaText}
              </span>
              <span
                aria-hidden
                className="h-px flex-1 bg-current opacity-15"
              />
            </div>
          ) : null}
          <TitleTag
            className={`font-instrument font-normal text-balance text-[#1A1A1A] dark:text-[#F4F4F4] ${sizeMap[header.size]} ${align.title}`}
          >
            {head}
            {tail ? (
              <>
                {" "}
                <span className="font-instrument italic font-normal normal-case tracking-normal">
                  {tail}
                </span>
              </>
            ) : null}
          </TitleTag>
          {description ? (
            <p
              className={`font-instrument text-base md:text-lg leading-relaxed text-[#6B6B69] dark:text-[#9E9E9C] mt-3 md:mt-4 max-w-xl text-balance ${align.desc}`}
            >
              {description}
            </p>
          ) : null}
        </div>
        {action ? (
          <div className="hidden sm:block flex-shrink-0">
            {action}
          </div>
        ) : null}
      </div>
    </div>
  );
}
