"use client";

import React, { use } from "react";
import { orderService } from "@/features/orders/services/order.service";
import { Order, OrderItem } from "@/features/orders/types/order.types";
import { formatCurrency } from "@/utils/currency";
import { formatDate } from "@/utils/date";
import { Button } from "@/components/ui/Button";
import { Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";

export default function InvoicePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = use(params);
  const [order, setOrder] = React.useState<Order | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    orderService.getOrderByToken(token).then((res) => {
      setOrder(res);
      setLoading(false);
    });
  }, [token]);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <span className="text-xs uppercase font-bold tracking-widest text-white/50">
          Generating Invoice...
        </span>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold uppercase mb-2">Invoice Not Found</h2>
        <p className="text-xs text-white/60 mb-6">
          The requested invoice token does not match an active customer record.
        </p>
        <Link href="/">
          <Button variant="outline" size="sm">
            Return Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 py-10 px-4 sm:px-6 print:bg-white print:p-0 print:m-0 text-black">
      {/* Top Bar for web view (hidden during print) */}
      <div className="max-w-3xl mx-auto mb-6 flex items-center justify-between print:hidden">
        <Link
          href={`/order/${order.orderNumber}`}
          className="text-xs text-white/70 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Order Status</span>
        </Link>

        <Button
          type="button"
          variant="brand"
          size="sm"
          onClick={handlePrint}
          className="shadow-lg"
        >
          <Printer className="w-3.5 h-3.5 mr-2" />
          Print Invoice
        </Button>
      </div>

      {/* Printable Invoice Sheet */}
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-2xl print:rounded-none shadow-2xl print:shadow-none border border-neutral-200 print:border-none space-y-8 font-sans">
        {/* Invoice Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b-2 border-black">
          <div>
            <span className="text-3xl font-display font-black tracking-widest uppercase text-black block">
              {siteConfig.name}
            </span>
            <p className="text-xs text-neutral-600 mt-1">
              Modern Essentials from Bangladesh
            </p>
            <p className="text-xs text-neutral-500">
              {siteConfig.contact.address} • {siteConfig.contact.phone}
            </p>
          </div>

          <div className="sm:text-right">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 block">
              Commercial Invoice
            </span>
            <h1 className="text-xl font-mono font-bold text-black mt-0.5">
              {order.orderNumber}
            </h1>
            <p className="text-xs text-neutral-600 mt-1">
              Date: {formatDate(order.createdAt)}
            </p>
          </div>
        </div>

        {/* Billed To / Shipped To */}
        <div className="grid grid-cols-2 gap-8 text-xs">
          <div>
            <span className="font-bold uppercase tracking-wider text-neutral-400 block mb-1">
              Billed & Shipped To:
            </span>
            <p className="font-bold text-sm text-black">{order.customer.fullName}</p>
            <p className="text-neutral-700 mt-0.5">{order.shippingAddress.address}</p>
            <p className="text-neutral-700">
              {order.shippingAddress.district}{order.shippingAddress.thana ? `, ${order.shippingAddress.thana}` : ""}
            </p>
            <p className="text-neutral-700 font-mono mt-1">{order.customer.phone}</p>
            {order.customer.email && (
              <p className="text-neutral-500">{order.customer.email}</p>
            )}
          </div>

          <div className="sm:text-right">
            <span className="font-bold uppercase tracking-wider text-neutral-400 block mb-1">
              Payment Specifications:
            </span>
            <p className="font-bold text-black uppercase">
              {order.payment.method === "cod" ? "Cash on Delivery" : `${order.payment.method.toUpperCase()} Mobile Wallet`}
            </p>
            <p className="text-neutral-600 capitalize">
              Status: {order.payment.status.replace("_", " ")}
            </p>
            {order.payment.transactionId && (
              <p className="font-mono text-neutral-800 text-[11px] mt-1">
                TrxID: {order.payment.transactionId}
              </p>
            )}
          </div>
        </div>

        {/* Line Items Table */}
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-neutral-200 text-neutral-500 font-bold uppercase tracking-wider">
              <th className="py-2.5">Item Description</th>
              <th className="py-2.5 text-center">Size</th>
              <th className="py-2.5 text-center">Qty</th>
              <th className="py-2.5 text-right">Unit Price</th>
              <th className="py-2.5 text-right">Line Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {order.items.map((item: OrderItem, idx: number) => (
              <tr key={idx}>
                <td className="py-3 font-medium text-black">{item.name}</td>
                <td className="py-3 text-center text-neutral-600">{item.size || "—"}</td>
                <td className="py-3 text-center text-neutral-600 font-bold">{item.quantity}</td>
                <td className="py-3 text-right text-neutral-600 font-mono">
                  {formatCurrency(item.price)}
                </td>
                <td className="py-3 text-right font-bold text-black font-mono">
                  {formatCurrency(item.price * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Calculation Totals */}
        <div className="flex justify-end pt-4 border-t border-neutral-200">
          <div className="w-64 space-y-2 text-xs">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal:</span>
              <span className="font-mono">{formatCurrency(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Coupon Discount:</span>
                <span className="font-mono">-{formatCurrency(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-600">
              <span>Delivery Fee:</span>
              <span className="font-mono">{formatCurrency(order.shippingFee)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-black pt-2 border-t-2 border-black">
              <span>Total Payable:</span>
              <span className="font-mono text-base">{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Invoice Footer / Terms */}
        <div className="pt-8 border-t border-neutral-200 text-[11px] text-neutral-500 leading-relaxed text-center sm:text-left">
          <p className="font-bold text-black uppercase mb-1">
            Thank you for supporting Bangladeshi Craftsmanship!
          </p>
          <p>
            Please keep this document for any exchange or warranty requests. Contact our concierge at {siteConfig.contact.email} or WhatsApp {siteConfig.contact.phone} within 7 days of parcel reception.
          </p>
        </div>
      </div>
    </div>
  );
}
