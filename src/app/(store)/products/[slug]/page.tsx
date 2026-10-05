import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { productService } from "@/features/products/services/product.service";
import { ProductGallery } from "@/features/products/components/ProductGallery";
import { ProductInfo } from "@/features/products/components/ProductInfo";
import { RelatedProducts } from "@/features/products/components/RelatedProducts";
import { ReviewList } from "@/features/reviews/components/ReviewList";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { constructMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site.config";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await productService.getProductBySlug(slug);

  if (!product) {
    return constructMetadata({
      title: "Product Not Found",
      description: "The product you requested does not exist.",
    });
  }

  return constructMetadata({
    title: product.name,
    description: product.description.slice(0, 160),
    image: product.images[0] || siteConfig.ogImage,
    path: `/products/${product.slug}`,
  });
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await productService.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await productService.getRelatedProducts(
    product.id,
    product.category
  );

  // Structured Data: Product Schema & Breadcrumb Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: product.name,
        image: product.images,
        description: product.description,
        sku: product.sku,
        brand: {
          "@type": "Brand",
          name: siteConfig.name,
        },
        offers: {
          "@type": "Offer",
          url: `${siteConfig.url}/products/${product.slug}`,
          priceCurrency: "BDT",
          price: product.price,
          availability:
            product.stock > 0
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.reviewRating,
          reviewCount: product.reviewCount,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Products",
            item: `${siteConfig.url}/products`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.name,
            item: `${siteConfig.url}/products/${product.slug}`,
          },
        ],
      },
    ],
  };

  const breadcrumbs = [
    { label: "Products", href: "/products" },
    {
      label: product.category === "expensive" ? "Shop Premium" : "Shop Basic",
      href: `/collections/${product.category}`,
    },
    { label: product.name },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbs} />

      {/* Main Product Showcase: Gallery (Left) & Info (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        <div className="lg:col-span-7">
          <ProductGallery
            images={product.images}
            productName={product.name}
            hasDiscount={Boolean(product.compareAtPrice && product.compareAtPrice > product.price)}
          />
        </div>

        <div className="lg:col-span-5">
          <ProductInfo product={product} />
        </div>
      </div>

      {/* Customer Reviews Section */}
      <ReviewList productId={product.id} />

      {/* Related Products Section */}
      <RelatedProducts products={relatedProducts} />
    </div>
  );
}
