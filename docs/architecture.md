# System Architecture

## Overview
This e-commerce web application is built with a **Feature-Driven Architecture** designed for high scalability, strict separation of concerns, and clean boundary isolation. It draws inspiration from the design, UX, and operational workflow of premium menswear brands like HEEMS Bangladesh.

---

## Directory Architecture

```
src/
├── app/                  # Next.js App Router (Routing & composition only)
│   ├── (store)/          # Customer-facing storefront routes
│   │   ├── products/     # Catalog and PDP routes
│   │   ├── collections/  # Curated collection landing pages
│   │   ├── search/       # Full-catalog search
│   │   ├── story/        # Brand editorial page
│   │   ├── contact/      # Contact and inquiries
│   │   └── [legal]/      # Return policy, privacy, terms
│   ├── checkout/         # Guest checkout, success, failed, and tracking
│   ├── order/            # Direct order permalinks
│   ├── review/           # Secure post-purchase review submissions
│   ├── return/           # Secure return and exchange requests
│   ├── invoice/          # Commercial printable tax invoices
│   └── api/              # Route handlers (Products, coupons, orders, contact)
├── features/             # Business domain modules
│   ├── home/             # Hero, sale countdown, promotional marquee, bestsellers
│   ├── products/         # Catalog cards, gallery, size selection, accordion, filters
│   ├── cart/             # Zustand persisted drawer, quantity management
│   ├── checkout/         # Guest multi-step form, bKash/Nagad verification, totals
│   ├── orders/           # Tracking, status timelines, invoice generation
│   ├── reviews/          # Review summaries, star breakdowns, photo attachments
│   ├── coupons/          # Coupon validation engine
│   ├── search/           # Debounced search drawer and live results
│   ├── returns/          # Secure exchange/return forms
│   └── contact/          # Inquiries and customer feedback
├── components/           # Reusable shared UI primitives and layouts
│   ├── ui/               # Button, Input, Modal, Drawer, Accordion, Badge, etc.
│   ├── common/           # Price, Logo, Breadcrumbs, EmptyState, SectionHeader
│   └── layout/           # Sticky Header, Desktop/Mobile Nav, Footer
├── services/             # Infrastructure services
│   ├── api/              # Axios/Fetch API client with error normalization
│   ├── storage/          # LocalStorage abstractions
│   └── analytics/        # Privacy-conscious event dispatcher
├── store/                # Global UI state (Drawers, modals, search toggles)
├── hooks/                # Reusable React hooks
├── config/               # Store, payment, SEO, and environmental configurations
├── constants/            # Routes, navigation keys, API endpoints, storage keys
├── types/                # Core domain types
├── utils/                # BDT currency formatter, date math, slugifiers
└── styles/               # CSS variables and Tailwind utility extensions
```

---

## Core Principles

1. **Routing vs. Feature Logic Separation:**
   - Files in `src/app/` contain zero business logic or API transformations. They act exclusively as page compositors by delegating rendering to domain features in `src/features/*`.
2. **Server-Side Price Recalculation:**
   - All monetary calculations (subtotal, coupon discounts, shipping fees, tax, grand total) are recalculable and validated server-side in `checkout.service.ts` and `/api/orders`. Frontend price values in payloads are rejected.
3. **Guest Checkout Priority:**
   - Registration and authentication barriers are removed to optimize mobile checkout conversion rates.
4. **Zustand Persistence:**
   - Cart items and non-sensitive checkout autofill fields (address, district, name, phone) are securely persisted in `localStorage`.
5. **Progressive Enhancement & SEO:**
   - Product detail pages generate complete JSON-LD Structured Data (`Product` and `BreadcrumbList`) and dynamic OpenGraph/Twitter cards.
