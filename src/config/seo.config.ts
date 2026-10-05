import type { Metadata } from "next";
import { siteConfig } from "./site.config";

export const defaultSEO: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Minimalist Clothing from Bangladesh`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "clothing",
    "fashion",
    "Bangladesh",
    "minimal",
    "RizqHub",
    "Dhaka",
    "men clothing",
    "boxy fit shirt",
    "jacquard shirt",
    "bKash",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} | Minimalist Clothing from Bangladesh`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Clothing Bangladesh`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Minimalist Clothing from Bangladesh`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};
