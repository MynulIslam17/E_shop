import { calculateDiscountPercentage, calculateSavings } from "./discount";

export interface PriceSummary {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}

export function calculateOrderSummary(
  subtotal: number,
  couponDiscount: number = 0,
  shippingFee: number = 0
): PriceSummary {
  const safeSubtotal = Math.max(0, subtotal);
  const safeDiscount = Math.min(safeSubtotal, Math.max(0, couponDiscount));
  const safeShipping = Math.max(0, shippingFee);
  const total = Math.max(0, safeSubtotal - safeDiscount + safeShipping);

  return {
    subtotal: safeSubtotal,
    discount: safeDiscount,
    shipping: safeShipping,
    total,
  };
}

export { calculateDiscountPercentage, calculateSavings };
