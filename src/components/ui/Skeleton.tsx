import React, { HTMLAttributes } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "rect" | "circle" | "text";
}

export function Skeleton({
  className,
  variant = "rect",
  ...props
}: SkeletonProps) {
  const variantStyles = {
    rect: "rounded-lg",
    circle: "rounded-full",
    text: "h-4 rounded",
  };

  return (
    <div
      className={twMerge(
        clsx(
          "animate-pulse bg-white/10",
          variantStyles[variant],
          className
        )
      )}
      {...props}
    />
  );
}
