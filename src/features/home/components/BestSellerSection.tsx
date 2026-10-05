import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/features/products/types/product.types";
import { formatCurrency } from "@/utils/currency";
import { ROUTES } from "@/constants/routes";
import { ArrowRight, Flame } from "lucide-react";

export interface BestSellerSectionProps {
  product: Product;
}

export function BestSellerSection({ product }: BestSellerSectionProps) {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header Statement */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-sm md:text-base font-semibold text-white/50 tracking-wide uppercase mb-1">
            Unapologetic Style.
          </p>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold text-white uppercase tracking-tight leading-none">
            Premium Quality.
          </h2>
        </div>

        {/* Feature Spotlight Card */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] w-full rounded-3xl overflow-hidden bg-[#1A0F13] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.6)] group">
          <Image
            src={product.images[0] || "/images/placeholder.svg"}
            alt={product.name}
            fill
            sizes="100vw"
            className="object-cover object-top opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          />

          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

          {/* Floating Details Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 md:p-14">
            <div className="max-w-xl space-y-2 sm:space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange text-white text-[11px] font-bold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>Best Seller This Month</span>
              </div>

              <h3 className="text-2xl sm:text-4xl md:text-5xl font-display uppercase tracking-tight text-white group-hover:text-brand-orange transition-colors">
                {product.name}
              </h3>

              <div className="flex items-center gap-4 pt-1">
                <span className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                  {formatCurrency(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-sm sm:text-base text-white/40 line-through tabular-nums">
                    {formatCurrency(product.compareAtPrice)}
                  </span>
                )}
              </div>

              <div className="pt-3">
                <Link
                  href={ROUTES.PRODUCT_DETAILS(product.slug)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-brand-orange hover:text-white transition-all shadow-[0_4px_25px_rgba(255,255,255,0.2)] active:scale-95"
                >
                  <span>Shop This Shirt</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
