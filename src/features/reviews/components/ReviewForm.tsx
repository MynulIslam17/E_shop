"use client";

import React, { useState } from "react";
import { Star, Upload, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { reviewService } from "../services/review.service";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export interface ReviewFormProps {
  token: string;
}

export function ReviewForm({ token }: ReviewFormProps) {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    if (photos.length + files.length > 3) {
      setError("You can upload a maximum of 3 photos.");
      return;
    }

    // Verify types and sizes (max 5MB)
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        setError("Only JPEG, PNG, or WebP images are permitted.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Each photo must be under 5MB.");
        return;
      }
    }

    // Generate local preview URLs
    const newUrls = files.map((file) => URL.createObjectURL(file));
    setPhotos((prev) => [...prev, ...newUrls]);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim()) {
      setError("Please provide your name.");
      return;
    }
    if (!comment.trim() || comment.length < 10) {
      setError("Please write at least 10 characters describing your experience.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await reviewService.submitReview(token, {
        rating,
        author,
        comment,
        photos,
      });
      setIsSuccess(true);
    } catch {
      setError("Failed to submit review. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-lg mx-auto text-center py-16 px-6 bg-[#1A0F13] border border-white/10 rounded-2xl">
        <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
        <h2 className="text-2xl font-display uppercase tracking-tight text-white mb-2">
          Review Submitted
        </h2>
        <p className="text-sm text-white/60 mb-6">
          Thank you for sharing your genuine experience with the RizqHub community.
        </p>
        <Link href={ROUTES.HOME}>
          <Button variant="brand" size="md">
            Return to Store
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 md:p-8 bg-[#1A0F13] border border-white/10 rounded-2xl space-y-6"
    >
      <div>
        <h2 className="text-2xl font-display uppercase tracking-tight text-white">
          Write a Review
        </h2>
        <p className="text-xs text-white/50 mt-1">
          Verified purchase evaluation for Order Token: {token.slice(0, 8)}...
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-xs text-red-400">
          {error}
        </div>
      )}

      {/* Star Selector */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-white/80">
          Rating
        </label>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(null)}
              onClick={() => setRating(star)}
              className="p-1 text-amber-400 transition-transform active:scale-95"
              aria-label={`${star} Stars`}
            >
              <Star
                className={`w-7 h-7 ${
                  star <= (hoverRating ?? rating)
                    ? "fill-current"
                    : "text-white/20"
                }`}
              />
            </button>
          ))}
          <span className="ml-2 text-xs font-bold text-white/80">
            {rating} of 5 Stars
          </span>
        </div>
      </div>

      <Input
        label="Your Display Name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="e.g. Asif Mahmud"
        required
      />

      <Textarea
        label="Your Review"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="How did the fabric feel? How was the fit and finishing?"
        rows={4}
        required
      />

      {/* Image Upload */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-white/80">
          Add Photos (Optional, max 3)
        </label>
        <div className="flex items-center gap-3">
          <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-900 border border-white/20 rounded-lg text-xs font-semibold text-white/80 hover:text-white hover:border-white/40 cursor-pointer">
            <Upload className="w-4 h-4" />
            Upload Image
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          <span className="text-xs text-white/40">
            {photos.length}/3 photos added
          </span>
        </div>

        {photos.length > 0 && (
          <div className="flex gap-2 pt-2">
            {photos.map((src, i) => (
              <div
                key={i}
                className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/20"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt="Upload preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <Button
        type="submit"
        variant="brand"
        size="lg"
        isLoading={isSubmitting}
        className="w-full"
      >
        Submit Review
      </Button>
    </form>
  );
}
