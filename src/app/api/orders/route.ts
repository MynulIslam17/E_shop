import { NextRequest, NextResponse } from "next/server";
import { checkoutService } from "@/features/checkout/services/checkout.service";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    if (!payload.customer || !payload.shippingAddress || !payload.items || payload.items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Missing required order fields or empty cart" },
        { status: 400 }
      );
    }

    // Backend independently recalculates all prices & discounts
    const createdOrder = await checkoutService.placeOrder(payload);

    return NextResponse.json({
      success: true,
      message: "Order placed successfully",
      data: createdOrder,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to process order";
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}
