"use client";

import React from "react";
import { Input } from "@/components/ui/Input";
import { Copy, Check } from "lucide-react";
import { paymentConfig } from "@/config/payment.config";

export interface MobilePaymentFormProps {
  method: "bkash" | "nagad";
  senderNumber?: string;
  transactionId?: string;
  shippingFee: number;
  onSenderNumberChange: (val: string) => void;
  onTransactionIdChange: (val: string) => void;
}

export function MobilePaymentForm({
  method,
  senderNumber = "",
  transactionId = "",
  shippingFee,
  onSenderNumberChange,
  onTransactionIdChange,
}: MobilePaymentFormProps) {
  const [copied, setCopied] = React.useState(false);

  const selectedConfig = paymentConfig.methods.find((m) => m.id === method);
  const merchantNumber = selectedConfig?.merchantNumber || "01998778632";

  const handleCopy = () => {
    navigator.clipboard.writeText(merchantNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 sm:p-5 rounded-xl bg-neutral-900/90 border border-white/10 space-y-4 animate-in fade-in duration-200">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
            Advance Delivery Payment ({method.toUpperCase()})
          </span>
          <p className="text-xs text-white/60 mt-0.5">
            Send the delivery fee of <span className="text-white font-bold">৳{shippingFee}</span> to confirm your order.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs text-white font-medium hover:bg-white/20 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy Number</span>
            </>
          )}
        </button>
      </div>

      {/* Instructions list */}
      <div className="space-y-1 text-xs text-white/70 leading-relaxed bg-black/40 p-3 rounded-lg border border-white/5">
        <p className="font-semibold text-white">Merchant/Personal Number: <span className="font-mono text-brand-orange">{merchantNumber}</span></p>
        <p>1. Open your {method.toUpperCase()} App or dial USSD.</p>
        <p>2. Select &ldquo;Send Money&rdquo; to the number above.</p>
        <p>3. Amount: ৳{shippingFee} (Reference: RizqHub).</p>
        <p>4. Complete with your PIN and paste the TrxID below.</p>
      </div>

      {/* Form Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        <Input
          label={`${method.toUpperCase()} Sender Number`}
          placeholder="01XXXXXXXXX"
          value={senderNumber}
          onChange={(e) => onSenderNumberChange(e.target.value)}
          required
        />

        <Input
          label="Transaction ID (TrxID)"
          placeholder="e.g. 9B8A72F6K"
          value={transactionId}
          onChange={(e) => onTransactionIdChange(e.target.value.toUpperCase())}
          required
        />
      </div>

      <p className="text-[11px] text-white/40 italic">
        * Your transaction will be placed under &ldquo;Pending Verification&rdquo; until our automated or manual gateway confirms the match.
      </p>
    </div>
  );
}
