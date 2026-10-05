import React from "react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { siteConfig } from "@/config/site.config";

export interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "hero";
  showIcon?: boolean;
}

export function Logo({ className = "", size = "md", showIcon = true }: LogoProps) {
  const sizeClasses = {
    sm: "text-base sm:text-lg tracking-wider",
    md: "text-xl sm:text-2xl tracking-widest",
    lg: "text-3xl sm:text-4xl tracking-widest",
    hero: "text-6xl md:text-8xl tracking-widest",
  };

  const iconSizes = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-12 h-12 text-lg",
    hero: "w-20 h-20 text-3xl",
  };

  return (
    <Link
      href={ROUTES.HOME}
      className={`inline-flex items-center gap-2.5 font-display font-black uppercase text-white hover:opacity-90 transition-opacity select-none ${className}`}
      aria-label={`${siteConfig.name} Home`}
    >
      {showIcon && (
        <span
          className={`${iconSizes[size]} rounded-full flex items-center justify-center font-display font-black text-white shrink-0 shadow-[0_0_12px_rgba(251,58,72,0.3)]`}
          style={{
            background: "linear-gradient(135deg, #1A0F13 0%, #2A141C 100%)",
            border: "1.5px solid rgba(251, 58, 72, 0.4)",
          }}
        >
          <span className="text-brand-orange">R</span>
        </span>
      )}
      <span className={`${sizeClasses[size]}`}>{siteConfig.name}</span>
    </Link>
  );
}
