export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  API_URL: process.env.NEXT_PUBLIC_API_URL || "/api",
  BKASH_NUMBER: process.env.NEXT_PUBLIC_BKASH_NUMBER || "01700000000",
  NAGAD_NUMBER: process.env.NEXT_PUBLIC_NAGAD_NUMBER || "01700000000",
};
