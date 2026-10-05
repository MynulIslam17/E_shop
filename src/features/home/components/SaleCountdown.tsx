"use client";

import React, { useState, useEffect } from "react";
import { calculateCountdown, CountdownTime } from "@/utils/date";

export interface SaleCountdownProps {
  endDate: string;
}

export function SaleCountdown({ endDate }: SaleCountdownProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<CountdownTime>(() =>
    calculateCountdown(endDate)
  );

  useEffect(() => {
    setIsMounted(true);
    setTimeLeft(calculateCountdown(endDate));

    const timer = setInterval(() => {
      setTimeLeft(calculateCountdown(endDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  if (isMounted && timeLeft.isExpired) {
    return (
      <div className="text-xs font-semibold text-brand-orange uppercase tracking-wider">
        Sale has concluded. Check back soon for upcoming drops!
      </div>
    );
  }

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hrs", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ];

  return (
    <div
      suppressHydrationWarning
      className="flex items-center justify-center gap-3 sm:gap-5 text-sm sm:text-base tabular-nums select-none"
    >
      {units.map((unit) => (
        <div key={unit.label} className="text-center min-w-10">
          <span
            suppressHydrationWarning
            className="block font-bold text-white tracking-tight text-base sm:text-xl"
          >
            {unit.value}
          </span>
          <span className="text-[10px] sm:text-xs tracking-wider uppercase text-white/60">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
