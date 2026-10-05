import { PlaceOrderPayload } from "../types/checkout.types";
import { Order } from "@/features/orders/types/order.types";
import { orderService } from "@/features/orders/services/order.service";
import { MOCK_PRODUCTS } from "@/features/products/data/products.mock";
import { couponService } from "@/features/coupons/services/coupon.service";
import { storeConfig } from "@/config/store.config";
import { analyticsService } from "@/services/analytics/analytics.service";

export const checkoutService = {
  async placeOrder(payload: PlaceOrderPayload): Promise<Order> {
    // 1. Recalculate Subtotal independently from backend product database
    let serverSubtotal = 0;
    const validatedItems = payload.items.map((item) => {
      const prod = MOCK_PRODUCTS.find((p) => p.id === item.productId);
      if (!prod) {
        throw new Error(`Product ${item.productId} not found.`);
      }
      const variant = prod.variants.find((v) => v.size === item.size);
      const unitPrice = variant?.price || prod.price;

      serverSubtotal += unitPrice * item.quantity;

      return {
        productId: prod.id,
        variantId: variant?.id,
        name: prod.name,
        slug: prod.slug,
        image: prod.images[0] || "",
        size: item.size,
        price: unitPrice,
        quantity: item.quantity,
      };
    });

    // 2. Validate Coupon independently
    let serverDiscount = 0;
    if (payload.couponCode) {
      const couponCheck = await couponService.validateCoupon(
        payload.couponCode,
        serverSubtotal
      );
      if (couponCheck.isValid) {
        serverDiscount = couponCheck.discountAmount;
      }
    }

    // 3. Calculate Shipping Fee independently
    const zone = payload.shippingAddress.district.toLowerCase().includes("dhaka")
      ? "inside_dhaka"
      : "outside_dhaka";

    let shippingFee =
      zone === "inside_dhaka"
        ? storeConfig.shipping.zones.insideDhaka.rate
        : storeConfig.shipping.zones.outsideDhaka.rate;

    if (serverSubtotal >= storeConfig.shipping.freeShippingThreshold) {
      shippingFee = 0;
    }

    // 4. Calculate Final Total
    const finalTotal = Math.max(0, serverSubtotal - serverDiscount + shippingFee);

    // 5. Generate Order ID and Token
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `ECOM-${dateStr}-${randomSuffix}`;
    const token = `tok_${randomSuffix}_${Date.now()}`;

    const newOrder: Order = {
      id: `ord-${orderNumber.toLowerCase()}`,
      orderNumber,
      token,
      customer: payload.customer,
      shippingAddress: payload.shippingAddress,
      items: validatedItems,
      subtotal: serverSubtotal,
      discount: serverDiscount,
      shippingFee,
      total: finalTotal,
      couponCode: payload.couponCode,
      payment: payload.payment,
      orderStatus:
        payload.payment.method === "cod"
          ? "Confirmed"
          : "Payment Verification",
      notes: payload.notes,
      createdAt: new Date().toISOString(),
      timeline: [
        {
          status: "Order Placed",
          title: "Order Placed",
          description: "Your order has been recorded in our system.",
          timestamp: new Date().toLocaleTimeString("en-BD", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isCompleted: true,
          isCurrent: payload.payment.method === "cod",
        },
        ...(payload.payment.method !== "cod"
          ? [
              {
                status: "Payment Verification" as const,
                title: "Payment Verification",
                description: `Awaiting admin confirmation for Transaction ID ${payload.payment.transactionId}.`,
                timestamp: "In progress",
                isCompleted: false,
                isCurrent: true,
              },
            ]
          : []),
        {
          status: "Confirmed",
          title: "Confirmed",
          description: "Order is verified and sent to picking.",
          timestamp: "Pending",
          isCompleted: false,
          isCurrent: false,
        },
        {
          status: "Processing",
          title: "Processing",
          description: "Fulfillment team is preparing your package.",
          timestamp: "Pending",
          isCompleted: false,
          isCurrent: false,
        },
        {
          status: "Packed",
          title: "Packed",
          description: "Package ready for courier pickup.",
          timestamp: "Pending",
          isCompleted: false,
          isCurrent: false,
        },
        {
          status: "Shipped",
          title: "Shipped",
          description: "Handed over to courier.",
          timestamp: "Pending",
          isCompleted: false,
          isCurrent: false,
        },
        {
          status: "Out for Delivery",
          title: "Out for Delivery",
          description: "Delivery rider assigned.",
          timestamp: "Pending",
          isCompleted: false,
          isCurrent: false,
        },
        {
          status: "Delivered",
          title: "Delivered",
          description: "Parcel successfully delivered.",
          timestamp: "Pending",
          isCompleted: false,
          isCurrent: false,
        },
      ],
    };

    // Save order
    orderService.saveOrder(newOrder);

    // Track purchase analytics event
    analyticsService.track({
      name: "purchase",
      params: {
        orderId: newOrder.orderNumber,
        totalAmount: newOrder.total,
        itemCount: newOrder.items.length,
        paymentMethod: newOrder.payment.method,
      },
    });

    return newOrder;
  },
};
