import React from "react";
import { OrderTimelineEvent } from "../types/order.types";
import { Check, Clock, Circle } from "lucide-react";

export interface OrderTimelineProps {
  timeline: OrderTimelineEvent[];
}

export function OrderTimeline({ timeline }: OrderTimelineProps) {
  return (
    <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
      {timeline.map((event, index) => {
        return (
          <div key={index} className="relative group">
            {/* Dot Icon */}
            <div
              className={`absolute -left-6 top-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                event.isCompleted
                  ? "bg-emerald-500 text-black shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                  : event.isCurrent
                  ? "bg-brand-orange text-white ring-4 ring-brand-orange/20 animate-pulse"
                  : "bg-neutral-800 text-white/30 border border-white/10"
              }`}
            >
              {event.isCompleted ? (
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              ) : event.isCurrent ? (
                <Clock className="w-3.5 h-3.5" />
              ) : (
                <Circle className="w-2 h-2 fill-current" />
              )}
            </div>

            {/* Content */}
            <div className="pl-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h4
                  className={`text-sm font-bold tracking-tight ${
                    event.isCurrent
                      ? "text-brand-orange"
                      : event.isCompleted
                      ? "text-white"
                      : "text-white/40"
                  }`}
                >
                  {event.title}
                </h4>
                <span className="text-[11px] text-white/40 tabular-nums">
                  {event.timestamp}
                </span>
              </div>
              <p
                className={`text-xs mt-1 leading-relaxed ${
                  event.isCurrent ? "text-white/80" : "text-white/50"
                }`}
              >
                {event.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
