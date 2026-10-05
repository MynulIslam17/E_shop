import React from "react";
import type { Metadata } from "next";
import { ReturnForm } from "@/features/returns/components/ReturnForm";
import { constructMetadata } from "@/lib/metadata";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";

interface PageProps {
  params: Promise<{ token: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { token } = await params;
  return constructMetadata({
    title: "Initiate Return or Exchange",
    description: "Request a seamless size exchange or return within your 7-day window.",
    path: `/return/${token}`,
  });
}

export default async function ReturnTokenPage({ params }: PageProps) {
  const { token } = await params;

  return (
    <div className="min-h-screen bg-[#0B0B10] flex flex-col justify-between">
      <Header />
      <main className="py-12 md:py-16 px-4">
        <ReturnForm token={token} />
      </main>
      <Footer />
    </div>
  );
}
