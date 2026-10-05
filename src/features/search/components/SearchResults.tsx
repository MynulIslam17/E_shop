import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/features/products/types/product.types";
import { formatCurrency } from "@/utils/currency";
import { ROUTES } from "@/constants/routes";
import { ProductStock } from "@/features/products/components/ProductStock";
import { Skeleton } from "@/components/ui/Skeleton";
import { SearchX } from "lucide-react";

export interface SearchResultsProps {
  results: Product[];
  isLoading: boolean;
  query: string;
  onSelectResult?: () => void;
}

export function SearchResults({
  results,
  isLoading,
  query,
  onSelectResult,
}: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-3 py-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex gap-3 items-center">
            <Skeleton className="w-14 h-16 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (query.trim() && results.length === 0) {
    return (
      <div className="py-12 text-center text-white/50 space-y-3">
        <SearchX className="w-10 h-10 mx-auto text-white/30" />
        <p className="text-sm font-medium">
          No matches found for &ldquo;<span className="text-white">{query}</span>&rdquo;
        </p>
        <p className="text-xs max-w-xs mx-auto">
          Check your spelling or try searching for keywords like &ldquo;Jacquard&rdquo;, &ldquo;Boxy Fit&rdquo;, or &ldquo;Flannel&rdquo;.
        </p>
      </div>
    );
  }

  if (!query.trim()) {
    return (
      <div className="py-8 text-center text-xs text-white/40">
        Start typing to discover apparel, fabrics, or seasonal collections...
      </div>
    );
  }

  return (
    <div className="divide-y divide-white/10 max-h-[60vh] overflow-y-auto no-scrollbar">
      {results.map((product) => (
        <Link
          key={product.id}
          href={ROUTES.PRODUCT_DETAILS(product.slug)}
          onClick={onSelectResult}
          className="flex items-center gap-3 py-3 px-2 rounded-xl hover:bg-white/5 transition-colors group"
        >
          <div className="relative w-14 h-16 rounded-lg overflow-hidden bg-neutral-900 border border-white/10 shrink-0">
            <Image
              src={product.images[0] || "/images/placeholder.svg"}
              alt={product.name}
              fill
              sizes="56px"
              className="object-cover object-top group-hover:scale-105 transition-transform"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-semibold text-white/90 group-hover:text-white truncate">
              {product.name}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-bold text-brand-orange tabular-nums">
                {formatCurrency(product.price)}
              </span>
              <span className="text-[10px] uppercase font-bold text-white/40">
                {product.category === "expensive" ? "Premium" : "Essential"}
              </span>
            </div>
          </div>

          <div className="shrink-0">
            <ProductStock stock={product.stock} />
          </div>
        </Link>
      ))}
    </div>
  );
}
