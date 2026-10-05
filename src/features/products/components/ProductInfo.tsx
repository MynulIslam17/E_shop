"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "../types/product.types";
import { ProductPrice } from "./ProductPrice";
import { ProductStock } from "./ProductStock";
import { ProductBadge } from "./ProductBadge";
import { ProductSizeSelector } from "./ProductSizeSelector";
import { ProductQuantity } from "./ProductQuantity";
import { ProductAccordion } from "./ProductAccordion";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/features/cart/store/cart.store";
import { useUiStore } from "@/store/ui.store";
import { ROUTES } from "@/constants/routes";
import { ShoppingBag, Zap, Star } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const router = useRouter();
  const { toast } = useToast();
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useUiStore((s) => s.openCart);

  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.availableSizes.length === 1 ? product.availableSizes[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState<string | null>(null);

  const currentVariant = selectedSize
    ? product.variants.find((v) => v.size === selectedSize)
    : undefined;

  const availableStock = currentVariant
    ? currentVariant.stock
    : product.stock;

  const isSoldOut = product.stock <= 0 || Boolean(selectedSize && availableStock <= 0);

  const handleSelectSize = (size: string) => {
    setSelectedSize(size);
    setSizeError(null);
    setQuantity(1);
  };

  const validateSelection = (): boolean => {
    if (product.sizes.length > 0 && !selectedSize) {
      setSizeError("Please select a size before adding to bag");
      return false;
    }
    return true;
  };

  const handleAddToCart = () => {
    if (!validateSelection()) return;

    const success = addItem({
      productId: product.id,
      variantId: currentVariant?.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0] || "",
      price: currentVariant?.price || product.price,
      compareAtPrice: product.compareAtPrice,
      size: selectedSize || undefined,
      maxQuantity: availableStock || 1,
    }, quantity);

    if (success) {
      toast("Added to your shopping bag!");
      openCart();
    } else {
      toast("Requested quantity exceeds available stock.", "error");
    }
  };

  const handleBuyNow = () => {
    if (!validateSelection()) return;

    const success = addItem({
      productId: product.id,
      variantId: currentVariant?.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0] || "",
      price: currentVariant?.price || product.price,
      compareAtPrice: product.compareAtPrice,
      size: selectedSize || undefined,
      maxQuantity: availableStock || 1,
    }, quantity);

    if (success) {
      router.push(ROUTES.CHECKOUT);
    } else {
      toast("Cannot proceed to checkout. Stock limit reached.", "error");
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Category & Badge */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-bold tracking-widest uppercase text-brand-orange">
          {product.category === "expensive" ? "Premium Line" : "Essentials"}
        </span>

        <div className="flex items-center gap-2">
          <ProductBadge
            isSale={!!product.compareAtPrice && product.compareAtPrice > product.price}
            isOutOfStock={product.stock <= 0}
            isBestSeller={product.isBestSeller}
          />
        </div>
      </div>

      {/* Title & SKU */}
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display uppercase tracking-tight text-white leading-tight">
          {product.name}
        </h1>

        <div className="flex items-center gap-4 mt-2 text-xs text-white/50">
          <span>SKU: {currentVariant?.sku || product.sku}</span>
          <span>•</span>
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="font-bold">{product.reviewRating}</span>
            <span className="text-white/40">({product.reviewCount} reviews)</span>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <ProductPrice
          price={currentVariant?.price || product.price}
          compareAtPrice={product.compareAtPrice}
          size="xl"
        />

        <ProductStock stock={availableStock} />
      </div>

      {/* Important Notice */}
      <div className="bg-[#1C1215] border border-brand-orange/30 rounded-xl p-4 text-xs text-neutral-300 leading-relaxed">
        <span className="text-brand-orange font-bold mr-1.5">⚠️ Note:</span>
        Each piece is crafted with high-density fabric. Measurement variations up to 0.5&quot; may occur due to manual tailoring.
      </div>

      {/* Size Selector */}
      {product.sizes.length > 0 && (
        <ProductSizeSelector
          sizes={product.sizes}
          variants={product.variants}
          selectedSize={selectedSize}
          onSelectSize={handleSelectSize}
          error={sizeError}
        />
      )}

      {/* Quantity Selector */}
      <div className="flex items-center gap-6">
        <ProductQuantity
          quantity={quantity}
          max={availableStock || 1}
          onChange={setQuantity}
          disabled={isSoldOut}
        />
      </div>

      {/* Action Buttons: Add to Bag & Buy Now (Image 1 reference) */}
      <div className="grid grid-cols-2 gap-3.5 pt-3">
        <Button
          type="button"
          variant="outline"
          size="lg"
          rounded="full"
          disabled={isSoldOut}
          onClick={handleAddToCart}
          className="w-full bg-neutral-900/90 border-white/20 hover:border-white/50 text-white font-semibold text-sm normal-case py-3.5 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <ShoppingBag className="w-4 h-4 text-white/90 shrink-0" />
          <span>{isSoldOut ? "Out of Stock" : "Add to Bag"}</span>
        </Button>

        <Button
          type="button"
          variant="brand"
          size="lg"
          rounded="full"
          disabled={isSoldOut}
          onClick={handleBuyNow}
          className="w-full bg-gradient-to-r from-[#FB3A48] to-[#E02634] hover:from-[#E02634] hover:to-[#C01A27] text-white font-semibold text-sm normal-case py-3.5 shadow-[0_0_20px_rgba(251,58,72,0.45)] hover:shadow-[0_0_28px_rgba(251,58,72,0.65)] flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <Zap className="w-4 h-4 text-white fill-current shrink-0" />
          <span>{isSoldOut ? "Unavailable" : "Buy Now"}</span>
        </Button>
      </div>

      {/* Mobile Fixed Bottom Purchase Bar (Image 1 demo style) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#0B0B10]/95 backdrop-blur-md p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-2xl">
        <div className="max-w-md mx-auto grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            size="md"
            rounded="full"
            disabled={isSoldOut}
            onClick={handleAddToCart}
            className="w-full text-xs font-semibold normal-case py-3 border-white/25 bg-neutral-900 text-white flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{isSoldOut ? "Out of Stock" : "Add to Bag"}</span>
          </Button>
          <Button
            type="button"
            variant="brand"
            size="md"
            rounded="full"
            disabled={isSoldOut}
            onClick={handleBuyNow}
            className="w-full text-xs font-semibold normal-case py-3 bg-gradient-to-r from-[#FB3A48] to-[#E02634] text-white shadow-[0_0_15px_rgba(251,58,72,0.4)] flex items-center justify-center gap-2"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>{isSoldOut ? "Unavailable" : "Buy Now"}</span>
          </Button>
        </div>
      </div>

      {/* Accordions */}
      <div className="pt-4">
        <ProductAccordion product={product} />
      </div>
    </div>
  );
}
