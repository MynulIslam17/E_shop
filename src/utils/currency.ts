/**
 * Format an amount in Bangladeshi Taka (BDT)
 * Example: 450 -> "৳450", 12500 -> "৳12,500"
 */
export function formatCurrency(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return "৳0";
  }

  const formattedNumber = new Intl.NumberFormat("en-BD", {
    maximumFractionDigits: 0,
  }).format(amount);

  return `৳${formattedNumber}`;
}

export function parseCurrency(formatted: string): number {
  const clean = formatted.replace(/[৳,\s]/g, "");
  const num = parseFloat(clean);
  return isNaN(num) ? 0 : num;
}
