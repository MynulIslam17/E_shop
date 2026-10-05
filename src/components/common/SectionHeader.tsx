import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  viewAllLink?: string;
  viewAllText?: string;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  viewAllLink,
  viewAllText = "Shop Collection",
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`flex items-end justify-between gap-4 mb-6 md:mb-10 ${className}`}>
      <div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-display uppercase tracking-tight text-white leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-xs sm:text-sm text-white/50 max-w-lg leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {viewAllLink && (
        <Link
          href={viewAllLink}
          className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold tracking-wider text-white hover:text-brand-orange transition-colors shrink-0 pb-1 border-b border-white/20 hover:border-brand-orange"
        >
          <span>{viewAllText}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
