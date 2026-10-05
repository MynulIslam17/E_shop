import React from "react";
import Image from "next/image";
import { Star, CheckCircle, ThumbsUp } from "lucide-react";
import { Review } from "../types/review.types";
import { formatDate } from "@/utils/date";

export interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="py-6 border-b border-white/10 space-y-3">
      {/* Author & Verification */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-white">{review.author}</span>
          {review.verifiedPurchase && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              <CheckCircle className="w-3 h-3" />
              Verified Buyer
            </span>
          )}
        </div>
        <span className="text-xs text-white/40">{formatDate(review.date)}</span>
      </div>

      {/* Stars & Details */}
      <div className="flex items-center gap-3">
        <div className="flex items-center text-amber-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < review.rating ? "fill-current" : "text-white/20"
              }`}
            />
          ))}
        </div>

        {review.sizePurchased && (
          <span className="text-xs text-white/50">
            Size purchased: <span className="text-white/80 font-medium">{review.sizePurchased}</span>
          </span>
        )}
      </div>

      {/* Comment Title & Body */}
      {review.title && (
        <h4 className="font-bold text-sm text-white">{review.title}</h4>
      )}
      <p className="text-sm text-white/70 leading-relaxed">{review.comment}</p>

      {/* Review Photos */}
      {review.photos && review.photos.length > 0 && (
        <div className="flex gap-2 pt-2">
          {review.photos.map((photo, i) => (
            <div
              key={i}
              className="relative w-16 h-20 rounded-lg overflow-hidden border border-white/10 bg-neutral-900"
            >
              <Image
                src={photo}
                alt="Customer review photo"
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Helpful button */}
      <div className="pt-1">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors"
        >
          <ThumbsUp className="w-3 h-3" />
          <span>Helpful ({review.helpfulCount || 0})</span>
        </button>
      </div>
    </div>
  );
}
