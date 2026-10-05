# Production-Ready E-Commerce Storefront (HEEMS Reference)

A modern, high-performance, customer-facing e-commerce storefront inspired by the design aesthetics, UX patterns, visual hierarchy, and checkout workflows of [HEEMS Bangladesh](https://heemsbd.com/). Built with Next.js App Router, React 19, TypeScript, Tailwind CSS, TanStack Query, and Zustand.

---

## ⚡ Tech Stack

- **Framework:** Next.js (App Router, Server Components by default)
- **Language:** TypeScript (Strict mode enabled)
- **Styling:** Tailwind CSS with custom design tokens in `variables.css`
- **Global State:** Zustand (Persistent local cart and non-sensitive checkout autofill)
- **Data Fetching:** TanStack React Query + Axios / Fetch client
- **Validation:** Zod schemas + React Hook Form
- **Icons:** Lucide React
- **Media Optimization:** Next/Image with remote asset whitelisting

---

## 🏗 Architecture

The codebase enforces a **feature-driven architecture** isolating domain logic from framework routing:

```
src/
├── app/               # Pure routing & page composition
│   ├── (store)/       # Storefront routes (home, catalog, PDP, editorial, legal)
│   ├── checkout/      # Multi-step guest checkout, success, track order
│   ├── order/         # Order permalinks
│   ├── review/        # Secure post-purchase review submissions
│   ├── return/        # Return & exchange requests
│   ├── invoice/       # Clean, printable tax invoice
│   └── api/           # Server route handlers with validation
├── features/          # Domain features (home, products, cart, checkout, orders, reviews)
├── components/        # UI primitives, shared common components, and global layout
├── services/          # API client, localStorage, and analytics services
├── config/            # Store, payment, and SEO configs
└── utils/             # Currency formatting (BDT ৳), date math, discount calculations
```

---

## 🌟 Key Highlights

- **Aesthetic Excellence:** Dark luxury palette (`#0B0B10`, `#1A0F13`) accented by crimson glow (`#FB3A48`), frosted glassmorphic headers, editorial typography, and high-density apparel imagery.
- **Dynamic Live Countdown:** Stock clearance announcement bar with real-time countdown timer configured in `store.config.ts`.
- **Frictionless Guest Checkout:** No mandatory account creation or passwords. Full support for Bangladeshi mobile format (`01XXXXXXXXX`) and delivery address presets.
- **Secure Advance Delivery / COD Payment:** Complete bKash and Nagad payment verification workflows with Transaction ID capture.
- **Server Recalculation Safeguard:** Client cart prices are never trusted. All totals, coupon discounts, and delivery charges are recomputed authoritatively.
- **Order Tracking & Printable Invoices:** Timeline-based tracking interface (`/checkout/track` and `/order/[orderId]`) alongside printable invoices (`/invoice/[token]`).
- **Post-Purchase Verified Reviews & Returns:** Secure token-gated review submission (`/review/[token]`) and exchange/return portal (`/return/[token]`).
- **SEO & Social Metadata:** Canonical tags, Open Graph, Twitter cards, and JSON-LD `Product` & `BreadcrumbList` structured data.

---

## 🚀 Getting Started

### Local Development

1. Clone and install dependencies:
   ```bash
   npm install
   ```

2. Configure environment:
   ```bash
   cp .env.example .env.local
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```
   Navigate to [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

---

## 🧪 Testing

E2E testing suites are located in `tests/e2e/`:
- `homepage.spec.ts`: Header navigation, marquee, countdown, bestsellers
- `products.spec.ts`: Grid filters, variant size selection, stock guards
- `cart.spec.ts`: Persistent drawer, quantity adjustments, free shipping meter
- `checkout.spec.ts`: Form validation, coupon application, order placement
- `order-tracking.spec.ts`: Timeline tracking and not-found states
