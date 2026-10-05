import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/checkout/success", "/invoice/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
