import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";
import { AlertCircle } from "lucide-react";

export default function ProductNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-16 h-16 rounded-full bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center mb-6">
        <AlertCircle className="w-8 h-8 text-brand-orange" />
      </div>

      <h1 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-white mb-2">
        Product Not Found
      </h1>

      <p className="text-sm text-white/60 max-w-sm mb-6 leading-relaxed">
        The garment you requested may have sold out or been removed from our current season.
      </p>

      <Link href={ROUTES.PRODUCTS}>
        <Button variant="brand" size="md">
          Browse All Products
        </Button>
      </Link>
    </div>
  );
}
