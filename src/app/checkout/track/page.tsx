import React from "react";
import type { Metadata } from "next";
import { TrackOrderForm } from "@/features/orders/components/TrackOrderForm";
import { constructMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/common/PageHeader";

export const metadata: Metadata = constructMetadata({
  title: "Track Your Order — Nationwide Dispatch",
  description: "Check live delivery milestones, courier details, and payment verification status for your RizqHub parcel.",
  path: "/checkout/track",
});

export default function TrackOrderPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <PageHeader
        eyebrow="Real-Time Logistics"
        title="Track Your Order"
        description="Monitor every milestone of your parcel from tailoring inspection to rider dispatch."
      />

      <TrackOrderForm />
    </div>
  );
}
