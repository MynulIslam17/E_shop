import React, { ReactNode } from "react";

export interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  align?: "left" | "center";
}

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  align = "left",
}: PageHeaderProps) {
  const alignmentClasses =
    align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col mb-8 md:mb-12 ${alignmentClasses}`}>
      {eyebrow && (
        <span className="text-xs font-bold tracking-widest uppercase text-brand-orange mb-2">
          {eyebrow}
        </span>
      )}
      <h1 className="text-3xl md:text-5xl font-display uppercase tracking-tight text-white leading-tight">
        {title}
      </h1>
      {description && (
        <p className="mt-3 text-sm md:text-base text-white/60 max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
