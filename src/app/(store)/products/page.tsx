import React, { Suspense } from "react";
import type { Metadata } from "next";
import { ProductsClient } from "./ProductsClient";
import { constructMetadata } from "@/lib/metadata";
import { Spinner } from "@/components/ui/Spinner";

export const metadata: Metadata = constructMetadata({
  title: "Shop All Menswear",
  description:
    "Explore our complete collection of Bangladeshi crafted menswear, Cuban collars, boxy fit shirts, and textured winter check shirts.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <Spinner size="lg" />
        </div>
      }
    >
      <ProductsClient />
    </Suspense>
  );
}
