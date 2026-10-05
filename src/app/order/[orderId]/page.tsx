import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { orderService } from "@/features/orders/services/order.service";
import { OrderTimeline } from "@/features/orders/components/OrderTimeline";
import { OrderStatus } from "@/features/orders/components/OrderStatus";
import { OrderItems } from "@/features/orders/components/OrderItems";
import { formatCurrency } from "@/utils/currency";
import { formatDate } from "@/utils/date";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Printer, ArrowLeft } from "lucide-react";
import { constructMetadata } from "@/lib/metadata";

interface PageProps {
  params: Promise<{ orderId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { orderId } = await params;
  return constructMetadata({
    title: `Order Status: ${orderId}`,
    description: `Track real-time delivery status for order ${orderId}.`,
    path: `/order/${orderId}`,
  });
}

export default async function OrderDetailPage({ params }: PageProps) {
  const { orderId } = await params;
  const order = await orderService.getOrderById(orderId);

  if (!order) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 text-white space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <Link
            href="/checkout/track"
            className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Track Another Parcel</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-white">
            Order {order.orderNumber}
          </h1>
          <p className="text-xs text-white/50 mt-1">
            Placed on {formatDate(order.createdAt)} • Ref: {order.id}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <OrderStatus status={order.orderStatus} />
          {order.token && (
            <Link href={`/invoice/${order.token}`}>
              <Button variant="outline" size="sm">
                <Printer className="w-3.5 h-3.5 mr-1.5" />
                Invoice
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#140A0E] border border-white/10 space-y-6">
        <h3 className="text-base font-bold uppercase tracking-wider text-white">
          Fulfillment & Dispatch Milestones
        </h3>
        <OrderTimeline timeline={order.timeline} />
      </div>

      {/* Items & Shipping Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-7 p-6 rounded-2xl bg-[#140A0E] border border-white/10 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white pb-3 border-b border-white/10">
            Items in Parcel
          </h3>
          <OrderItems items={order.items} />
        </div>

        <div className="md:col-span-5 p-6 rounded-2xl bg-[#140A0E] border border-white/10 space-y-4 text-xs">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white pb-3 border-b border-white/10">
            Financial Summary
          </h3>
          <div className="space-y-2 text-white/70">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold text-white">
                {formatCurrency(order.subtotal)}
              </span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Coupon Discount:</span>
                <span className="font-semibold">
                  -{formatCurrency(order.discount)}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery Fee:</span>
              <span className="font-semibold text-white">
                {formatCurrency(order.shippingFee)}
              </span>
            </div>
            <div className="flex justify-between font-bold text-white text-sm pt-2 border-t border-white/10">
              <span>Total Amount:</span>
              <span className="text-brand-orange text-base font-display">
                {formatCurrency(order.total)}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 space-y-1">
            <span className="text-white/40 block font-bold uppercase text-[10px]">
              Payment Status
            </span>
            <p className="text-white font-medium capitalize">
              {order.payment.method.toUpperCase()} • {order.payment.status.replace("_", " ")}
            </p>
            {order.payment.transactionId && (
              <p className="font-mono text-brand-orange text-[11px]">
                TrxID: {order.payment.transactionId}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
