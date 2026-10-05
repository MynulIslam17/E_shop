import { z } from "zod";
import { BD_PHONE_REGEX } from "@/utils/validation";

export const bdPhoneSchema = z
  .string()
  .min(11, "Phone number must be at least 11 digits")
  .regex(BD_PHONE_REGEX, "Please enter a valid Bangladesh phone number (e.g. 017XXXXXXXX)");

export { z };
