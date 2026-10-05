"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global critical error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-[#0B0B10] text-white flex items-center justify-center min-h-screen p-4 text-center">
        <div className="max-w-md space-y-4">
          <h2 className="text-2xl font-bold uppercase tracking-wider text-brand-orange">
            Critical System Exception
          </h2>
          <p className="text-xs text-white/60">
            A fatal error occurred. Please refresh the browser.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs uppercase"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
