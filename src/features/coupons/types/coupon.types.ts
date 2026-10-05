export type CouponType = "percentage" | "fixed";

export interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  discountValue: number; // e.g. 10 for 10%, or 200 for ৳200
  minOrderAmount?: number;
  maxDiscount?: number;
  expiresAt?: string;
  isActive: boolean;
  usageLimit?: number;
  timesUsed?: number;
}

export interface CouponValidationResult {
  isValid: boolean;
  coupon?: Coupon;
  discountAmount: number;
  message: string;
}
