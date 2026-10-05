import React, { forwardRef, SelectHTMLAttributes } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, id, required, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-semibold tracking-wider uppercase text-neutral-300 mb-1.5"
          >
            {label} {required && <span className="text-brand-orange">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            required={required}
            className={twMerge(
              clsx(
                "w-full h-11 px-4 pr-10 bg-neutral-900/80 text-white border border-white/10 rounded-lg text-sm appearance-none cursor-pointer transition-colors",
                "focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange",
                "disabled:opacity-50",
                error && "border-red-500 focus:border-red-500",
                className
              )
            )}
            {...props}
          >
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="bg-neutral-900 text-white"
              >
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
        </div>
        {error && <p className="mt-1 text-xs text-red-400 font-medium">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
