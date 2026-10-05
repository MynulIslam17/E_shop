import React from "react";
import type { Metadata } from "next";
import { ContentArticle } from "@/components/common/ContentArticle";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Privacy Policy",
  description: "How RizqHub collects, safeguards, and respects your personal shopping data.",
  path: "/privacy",
});

export default function PrivacyPolicyPage() {
  return (
    <ContentArticle
      eyebrow="Legal & Trust"
      title="Privacy Policy"
      description="We believe in uncompromising privacy. We never sell or lease customer information to third-party ad brokers."
      lastUpdated="October 2026"
    >
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-white uppercase">1. Information We Collect</h3>
        <p>
          When you place a guest order with RizqHub, we collect necessary dispatch details: your full name, mobile number, delivery address, and optional email address. We do not store financial credentials such as bKash PINs, credit card CVVs, or bank secrets.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-bold text-white uppercase">2. Use of Your Information</h3>
        <p>
          Your data is used solely to:
        </p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>Deliver orders to your specified address via verified domestic couriers.</li>
          <li>Send SMS order confirmation and dispatch tracking alerts.</li>
          <li>Authenticate mobile payment transaction IDs (bKash/Nagad).</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-bold text-white uppercase">3. Local Browser Storage</h3>
        <p>
          We use browser local storage exclusively for your convenience — specifically to cache cart items and autofill your shipping address for subsequent visits. You can clear this cache at any time via your browser settings.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-bold text-white uppercase">4. Contact Data Protection Officer</h3>
        <p>
          If you wish to purge your order records or query stored contact details, email our privacy team at <span className="text-brand-orange font-mono">support@rizqhub.com</span>.
        </p>
      </section>
    </ContentArticle>
  );
}
