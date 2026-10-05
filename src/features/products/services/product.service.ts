import { Product, ProductFilterParams } from "../types/product.types";
import { MOCK_PRODUCTS } from "../data/products.mock";
import { apiClient } from "@/services/api/api-client";
import { API_ENDPOINTS } from "@/constants/api";

export class ProductService {
  public async getProducts(
    params: ProductFilterParams = {}
  ): Promise<{ products: Product[]; total: number }> {
    try {
      // In client environment or when API is reachable, query through API client
      const response = await apiClient.get<{ success: boolean; data: Product[]; total: number }>(
        API_ENDPOINTS.PRODUCTS,
        { params }
      );
      if (response && response.data) {
        return { products: response.data, total: response.total ?? response.data.length };
      }
    } catch {
      // Fallback seamlessly to local mock dataset with filtering
    }

    let result = [...MOCK_PRODUCTS];

    if (params.category && params.category !== "all") {
      result = result.filter((p) => p.category === params.category);
    }

    if (params.search) {
      const q = params.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (params.inStockOnly) {
      result = result.filter((p) => p.stock > 0);
    }

    if (params.size) {
      result = result.filter((p) => p.sizes.includes(params.size!));
    }

    if (params.minPrice !== undefined) {
      result = result.filter((p) => p.price >= params.minPrice!);
    }

    if (params.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= params.maxPrice!);
    }

    if (params.sort) {
      switch (params.sort) {
        case "price-asc":
          result.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          result.sort((a, b) => b.price - a.price);
          break;
        case "best-selling":
          result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
          break;
        case "newest":
        default:
          result.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    }

    const page = params.page || 1;
    const limit = params.limit || 12;
    const start = (page - 1) * limit;
    const paginated = result.slice(start, start + limit);

    return { products: paginated, total: result.length };
  }

  public async getProductBySlug(slug: string): Promise<Product | null> {
    try {
      const res = await apiClient.get<{ success: boolean; data: Product }>(
        API_ENDPOINTS.PRODUCT_BY_SLUG(slug)
      );
      if (res && res.data) return res.data;
    } catch {
      // fallback
    }

    const found = MOCK_PRODUCTS.find((p) => p.slug === slug || p.id === slug);
    return found || null;
  }

  public async getFeaturedProducts(): Promise<Product[]> {
    const { products } = await this.getProducts({ limit: 8 });
    return products.filter((p) => p.isFeatured);
  }

  public async getBestSellers(): Promise<Product[]> {
    const { products } = await this.getProducts({ sort: "best-selling", limit: 8 });
    return products.filter((p) => p.isBestSeller);
  }

  public async getRelatedProducts(productId: string, category?: string): Promise<Product[]> {
    const { products } = await this.getProducts({ category, limit: 4 });
    return products.filter((p) => p.id !== productId);
  }

  public async searchProducts(query: string): Promise<Product[]> {
    if (!query.trim()) return [];
    const { products } = await this.getProducts({ search: query, limit: 8 });
    return products;
  }
}

export const productService = new ProductService();
