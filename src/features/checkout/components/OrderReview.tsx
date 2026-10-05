"use client";

import React, { useState } from "react";
import { DeliveryFormData, PaymentFormData } from "../types/checkout.types";
import { CartItem } from "@/features/cart/types/cart.types";
import { PriceSummary } from "@/utils/price";
import { formatCurrency } from "@/utils/currency";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, CheckCircle2, ShieldCheck, MapPin, CreditCard, User } from "lucide-react";

export interface OrderReviewProps {
  items: CartItem[];
  delivery: DeliveryFormData;
  payment: PaymentFormData;
  summary: PriceSummary;
  isSubmitting: boolean;
  onBack: () => void;
  onConfirm: () => void;
}

export function OrderReview({
  items,
  delivery,
  payment,
  summary,
  isSubmitting,
  onBack,
  onConfirm,
}: OrderReviewProps) {
  const [hasAgreed, setHasAgreed] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 pb-3 border-b border-white/10">
        <CheckCircle2 className="w-5 h-5 text-brand-orange" />
        <h3 className="text-lg font-bold text-white uppercase tracking-tight">
          Review & Confirm Order ({items.length} {items.length === 1 ? "Item" : "Items"})
        </h3>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Customer & Address */}
        <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/10 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-white font-bold pb-1 border-b border-white/5">
            <User className="w-3.5 h-3.5 text-brand-orange" />
            <span>Customer Information</span>
          </div>
          <p className="text-white/90 font-medium">{delivery.fullName}</p>
          <p className="text-white/60">{delivery.phone}</p>
          {delivery.email && <p className="text-white/60">{delivery.email}</p>}

          <div className="flex items-center gap-2 text-white font-bold pt-3 pb-1 border-b border-white/5">
            <MapPin className="w-3.5 h-3.5 text-brand-orange" />
            <span>Shipping Destination</span>
          </div>
          <p className="text-white/80">{delivery.address}</p>
          <p className="text-white/80">
            {delivery.district}{delivery.thana ? `, ${delivery.thana}` : ""}
          </p>
          {delivery.notes && (
            <p className="text-white/50 italic pt-1">Note: &ldquo;{delivery.notes}&rdquo;</p>
          )}
        </div>

        {/* Payment & Method */}
        <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/10 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-white font-bold pb-1 border-b border-white/5">
            <CreditCard className="w-3.5 h-3.5 text-brand-orange" />
            <span>Payment Method</span>
          </div>
          <p className="text-white/90 font-medium uppercase">
            {payment.method === "cod"
              ? "Cash on Delivery (Pay on Receipt)"
              : `${payment.method.toUpperCase()} Advance Payment`}
          </p>

          {payment.method !== "cod" && (
            <div className="space-y-1 pt-1 text-white/70">
              <p>Sender Number: <span className="font-mono text-white">{payment.senderNumber}</span></p>
              <p>Transaction ID: <span className="font-mono text-brand-orange">{payment.transactionId}</span></p>
              <p className="text-[10px] text-amber-400">Status: Pending Verification</p>
            </div>
          )}

          <div className="pt-3 border-t border-white/5 text-white/60 text-[11px] leading-relaxed">
            By placing this order, you confirm that your provided contact and delivery details are accurate and that you agree to our 7-Day Exchange Policy.
          </div>
        </div>
      </div>

      {/* Confirmation Checkbox */}
      <label className="flex items-center gap-2.5 text-xs text-white/80 cursor-pointer pt-2">
        <input
          type="checkbox"
          checked={hasAgreed}
          onChange={(e) => setHasAgreed(e.target.checked)}
          className="rounded accent-brand-orange"
        />
        <span>I have reviewed my items, shipping address, and payment method details.</span>
      </label>

      {/* Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onBack}
          disabled={isSubmitting}
          className="flex-1"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Edit Details
        </Button>

        <Button
          type="button"
          variant="brand"
          size="lg"
          disabled={!hasAgreed || isSubmitting}
          isLoading={isSubmitting}
          onClick={onConfirm}
          className="flex-1"
        >
          <ShieldCheck className="w-4 h-4 mr-2" />
          Confirm & Place Order ({formatCurrency(summary.total)})
        </Button>
      </div>
    </div>
  );
}
