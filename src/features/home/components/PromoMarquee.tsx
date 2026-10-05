import React from "react";
import { MarqueeConfig } from "@/config/store.config";

export interface PromoMarqueeProps {
  config: MarqueeConfig;
}

export function PromoMarquee({ config }: PromoMarqueeProps) {
  // Duplicate items for continuous seamless loop
  const displayItems = [...config.items, ...config.items, ...config.items];

  return (
    <div
      className="w-full overflow-hidden border-y border-brand-orange/20 py-3.5 relative z-20 will-change-transform select-none"
      style={{ backgroundColor: "#0D0608" }}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {displayItems.map((item, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-4 mx-6 md:mx-10"
          >
            <span className="text-[11px] md:text-xs font-bold tracking-widest text-white/80 uppercase">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 opacity-80" />
          </span>
        ))}
      </div>
    </div>
  );
}
