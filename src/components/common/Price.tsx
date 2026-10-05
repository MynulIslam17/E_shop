import React from "react";
import { formatCurrency } from "@/utils/currency";
import { calculateDiscountPercentage } from "@/utils/discount";

export interface PriceProps {
  price: number;
  compareAtPrice?: number;
  size?: "sm" | "md" | "lg" | "xl";
  showDiscount?: boolean;
  className?: string;
}

export function Price({
  price,
  compareAtPrice,
  size = "md",
  showDiscount = true,
  className = "",
}: PriceProps) {
  const hasDiscount = compareAtPrice && compareAtPrice > price;
  const discountPercent = hasDiscount
    ? calculateDiscountPercentage(price, compareAtPrice)
    : 0;

  const currentSizeClass = {
    sm: "text-xs md:text-sm font-semibold",
    md: "text-sm md:text-base font-bold",
    lg: "text-lg md:text-xl font-bold",
    xl: "text-2xl md:text-3xl font-extrabold",
  }[size];

  const compareSizeClass = {
    sm: "text-[10px] md:text-xs",
    md: "text-xs md:text-sm",
    lg: "text-sm md:text-base",
    xl: "text-base md:text-lg",
  }[size];

  return (
    <div className={`inline-flex items-baseline flex-wrap gap-2 ${className}`}>
      <span className={`text-brand-orange ${currentSizeClass} tabular-nums tracking-tight`}>
        {formatCurrency(price)}
      </span>

      {hasDiscount && (
        <span
          className={`text-white/40 line-through ${compareSizeClass} tabular-nums`}
        >
          {formatCurrency(compareAtPrice)}
        </span>
      )}

      {showDiscount && hasDiscount && (
        <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
          {discountPercent}% OFF
        </span>
      )}
    </div>
  );
}
