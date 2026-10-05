import React, { HTMLAttributes } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "brand" | "secondary" | "outline" | "success" | "warning" | "danger";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "brand",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center font-bold tracking-wider uppercase select-none rounded";

  const variantStyles = {
    brand: "bg-brand-orange text-white",
    secondary: "bg-neutral-800 text-neutral-300 border border-white/10",
    outline: "border border-white/20 text-white/90 bg-transparent",
    success: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
    warning: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
    danger: "bg-red-500/20 text-red-400 border border-red-500/30",
  };

  const sizeStyles = {
    sm: "text-[10px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
  };

  return (
    <span
      className={twMerge(clsx(baseStyles, variantStyles[variant], sizeStyles[size], className))}
      {...props}
    >
      {children}
    </span>
  );
}
