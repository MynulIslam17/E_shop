"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/common/Logo";
import { DesktopNavigation } from "./DesktopNavigation";
import { MobileNavigation } from "./MobileNavigation";
import { useUiStore } from "@/store/ui.store";
import { useCart } from "@/features/cart/hooks/useCart";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { storeConfig } from "@/config/store.config";
import { formatCurrency } from "@/utils/currency";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(true);

  const openCart = useUiStore((s) => s.openCart);
  const openSearch = useUiStore((s) => s.openSearch);
  const openMobileNav = useUiStore((s) => s.openMobileNav);
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* Top Dismissible Announcement Strip (Image 3 reference) */}
        {isAnnouncementVisible && (
          <div className="relative bg-[#050508] border-b border-white/10 px-4 py-2 text-center text-[10px] sm:text-[11px] font-bold tracking-widest text-[#7BB4D4] uppercase">
            <span>
              FREE SHIPPING ON ORDERS OVER {formatCurrency(storeConfig.shipping.freeShippingThreshold)}
            </span>
            <button
              type="button"
              onClick={() => setIsAnnouncementVisible(false)}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-1"
              aria-label="Dismiss announcement"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Main Navigation Bar */}
        <div
          className={`transition-all duration-300 ${
            isScrolled
              ? "bg-[#0B0B10]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-lg"
              : "bg-gradient-to-b from-[#0B0B10]/90 via-[#0B0B10]/50 to-transparent py-4"
          }`}
        >
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 relative flex items-center justify-between min-h-[48px]">
            {/* Left: Mobile Menu Trigger / Brand Logo */}
            <div className="flex items-center gap-3 z-10 shrink-0">
              <button
                type="button"
                onClick={openMobileNav}
                className="lg:hidden p-2 -ml-2 text-white/70 hover:text-white transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <Logo size="sm" />
            </div>

            {/* Center: Desktop Navigation Capsule (Absolute Mathematical Center) */}
            <div className="hidden lg:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
              <DesktopNavigation />
            </div>

            {/* Right: Search, Cart Bag, and Explore Collection Button */}
            <div className="flex items-center gap-2 sm:gap-3.5 z-10 shrink-0">
              {/* Search Trigger */}
              <button
                type="button"
                onClick={openSearch}
                className="p-2 text-white/70 hover:text-brand-orange transition-colors rounded-full"
                aria-label="Search catalog"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Cart Trigger with Quantity Badge */}
              <button
                type="button"
                onClick={openCart}
                className="relative p-2 text-white/70 hover:text-brand-orange transition-colors rounded-full"
                aria-label={`Shopping cart with ${itemCount} items`}
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-brand-orange text-white text-[10px] font-extrabold flex items-center justify-center leading-none animate-in zoom-in">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Explore Collection Pill Button (Image 3 reference) */}
              <Link
                href="/products"
                className="hidden sm:inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#CCCCCC] text-[#111111] font-semibold text-xs tracking-tight hover:bg-white hover:text-black hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] active:scale-95 transition-all shrink-0 ml-1"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Height spacer so page content does not clip under fixed navbar */}
      <div
        className={`${isAnnouncementVisible ? "h-20 lg:h-24" : "h-14 lg:h-16"} pointer-events-none transition-all`}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <MobileNavigation />
    </>
  );
}
