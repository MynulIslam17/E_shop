"use client";

import React, { useEffect, ReactNode } from "react";
import { X } from "lucide-react";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  side?: "right" | "left";
  children: ReactNode;
  footer?: ReactNode;
  width?: string;
}

export function Drawer({
  isOpen,
  onClose,
  title,
  side = "right",
  children,
  footer,
  width = "max-w-md",
}: DrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div
        className={`relative z-50 w-full ${width} bg-[#0E070A] border-white/10 flex flex-col h-full shadow-2xl transition-transform duration-300 ease-in-out ${
          side === "right"
            ? "ml-auto border-l animate-in slide-in-from-right"
            : "mr-auto border-r animate-in slide-in-from-left"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 shrink-0">
          <h2 className="text-base font-bold tracking-wider uppercase text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 no-scrollbar">
          {children}
        </div>

        {/* Drawer Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-white/10 bg-[#0B0507] shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
