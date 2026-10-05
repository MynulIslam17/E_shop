import React from "react";
import Image from "next/image";
import { CartItem } from "@/features/cart/types/cart.types";
import { formatCurrency } from "@/utils/currency";
import { PriceSummary } from "@/utils/price";
import { CouponForm } from "./CouponForm";
import { ShieldCheck, Truck, RotateCcw } from "lucide-react";

export interface OrderSummaryProps {
  items: CartItem[];
  summary: PriceSummary;
  couponCode: string;
  couponDiscount: number;
  onApplyCoupon: (code: string, discount: number) => void;
  onRemoveCoupon: () => void;
}

export function OrderSummary({
  items,
  summary,
  couponCode,
  couponDiscount,
  onApplyCoupon,
  onRemoveCoupon,
}: OrderSummaryProps) {
  return (
    <div className="p-6 md:p-8 bg-[#160D10] border border-white/10 rounded-2xl space-y-6">
      <h3 className="text-lg font-bold text-white uppercase tracking-tight pb-3 border-b border-white/10">
        Order Summary ({items.length})
      </h3>

      {/* Item thumbnails */}
      <div className="space-y-4 max-h-72 overflow-y-auto pr-1 no-scrollbar divide-y divide-white/5">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-3 pt-3 first:pt-0 items-center">
            <div className="relative w-14 h-16 rounded-md overflow-hidden bg-neutral-900 border border-white/10 shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="56px"
                className="object-cover object-top"
              />
              <span className="absolute top-0.5 right-0.5 bg-black/80 text-[10px] text-white px-1 rounded font-bold">
                x{item.quantity}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-semibold text-white/90 truncate">
                {item.name}
              </h4>
              <p className="text-[11px] text-white/50 mt-0.5">
                {item.size ? `Size: ${item.size}` : "One Size"}
              </p>
            </div>

            <span className="text-xs font-bold text-white tabular-nums shrink-0">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Coupon Field */}
      <div className="pt-2">
        <CouponForm
          orderSubtotal={summary.subtotal}
          appliedCode={couponCode}
          appliedDiscount={couponDiscount}
          onApply={onApplyCoupon}
          onRemove={onRemoveCoupon}
        />
      </div>

      {/* Calculation Table */}
      <div className="space-y-2 text-xs pt-4 border-t border-white/10">
        <div className="flex justify-between text-white/70">
          <span>Subtotal</span>
          <span className="font-semibold text-white tabular-nums">
            {formatCurrency(summary.subtotal)}
          </span>
        </div>

        {summary.discount > 0 && (
          <div className="flex justify-between text-emerald-400">
            <span>Coupon Discount</span>
            <span className="font-semibold tabular-nums">
              -{formatCurrency(summary.discount)}
            </span>
          </div>
        )}

        <div className="flex justify-between text-white/70">
          <span>Delivery Charge</span>
          <span className="font-semibold text-white tabular-nums">
            {summary.shipping === 0 ? (
              <span className="text-emerald-400 uppercase font-bold text-[10px]">
                Free Delivery
              </span>
            ) : (
              formatCurrency(summary.shipping)
            )}
          </span>
        </div>

        <div className="flex justify-between text-sm sm:text-base font-bold text-white pt-3 border-t border-white/10">
          <span>Total Payable</span>
          <span className="text-brand-orange text-lg sm:text-xl font-display tabular-nums">
            {formatCurrency(summary.total)}
          </span>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-center text-[10px] text-white/60">
        <div className="flex flex-col items-center gap-1">
          <Truck className="w-4 h-4 text-brand-orange" />
          <span>Fast BD Delivery</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <RotateCcw className="w-4 h-4 text-brand-orange" />
          <span>7-Day Easy Exchange</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-brand-orange" />
          <span>Authentic Quality</span>
        </div>
      </div>
    </div>
  );
}
