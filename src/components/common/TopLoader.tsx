"use client";

import React, { useEffect, useState, useRef, useCallback, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function TopLoaderInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const stepTimerRef = useRef<NodeJS.Timeout | null>(null);
  const finishTimerRef = useRef<NodeJS.Timeout | null>(null);
  const safetyTimerRef = useRef<NodeJS.Timeout | null>(null);

  const completeProgress = useCallback(() => {
    if (stepTimerRef.current) clearInterval(stepTimerRef.current);
    if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);

    setProgress(100);

    finishTimerRef.current = setTimeout(() => {
      setIsLoading(false);
      setProgress(0);
    }, 300);
  }, []);

  const startProgress = useCallback(() => {
    if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
    if (stepTimerRef.current) clearInterval(stepTimerRef.current);
    if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);

    setIsLoading(true);
    setProgress(20);

    // Increment progress in diminishing steps while waiting
    stepTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 88) {
          if (stepTimerRef.current) clearInterval(stepTimerRef.current);
          return 88;
        }
        const delta = Math.max(1.5, (90 - prev) * 0.12);
        return Math.min(88, prev + delta);
      });
    }, 120);

    // Safety timeout in case navigation cancels or halts
    safetyTimerRef.current = setTimeout(() => {
      completeProgress();
    }, 7000);
  }, [completeProgress]);

  // Complete progress whenever the route or search params resolve
  useEffect(() => {
    completeProgress();
  }, [pathname, searchParams, completeProgress]);

  // Intercept click on navigation links
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // Find closest anchor tag
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const target = anchor.getAttribute("target");
      const href = anchor.getAttribute("href");

      // Skip external links, new tabs, downloads, hashes, or modified clicks
      if (
        !href ||
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#") ||
        target === "_blank" ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      // Check if target href is different from current path
      const currentPath = window.location.pathname + window.location.search;
      if (href === currentPath || href === window.location.pathname) {
        return;
      }

      startProgress();
    };

    document.addEventListener("click", handleDocumentClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleDocumentClick, { capture: true });
      if (stepTimerRef.current) clearInterval(stepTimerRef.current);
      if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    };
  }, [startProgress]);

  if (!isLoading && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[999999] pointer-events-none"
      style={{ height: "2.5px" }}
      aria-hidden="true"
    >
      <div
        className="h-full"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #2DD4BF 0%, #38EF7D 60%, #00F2FE 100%)",
          opacity: isLoading || progress === 100 ? 1 : 0,
          transition:
            progress === 100
              ? "width 0.18s ease-out, opacity 0.25s ease-out 0.1s"
              : "width 0.18s ease-out, opacity 0.15s ease-out",
        }}
      />
    </div>
  );
}

export function TopLoader() {
  return (
    <Suspense fallback={null}>
      <TopLoaderInner />
    </Suspense>
  );
}
