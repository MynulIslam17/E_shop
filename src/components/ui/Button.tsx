import React, { forwardRef, ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "brand" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      rounded = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-bold uppercase tracking-wider transition-all duration-200 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]";

    const variantStyles = {
      primary:
        "bg-white text-black hover:bg-neutral-200 shadow-sm",
      brand:
        "bg-brand-orange text-white hover:bg-[#E02937] shadow-[0_4px_16px_rgba(251,58,72,0.25)]",
      secondary:
        "bg-[#1A0F13] text-white border border-white/20 hover:bg-[#25151B] hover:border-white/40",
      outline:
        "bg-transparent text-white border border-white/25 hover:border-white hover:bg-white/5",
      ghost:
        "bg-transparent text-white/80 hover:text-white hover:bg-white/10 font-medium normal-case",
      danger:
        "bg-red-600 text-white hover:bg-red-700",
    };

    const sizeStyles = {
      sm: "h-9 px-4 text-xs tracking-wider",
      md: "h-11 px-6 text-xs sm:text-sm tracking-widest",
      lg: "h-12 md:h-13 px-7 text-xs sm:text-sm tracking-widest",
      icon: "h-10 w-10 p-0",
    };

    const roundedStyles = {
      none: "rounded-none",
      sm: "rounded-md",
      md: "rounded-lg",
      lg: "rounded-xl",
      full: "rounded-full",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={twMerge(
          clsx(
            baseStyles,
            variantStyles[variant],
            sizeStyles[size],
            roundedStyles[rounded],
            className
          )
        )}
        {...props}
      >
        {isLoading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin text-current" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
