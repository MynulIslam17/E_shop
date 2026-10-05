"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { AlertTriangle, RotateCcw } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App boundary error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8 text-brand-orange" />
      </div>

      <h1 className="text-3xl sm:text-4xl font-display uppercase tracking-tight text-white mb-3">
        Unexpected Application Error
      </h1>

      <p className="text-sm text-white/60 max-w-md mb-8 leading-relaxed">
        We encountered a momentary glitch while rendering this screen. You can try refreshing or jump back to the storefront.
      </p>

      <div className="flex gap-3">
        <Button variant="brand" size="md" onClick={() => reset()}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
        <Link href={ROUTES.HOME}>
          <Button variant="outline" size="md">
            Go to Store
          </Button>
        </Link>
      </div>
    </div>
  );
}
