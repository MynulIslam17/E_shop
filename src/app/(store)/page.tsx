import React from "react";
import { homeService } from "@/features/home/services/home.service";
import { SaleAnnouncement } from "@/features/home/components/SaleAnnouncement";
import { HeroSection } from "@/features/home/components/HeroSection";
import { CollectionSwitcher } from "@/features/home/components/CollectionSwitcher";
import { PromoMarquee } from "@/features/home/components/PromoMarquee";
import { BestSellerSection } from "@/features/home/components/BestSellerSection";
import { NewArrivalsSection } from "@/features/home/components/NewArrivalsSection";
import { ProductCollectionSection } from "@/features/home/components/ProductCollectionSection";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, RefreshCw, Truck } from "lucide-react";

export default async function HomePage() {
  const homeData = await homeService.getHomeData();

  return (
    <div className="flex flex-col min-w-0">
      {/* 1. Top Sale Announcement Bar with Live Countdown */}
      <SaleAnnouncement config={homeData.saleAnnouncement} />

      {/* 2. Main Brand Hero with Typographic RizqHub Backdrop */}
      <HeroSection />

      {/* 3. Promotional Marquee Ticker */}
      <PromoMarquee config={homeData.marquee} />

      {/* 4. Collection Quick Switcher */}
      <CollectionSwitcher />

      {/* 5. Best Seller Spotlight Feature */}
      <BestSellerSection product={homeData.featuredProduct} />

      {/* 6. New Arrivals Scroll Section */}
      <NewArrivalsSection products={homeData.newArrivals} />

      {/* 7. Collection Section 1: Shop Basic (Fair Price) */}
      <ProductCollectionSection
        title="Shop Basic"
        description="Textured utility, combed cotton, and everyday shirts built for lasting resilience."
        collectionSlug="premium-quality-at-a-fair-price"
        products={homeData.basicCollection}
      />

      {/* 8. Collection Section 2: Shop Premium */}
      <ProductCollectionSection
        title="Shop Premium"
        description="Signature jacquard fabrics, high GSM weaves, and all-over embroidery craft."
        collectionSlug="expensive"
        products={homeData.premiumCollection}
      />

      {/* 9. Brand & Craft Message Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-gradient-to-b from-[#0B0B10] to-[#14080D]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-brand-orange">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Rooted In Bangladesh</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-white leading-tight">
            Minimalist Essentials. Uncompromised Quality.
          </h2>

          <p className="text-sm sm:text-base text-white/60 max-w-2xl mx-auto leading-relaxed">
            RizqHub was founded on a simple conviction: clothing should speak through fabric density, timeless cuts, and honest craftsmanship rather than loud branding. Every garment is crafted with pride in Bangladesh.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/story"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95"
            >
              <span>Read Our Story</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-transparent border border-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider hover:border-white/60 hover:bg-white/5 transition-all active:scale-95"
            >
              <span>Explore All Products</span>
            </Link>
          </div>

          {/* 3 Value Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-16 border-t border-white/10 text-left">
            <div className="space-y-2 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
              <Truck className="w-6 h-6 text-brand-orange" />
              <h4 className="text-sm font-bold text-white uppercase">
                Nationwide Delivery
              </h4>
              <p className="text-xs text-white/50 leading-relaxed">
                24-48 hours inside Dhaka; 2-4 days anywhere in Bangladesh with cash on delivery.
              </p>
            </div>

            <div className="space-y-2 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
              <RefreshCw className="w-6 h-6 text-brand-orange" />
              <h4 className="text-sm font-bold text-white uppercase">
                7-Day Exchange
              </h4>
              <p className="text-xs text-white/50 leading-relaxed">
                Wrong fit or change of mind? Initiate an easy exchange seamlessly through our customer portal.
              </p>
            </div>

            <div className="space-y-2 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
              <Shield className="w-6 h-6 text-brand-orange" />
              <h4 className="text-sm font-bold text-white uppercase">
                Zero Compromise
              </h4>
              <p className="text-xs text-white/50 leading-relaxed">
                High GSM textiles, fade-resistant dyes, and reinforced seams built to endure years of wear.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
