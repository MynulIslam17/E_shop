"use client";

import React, { useState, ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
  allowMultiple?: boolean;
}

export function Accordion({
  items,
  defaultOpenId,
  allowMultiple = false,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(
    defaultOpenId ? [defaultOpenId] : []
  );

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className="divide-y divide-white/10 border-y border-white/10 w-full">
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);
        return (
          <div key={item.id} className="py-4">
            <button
              onClick={() => toggleItem(item.id)}
              className="flex items-center justify-between w-full text-left font-semibold text-sm tracking-wide text-white group"
              aria-expanded={isOpen}
            >
              <span className="group-hover:text-brand-orange transition-colors">
                {item.title}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-white/50 transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-brand-orange" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="mt-3 text-sm text-neutral-400 leading-relaxed animate-in fade-in duration-200">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
