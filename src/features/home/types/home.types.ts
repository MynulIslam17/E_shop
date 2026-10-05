import { Product } from "@/features/products/types/product.types";
import { SaleAnnouncementConfig, MarqueeConfig } from "@/config/store.config";

export interface HomeData {
  saleAnnouncement: SaleAnnouncementConfig;
  marquee: MarqueeConfig;
  featuredProduct: Product;
  newArrivals: Product[];
  basicCollection: Product[];
  premiumCollection: Product[];
}
