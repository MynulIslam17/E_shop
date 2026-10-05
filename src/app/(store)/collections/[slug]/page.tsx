import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { storeConfig } from "@/config/store.config";
import { productService } from "@/features/products/services/product.service";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { constructMetadata } from "@/lib/metadata";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const col = storeConfig.collections.find((c) => c.slug === slug);

  if (!col) {
    return constructMetadata({
      title: "Collection Not Found",
    });
  }

  return constructMetadata({
    title: col.name,
    description: col.description,
    path: `/collections/${col.slug}`,
  });
}

export default async function CollectionDetailPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const col = storeConfig.collections.find((c) => c.slug === slug);

  if (!col) {
    notFound();
  }

  const { products } = await productService.getProducts({
    category: slug === "new-arrivals" ? undefined : slug,
    sort: slug === "new-arrivals" ? "newest" : undefined,
    limit: 24,
  });

  const breadcrumbs = [
    { label: "Collections", href: "/collections" },
    { label: col.name },
  ];

  return (
    <div className="w-full flex flex-col min-w-0">
      {/* Edge-to-Edge Hero Banner */}
      <section className="relative w-full h-56 sm:h-72 md:h-80 lg:h-[340px] xl:h-[380px] overflow-hidden border-b border-white/10 select-none bg-[#0E0609]">
        <Image
          src="/images/collections-hero.png"
          alt={`${col.name} Collection`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_32%] filter brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />

        <div className="relative z-10 h-full w-full flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal text-white text-center tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            {col.name}
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full">
        <div className="mb-6">
          <Breadcrumb items={breadcrumbs} />
        </div>

        <div className="pb-4 mb-6 border-b border-white/10 text-xs text-white/50">
          Showing <span className="text-white font-bold">{products.length}</span> pieces in this line
        </div>

        <ProductGrid products={products} columns={4} />
      </div>
    </div>
  );
}
