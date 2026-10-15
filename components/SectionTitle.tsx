import React from "react";

type SectionTitleProps = {
  title: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
};

export default function SectionTitle({
  title,
  description,
  action,
  align = "left",
  className = "mb-10 md:mb-14",
  as: TitleTag = "h2",
}: SectionTitleProps) {
  const centered = align === "center";
  const hasAside = Boolean(description || action);

  return (
    <header
      className={`flex flex-col gap-5 border-b border-black/15 pb-8 md:pb-10 dark:border-white/20 ${
        centered
          ? "items-center text-center"
          : "md:flex-row md:items-end md:justify-between md:gap-10"
      } ${className}`}
    >
      <div>
        <TitleTag
          className={`flex items-start gap-3 font-instrument text-[52px] font-normal leading-[0.9] tracking-[-0.035em] text-[#1A1A1A] sm:text-[68px] md:text-[84px] dark:text-[#F4F4F4] ${centered ? "justify-center" : ""}`}
        >
          {title}
        </TitleTag>
      </div>

      {hasAside ? (
        <div
          className={`flex flex-col gap-5 ${
            centered ? "items-center" : "md:items-end md:pb-1 md:text-right"
          }`}
        >
          {description ? (
            <p className="max-w-[34ch] font-instrument text-base leading-relaxed text-[#6B6B69] text-balance md:text-lg dark:text-[#9E9E9C]">
              {description}
            </p>
          ) : null}
          {action}
        </div>
      ) : null}
    </header>
  );
}
