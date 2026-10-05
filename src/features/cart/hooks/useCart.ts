"use client";

import { useCartStore } from "../store/cart.store";
import { useMounted } from "@/hooks/useMounted";

export function useCart() {
  const isMounted = useMounted();
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const getItemCount = useCartStore((s) => s.getItemCount);
  const getSubtotal = useCartStore((s) => s.getSubtotal);

  return {
    items: isMounted ? items : [],
    itemCount: isMounted ? getItemCount() : 0,
    subtotal: isMounted ? getSubtotal() : 0,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isMounted,
  };
}
