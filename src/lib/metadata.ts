import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";

interface MetadataProps {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
}

export function constructMetadata({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  path = "",
}: MetadataProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} | Minimalist Clothing from Bangladesh`;
  const url = `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}
