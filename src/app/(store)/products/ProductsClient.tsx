"use client";

import React, { useState } from "react";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useProductFilters } from "@/features/products/hooks/useProductFilters";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { ProductFilters } from "@/features/products/components/ProductFilters";
import { ProductSort } from "@/features/products/components/ProductSort";
import Image from "next/image";
import { Drawer } from "@/components/ui/Drawer";
import { Pagination } from "@/components/ui/Pagination";
import { storeConfig } from "@/config/store.config";
import { SlidersHorizontal } from "lucide-react";

export function ProductsClient() {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const { filters, updateFilters, resetFilters } = useProductFilters();

  const { data, isLoading } = useProducts(filters);

  const products = data?.products || [];
  const total = data?.total || 0;
  const limit = filters.limit || 12;
  const totalPages = Math.ceil(total / limit);

  const currentCollection = storeConfig.collections.find(
    (c) => c.slug === filters.category
  );
  const heroTitle = currentCollection?.name || "All Products";

  return (
    <div className="w-full flex flex-col min-w-0">
      {/* Edge-to-Edge Collections Artwork Hero Banner matching demo website */}
      <section className="relative w-full h-56 sm:h-72 md:h-80 lg:h-[340px] xl:h-[380px] overflow-hidden border-b border-white/10 select-none bg-[#0E0609]">
        <Image
          src="/images/collections-hero.png"
          alt="RizqHub Collections Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_32%] filter brightness-95"
        />
        {/* Subtle dark gradient overlay & vignette for optimal contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />

        {/* Centerpiece typography matching demo site */}
        <div className="relative z-10 h-full w-full flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal text-white text-center tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            {heroTitle}
          </h1>
        </div>
      </section>

      {/* Main Catalog Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full">

      {/* Control Bar: Total Count, Sort, and Mobile Filter Trigger */}
      <div className="flex items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
        <span className="text-xs text-white/50 font-medium">
          Showing <span className="text-white font-bold">{products.length}</span> of{" "}
          <span className="text-white font-bold">{total}</span> garments
        </span>

        <div className="flex items-center gap-3">
          <ProductSort
            currentSort={filters.sort}
            onSortChange={(sort) => updateFilters({ sort })}
          />

          {/* Mobile Filter Button */}
          <button
            type="button"
            onClick={() => setIsMobileFiltersOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-neutral-900 border border-white/10 text-xs font-semibold text-white hover:border-white/30"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Main Content Layout: Desktop Sidebar Filters + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-24 p-6 rounded-2xl bg-[#140A0E] border border-white/10">
          <ProductFilters
            filters={filters}
            onFilterChange={updateFilters}
            onReset={resetFilters}
          />
        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-9 min-w-0">
          <ProductGrid products={products} isLoading={isLoading} columns={3} />

          {/* Pagination */}
          <Pagination
            currentPage={filters.page || 1}
            totalPages={totalPages}
            onPageChange={(page) => updateFilters({ page })}
          />
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <Drawer
        isOpen={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        title="Filters"
        side="left"
        width="max-w-xs"
      >
        <div className="py-2">
          <ProductFilters
            filters={filters}
            onFilterChange={(newFilters) => {
              updateFilters(newFilters);
              setIsMobileFiltersOpen(false);
            }}
            onReset={() => {
              resetFilters();
              setIsMobileFiltersOpen(false);
            }}
          />
        </div>
      </Drawer>
      </div>
    </div>
  );
}
