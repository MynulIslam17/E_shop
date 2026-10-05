import React from "react";
import { Star } from "lucide-react";
import { ReviewRatingSummary } from "../types/review.types";

export interface ReviewSummaryProps {
  summary: ReviewRatingSummary;
  onFilterRating?: (rating?: number) => void;
  selectedRating?: number;
}

export function ReviewSummary({
  summary,
  onFilterRating,
  selectedRating,
}: ReviewSummaryProps) {
  const ratings = [5, 4, 3, 2, 1] as const;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-6 rounded-2xl bg-[#1A0F13] border border-white/10 mb-8">
      {/* Big Score */}
      <div className="md:col-span-4 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-6">
        <span className="text-5xl md:text-6xl font-display font-bold text-white tracking-tight">
          {summary.averageRating}
        </span>
        <div className="flex items-center text-amber-400 gap-1 my-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current" />
          ))}
        </div>
        <p className="text-xs text-white/50">
          Based on {summary.totalReviews} verified reviews
        </p>
      </div>

      {/* Breakdown Bars */}
      <div className="md:col-span-8 space-y-2">
        {ratings.map((stars) => {
          const count = summary.countsByRating[stars] || 0;
          const percentage =
            summary.totalReviews > 0
              ? Math.round((count / summary.totalReviews) * 100)
              : 0;
          const isSelected = selectedRating === stars;

          return (
            <button
              key={stars}
              type="button"
              onClick={() => onFilterRating?.(isSelected ? undefined : stars)}
              className={`flex items-center gap-3 w-full text-xs transition-opacity hover:opacity-100 ${
                selectedRating && !isSelected ? "opacity-50" : "opacity-90"
              }`}
            >
              <div className="flex items-center gap-1 w-12 text-white/70">
                <span className="font-bold">{stars}</span>
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              </div>

              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <span className="w-8 text-right text-white/50 tabular-nums">
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
