import React from "react";
import { ReviewFiltersState } from "../types/review.types";
import { Camera } from "lucide-react";

export interface ReviewFiltersProps {
  filters: ReviewFiltersState;
  onChange: (filters: Partial<ReviewFiltersState>) => void;
}

export function ReviewFilters({ filters, onChange }: ReviewFiltersProps) {
  const ratings = [5, 4, 3];

  return (
    <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-white/10">
      <button
        type="button"
        onClick={() => onChange({ rating: undefined, withPhotosOnly: false })}
        className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
          !filters.rating && !filters.withPhotosOnly
            ? "bg-white text-black"
            : "bg-neutral-900 border border-white/10 text-white/70 hover:border-white/30"
        }`}
      >
        All Reviews
      </button>

      <button
        type="button"
        onClick={() => onChange({ withPhotosOnly: !filters.withPhotosOnly })}
        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
          filters.withPhotosOnly
            ? "bg-white text-black"
            : "bg-neutral-900 border border-white/10 text-white/70 hover:border-white/30"
        }`}
      >
        <Camera className="w-3.5 h-3.5" />
        With Photos
      </button>

      {ratings.map((stars) => {
        const isSelected = filters.rating === stars;
        return (
          <button
            key={stars}
            type="button"
            onClick={() => onChange({ rating: isSelected ? undefined : stars })}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              isSelected
                ? "bg-white text-black"
                : "bg-neutral-900 border border-white/10 text-white/70 hover:border-white/30"
            }`}
          >
            {stars} ★
          </button>
        );
      })}
    </div>
  );
}
