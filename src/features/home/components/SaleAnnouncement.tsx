import React from "react";
import Link from "next/link";
import { SaleCountdown } from "./SaleCountdown";
import { SaleAnnouncementConfig } from "@/config/store.config";

export interface SaleAnnouncementProps {
  config: SaleAnnouncementConfig;
}

export function SaleAnnouncement({ config }: SaleAnnouncementProps) {
  if (!config.enabled) return null;

  return (
    <section className="bg-[#1a120e]/95 border-b border-white/10 py-5 sm:py-7 px-4 text-center relative z-20">
      <p className="text-brand-orange text-xs sm:text-sm font-bold tracking-widest uppercase mb-1">
        {config.tagline}
      </p>

      <p className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-white tracking-tight mb-3 md:mb-4 uppercase">
        {config.headline}
      </p>

      <SaleCountdown endDate={config.endDate} />

      <Link
        href={config.ctaLink}
        className="inline-block mt-4 sm:mt-5 px-6 py-2.5 text-xs sm:text-sm font-bold tracking-widest uppercase text-white border-2 border-white hover:bg-brand-orange hover:border-brand-orange hover:text-white transition-all duration-300 ease-out"
      >
        {config.ctaText}
      </Link>
    </section>
  );
}
