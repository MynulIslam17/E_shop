import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { storyConfig } from "@/config/story.config";
import { constructMetadata } from "@/lib/metadata";
import { ArrowRight, Quote } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Our Story — The RizqHub Journey",
  description:
    "The journey of RizqHub: modern menswear and essentials crafted with pride, ethical integrity, and premium fabric density in Bangladesh.",
  path: "/story",
});

export default function StoryPage() {
  return (
    <div className="py-12 md:py-20 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24">
        {/* Editorial Hero */}
        <div className="text-center space-y-4 border-b border-white/10 pb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-brand-orange">
            {storyConfig.hero.eyebrow}
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display uppercase tracking-tight text-white leading-tight">
            {storyConfig.hero.title}
          </h1>
          <p className="text-sm font-medium text-amber-400/90 tracking-wide font-sans">
            {storyConfig.hero.bengaliSubtitle}
          </p>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed pt-2">
            {storyConfig.hero.lead}
          </p>
        </div>

        {/* Narrative Sections */}
        {storyConfig.sections.map((section, idx) => (
          <article
            key={idx}
            className="space-y-6 p-6 sm:p-10 rounded-3xl bg-[#140A0E] border border-white/10"
          >
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-brand-orange">
                {section.tagline}
              </span>
              <h2 className="text-2xl sm:text-4xl font-display uppercase tracking-tight text-white mt-1">
                {section.heading}
              </h2>
              {section.bengaliHeading && (
                <p className="text-xs font-medium text-white/40 mt-1">
                  {section.bengaliHeading}
                </p>
              )}
            </div>

            <div className="space-y-4 text-sm sm:text-base text-white/70 leading-relaxed">
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>

            {section.quote && (
              <blockquote className="my-6 p-6 rounded-2xl bg-black/40 border-l-4 border-brand-orange flex gap-4 items-start">
                <Quote className="w-8 h-8 text-brand-orange shrink-0 mt-1 opacity-70" />
                <p className="text-base sm:text-lg italic text-white/90 font-serif leading-relaxed">
                  &ldquo;{section.quote}&rdquo;
                </p>
              </blockquote>
            )}

            {section.stats && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
                {section.stats.map((s, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center"
                  >
                    <span className="block text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                      {s.value}
                    </span>
                    <span className="text-xs text-white/50 uppercase tracking-wider mt-1 block">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </article>
        ))}

        {/* Bottom CTA */}
        <div className="text-center pt-8 space-y-4">
          <h3 className="text-2xl font-display uppercase tracking-tight text-white">
            Experience the Craft Firsthand
          </h3>
          <p className="text-xs sm:text-sm text-white/60 max-w-md mx-auto">
            Discover our latest drops tailored with high-density textiles and modern relaxed silhouettes.
          </p>
          <div className="pt-4 flex justify-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#FB3A48] hover:bg-[#E02634] text-white text-sm sm:text-base font-bold shadow-[0_0_25px_rgba(251,58,72,0.45)] hover:shadow-[0_0_35px_rgba(251,58,72,0.65)] transition-all duration-200 active:scale-95"
            >
              <span>Shop The Collection</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
