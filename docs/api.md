# API Documentation

## Overview
The application utilizes centralized API endpoints defined in `src/constants/api.ts` and managed through the strongly typed client in `src/services/api/api-client.ts`.

---

## Centralized Endpoints

| Method | Endpoint | Description | Query / Body Params |
|--------|----------|-------------|---------------------|
| `GET` | `/api/products` | Retrieve catalog list | `page`, `limit`, `collection`, `category`, `sort`, `search` |
| `GET` | `/api/products/:slug` | Retrieve single product details | URL param `slug` |
| `POST` | `/api/coupons/validate` | Validate coupon code & calculate discount | `{ code: string, subtotal: number }` |
| `POST` | `/api/orders` | Recalculate & place guest order | `{ customer, shippingAddress, items, couponCode, payment, notes }` |
| `GET` | `/api/orders/:orderId/track` | Track order status & timeline | URL param `orderId` |
| `POST` | `/api/reviews/:token` | Submit post-purchase verified review | `{ rating: number, comment: string, photos: string[] }` |
| `POST` | `/api/returns/:token` | Submit item exchange or return request | `{ type: "return" \| "exchange", reason, notes, photos }` |
| `POST` | `/api/contact` | Submit contact inquiry or support message | `{ name, email, phone, subject, message }` |
| `POST` | `/api/webhooks` | Handle automated payment gateway webhooks | Webhook payload & signatures |

---

## Server Recalculation Safeguard

The order submission endpoint (`POST /api/orders`) guarantees financial integrity:
1. **Never trusts client price values:** Prices sent from client are discarded. Each item's current unit price is queried from authoritative product storage.
2. **Independent Discount Verification:** If a coupon code is supplied, the discount rule (percentage or fixed amount, expiration, minimum order limit) is independently re-verified against the recalculation subtotal.
3. **Delivery Fee Calculation:** Shipping cost is derived based on the customer's delivery district (`storeConfig.shipping.insideDhakaFee` vs `storeConfig.shipping.outsideDhakaFee`), factoring in the free delivery threshold (`storeConfig.shipping.freeDeliveryThreshold`).
