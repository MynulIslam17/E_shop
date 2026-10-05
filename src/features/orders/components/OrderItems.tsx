import React from "react";
import Image from "next/image";
import Link from "next/link";
import { OrderItem } from "../types/order.types";
import { formatCurrency } from "@/utils/currency";
import { ROUTES } from "@/constants/routes";

export interface OrderItemsProps {
  items: OrderItem[];
}

export function OrderItems({ items }: OrderItemsProps) {
  return (
    <div className="divide-y divide-white/10">
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-4 py-3 items-center">
          <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-neutral-900 border border-white/10 shrink-0">
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="64px"
              className="object-cover object-top"
            />
          </div>

          <div className="flex-1 min-w-0">
            <Link
              href={ROUTES.PRODUCT_DETAILS(item.slug)}
              className="text-xs sm:text-sm font-semibold text-white hover:text-brand-orange transition-colors line-clamp-1"
            >
              {item.name}
            </Link>
            <div className="flex items-center gap-3 text-xs text-white/50 mt-1">
              {item.size && <span>Size: {item.size}</span>}
              <span>Qty: {item.quantity}</span>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs sm:text-sm font-bold text-white tabular-nums">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
