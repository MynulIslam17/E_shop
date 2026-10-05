import React from "react";
import { getStockStatus } from "../utils/product.utils";

export interface ProductStockProps {
  stock: number;
  className?: string;
}

export function ProductStock({ stock, className = "" }: ProductStockProps) {
  const { status, label, badgeClass } = getStockStatus(stock);

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className={`w-2 h-2 rounded-full ${
          status === "out_of_stock"
            ? "bg-neutral-500"
            : status === "low_stock"
            ? "bg-amber-400 animate-pulse"
            : "bg-emerald-400"
        }`}
      />
      <span
        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeClass}`}
      >
        {label}
      </span>
    </div>
  );
}
