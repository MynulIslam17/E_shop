import React from "react";
import Link from "next/link";
import { Logo } from "@/components/common/Logo";
import { FOOTER_NAVIGATION } from "@/constants/navigation";
import { siteConfig } from "@/config/site.config";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#070405] border-t border-white/10 text-white/70 pt-16 pb-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" />
            <p className="text-xs sm:text-sm text-white/50 max-w-sm leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="space-y-2 text-xs text-white/60 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                <span>{siteConfig.contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                <span>{siteConfig.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                <span>{siteConfig.contact.email}</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Shop
            </h4>
            <ul className="space-y-2.5 text-xs">
              {FOOTER_NAVIGATION.shop.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-brand-orange transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help & Support Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Help & Info
            </h4>
            <ul className="space-y-2.5 text-xs">
              {FOOTER_NAVIGATION.support.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-brand-orange transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links & Socials */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Legal & Social
            </h4>
            <ul className="space-y-2.5 text-xs">
              {FOOTER_NAVIGATION.legal.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-brand-orange transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={siteConfig.links.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-xs hover:border-brand-orange hover:text-brand-orange transition-colors"
                aria-label={`${siteConfig.name} on Facebook`}
              >
                FB
              </a>
              <a
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-xs hover:border-brand-orange hover:text-brand-orange transition-colors"
                aria-label={`${siteConfig.name} on Instagram`}
              >
                IG
              </a>
              <a
                href={siteConfig.links.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-xs hover:border-brand-orange hover:text-brand-orange transition-colors"
                aria-label={`${siteConfig.name} on WhatsApp`}
              >
                WA
              </a>
            </div>
          </div>
        </div>

        {/* Copyright & Location Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {currentYear} {siteConfig.name}. All rights reserved.</p>
          <p>Handcrafted with Purpose in Bangladesh 🇧🇩</p>
        </div>
      </div>
    </footer>
  );
}
