import { z } from "zod";

export const productVariantSchema = z.object({
  id: z.string(),
  size: z.string().optional(),
  color: z.string().optional(),
  sku: z.string(),
  price: z.number().optional(),
  stock: z.number().min(0),
});

export const productSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  sku: z.string(),
  description: z.string(),
  details: z.string().optional(),
  material: z.string().optional(),
  careInstructions: z.string().optional(),
  price: z.number().positive(),
  compareAtPrice: z.number().optional(),
  images: z.array(z.string()),
  category: z.string().optional(),
  variants: z.array(productVariantSchema),
  sizes: z.array(z.string()),
  availableSizes: z.array(z.string()),
  stock: z.number().min(0),
  isFeatured: z.boolean(),
  isBestSeller: z.boolean(),
  status: z.enum(["active", "inactive"]),
  reviewRating: z.number().min(0).max(5),
  reviewCount: z.number().min(0),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});
