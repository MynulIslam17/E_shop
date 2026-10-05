"use client";

import { useCheckoutStore } from "../store/checkout.store";
import { useCartStore } from "@/features/cart/store/cart.store";
import { checkoutService } from "../services/checkout.service";
import { useState } from "react";
import { Order } from "@/features/orders/types/order.types";
import { calculateOrderSummary } from "@/utils/price";
import { storeConfig } from "@/config/store.config";

export function useCheckout() {
  const currentStep = useCheckoutStore((s) => s.currentStep);
  const delivery = useCheckoutStore((s) => s.delivery);
  const payment = useCheckoutStore((s) => s.payment);
  const couponCode = useCheckoutStore((s) => s.couponCode);
  const couponDiscount = useCheckoutStore((s) => s.couponDiscount);
  const shippingFee = useCheckoutStore((s) => s.shippingFee);

  const setStep = useCheckoutStore((s) => s.setStep);
  const setDelivery = useCheckoutStore((s) => s.setDelivery);
  const setPayment = useCheckoutStore((s) => s.setPayment);
  const applyCoupon = useCheckoutStore((s) => s.applyCoupon);
  const removeCoupon = useCheckoutStore((s) => s.removeCoupon);
  const resetCheckout = useCheckoutStore((s) => s.resetCheckout);

  const cartItems = useCartStore((s) => s.items);
  const cartSubtotal = useCartStore((s) => s.getSubtotal());
  const clearCart = useCartStore((s) => s.clearCart);

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if eligible for free delivery
  const effectiveShipping =
    cartSubtotal >= storeConfig.shipping.freeShippingThreshold ? 0 : shippingFee;

  const orderSummary = calculateOrderSummary(
    cartSubtotal,
    couponDiscount,
    effectiveShipping
  );

  const submitOrder = async (): Promise<Order | null> => {
    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return null;
    }

    setIsPlacingOrder(true);
    setError(null);

    try {
      const order = await checkoutService.placeOrder({
        customer: {
          fullName: delivery.fullName,
          phone: delivery.phone,
          email: delivery.email || undefined,
        },
        shippingAddress: {
          fullName: delivery.fullName,
          phone: delivery.phone,
          address: delivery.address,
          district: delivery.district,
          thana: delivery.thana,
          notes: delivery.notes,
        },
        items: cartItems.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          size: item.size,
          quantity: item.quantity,
        })),
        couponCode: couponCode || undefined,
        payment: {
          method: payment.method,
          status: payment.method === "cod" ? "pending_verification" : "pending_verification",
          senderNumber: payment.senderNumber,
          transactionId: payment.transactionId,
        },
        notes: delivery.notes,
      });

      // Clear purchased items from cart after confirmed successful order creation (Rule 27)
      clearCart();
      resetCheckout();

      return order;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to place order. Please try again.";
      setError(message);
      return null;
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return {
    currentStep,
    delivery,
    payment,
    couponCode,
    couponDiscount,
    shippingFee: effectiveShipping,
    orderSummary,
    cartItems,
    isPlacingOrder,
    error,
    setStep,
    setDelivery,
    setPayment,
    applyCoupon,
    removeCoupon,
    submitOrder,
  };
}
