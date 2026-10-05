# Development Workflow & Guidelines

## Prerequisites
- Node.js >= 20.0.0
- npm >= 9.0.0

## Getting Started

1. Clone or navigate to the repository directory:
   ```bash
   cd e_commerce_web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create local environment configuration:
   ```bash
   cp .env.example .env.local
   ```

4. Run local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

## Coding Standards & Architectural Boundaries

1. **Strict Feature Encapsulation:**
   - Every domain resides under `src/features/<feature_name>/`.
   - Never import internal implementation details across unrelated features without going through exported public service interfaces or stores.
2. **Strict Currency Formatting:**
   - Always format Bangladeshi Taka values through `formatCurrency()` located in `src/utils/currency.ts`.
   - Never hardcode the currency sign `৳` in arbitrary string templates.
3. **Responsive Testing:**
   - Designs must be verified at mobile (`360px`, `390px`, `430px`), tablet (`768px`, `1024px`), and desktop (`1280px`, `1440px+`).
4. **Forms and Validation:**
   - All forms must validate inputs using React Hook Form with Zod schemas defined under `features/<domain>/schemas/`.
