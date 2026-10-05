"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import { ProductFilterParams } from "../types/product.types";

export function useProductFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters: ProductFilterParams = useMemo(() => {
    return {
      category: searchParams.get("category") || undefined,
      sort: (searchParams.get("sort") as ProductFilterParams["sort"]) || "newest",
      search: searchParams.get("search") || undefined,
      size: searchParams.get("size") || undefined,
      inStockOnly: searchParams.get("inStock") === "true",
      minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
      maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
      page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    };
  }, [searchParams]);

  const updateFilters = useCallback(
    (newFilters: Partial<ProductFilterParams>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(newFilters).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "" || value === false) {
          if (key === "inStockOnly") {
            params.delete("inStock");
          } else {
            params.delete(key);
          }
        } else {
          if (key === "inStockOnly") {
            params.set("inStock", "true");
          } else {
            params.set(key, String(value));
          }
        }
      });

      // Reset to page 1 on filter changes unless changing page directly
      if (!newFilters.page && params.has("page")) {
        params.delete("page");
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  const resetFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  return {
    filters,
    updateFilters,
    resetFilters,
  };
}
