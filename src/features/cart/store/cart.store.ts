import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartStore } from "../types/cart.types";
import { STORAGE_KEYS } from "@/constants/storage-keys";
import { analyticsService } from "@/services/analytics/analytics.service";

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item, quantity = 1) => {
        const state = get();
        const existingIndex = state.items.findIndex(
          (i) => i.productId === item.productId && i.size === item.size
        );

        if (existingIndex > -1) {
          const currentItem = state.items[existingIndex];
          const newQty = currentItem.quantity + quantity;

          if (newQty > currentItem.maxQuantity) {
            return false; // exceeds max stock
          }

          const updated = [...state.items];
          updated[existingIndex] = {
            ...currentItem,
            quantity: newQty,
          };
          set({ items: updated });
        } else {
          if (quantity > item.maxQuantity) {
            return false;
          }
          set({
            items: [...state.items, { ...item, quantity }],
          });
        }

        analyticsService.track({
          name: "add_to_cart",
          params: {
            productId: item.productId,
            name: item.name,
            price: item.price,
            size: item.size,
            quantity,
          },
        });

        return true;
      },

      removeItem: (productId, size) => {
        const state = get();
        const removed = state.items.find(
          (i) => i.productId === productId && i.size === size
        );

        set({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.size === size)
          ),
        });

        if (removed) {
          analyticsService.track({
            name: "remove_from_cart",
            params: {
              productId: removed.productId,
              name: removed.name,
              price: removed.price,
              size: removed.size,
            },
          });
        }
      },

      updateQuantity: (productId, size, quantity) => {
        const state = get();
        if (quantity <= 0) {
          get().removeItem(productId, size);
          return;
        }

        const updated = state.items.map((i) => {
          if (i.productId === productId && i.size === size) {
            const safeQty = Math.min(quantity, i.maxQuantity);
            return { ...i, quantity: safeQty };
          }
          return i;
        });

        set({ items: updated });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: STORAGE_KEYS.CART,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
