import React from "react";
import { Badge } from "@/components/ui/Badge";

export interface ProductBadgeProps {
  isSale?: boolean;
  isOutOfStock?: boolean;
  isBestSeller?: boolean;
  className?: string;
}

export function ProductBadge({
  isSale,
  isOutOfStock,
  isBestSeller,
  className = "",
}: ProductBadgeProps) {
  if (isOutOfStock) {
    return (
      <Badge variant="secondary" size="sm" className={className}>
        Out of Stock
      </Badge>
    );
  }

  if (isSale) {
    return (
      <Badge variant="brand" size="sm" className={className}>
        SALE
      </Badge>
    );
  }

  if (isBestSeller) {
    return (
      <Badge variant="warning" size="sm" className={className}>
        Best Seller
      </Badge>
    );
  }

  return null;
}
