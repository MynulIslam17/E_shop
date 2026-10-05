"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";

export interface QuantitySelectorProps {
  quantity: number;
  max?: number;
  min?: number;
  onChange: (quantity: number) => void;
  disabled?: boolean;
}

export function QuantitySelector({
  quantity,
  max = 99,
  min = 1,
  onChange,
  disabled = false,
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (quantity > min && !disabled) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max && !disabled) {
      onChange(quantity + 1);
    }
  };

  return (
    <div className="inline-flex items-center border border-white/20 rounded-full bg-neutral-900/60 p-1">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || quantity <= min}
        className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-colors"
        aria-label="Decrease quantity"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      <span className="w-10 text-center font-bold text-sm text-white select-none tabular-nums">
        {quantity}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || quantity >= max}
        className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-colors"
        aria-label="Increase quantity"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
