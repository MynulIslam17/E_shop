"use client";

import React from "react";
import { Drawer } from "@/components/ui/Drawer";
import { useUiStore } from "@/store/ui.store";
import { useCart } from "../hooks/useCart";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { EmptyCart } from "./EmptyCart";

export function CartDrawer() {
  const isCartOpen = useUiStore((s) => s.isCartOpen);
  const closeCart = useUiStore((s) => s.closeCart);
  const { items, itemCount, subtotal, updateQuantity, removeItem } = useCart();

  const title = `Your Cart (${itemCount})`;

  return (
    <Drawer
      isOpen={isCartOpen}
      onClose={closeCart}
      title={title}
      side="right"
      width="max-w-md"
      footer={
        items.length > 0 ? (
          <CartSummary subtotal={subtotal} itemCount={itemCount} />
        ) : null
      }
    >
      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="divide-y divide-white/5">
          {items.map((item) => (
            <CartItem
              key={`${item.productId}-${item.size || "default"}`}
              item={item}
              onUpdateQuantity={(qty) =>
                updateQuantity(item.productId, item.size, qty)
              }
              onRemove={() => removeItem(item.productId, item.size)}
            />
          ))}
        </div>
      )}
    </Drawer>
  );
}
