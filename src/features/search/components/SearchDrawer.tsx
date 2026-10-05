"use client";

import React, { useRef, useEffect } from "react";
import { Drawer } from "@/components/ui/Drawer";
import { useUiStore } from "@/store/ui.store";
import { useSearch } from "../hooks/useSearch";
import { SearchInput } from "./SearchInput";
import { SearchResults } from "./SearchResults";

export function SearchDrawer() {
  const isSearchOpen = useUiStore((s) => s.isSearchOpen);
  const closeSearch = useUiStore((s) => s.closeSearch);
  const { query, setQuery, clear, results, isLoading } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  return (
    <Drawer
      isOpen={isSearchOpen}
      onClose={closeSearch}
      title="Search Catalog"
      side="right"
      width="max-w-md"
    >
      <div className="space-y-4 pt-2">
        <SearchInput
          ref={inputRef}
          value={query}
          onChange={setQuery}
          onClear={clear}
        />

        <SearchResults
          results={results}
          isLoading={isLoading}
          query={query}
          onSelectResult={closeSearch}
        />
      </div>
    </Drawer>
  );
}
