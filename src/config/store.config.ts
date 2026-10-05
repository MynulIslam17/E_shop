export interface SaleAnnouncementConfig {
  enabled: boolean;
  tagline: string;
  headline: string;
  endDate: string; // ISO 8601 string
  ctaText: string;
  ctaLink: string;
}

export interface MarqueeConfig {
  items: string[];
  speed: number;
}

export interface ShippingRate {
  id: string;
  name: string;
  rate: number;
  estimatedDays: string;
}

export interface ShippingConfig {
  defaultFee: number;
  freeShippingThreshold: number;
  zones: {
    insideDhaka: ShippingRate;
    outsideDhaka: ShippingRate;
  };
}

export const storeConfig = {
  saleAnnouncement: {
    enabled: true,
    tagline: "STOCK CLEARANCE SALE",
    headline: "UP TO 60% OFF",
    // 15 days ahead from current date
    endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    ctaText: "Shop the collection",
    ctaLink: "/products",
  } as SaleAnnouncementConfig,

  marquee: {
    items: [
      "NEW ARRIVALS",
      "FREE SHIPPING OVER ৳5,000",
      "PREMIUM QUALITY",
      "MADE WITH PURPOSE",
      "SHOP NOW",
      "ALL BANGLADESH CASH ON DELIVERY",
      "EASY 7-DAY EXCHANGE",
    ],
    speed: 30,
  } as MarqueeConfig,

  shipping: {
    defaultFee: 115,
    freeShippingThreshold: 5000,
    zones: {
      insideDhaka: {
        id: "inside_dhaka",
        name: "Inside Dhaka",
        rate: 80,
        estimatedDays: "1-2 Days",
      },
      outsideDhaka: {
        id: "outside_dhaka",
        name: "Outside Dhaka (All BD)",
        rate: 115,
        estimatedDays: "2-4 Days",
      },
    },
  } as ShippingConfig,

  collections: [
    {
      id: "all",
      name: "All Products",
      slug: "all",
      description: "Explore our full catalog of premium apparel.",
    },
    {
      id: "premium-quality-at-a-fair-price",
      name: "Shop Basic",
      slug: "premium-quality-at-a-fair-price",
      description: "Everyday essentials built with high-density textiles.",
    },
    {
      id: "expensive",
      name: "Shop Premium",
      slug: "expensive",
      description: "Signature craftsmanship, high GSM weaves & bespoke threadwork.",
    },
    {
      id: "new-arrivals",
      name: "New Arrivals",
      slug: "new-arrivals",
      description: "The latest drops. Fresh styles added weekly.",
    },
  ],
};
