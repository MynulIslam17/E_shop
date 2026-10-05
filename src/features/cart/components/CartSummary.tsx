"use client";

import React from "react";
import Link from "next/link";
import { formatCurrency } from "@/utils/currency";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";
import { useUiStore } from "@/store/ui.store";
import { storeConfig } from "@/config/store.config";

export interface CartSummaryProps {
  subtotal: number;
  itemCount: number;
}

export function CartSummary({ subtotal, itemCount }: CartSummaryProps) {
  const closeCart = useUiStore((s) => s.closeCart);
  const freeThreshold = storeConfig.shipping.freeShippingThreshold;
  const isFreeEligible = subtotal >= freeThreshold;
  const progressPercent = Math.min(100, Math.round((subtotal / freeThreshold) * 100));
  const remainingForFree = freeThreshold - subtotal;

  return (
    <div className="space-y-4">
      {/* Free Shipping Progress Indicator */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-3">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-white/80 font-medium">
            {isFreeEligible ? (
              <span className="text-emerald-400 font-bold">
                🎉 Congratulations! You have unlocked FREE shipping!
              </span>
            ) : (
              <>
                Add{" "}
                <span className="text-brand-orange font-bold">
                  {formatCurrency(remainingForFree)}
                </span>{" "}
                more to unlock Free Delivery
              </>
            )}
          </span>
          <span className="text-[10px] text-white/50">{progressPercent}%</span>
        </div>
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-orange transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Pricing breakdown */}
      <div className="space-y-2 text-sm pt-2">
        <div className="flex items-center justify-between text-white/70">
          <span>Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})</span>
          <span className="font-bold text-white tabular-nums">
            {formatCurrency(subtotal)}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs text-white/50">
          <span>Shipping</span>
          <span>Calculated at checkout</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-2 pt-2">
        <Link href={ROUTES.CHECKOUT} onClick={closeCart} className="block w-full">
          <Button variant="brand" size="lg" className="w-full">
            Proceed to Checkout
          </Button>
        </Link>

        <Button
          variant="outline"
          size="md"
          className="w-full"
          onClick={closeCart}
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}
