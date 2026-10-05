import React from "react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="min-h-[75vh] md:min-h-[85vh] text-white flex flex-col justify-between font-sans overflow-hidden relative selection:bg-brand-orange selection:text-white border-b border-white/5">
      {/* Dynamic Radial Ambient Gradient Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundColor: "#0B0B10",
          backgroundImage: `
            radial-gradient(1200px 600px at 50% 20%, rgba(251, 58, 72, 0.14), rgba(251, 58, 72, 0) 60%),
            radial-gradient(800px 400px at 20% 80%, rgba(192, 26, 39, 0.18), rgba(192, 26, 39, 0) 70%),
            linear-gradient(180deg, #0B0B10, #1A0F13)
          `,
        }}
      />

      {/* Massive Brand Typographic Centerpiece */}
      <div className="flex-1 flex items-center justify-center relative z-10 pointer-events-none py-12 md:py-20">
        <h1
          className="text-[24vw] sm:text-[22vw] md:text-[18vw] lg:text-[16vw] leading-[0.8] font-display font-black text-transparent bg-clip-text select-none uppercase tracking-tight pb-[0.05em] text-center"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 35%, #7B3050 70%, rgba(61,15,32,0.1) 100%)",
          }}
        >
          RIZQHUB
        </h1>
      </div>

      {/* Bottom Collection Switcher Controls */}
      <div className="relative z-20 pb-12 sm:pb-16 px-6 pointer-events-auto">
        <div className="max-w-md mx-auto flex flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/products?category=expensive"
            className="group relative flex-1 min-h-[48px] sm:min-h-[52px] py-3.5 px-6 rounded-full bg-white text-black font-bold text-xs sm:text-sm uppercase tracking-wider text-center overflow-hidden transition-all active:scale-95 flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:bg-neutral-200"
          >
            <span className="relative z-10">Shop Premium</span>
          </Link>

          <Link
            href="/products?category=premium-quality-at-a-fair-price"
            className="group relative flex-1 min-h-[48px] sm:min-h-[52px] py-3.5 px-6 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider text-center transition-all hover:bg-white/10 hover:border-white/50 active:scale-95 flex items-center justify-center"
          >
            <span className="relative z-10">Shop Basic</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
