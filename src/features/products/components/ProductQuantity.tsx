"use client";

import React from "react";
import { QuantitySelector } from "@/components/ui/QuantitySelector";

export interface ProductQuantityProps {
  quantity: number;
  max: number;
  onChange: (quantity: number) => void;
  disabled?: boolean;
}

export function ProductQuantity({
  quantity,
  max,
  onChange,
  disabled = false,
}: ProductQuantityProps) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold tracking-wider uppercase text-white/80">
        Quantity
      </label>
      <QuantitySelector
        quantity={quantity}
        max={max}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}
