import { NextRequest, NextResponse } from "next/server";
import { MOCK_PRODUCTS } from "@/features/products/data/products.mock";
import { ProductFilterParams } from "@/features/products/types/product.types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort") as ProductFilterParams["sort"];
  const inStock = searchParams.get("inStock") === "true";
  const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined;
  const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined;
  const page = Number(searchParams.get("page") || "1");
  const limit = Number(searchParams.get("limit") || "12");

  let filtered = [...MOCK_PRODUCTS];

  if (category && category !== "all") {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  if (inStock) {
    filtered = filtered.filter((p) => p.stock > 0);
  }

  if (minPrice !== undefined) {
    filtered = filtered.filter((p) => p.price >= minPrice);
  }

  if (maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.price <= maxPrice);
  }

  if (sort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === "best-selling") {
    filtered.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
  } else {
    // Newest
    filtered.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return NextResponse.json({
    success: true,
    data: paginated,
    total: filtered.length,
    page,
    limit,
  });
}
