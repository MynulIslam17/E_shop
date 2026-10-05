"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/features/checkout/hooks/useCheckout";
import { CheckoutProgress } from "@/features/checkout/components/CheckoutProgress";
import { DeliveryAddressForm } from "@/features/checkout/components/DeliveryAddressForm";
import { PaymentMethod } from "@/features/checkout/components/PaymentMethod";
import { OrderReview } from "@/features/checkout/components/OrderReview";
import { OrderSummary } from "@/features/checkout/components/OrderSummary";
import { EmptyState } from "@/components/common/EmptyState";
import { Logo } from "@/components/common/Logo";
import Link from "next/link";
import { ShoppingBag, ArrowLeft } from "lucide-react";

export function CheckoutClient() {
  const router = useRouter();
  const {
    currentStep,
    delivery,
    payment,
    couponCode,
    couponDiscount,
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
  } = useCheckout();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B0B10] flex flex-col justify-center py-16 px-4">
        <EmptyState
          icon={<ShoppingBag className="w-12 h-12 text-white/30" />}
          title="Your Bag is Empty"
          description="You don't have any garments in your checkout queue. Please add items before checking out."
          actionText="Shop Catalog"
          actionHref="/products"
        />
      </div>
    );
  }

  const handleDeliverySubmit = (data: typeof delivery) => {
    setDelivery(data);
    setStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePaymentSubmit = (data: typeof payment) => {
    setPayment(data);
    setStep("review");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleConfirmOrder = async () => {
    const order = await submitOrder();
    if (order) {
      router.push(`/checkout/success?orderId=${order.orderNumber}&token=${order.token}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B10] text-white">
      {/* Minimal Checkout Header */}
      <header className="border-b border-white/10 py-5 bg-[#0B0B10]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/products"
            className="text-xs text-white/60 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Continue Shopping</span>
          </Link>

          <Logo size="sm" />

          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            🔒 Secure Checkout
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Step Progress Bar */}
        <CheckoutProgress
          currentStep={currentStep}
          onStepClick={(step) => setStep(step)}
        />

        {error && (
          <div className="max-w-xl mx-auto mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 font-medium">
            {error}
          </div>
        )}

        {/* 2-Column Responsive Layout: Steps on Left, Order Summary on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Customer / Payment Steps */}
          <div className="lg:col-span-7 bg-[#140A0E] p-6 sm:p-8 rounded-2xl border border-white/10">
            {currentStep === "delivery" && (
              <DeliveryAddressForm
                initialData={delivery}
                onSubmit={handleDeliverySubmit}
              />
            )}

            {currentStep === "payment" && (
              <PaymentMethod
                initialData={payment}
                shippingFee={orderSummary.shipping}
                onBack={() => setStep("delivery")}
                onSubmit={handlePaymentSubmit}
              />
            )}

            {currentStep === "review" && (
              <OrderReview
                items={cartItems}
                delivery={delivery}
                payment={payment}
                summary={orderSummary}
                isSubmitting={isPlacingOrder}
                onBack={() => setStep("payment")}
                onConfirm={handleConfirmOrder}
              />
            )}
          </div>

          {/* Sticky Order Summary */}
          <div className="lg:col-span-5 lg:sticky top-24">
            <OrderSummary
              items={cartItems}
              summary={orderSummary}
              couponCode={couponCode}
              couponDiscount={couponDiscount}
              onApplyCoupon={applyCoupon}
              onRemoveCoupon={removeCoupon}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
