"use client";

import React from "react";
import { Accordion } from "@/components/ui/Accordion";
import { Product } from "../types/product.types";

export interface ProductAccordionProps {
  product: Product;
}

export function ProductAccordion({ product }: ProductAccordionProps) {
  const items = [
    {
      id: "description",
      title: "Description & Details",
      content: (
        <div className="space-y-3 whitespace-pre-line">
          <p>{product.description}</p>
          {product.material && (
            <p className="text-white/80 font-medium">
              Material: <span className="text-white/60">{product.material}</span>
            </p>
          )}
        </div>
      ),
    },
    {
      id: "care",
      title: "Care & Maintenance",
      content: (
        <div className="space-y-2">
          <p>{product.careInstructions || "Gentle cold machine wash with similar colors. Do not bleach. Tumble dry on low heat or hang dry in shade. Low temperature iron on reverse side."}</p>
          <ul className="list-disc list-inside space-y-1 text-xs text-white/60 pt-2">
            <li>Wash inside out</li>
            <li>Use mild detergent only</li>
            <li>Avoid direct sunlight when drying</li>
          </ul>
        </div>
      ),
    },
    {
      id: "shipping",
      title: "Delivery & Returns Policy",
      content: (
        <div className="space-y-2 text-xs leading-relaxed">
          <p className="text-white/80 font-medium">Delivery Times:</p>
          <p>• Inside Dhaka: 24 - 48 Hours (৳80)</p>
          <p>• Outside Dhaka (All Bangladesh): 2 - 4 Days (৳115)</p>
          <p className="text-white/80 font-medium pt-2">7-Day Hassle-Free Exchange:</p>
          <p>
            If you need to change your size or receive a defective item, initiate an exchange within 7 days via our online portal or WhatsApp support.
          </p>
        </div>
      ),
    },
  ];

  return <Accordion items={items} defaultOpenId="description" />;
}
