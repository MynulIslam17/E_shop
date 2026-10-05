import React from "react";
import type { Metadata } from "next";
import { ContactClient } from "./ContactClient";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Contact Concierge — Customer Support",
  description:
    "Get in touch with RizqHub customer support for order tracking, size advice, and general inquiries. Located in Banani, Dhaka, Bangladesh.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactClient />;
}
