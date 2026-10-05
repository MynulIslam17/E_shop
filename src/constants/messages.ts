export const MESSAGES = {
  CART: {
    ITEM_ADDED: "Added to your shopping bag.",
    ITEM_REMOVED: "Item removed from cart.",
    LIMIT_REACHED: "Maximum available stock reached for this variant.",
    EMPTY: "Your shopping bag is currently empty.",
  },
  CHECKOUT: {
    SELECT_SIZE: "Please select a size to proceed.",
    REQUIRED_FIELDS: "Please fill in all required shipping fields.",
    INVALID_PHONE: "Please enter a valid 11-digit Bangladesh phone number (01XXXXXXXXX).",
    ORDER_SUCCESS: "Order confirmed successfully.",
    ORDER_FAILED: "We were unable to process your order. Please try again.",
    PAYMENT_REQUIRED: "Please enter your sender number and transaction ID.",
  },
  COUPON: {
    APPLIED: (discount: string) => `Coupon applied — ${discount} saved.`,
    INVALID: "Invalid or expired coupon code.",
    MIN_ORDER: (min: string) => `Minimum order amount of ${min} required for this coupon.`,
  },
  CONTACT: {
    SUCCESS: "Thank you for reaching out! We'll reply within 24 hours.",
    FAILED: "Failed to send message. Please reach us via WhatsApp or phone.",
  },
} as const;
