export interface CartItem {
  productId: string;
  variantId?: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  compareAtPrice?: number;
  size?: string;
  quantity: number;
  maxQuantity: number;
}

export interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => boolean;
  removeItem: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, size: string | undefined, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
}
