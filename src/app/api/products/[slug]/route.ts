import { NextRequest, NextResponse } from "next/server";
import { MOCK_PRODUCTS } from "@/features/products/data/products.mock";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const product = MOCK_PRODUCTS.find(
    (p) => p.slug === slug || p.id === slug
  );

  if (!product) {
    return NextResponse.json(
      { success: false, error: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: product,
  });
}
