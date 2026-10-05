"use client";

import React from "react";
import { ProductFilterParams } from "../types/product.types";
import { ArrowUpDown } from "lucide-react";

export interface ProductSortProps {
  currentSort?: ProductFilterParams["sort"];
  onSortChange: (sort: ProductFilterParams["sort"]) => void;
}

export function ProductSort({ currentSort = "newest", onSortChange }: ProductSortProps) {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="w-3.5 h-3.5 text-white/50" />
      <span className="text-xs font-semibold uppercase tracking-wider text-white/50 hidden sm:inline">
        Sort:
      </span>
      <select
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value as ProductFilterParams["sort"])}
        className="bg-neutral-900 border border-white/10 text-white text-xs font-semibold rounded-lg px-3 py-2 outline-none focus:border-brand-orange cursor-pointer"
        aria-label="Sort products"
      >
        <option value="newest">Newest Arrivals</option>
        <option value="best-selling">Best Selling</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
}
