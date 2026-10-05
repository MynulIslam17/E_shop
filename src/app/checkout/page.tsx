import React, { Suspense } from "react";
import type { Metadata } from "next";
import { CheckoutClient } from "./CheckoutClient";
import { constructMetadata } from "@/lib/metadata";
import { Spinner } from "@/components/ui/Spinner";

export const metadata: Metadata = constructMetadata({
  title: "Secure Guest Checkout",
  description: "Complete your order with nationwide Cash on Delivery or bKash / Nagad.",
  path: "/checkout",
});

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0B0B10] flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      }
    >
      <CheckoutClient />
    </Suspense>
  );
}
