import { Product, ProductVariant } from "../types/product.types";

export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export function getStockStatus(stock: number): {
  status: StockStatus;
  label: string;
  badgeClass: string;
} {
  if (stock <= 0) {
    return {
      status: "out_of_stock",
      label: "Out of Stock",
      badgeClass: "bg-neutral-800 text-white/70 border border-white/10",
    };
  }
  if (stock <= 3) {
    return {
      status: "low_stock",
      label: `Only ${stock} Left`,
      badgeClass: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
    };
  }
  return {
    status: "in_stock",
    label: `${stock} available`,
    badgeClass: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  };
}

export function isSizeAvailable(product: Product, size: string): boolean {
  if (product.availableSizes && product.availableSizes.includes(size)) {
    return true;
  }
  const variant = product.variants.find((v) => v.size === size);
  return !!variant && variant.stock > 0;
}

export function getVariantBySize(product: Product, size: string): ProductVariant | undefined {
  return product.variants.find((v) => v.size === size);
}
