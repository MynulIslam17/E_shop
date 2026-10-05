"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Drawer } from "@/components/ui/Drawer";
import { useUiStore } from "@/store/ui.store";
import { MAIN_NAVIGATION, FOOTER_NAVIGATION } from "@/constants/navigation";
import { siteConfig } from "@/config/site.config";
import { Phone, Mail, MapPin } from "lucide-react";

export function MobileNavigation() {
  const isMobileNavOpen = useUiStore((s) => s.isMobileNavOpen);
  const closeMobileNav = useUiStore((s) => s.closeMobileNav);
  const pathname = usePathname();

  return (
    <Drawer
      isOpen={isMobileNavOpen}
      onClose={closeMobileNav}
      title="Menu"
      side="left"
      width="max-w-xs"
    >
      <div className="flex flex-col justify-between h-full py-2">
        {/* Navigation Links */}
        <div className="space-y-1">
          {MAIN_NAVIGATION.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileNav}
                className={`block py-3 px-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors ${
                  isActive
                    ? "bg-brand-orange/10 text-brand-orange"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-white/10 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 px-3 block mb-2">
              Help & Support
            </span>
            {FOOTER_NAVIGATION.support.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileNav}
                className="block py-2 px-3 text-xs text-white/60 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Brand Contact in Drawer */}
        <div className="pt-6 border-t border-white/10 text-xs text-white/50 space-y-2">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-brand-orange" />
            <span>{siteConfig.contact.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-brand-orange" />
            <span>{siteConfig.contact.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-brand-orange" />
            <span>{siteConfig.contact.address}</span>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
