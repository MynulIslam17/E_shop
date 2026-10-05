"use client";

import { useState, useEffect } from "react";
import { Product } from "@/features/products/types/product.types";
import { productService } from "@/features/products/services/product.service";
import { useDebounce } from "@/hooks/useDebounce";
import { analyticsService } from "@/services/analytics/analytics.service";

export function useSearch(initialQuery = "") {
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    let isCurrent = true;
    setIsLoading(true);

    productService
      .searchProducts(debouncedQuery)
      .then((items) => {
        if (isCurrent) {
          setResults(items);
          setIsLoading(false);
          analyticsService.track({
            name: "search",
            params: {
              query: debouncedQuery,
              resultsCount: items.length,
            },
          });
        }
      })
      .catch(() => {
        if (isCurrent) {
          setResults([]);
          setIsLoading(false);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [debouncedQuery]);

  return {
    query,
    debouncedQuery,
    results,
    isLoading,
    setQuery,
    clear: () => setQuery(""),
  };
}
