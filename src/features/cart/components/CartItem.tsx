"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "../types/cart.types";
import { CartQuantity } from "./CartQuantity";
import { formatCurrency } from "@/utils/currency";
import { ROUTES } from "@/constants/routes";
import { useUiStore } from "@/store/ui.store";

export interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const closeCart = useUiStore((s) => s.closeCart);

  return (
    <div className="flex gap-4 py-4 border-b border-white/10 group">
      {/* Thumbnail */}
      <Link
        href={ROUTES.PRODUCT_DETAILS(item.slug)}
        onClick={closeCart}
        className="relative w-20 h-24 shrink-0 rounded-lg overflow-hidden bg-neutral-900 border border-white/10"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="80px"
          className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex items-start justify-between gap-2">
            <Link
              href={ROUTES.PRODUCT_DETAILS(item.slug)}
              onClick={closeCart}
              className="text-sm font-semibold text-white/90 hover:text-white line-clamp-1 transition-colors"
            >
              {item.name}
            </Link>
            <button
              onClick={onRemove}
              className="text-white/40 hover:text-brand-orange transition-colors p-1 -mr-1"
              aria-label="Remove item"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {item.size && (
            <p className="text-xs text-white/50 mt-0.5">
              Size: <span className="text-white/80 font-medium">{item.size}</span>
            </p>
          )}

          <p className="text-xs text-brand-orange font-semibold mt-1">
            {formatCurrency(item.price)}
          </p>
        </div>

        {/* Quantity Controls & Line Total */}
        <div className="flex items-center justify-between mt-3">
          <CartQuantity
            quantity={item.quantity}
            max={item.maxQuantity}
            onIncrease={() => onUpdateQuantity(item.quantity + 1)}
            onDecrease={() => onUpdateQuantity(item.quantity - 1)}
          />

          <span className="text-xs font-bold text-white tabular-nums">
            {formatCurrency(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
