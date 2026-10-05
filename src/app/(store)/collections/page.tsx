import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { storeConfig } from "@/config/store.config";
import { productService } from "@/features/products/services/product.service";
import { constructMetadata } from "@/lib/metadata";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Collections & Lines",
  description:
    "Explore RizqHub curated menswear collections, featuring high-density fabrics, Cuban collars, and signature embroidery.",
  path: "/collections",
});

export default async function CollectionsPage() {
  const collectionsWithCount = await Promise.all(
    storeConfig.collections
      .filter((c) => c.slug !== "all")
      .map(async (c) => {
        const { total } = await productService.getProducts({
          category: c.slug === "new-arrivals" ? undefined : c.slug,
          limit: 1,
        });
        return { ...c, total };
      })
  );

  return (
    <div className="w-full flex flex-col min-w-0">
      {/* Edge-to-Edge Hero Banner */}
      <section className="relative w-full h-56 sm:h-72 md:h-80 lg:h-[340px] xl:h-[380px] overflow-hidden border-b border-white/10 select-none bg-[#0E0609]">
        <Image
          src="/images/collections-hero.png"
          alt="Curated Collections Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_32%] filter brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />

        <div className="relative z-10 h-full w-full flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal text-white text-center tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            Collections
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 w-full">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collectionsWithCount.map((col) => (
          <Link
            key={col.slug}
            href={`/collections/${col.slug}`}
            className="group relative flex flex-col justify-between p-8 rounded-2xl bg-gradient-to-br from-[#1A0F13] to-[#0E0609] border border-white/10 hover:border-brand-orange/50 transition-all duration-300 min-h-[220px]"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange">
                Collection
              </span>
              <h3 className="text-2xl font-display uppercase tracking-tight text-white mt-1 group-hover:text-brand-orange transition-colors">
                {col.name}
              </h3>
              <p className="text-xs text-white/50 mt-2 leading-relaxed">
                {col.description}
              </p>
            </div>

            <div className="pt-6 flex items-center justify-between text-xs text-white/70 font-semibold border-t border-white/5">
              <span>{col.total} Pieces Available</span>
              <span className="inline-flex items-center gap-1 text-brand-orange group-hover:translate-x-1 transition-transform">
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </div>
  );
}
