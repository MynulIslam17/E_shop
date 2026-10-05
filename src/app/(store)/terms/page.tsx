import React from "react";
import type { Metadata } from "next";
import { ContentArticle } from "@/components/common/ContentArticle";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Terms of Service",
  description: "Terms and conditions governing the purchase and delivery of RizqHub garments in Bangladesh.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <ContentArticle
      eyebrow="Legal Agreement"
      title="Terms of Service"
      description="Standard terms of engagement between RizqHub and customer patrons."
      lastUpdated="October 2026"
    >
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-white uppercase">1. General Overview</h3>
        <p>
          By visiting our storefront and purchasing goods, you engage in our service and agree to be bound by the following terms and conditions. These terms apply to all users of the site, including browsers, customers, and merchants.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-bold text-white uppercase">2. Accuracy of Garment Descriptions</h3>
        <p>
          We strive to display garment colors, textures, and fabric weaves as accurately as possible. However, monitor calibrations and fabric dye-lot batches may introduce slight variations. Measurements are subject to a normal manual tailoring tolerance of ±0.5 inches.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-bold text-white uppercase">3. Order Acceptance and Cancellation</h3>
        <p>
          RizqHub reserves the right to decline or cancel any order in situations involving suspect fraudulent activity, pricing errors, or sudden inventory exhaustion. If your order is cancelled following payment, a prompt refund will be issued via your original payment channel.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-bold text-white uppercase">4. Governing Law</h3>
        <p>
          These Terms of Service and any separate agreements whereby we provide you services shall be governed by and construed in accordance with the laws of the People&apos;s Republic of Bangladesh.
        </p>
      </section>
    </ContentArticle>
  );
}
