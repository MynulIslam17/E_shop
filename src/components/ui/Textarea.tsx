import React, { forwardRef, TextareaHTMLAttributes } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, required, rows = 4, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-semibold tracking-wider uppercase text-neutral-300 mb-1.5"
          >
            {label} {required && <span className="text-brand-orange">*</span>}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          required={required}
          className={twMerge(
            clsx(
              "w-full p-4 bg-neutral-900/80 text-white placeholder-neutral-500 border border-white/10 rounded-lg text-sm transition-colors",
              "focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange",
              "disabled:opacity-50 disabled:bg-neutral-900",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500",
              className
            )
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-400 font-medium">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-xs text-neutral-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
