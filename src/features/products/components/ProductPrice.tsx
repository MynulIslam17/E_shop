import React from "react";
import { Price } from "@/components/common/Price";

export interface ProductPriceProps {
  price: number;
  compareAtPrice?: number;
  size?: "sm" | "md" | "lg" | "xl";
  showDiscount?: boolean;
  className?: string;
}

export function ProductPrice({
  price,
  compareAtPrice,
  size = "md",
  showDiscount = true,
  className = "",
}: ProductPriceProps) {
  return (
    <Price
      price={price}
      compareAtPrice={compareAtPrice}
      size={size}
      showDiscount={showDiscount}
      className={className}
    />
  );
}
