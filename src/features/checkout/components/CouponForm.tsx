"use client";

import React, { useState } from "react";
import { Tag, Check, X } from "lucide-react";
import { couponService } from "@/features/coupons/services/coupon.service";
import { formatCurrency } from "@/utils/currency";

export interface CouponFormProps {
  orderSubtotal: number;
  appliedCode: string;
  appliedDiscount: number;
  onApply: (code: string, discount: number) => void;
  onRemove: () => void;
}

export function CouponForm({
  orderSubtotal,
  appliedCode,
  appliedDiscount,
  onApply,
  onRemove,
}: CouponFormProps) {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setIsLoading(true);
    setMessage(null);

    try {
      const result = await couponService.validateCoupon(code, orderSubtotal);
      if (result.isValid) {
        onApply(code.trim().toUpperCase(), result.discountAmount);
        setMessage({ text: result.message, isError: false });
        setCode("");
      } else {
        setMessage({ text: result.message, isError: true });
      }
    } catch {
      setMessage({ text: "Unable to validate coupon. Try again.", isError: true });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = () => {
    onRemove();
    setMessage(null);
  };

  return (
    <div className="space-y-3">
      {appliedCode ? (
        <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-white uppercase">{appliedCode}</span>
            <span className="text-emerald-400">
              (-{formatCurrency(appliedDiscount)})
            </span>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className="p-1 text-white/50 hover:text-white transition-colors"
            aria-label="Remove coupon"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <form onSubmit={handleApply} className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Promo or Coupon Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-11 pl-10 pr-3 rounded-lg bg-neutral-900 border border-white/10 text-xs uppercase tracking-wider text-white placeholder-neutral-500 focus:outline-none focus:border-brand-orange"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !code.trim()}
            className="h-11 px-5 rounded-lg bg-white/10 border border-white/20 text-xs font-bold text-white hover:bg-white/20 disabled:opacity-40 transition-colors shrink-0"
          >
            {isLoading ? "Checking..." : "Apply"}
          </button>
        </form>
      )}

      {message && (
        <p
          className={`text-xs font-medium ${
            message.isError ? "text-red-400" : "text-emerald-400"
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}
