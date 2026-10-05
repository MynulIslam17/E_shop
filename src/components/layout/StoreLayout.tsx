import React, { ReactNode } from "react";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { CartDrawer } from "@/features/cart/components/CartDrawer";
import { SearchDrawer } from "@/features/search/components/SearchDrawer";

export interface StoreLayoutProps {
  children: ReactNode;
  showSaleBanner?: boolean;
}

export function StoreLayout({ children }: StoreLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B10] text-white">
      <Header />
      <main className="flex-1 w-full">{children}</main>
      <Footer />

      {/* Global Drawers */}
      <CartDrawer />
      <SearchDrawer />
    </div>
  );
}
