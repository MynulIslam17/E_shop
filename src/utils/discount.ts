export function calculateDiscountPercentage(
  price: number,
  compareAtPrice?: number
): number {
  if (!compareAtPrice || compareAtPrice <= price) return 0;
  const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
  return Math.round(discount);
}

export function calculateSavings(
  price: number,
  compareAtPrice?: number
): number {
  if (!compareAtPrice || compareAtPrice <= price) return 0;
  return compareAtPrice - price;
}
