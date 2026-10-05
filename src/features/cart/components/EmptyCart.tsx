"use client";

import React from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useUiStore } from "@/store/ui.store";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export function EmptyCart() {
  const closeCart = useUiStore((s) => s.closeCart);

  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-5">
        <ShoppingBag className="w-7 h-7 text-white/40" />
      </div>

      <h3 className="text-lg font-bold text-white mb-1.5">
        Your Cart is Empty
      </h3>
      <p className="text-xs text-white/50 max-w-xs mb-6">
        Looks like you haven&apos;t added any items yet. Explore our latest drops and premium menswear essentials.
      </p>

      <Link href={ROUTES.PRODUCTS} onClick={closeCart}>
        <Button variant="brand" size="md">
          Explore Collection
        </Button>
      </Link>
    </div>
  );
}
