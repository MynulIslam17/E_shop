import React from "react";
import { Product } from "../types/product.types";
import { ProductCard } from "./ProductCard";
import { SectionHeader } from "@/components/common/SectionHeader";

export interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <div className="pt-16 border-t border-white/10 w-full">
      <SectionHeader
        title="Complete The Look"
        subtitle="Pieces crafted to pair seamlessly with your wardrobe."
        viewAllLink="/products"
        viewAllText="View Catalog"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.slice(0, 4).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
