import React from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/common/Logo";
import { ROUTES } from "@/constants/routes";
import { siteConfig } from "@/config/site.config";

export default function CheckoutFailedPage() {
  return (
    <div className="min-h-screen bg-[#0B0B10] flex flex-col justify-between">
      <header className="border-b border-white/10 py-5 text-center">
        <Logo size="sm" />
      </header>

      <main className="px-4 py-12">
        <div className="max-w-md mx-auto text-center py-12 px-6 bg-[#140A0E] border border-white/10 rounded-3xl space-y-6">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto text-brand-orange">
            <AlertCircle className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-display uppercase tracking-tight text-white">
              Order Submission Incomplete
            </h1>
            <p className="text-xs text-white/60">
              We encountered an issue finalizing your order. Your card or mobile wallet has not been charged.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link href={ROUTES.CHECKOUT} className="flex-1">
              <Button variant="brand" size="md" className="w-full">
                <RotateCcw className="w-4 h-4 mr-2" />
                Return to Checkout
              </Button>
            </Link>
            <Link href={ROUTES.CONTACT} className="flex-1">
              <Button variant="outline" size="md" className="w-full">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-white/40 border-t border-white/5">
        {siteConfig.name} Customer Concierge
      </footer>
    </div>
  );
}
