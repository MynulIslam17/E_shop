"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { orderService } from "../services/order.service";
import { Order } from "../types/order.types";
import { OrderTimeline } from "./OrderTimeline";
import { OrderStatus } from "./OrderStatus";
import { OrderItems } from "./OrderItems";
import { formatCurrency } from "@/utils/currency";
import { formatDate } from "@/utils/date";

export function TrackOrderForm() {
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await orderService.trackOrder(query);
      if (res) {
        setOrder(res);
      } else {
        setOrder(null);
        setError("No order found matching that Order ID or phone number. Please verify and try again.");
      }
    } catch {
      setError("An error occurred while tracking the order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Search Box */}
      <form
        onSubmit={handleTrack}
        className="p-6 md:p-8 bg-[#1A0F13] border border-white/10 rounded-2xl space-y-4"
      >
        <div>
          <h2 className="text-xl md:text-2xl font-display uppercase tracking-tight text-white">
            Track Your Order
          </h2>
          <p className="text-xs text-white/50 mt-1">
            Enter the order ID (e.g. ECOM-20261004-1234) or phone number from your confirmation SMS.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Order ID or Phone Number..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
            className="flex-1"
          />
          <Button
            type="submit"
            variant="brand"
            size="md"
            isLoading={isLoading}
            className="shrink-0"
          >
            <Search className="w-4 h-4 mr-2" />
            Track Order
          </Button>
        </div>

        {error && (
          <p className="text-xs text-brand-orange font-medium mt-2">{error}</p>
        )}
      </form>

      {/* Result Card */}
      {order && (
        <div className="p-6 md:p-8 bg-[#1A0F13] border border-white/10 rounded-2xl space-y-8 animate-in fade-in duration-300">
          {/* Header Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                Order Tracking
              </span>
              <h3 className="text-xl font-display font-bold text-white tracking-tight mt-0.5">
                {order.orderNumber}
              </h3>
              <p className="text-xs text-white/50 mt-0.5">
                Placed on {formatDate(order.createdAt)}
              </p>
            </div>

            <div>
              <OrderStatus status={order.orderStatus} />
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/70 mb-6">
              Delivery Timeline
            </h4>
            <OrderTimeline timeline={order.timeline} />
          </div>

          {/* Order Details & Summary */}
          <div className="pt-6 border-t border-white/10 space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/70 mb-3">
                Items in this parcel
              </h4>
              <OrderItems items={order.items} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs">
              <div>
                <span className="text-white/40 block mb-1">Shipping Address</span>
                <p className="text-white font-medium">{order.shippingAddress.fullName}</p>
                <p className="text-white/70">{order.shippingAddress.address}</p>
                <p className="text-white/70">
                  {order.shippingAddress.district}{order.shippingAddress.thana ? `, ${order.shippingAddress.thana}` : ""}
                </p>
                <p className="text-white/70">{order.shippingAddress.phone}</p>
              </div>

              <div>
                <span className="text-white/40 block mb-1">Payment & Total</span>
                <p className="text-white font-medium capitalize">
                  {order.payment.method.toUpperCase()} ({order.payment.status.replace("_", " ")})
                </p>
                <div className="space-y-1 mt-2 text-white/70">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(order.subtotal)}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Discount:</span>
                      <span>-{formatCurrency(order.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery:</span>
                    <span>{formatCurrency(order.shippingFee)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-white text-sm pt-1 border-t border-white/10">
                    <span>Total:</span>
                    <span>{formatCurrency(order.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
