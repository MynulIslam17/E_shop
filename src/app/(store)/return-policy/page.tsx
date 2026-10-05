import React from "react";
import type { Metadata } from "next";
import { ContentArticle } from "@/components/common/ContentArticle";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Return & Exchange Policy",
  description: "Learn about the RizqHub 7-day hassle-free return and exchange policy across Bangladesh.",
  path: "/return-policy",
});

export default function ReturnPolicyPage() {
  return (
    <ContentArticle
      eyebrow="Customer Protection"
      title="Return & Exchange Policy"
      description="Our straightforward guidelines for size changes, replacements, and defective parcel assistance."
      lastUpdated="October 2026"
    >
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-white uppercase">1. 7-Day Exchange Window</h3>
        <p>
          At RizqHub, customer satisfaction is our paramount standard. If a garment does not fit as expected or you wish to switch colors or silhouettes, you may request an exchange within 7 calendar days of parcel delivery.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-bold text-white uppercase">2. Condition of Returned Items</h3>
        <p>
          To qualify for an exchange or refund:
        </p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>The garment must be unworn, unwashed, and odor-free.</li>
          <li>All original tags, neck labels, and brand packaging must remain intact.</li>
          <li>A digital invoice copy or Order ID must be presented upon request.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-bold text-white uppercase">3. Defective or Damaged Products</h3>
        <p>
          In the rare event that you receive a defective shirt or transit damage, please take photos immediately upon delivery and submit a request via our Return Portal (<span className="text-brand-orange font-mono">/return/[token]</span>) or WhatsApp helpline. We will courier a brand-new replacement at zero additional delivery charge.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-bold text-white uppercase">4. Return Shipping Charges</h3>
        <p>
          For size exchanges due to customer choice, the customer bears the standard courier return fee (৳80 in Dhaka, ৳115 outside Dhaka). If the return is due to an error on our part (wrong size dispatched, manufacturing defect), RizqHub absorbs 100% of the courier fees.
        </p>
      </section>
    </ContentArticle>
  );
}
