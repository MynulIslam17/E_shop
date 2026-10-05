"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../types/product.types";
import { ProductPrice } from "./ProductPrice";
import { ROUTES } from "@/constants/routes";
import { useCartStore } from "@/features/cart/store/cart.store";
import { useUiStore } from "@/store/ui.store";
import { useToast } from "@/components/ui/Toast";

export interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useUiStore((s) => s.openCart);
  const { toast } = useToast();

  const isSoldOut = product.stock <= 0;
  const hasDiscount = !!product.compareAtPrice && product.compareAtPrice > product.price;
  const primaryImage = product.images[0] || "/images/placeholder.svg";
  const secondaryImage = product.images[1] || primaryImage;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSoldOut) return;

    // Pick first available size variant
    const defaultSize = product.availableSizes[0] || product.sizes[0];
    const variant = product.variants.find((v) => v.size === defaultSize);

    const success = addItem({
      productId: product.id,
      variantId: variant?.id,
      slug: product.slug,
      name: product.name,
      image: primaryImage,
      price: variant?.price || product.price,
      compareAtPrice: product.compareAtPrice,
      size: defaultSize,
      maxQuantity: variant?.stock || product.stock,
    }, 1);

    if (success) {
      toast(`Added ${product.name} to cart!`);
      openCart();
    } else {
      toast("Unable to add: stock limit reached.", "error");
    }
  };

  return (
    <div className="group flex flex-col gap-3 select-none">
      {/* Image Container */}
      <Link
        href={ROUTES.PRODUCT_DETAILS(product.slug)}
        className="relative aspect-[4/5] md:aspect-[3/4] w-full overflow-hidden bg-[#1A0F13] rounded-xl md:rounded-2xl border border-white/5 transition-all duration-300 group-hover:border-white/20"
      >
        {/* Subtle Brand Overlay Gradients */}
        <div className="absolute inset-0 bg-brand-orange/10 mix-blend-overlay opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

        {/* Primary Image */}
        <Image
          src={primaryImage}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 70vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-top pointer-events-none transition-opacity duration-300 group-hover:opacity-0 md:group-hover:opacity-0"
        />

        {/* Secondary Image on Hover */}
        <Image
          src={secondaryImage}
          alt={`${product.name} alternate view`}
          fill
          sizes="(max-width: 640px) 70vw, (max-width: 1024px) 33vw, 25vw"
          className="hidden md:block absolute inset-0 object-cover object-top opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
          aria-hidden="true"
        />

        {/* Badges */}
        {hasDiscount && !isSoldOut && (
          <div className="absolute top-3 left-3 z-20 bg-brand-orange text-white text-[9px] font-bold px-2 py-1 rounded shadow-md pointer-events-none">
            SALE
          </div>
        )}

        {/* Out of Stock banner */}
        {isSoldOut ? (
          <div className="absolute inset-x-0 bottom-0 z-20 bg-black/80 backdrop-blur-sm py-2.5 flex items-center justify-center pointer-events-none">
            <span className="text-[11px] font-bold text-white/80 uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        ) : (
          /* Desktop Quick Add to Cart button overlay */
          <div className="absolute inset-x-4 bottom-4 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hidden md:flex">
            <button
              type="button"
              onClick={handleQuickAdd}
              className="w-full bg-white text-black text-xs font-bold py-3 rounded-full hover:bg-brand-orange hover:text-white transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)] active:scale-95"
            >
              Add to Bag
            </button>
          </div>
        )}

        {/* Mobile Price Badge overlay */}
        <div className="absolute top-3 right-3 z-20 md:hidden">
          <div className="bg-black/60 backdrop-blur-md border border-white/10 text-brand-orange text-[10px] font-bold px-2.5 py-1 rounded-full pointer-events-none">
            ৳{product.price}
          </div>
        </div>
      </Link>

      {/* Info Section */}
      <div className="flex flex-col gap-1 px-1">
        <div className="flex items-start justify-between gap-3">
          <Link
            href={ROUTES.PRODUCT_DETAILS(product.slug)}
            className="text-xs md:text-sm font-semibold tracking-tight text-white/90 group-hover:text-white transition-colors leading-tight line-clamp-2"
          >
            {product.name}
          </Link>

          <div className="hidden md:flex flex-col items-end shrink-0">
            <ProductPrice
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              size="sm"
              showDiscount={false}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ProductPrice
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            size="sm"
            showDiscount={false}
          />
        </div>
      </div>
    </div>
  );
}
