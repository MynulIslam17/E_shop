import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function CollectionSwitcher() {
  const collections = [
    {
      name: "Shop Basic",
      subtitle: "Premium quality at a fair price",
      href: "/collections/premium-quality-at-a-fair-price",
      tag: "Everyday Essentials",
    },
    {
      name: "Shop Premium",
      subtitle: "Bespoke jacquard, boxy cuts & high GSM",
      href: "/collections/expensive",
      tag: "Signature Line",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {collections.map((col) => (
          <Link
            key={col.name}
            href={col.href}
            className="group relative p-8 sm:p-10 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1A0F13] to-[#0E0609] border border-white/10 hover:border-white/30 transition-all duration-300"
          >
            <div className="absolute top-4 right-4 p-2 rounded-full bg-white/5 text-white/50 group-hover:text-white group-hover:bg-white/10 transition-colors">
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange">
              {col.tag}
            </span>

            <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-white mt-1 group-hover:text-brand-orange transition-colors">
              {col.name}
            </h3>

            <p className="text-xs sm:text-sm text-white/60 mt-2 max-w-sm">
              {col.subtitle}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
