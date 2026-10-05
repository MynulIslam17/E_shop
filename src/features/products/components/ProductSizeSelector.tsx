"use client";

import React from "react";
import { ProductVariant } from "../types/product.types";

export interface ProductSizeSelectorProps {
  sizes: string[];
  variants: ProductVariant[];
  selectedSize: string | null;
  onSelectSize: (size: string) => void;
  error?: string | null;
}

export function ProductSizeSelector({
  sizes,
  variants,
  selectedSize,
  onSelectSize,
  error,
}: ProductSizeSelectorProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold tracking-wider uppercase text-white/80">
          Select Size {selectedSize && <span className="text-brand-orange">({selectedSize})</span>}
        </label>
        <span className="text-xs text-white/40 cursor-pointer hover:text-white transition-colors">
          Size Guide
        </span>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {sizes.map((size) => {
          const variant = variants.find((v) => v.size === size);
          const isOutOfStock = variant ? variant.stock <= 0 : false;
          const isSelected = selectedSize === size;

          return (
            <button
              key={size}
              type="button"
              disabled={isOutOfStock}
              onClick={() => onSelectSize(size)}
              className={`min-w-12 h-11 px-3.5 rounded-lg text-xs font-bold transition-all relative flex items-center justify-center select-none ${
                isSelected
                  ? "bg-white text-black border-2 border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  : isOutOfStock
                  ? "bg-neutral-900/40 text-neutral-600 border border-white/5 cursor-not-allowed line-through"
                  : "bg-neutral-900 text-white/90 border border-white/10 hover:border-white/40 hover:bg-white/5 active:scale-95"
              }`}
              aria-label={`Size ${size}${isOutOfStock ? " out of stock" : ""}`}
            >
              <span>{size}</span>
              {variant && variant.stock > 0 && variant.stock <= 2 && (
                <span className="absolute -top-1.5 -right-1.5 w-2 h-2 rounded-full bg-amber-400" />
              )}
            </button>
          );
        })}
      </div>

      {error && (
        <p className="text-xs text-brand-orange font-medium animate-in fade-in">
          {error}
        </p>
      )}
    </div>
  );
}
