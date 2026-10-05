export type ProductSize = "S" | "M" | "L" | "XL" | "XXL";

export interface ProductVariant {
  id: string;
  size?: string;
  color?: string;
  sku: string;
  price?: number;
  stock: number;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface CollectionSummary {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  sku: string;
  description: string;
  details?: string;
  material?: string;
  careInstructions?: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  collection?: CollectionSummary;
  category?: string;
  variants: ProductVariant[];
  sizes: string[];
  availableSizes: string[];
  stock: number;
  isFeatured: boolean;
  isBestSeller: boolean;
  status: "active" | "inactive";
  reviewRating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt?: string;
}

export interface ProductFilterParams {
  category?: string;
  collection?: string;
  search?: string;
  sort?: "newest" | "price-asc" | "price-desc" | "best-selling";
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  size?: string;
  page?: number;
  limit?: number;
}
