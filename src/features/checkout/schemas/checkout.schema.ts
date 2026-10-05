import { z } from "zod";
import { BD_PHONE_REGEX } from "@/utils/validation";

export const deliveryAddressSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  phone: z
    .string()
    .min(11, "Phone number must be at least 11 digits")
    .regex(BD_PHONE_REGEX, "Please enter a valid Bangladesh phone number (01XXXXXXXXX)"),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  address: z.string().min(5, "Please enter your complete street and house address"),
  district: z.string().min(2, "Please enter your district (e.g. Dhaka, Chittagong)"),
  thana: z.string().optional(),
  notes: z.string().optional(),
  shippingZone: z.enum(["inside_dhaka", "outside_dhaka"]).default("outside_dhaka"),
});

export const paymentSchema = z.object({
  method: z.enum(["cod", "bkash", "nagad"]),
  senderNumber: z.string().optional(),
  transactionId: z.string().optional(),
}).refine(
  (data) => {
    if (data.method === "bkash" || data.method === "nagad") {
      return (
        !!data.senderNumber &&
        data.senderNumber.length >= 11 &&
        !!data.transactionId &&
        data.transactionId.length >= 4
      );
    }
    return true;
  },
  {
    message: "Please enter your sender number and transaction ID for mobile payment verification",
    path: ["transactionId"],
  }
);
