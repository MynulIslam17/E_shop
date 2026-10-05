"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, PackageCheck, Printer, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/common/Logo";
import { ROUTES } from "@/constants/routes";
import { siteConfig } from "@/config/site.config";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "ECOM-20261004-1234";
  const token = searchParams.get("token") || "";

  return (
    <div className="max-w-xl mx-auto text-center py-16 px-6 sm:px-8 bg-[#140A0E] border border-white/10 rounded-3xl space-y-6 shadow-2xl">
      <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-1.5">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
          Order Confirmed
        </span>
        <h1 className="text-3xl sm:text-4xl font-display uppercase tracking-tight text-white">
          Thank You For Your Order
        </h1>
        <p className="text-xs sm:text-sm text-white/60">
          We&apos;ve received your order and our fulfillment team has started picking your garments.
        </p>
      </div>

      {/* Order Reference Box */}
      <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
        <span className="text-[11px] uppercase tracking-wider text-white/50 block">
          Your Order Number
        </span>
        <span className="text-xl sm:text-2xl font-mono font-bold text-brand-orange tracking-wider">
          {orderId}
        </span>
        <p className="text-[11px] text-white/40 pt-1">
          A confirmation SMS has been dispatched to your mobile number.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Link href={`/order/${orderId}`} className="flex-1">
          <Button variant="brand" size="md" className="w-full">
            <PackageCheck className="w-4 h-4 mr-2" />
            Track Order
          </Button>
        </Link>

        {token && (
          <Link href={`/invoice/${token}`} className="flex-1">
            <Button variant="outline" size="md" className="w-full">
              <Printer className="w-4 h-4 mr-2" />
              Print Invoice
            </Button>
          </Link>
        )}

        <Link href={ROUTES.HOME} className="flex-1">
          <Button variant="secondary" size="md" className="w-full">
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-[#0B0B10] flex flex-col justify-between">
      <header className="border-b border-white/10 py-5 text-center">
        <Logo size="sm" />
      </header>

      <main className="px-4 py-8">
        <Suspense fallback={<div className="text-center text-xs">Loading order confirmation...</div>}>
          <SuccessContent />
        </Suspense>
      </main>

      <footer className="py-6 text-center text-xs text-white/40 border-t border-white/5">
        {siteConfig.name} • Modern Essentials from Bangladesh
      </footer>
    </div>
  );
}
