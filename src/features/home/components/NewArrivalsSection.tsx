import React from "react";
import { Product } from "@/features/products/types/product.types";
import { ProductCollectionSection } from "./ProductCollectionSection";

export interface NewArrivalsSectionProps {
  products: Product[];
}

export function NewArrivalsSection({ products }: NewArrivalsSectionProps) {
  return (
    <ProductCollectionSection
      title="New Arrivals"
      description="The latest drops. Fresh styles added weekly."
      collectionSlug="new-arrivals"
      products={products}
    />
  );
}
