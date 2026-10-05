"use client";

import React, { useState, useEffect } from "react";
import { Review, ReviewRatingSummary, ReviewFiltersState } from "../types/review.types";
import { reviewService } from "../services/review.service";
import { ReviewSummary } from "./ReviewSummary";
import { ReviewFilters } from "./ReviewFilters";
import { ReviewCard } from "./ReviewCard";
import { Skeleton } from "@/components/ui/Skeleton";

export interface ReviewListProps {
  productId: string;
}

export function ReviewList({ productId }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [summary, setSummary] = useState<ReviewRatingSummary | null>(null);
  const [filters, setFilters] = useState<ReviewFiltersState>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCurrent = true;
    setIsLoading(true);

    reviewService
      .getProductReviews(productId, filters)
      .then((res) => {
        if (isCurrent) {
          setReviews(res.reviews);
          setSummary(res.summary);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [productId, filters]);

  return (
    <div className="pt-16 border-t border-white/10 w-full">
      <div className="mb-6">
        <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-white">
          Customer Reviews
        </h3>
        <p className="text-xs sm:text-sm text-white/50 mt-1">
          Real feedback from verified purchasers across Bangladesh.
        </p>
      </div>

      {summary && (
        <ReviewSummary
          summary={summary}
          selectedRating={filters.rating}
          onFilterRating={(rating) => setFilters((prev) => ({ ...prev, rating }))}
        />
      )}

      <ReviewFilters
        filters={filters}
        onChange={(updated) => setFilters((prev) => ({ ...prev, ...updated }))}
      />

      {isLoading ? (
        <div className="space-y-4 py-6">
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>
      ) : reviews.length === 0 ? (
        <div className="py-12 text-center text-sm text-white/50">
          No reviews found matching the selected filter.
        </div>
      ) : (
        <div className="divide-y divide-white/10">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}
