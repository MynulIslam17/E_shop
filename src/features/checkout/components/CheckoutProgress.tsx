import React from "react";
import { CheckoutStep } from "../types/checkout.types";
import { Check } from "lucide-react";

export interface CheckoutProgressProps {
  currentStep: CheckoutStep;
  onStepClick?: (step: CheckoutStep) => void;
}

export function CheckoutProgress({ currentStep, onStepClick }: CheckoutProgressProps) {
  const steps: { id: CheckoutStep; label: string; num: number }[] = [
    { id: "delivery", label: "1. Delivery", num: 1 },
    { id: "payment", label: "2. Payment", num: 2 },
    { id: "review", label: "3. Review", num: 3 },
  ];

  const getStepIndex = (step: CheckoutStep) => {
    switch (step) {
      case "delivery":
        return 0;
      case "payment":
        return 1;
      case "review":
        return 2;
    }
  };

  const currentIndex = getStepIndex(currentStep);

  return (
    <div className="flex items-center justify-between max-w-md mx-auto mb-8 px-4">
      {steps.map((step, idx) => {
        const isCompleted = idx < currentIndex;
        const isCurrent = idx === currentIndex;

        return (
          <React.Fragment key={step.id}>
            <button
              type="button"
              disabled={idx > currentIndex}
              onClick={() => onStepClick?.(step.id)}
              className={`flex items-center gap-2 text-xs font-bold transition-colors ${
                isCurrent
                  ? "text-brand-orange"
                  : isCompleted
                  ? "text-white cursor-pointer hover:text-brand-orange"
                  : "text-white/30 cursor-not-allowed"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${
                  isCompleted
                    ? "bg-emerald-500 text-black"
                    : isCurrent
                    ? "bg-brand-orange text-white ring-4 ring-brand-orange/20"
                    : "bg-neutral-800 text-white/40 border border-white/10"
                }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step.num}
              </div>
              <span className="hidden sm:inline">{step.label}</span>
            </button>

            {idx < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-3 transition-colors ${
                  idx < currentIndex ? "bg-emerald-500/50" : "bg-white/10"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
