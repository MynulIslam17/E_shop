"use client";

import React from "react";
import { ProductFilterParams } from "../types/product.types";
import { Button } from "@/components/ui/Button";

export interface ProductFiltersProps {
  filters: ProductFilterParams;
  onFilterChange: (filters: Partial<ProductFilterParams>) => void;
  onReset: () => void;
}

export function ProductFilters({
  filters,
  onFilterChange,
  onReset,
}: ProductFiltersProps) {
  const categories = [
    { label: "All Products", value: "all" },
    { label: "Shop Basic (Fair Price)", value: "premium-quality-at-a-fair-price" },
    { label: "Shop Premium", value: "expensive" },
  ];

  const sizes = ["S", "M", "L", "XL"];

  return (
    <div className="space-y-6 text-sm">
      {/* Category Filter */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
          Category
        </h4>
        <div className="space-y-2">
          {categories.map((cat) => {
            const isSelected =
              filters.category === cat.value ||
              (!filters.category && cat.value === "all");

            return (
              <label
                key={cat.value}
                className="flex items-center gap-2.5 text-xs text-white/70 hover:text-white cursor-pointer"
              >
                <input
                  type="radio"
                  name="category"
                  checked={isSelected}
                  onChange={() =>
                    onFilterChange({
                      category: cat.value === "all" ? undefined : cat.value,
                    })
                  }
                  className="accent-brand-orange"
                />
                <span className={isSelected ? "text-white font-semibold" : ""}>
                  {cat.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Availability Filter */}
      <div className="pt-4 border-t border-white/10">
        <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
          Availability
        </h4>
        <label className="flex items-center gap-2.5 text-xs text-white/70 hover:text-white cursor-pointer">
          <input
            type="checkbox"
            checked={!!filters.inStockOnly}
            onChange={(e) => onFilterChange({ inStockOnly: e.target.checked })}
            className="rounded accent-brand-orange"
          />
          <span>In Stock Only</span>
        </label>
      </div>

      {/* Size Filter */}
      <div className="pt-4 border-t border-white/10">
        <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
          Size
        </h4>
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => {
            const isSelected = filters.size === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() =>
                  onFilterChange({ size: isSelected ? undefined : s })
                }
                className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-white text-black"
                    : "bg-neutral-900 border border-white/10 text-white/70 hover:border-white/30"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="pt-4 border-t border-white/10">
        <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
          Price Range
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min (৳)"
            value={filters.minPrice ?? ""}
            onChange={(e) =>
              onFilterChange({
                minPrice: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-orange"
          />
          <input
            type="number"
            placeholder="Max (৳)"
            value={filters.maxPrice ?? ""}
            onChange={(e) =>
              onFilterChange({
                maxPrice: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand-orange"
          />
        </div>
      </div>

      {/* Reset Filter Button */}
      <div className="pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          className="w-full text-xs"
        >
          Reset All Filters
        </Button>
      </div>
    </div>
  );
}
