import React, { ReactNode } from "react";
import { PageHeader } from "./PageHeader";
import { Breadcrumb } from "./Breadcrumb";

export interface ContentArticleProps {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  children: ReactNode;
}

export function ContentArticle({
  eyebrow,
  title,
  description,
  lastUpdated,
  children,
}: ContentArticleProps) {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: title },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <Breadcrumb items={breadcrumbs} />

      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      <div className="pb-6 mb-8 border-b border-white/10 text-xs text-white/40">
        Last updated: {lastUpdated}
      </div>

      <div className="prose prose-invert prose-sm sm:prose-base max-w-none text-white/70 space-y-6 leading-relaxed">
        {children}
      </div>
    </div>
  );
}
