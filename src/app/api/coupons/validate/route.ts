import { NextRequest, NextResponse } from "next/server";
import { couponService } from "@/features/coupons/services/coupon.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, subtotal } = body;

    if (!code) {
      return NextResponse.json(
        { success: false, message: "Coupon code is required" },
        { status: 400 }
      );
    }

    const result = await couponService.validateCoupon(code, Number(subtotal) || 0);

    return NextResponse.json({
      success: result.isValid,
      data: result,
      message: result.message,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to validate coupon";
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}
