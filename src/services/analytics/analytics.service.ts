export type AnalyticsEvent =
  | { name: "view_product"; params: { productId: string; name: string; price: number; category?: string } }
  | { name: "search"; params: { query: string; resultsCount: number } }
  | { name: "add_to_cart"; params: { productId: string; name: string; price: number; size?: string; quantity: number } }
  | { name: "remove_from_cart"; params: { productId: string; name: string; price: number; size?: string } }
  | { name: "begin_checkout"; params: { itemCount: number; totalAmount: number } }
  | { name: "apply_coupon"; params: { couponCode: string; discountAmount: number } }
  | { name: "purchase"; params: { orderId: string; totalAmount: number; itemCount: number; paymentMethod: string } };

export const analyticsService = {
  track(event: AnalyticsEvent): void {
    if (process.env.NODE_ENV === "development") {
      console.log(`[Analytics Event: ${event.name}]`, event.params);
    }

    if (typeof window !== "undefined" && "gtag" in window) {
      const win = window as unknown as { gtag: (cmd: string, action: string, params?: unknown) => void };
      if (typeof win.gtag === "function") {
        win.gtag("event", event.name, event.params);
      }
    }
  },
};
