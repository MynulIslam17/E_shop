export const BD_PHONE_REGEX = /^(?:\+?880|0)?1[3-9]\d{8}$/;

export function isValidBDPhone(phone: string): boolean {
  return BD_PHONE_REGEX.test(phone.trim().replace(/[\s-]/g, ""));
}

export function normalizeBDPhone(phone: string): string {
  const digits = phone.trim().replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("01")) {
    return digits;
  }
  if (digits.length === 13 && digits.startsWith("8801")) {
    return digits.slice(2);
  }
  return phone;
}
