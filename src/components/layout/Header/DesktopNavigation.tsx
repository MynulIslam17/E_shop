"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DesktopNavigation() {
  const pathname = usePathname();
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  // Clear pending state once the route updates
  useEffect(() => {
    setPendingHref(null);
  }, [pathname]);

  const links = [
    { label: "HOME", href: "/" },
    { label: "COLLECTIONS", href: "/products" },
    { label: "OUR STORY", href: "/story" },
    { label: "CONTACT", href: "/contact" },
  ];

  return (
    <nav
      className="flex items-center gap-1 backdrop-blur-md px-1.5 py-1.5 rounded-full transition-all select-none"
      style={{
        background: "rgba(30, 8, 14, 0.8)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: "0 0 0 1px rgba(251, 58, 72, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
      }}
      aria-label="Main Navigation"
    >
      {links.map((item) => {
        const isCurrentActive =
          item.href === "/"
            ? pathname === "/"
            : item.href === "/products"
            ? pathname.startsWith("/products") || pathname.startsWith("/collections")
            : pathname.startsWith(item.href);

        const isPending = pendingHref === item.href;
        const isActive = isCurrentActive || isPending;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => {
              if (item.href !== pathname) {
                setPendingHref(item.href);
              }
            }}
            className={`px-5 py-2 rounded-full text-[11px] font-bold tracking-wider transition-all duration-200 select-none relative ${
              isActive
                ? "bg-white/[0.12] text-white shadow-sm"
                : "text-white/70 hover:text-white hover:bg-white/[0.06]"
            } ${isPending ? "opacity-90 animate-pulse" : ""}`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
