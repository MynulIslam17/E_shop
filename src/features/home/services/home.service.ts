import { HomeData } from "../types/home.types";
import { storeConfig } from "@/config/store.config";
import { productService } from "@/features/products/services/product.service";
import { MOCK_PRODUCTS } from "@/features/products/data/products.mock";

export const homeService = {
  async getHomeData(): Promise<HomeData> {
    const { products } = await productService.getProducts({ limit: 20 });

    const newArrivals = products.slice(0, 8);
    const basicCollection = products.filter(
      (p) => p.category === "premium-quality-at-a-fair-price"
    );
    const premiumCollection = products.filter(
      (p) => p.category === "expensive"
    );

    const featuredProduct =
      products.find((p) => p.slug === "half-sleeve-cuban-collar-shirt") ||
      MOCK_PRODUCTS[0];

    return {
      saleAnnouncement: storeConfig.saleAnnouncement,
      marquee: storeConfig.marquee,
      featuredProduct,
      newArrivals,
      basicCollection,
      premiumCollection,
    };
  },
};
