import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 rounded-full bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center mb-6">
        <Compass className="w-10 h-10 text-brand-orange animate-spin" style={{ animationDuration: "20s" }} />
      </div>

      <span className="text-xs font-bold tracking-widest uppercase text-brand-orange mb-2">
        404 — Not Found
      </span>

      <h1 className="text-4xl sm:text-6xl font-display uppercase tracking-tight text-white mb-4">
        Page Lost in Transit
      </h1>

      <p className="text-sm text-white/60 max-w-md mb-8 leading-relaxed">
        The garment or page you are looking for has been archived, moved, or never existed. Return home to discover the latest collection.
      </p>

      <div className="flex gap-4">
        <Link href={ROUTES.HOME}>
          <Button variant="brand" size="md">
            Return Home
          </Button>
        </Link>
        <Link href={ROUTES.PRODUCTS}>
          <Button variant="outline" size="md">
            Shop Catalog
          </Button>
        </Link>
      </div>
    </div>
  );
}
