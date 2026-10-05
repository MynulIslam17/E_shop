"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Product } from "@/features/products/types/product.types";
import { ProductCard } from "@/features/products/components/ProductCard";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

export interface ProductCollectionSectionProps {
  title: string;
  description?: string;
  collectionSlug: string;
  products: Product[];
}

export function ProductCollectionSection({
  title,
  description,
  collectionSlug,
  products,
}: ProductCollectionSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const offset = direction === "left" ? -380 : 380;
    scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  const targetLink =
    collectionSlug === "new-arrivals"
      ? "/products?sort=newest"
      : `/collections/${collectionSlug}`;

  return (
    <section className="w-full max-w-[2000px] mx-auto py-12 md:py-16">
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-12 xl:gap-20">
        {/* Left Sticky Column on Desktop */}
        <div className="lg:w-1/3 xl:w-1/4 lg:sticky top-24 h-fit flex flex-col gap-4 md:gap-6 shrink-0 px-5 lg:px-0 lg:pl-12">
          {/* Mobile Header */}
          <div className="flex items-center justify-between gap-4 lg:hidden">
            <h2 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-white leading-tight">
              {title}
            </h2>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Scroll left"
                className="w-8 h-8 rounded-full border border-white/20 text-white flex items-center justify-center bg-white/10 active:bg-white active:text-black transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Scroll right"
                className="w-8 h-8 rounded-full border border-white/20 text-white flex items-center justify-center bg-white/10 active:bg-white active:text-black transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:flex flex-col gap-6">
            <h2 className="text-4xl xl:text-5xl font-display uppercase tracking-tight text-white leading-[0.9]">
              {title}
            </h2>
            {description && (
              <p className="text-sm text-white/50 max-w-sm leading-relaxed">
                {description}
              </p>
            )}

            <Link
              href={targetLink}
              className="w-max text-xs font-bold uppercase tracking-wider text-white hover:text-brand-orange transition-colors border-b border-white/20 hover:border-brand-orange pb-1"
            >
              Shop Collection
            </Link>

            <div className="flex items-center gap-3 pt-4">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Scroll left"
                className="w-10 h-10 rounded-full border border-white/30 text-white bg-white/5 hover:bg-white hover:text-black transition-all flex items-center justify-center active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Scroll right"
                className="w-10 h-10 rounded-full border border-white/30 text-white bg-white/5 hover:bg-white hover:text-black transition-all flex items-center justify-center active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Scrollable Product Rail */}
        <div className="lg:w-2/3 xl:w-3/4 relative min-w-0">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6 px-5 lg:px-0 gap-4 md:gap-6 select-none"
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="snap-start shrink-0 w-[68vw] sm:w-[280px] md:w-[320px]"
              >
                <ProductCard product={product} />
              </div>
            ))}

            {/* Browse All End Card */}
            <div className="snap-start shrink-0 w-[68vw] sm:w-[280px] md:w-[320px]">
              <Link
                href={targetLink}
                className="group flex flex-col gap-3 select-none h-full"
              >
                <div className="relative aspect-[4/5] md:aspect-[3/4] w-full overflow-hidden bg-[#1A0F13] rounded-xl md:rounded-2xl border border-white/10 flex flex-col items-center justify-center gap-4 transition-all group-hover:border-brand-orange/60">
                  <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:border-brand-orange group-hover:scale-110 transition-all">
                    <Plus className="w-7 h-7 text-white/50 group-hover:text-brand-orange transition-colors" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-white/40 group-hover:text-white transition-colors">
                    Browse All
                  </span>
                </div>
                <div className="px-1">
                  <h3 className="text-sm font-bold text-white/50 group-hover:text-white transition-colors">
                    View More in {title}
                  </h3>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
