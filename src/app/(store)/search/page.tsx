"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useSearch } from "@/features/search/hooks/useSearch";
import { SearchInput } from "@/features/search/components/SearchInput";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { PageHeader } from "@/components/common/PageHeader";
import { Spinner } from "@/components/ui/Spinner";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  const { query, setQuery, clear, results, isLoading } = useSearch(initialQ);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <PageHeader
        eyebrow="Global Search"
        title="Search Catalog"
        description="Find exactly what you're looking for across our entire collection."
      />

      <div className="max-w-xl mb-8">
        <SearchInput
          value={query}
          onChange={setQuery}
          onClear={clear}
          autoFocus
        />
      </div>

      <div className="pb-4 mb-6 border-b border-white/10 text-xs text-white/50">
        {query ? (
          <span>
            Found <span className="text-white font-bold">{results.length}</span> results for &ldquo;
            <span className="text-white">{query}</span>&rdquo;
          </span>
        ) : (
          <span>Type a query above to start searching</span>
        )}
      </div>

      <ProductGrid products={results} isLoading={isLoading} columns={4} />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
