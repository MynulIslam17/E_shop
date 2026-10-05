import { useCartStore } from "../store/cart.store";

export const cartService = {
  getCartItems() {
    return useCartStore.getState().items;
  },
  getSubtotal() {
    return useCartStore.getState().getSubtotal();
  },
  getItemCount() {
    return useCartStore.getState().getItemCount();
  },
  clear() {
    useCartStore.getState().clearCart();
  },
};
