import { Coupon, CouponValidationResult } from "../types/coupon.types";
import { formatCurrency } from "@/utils/currency";

export const MOCK_COUPONS: Coupon[] = [
  {
    id: "c-1",
    code: "RIZQ10",
    type: "percentage",
    discountValue: 10,
    minOrderAmount: 800,
    isActive: true,
  },
  {
    id: "c-1b",
    code: "HEEMS10",
    type: "percentage",
    discountValue: 10,
    minOrderAmount: 800,
    isActive: true,
  },
  {
    id: "c-2",
    code: "SAVE200",
    type: "fixed",
    discountValue: 200,
    minOrderAmount: 1200,
    isActive: true,
  },
  {
    id: "c-3",
    code: "WELCOME",
    type: "fixed",
    discountValue: 100,
    minOrderAmount: 400,
    isActive: true,
  },
  {
    id: "c-4",
    code: "EXPIRED50",
    type: "percentage",
    discountValue: 50,
    isActive: false,
    expiresAt: "2024-01-01T00:00:00Z",
  },
];

export const couponService = {
  async validateCoupon(
    code: string,
    orderSubtotal: number
  ): Promise<CouponValidationResult> {
    const cleanCode = code.trim().toUpperCase();
    const found = MOCK_COUPONS.find((c) => c.code === cleanCode);

    if (!found) {
      return {
        isValid: false,
        discountAmount: 0,
        message: "Invalid coupon code.",
      };
    }

    if (!found.isActive) {
      return {
        isValid: false,
        discountAmount: 0,
        message: "This coupon is no longer active.",
      };
    }

    if (found.expiresAt && new Date(found.expiresAt).getTime() < Date.now()) {
      return {
        isValid: false,
        discountAmount: 0,
        message: "This coupon has expired.",
      };
    }

    if (found.minOrderAmount && orderSubtotal < found.minOrderAmount) {
      return {
        isValid: false,
        discountAmount: 0,
        message: `Minimum order amount of ${formatCurrency(found.minOrderAmount)} required for this coupon.`,
      };
    }

    let discount = 0;
    if (found.type === "percentage") {
      discount = Math.round((orderSubtotal * found.discountValue) / 100);
      if (found.maxDiscount && discount > found.maxDiscount) {
        discount = found.maxDiscount;
      }
    } else {
      discount = found.discountValue;
    }

    return {
      isValid: true,
      coupon: found,
      discountAmount: Math.min(orderSubtotal, discount),
      message: `Coupon applied — ${formatCurrency(discount)} saved.`,
    };
  },
};
