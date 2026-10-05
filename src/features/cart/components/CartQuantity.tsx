"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";

export interface CartQuantityProps {
  quantity: number;
  max: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export function CartQuantity({
  quantity,
  max,
  onIncrease,
  onDecrease,
}: CartQuantityProps) {
  return (
    <div className="flex items-center border border-white/10 rounded-md bg-neutral-900/60 p-0.5">
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="w-6 h-6 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 rounded disabled:opacity-30 disabled:pointer-events-none transition-colors"
        aria-label="Decrease quantity"
      >
        <Minus className="w-3 h-3" />
      </button>

      <span className="w-7 text-center text-xs font-bold text-white tabular-nums">
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        disabled={quantity >= max}
        className="w-6 h-6 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 rounded disabled:opacity-30 disabled:pointer-events-none transition-colors"
        aria-label="Increase quantity"
      >
        <Plus className="w-3 h-3" />
      </button>
    </div>
  );
}
