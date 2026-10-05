import React, { forwardRef, InputHTMLAttributes } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, required, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold tracking-wider uppercase text-neutral-300 mb-1.5"
          >
            {label} {required && <span className="text-brand-orange">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            required={required}
            className={twMerge(
              clsx(
                "w-full h-11 px-4 bg-neutral-900/80 text-white placeholder-neutral-500 border border-white/10 rounded-lg text-sm transition-colors",
                "focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange",
                "disabled:opacity-50 disabled:bg-neutral-900",
                error && "border-red-500 focus:border-red-500 focus:ring-red-500",
                className
              )
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-xs text-red-400 font-medium">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-xs text-neutral-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
