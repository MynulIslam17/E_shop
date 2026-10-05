import { ROUTES } from "./routes";

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export const MAIN_NAVIGATION: NavItem[] = [
  { label: "Home", href: ROUTES.HOME },
  { label: "Collections", href: ROUTES.COLLECTIONS },
  { label: "Shop Basic", href: "/collections/premium-quality-at-a-fair-price" },
  { label: "Shop Premium", href: "/collections/expensive" },
  { label: "Our Story", href: ROUTES.STORY },
  { label: "Contact", href: ROUTES.CONTACT },
];

export const FOOTER_NAVIGATION = {
  shop: [
    { label: "All Products", href: ROUTES.PRODUCTS },
    { label: "Shop Basic", href: "/collections/premium-quality-at-a-fair-price" },
    { label: "Shop Premium", href: "/collections/expensive" },
    { label: "New Arrivals", href: "/products?sort=newest" },
  ],
  support: [
    { label: "Track Your Order", href: ROUTES.CHECKOUT_TRACK },
    { label: "Return & Exchange Policy", href: ROUTES.RETURN_POLICY },
    { label: "Contact Us", href: ROUTES.CONTACT },
    { label: "Our Story", href: ROUTES.STORY },
  ],
  legal: [
    { label: "Privacy Policy", href: ROUTES.PRIVACY },
    { label: "Terms of Service", href: ROUTES.TERMS },
    { label: "Shipping Policy", href: ROUTES.RETURN_POLICY },
  ],
};
