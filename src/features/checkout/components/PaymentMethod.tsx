"use client";

import React, { useState } from "react";
import { PaymentFormData } from "../types/checkout.types";
import { MobilePaymentForm } from "./MobilePaymentForm";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, CreditCard, Banknote, Smartphone } from "lucide-react";

export interface PaymentMethodProps {
  initialData: PaymentFormData;
  shippingFee: number;
  onBack: () => void;
  onSubmit: (data: PaymentFormData) => void;
}

export function PaymentMethod({
  initialData,
  shippingFee,
  onBack,
  onSubmit,
}: PaymentMethodProps) {
  const [method, setMethod] = useState<PaymentFormData["method"]>(initialData.method || "cod");
  const [senderNumber, setSenderNumber] = useState(initialData.senderNumber || "");
  const [transactionId, setTransactionId] = useState(initialData.transactionId || "");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((method === "bkash" || method === "nagad")) {
      if (!senderNumber.trim() || senderNumber.length < 11) {
        setError(`Please enter a valid 11-digit ${method.toUpperCase()} sender phone number.`);
        return;
      }
      if (!transactionId.trim() || transactionId.length < 4) {
        setError("Please enter the Transaction ID received from SMS.");
        return;
      }
    }

    setError(null);
    onSubmit({
      method,
      senderNumber: method !== "cod" ? senderNumber : undefined,
      transactionId: method !== "cod" ? transactionId : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-2 pb-3 border-b border-white/10">
        <CreditCard className="w-5 h-5 text-brand-orange" />
        <h3 className="text-lg font-bold text-white uppercase tracking-tight">
          Select Payment Method
        </h3>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 font-medium">
          {error}
        </div>
      )}

      {/* Methods Radio Cards */}
      <div className="space-y-3">
        {/* COD */}
        <label
          className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-all ${
            method === "cod"
              ? "border-brand-orange bg-brand-orange/10"
              : "border-white/10 bg-neutral-900/60 hover:border-white/30"
          }`}
        >
          <div className="flex items-start gap-3">
            <input
              type="radio"
              name="paymentMethod"
              checked={method === "cod"}
              onChange={() => setMethod("cod")}
              className="mt-0.5 accent-brand-orange"
            />
            <div>
              <div className="flex items-center gap-2">
                <Banknote className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-bold text-white">
                  Cash on Delivery (COD)
                </span>
              </div>
              <p className="text-xs text-white/50 mt-1 leading-relaxed">
                Pay the full amount in cash directly to the delivery rider when receiving your parcel.
              </p>
            </div>
          </div>
        </label>

        {/* bKash */}
        <label
          className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-all ${
            method === "bkash"
              ? "border-brand-orange bg-brand-orange/10"
              : "border-white/10 bg-neutral-900/60 hover:border-white/30"
          }`}
        >
          <div className="flex items-start gap-3">
            <input
              type="radio"
              name="paymentMethod"
              checked={method === "bkash"}
              onChange={() => setMethod("bkash")}
              className="mt-0.5 accent-brand-orange"
            />
            <div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-pink-500" />
                <span className="text-sm font-bold text-white">
                  bKash Advance Delivery Fee
                </span>
              </div>
              <p className="text-xs text-white/50 mt-1 leading-relaxed">
                Send ৳{shippingFee} delivery charge to confirm. Remainder paid on delivery.
              </p>
            </div>
          </div>
        </label>

        {/* Nagad */}
        <label
          className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-all ${
            method === "nagad"
              ? "border-brand-orange bg-brand-orange/10"
              : "border-white/10 bg-neutral-900/60 hover:border-white/30"
          }`}
        >
          <div className="flex items-start gap-3">
            <input
              type="radio"
              name="paymentMethod"
              checked={method === "nagad"}
              onChange={() => setMethod("nagad")}
              className="mt-0.5 accent-brand-orange"
            />
            <div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-bold text-white">
                  Nagad Advance Delivery Fee
                </span>
              </div>
              <p className="text-xs text-white/50 mt-1 leading-relaxed">
                Send ৳{shippingFee} via Nagad Send Money. Remainder paid in cash at doorstep.
              </p>
            </div>
          </div>
        </label>
      </div>

      {/* Conditional Sub-form for Mobile Payment */}
      {(method === "bkash" || method === "nagad") && (
        <MobilePaymentForm
          method={method}
          shippingFee={shippingFee}
          senderNumber={senderNumber}
          transactionId={transactionId}
          onSenderNumberChange={setSenderNumber}
          onTransactionIdChange={setTransactionId}
        />
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onBack}
          className="flex-1"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Button type="submit" variant="brand" size="lg" className="flex-1">
          <span>Review Order</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </form>
  );
}
