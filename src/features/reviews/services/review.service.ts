import { Review, ReviewRatingSummary, ReviewFiltersState } from "../types/review.types";

const MOCK_REVIEWS: Review[] = [
  {
    id: "rev-1",
    productId: "139",
    author: "Tanvir Ahmed",
    rating: 5,
    date: "2026-09-28T14:30:00Z",
    title: "Exceptional fabric and fit!",
    comment: "The Cuban collar styling looks effortless and the texture of the cloth is unbelievable for this price. Wore it to a wedding reception and got multiple compliments. Made in Bangladesh with pure pride!",
    verifiedPurchase: true,
    sizePurchased: "L",
    photos: [
      "https://cdn.heemsbd.com/products/c9612622-b2db-4956-a816-9bd300cd35fa.jpg",
    ],
    helpfulCount: 14,
  },
  {
    id: "rev-2",
    productId: "139",
    author: "Rakibul Hasan",
    rating: 5,
    date: "2026-09-22T09:15:00Z",
    title: "Best summer shirt in BD",
    comment: "Breathable, premium cut and didn't shrink after cold washing. Will definitely order the beige color next.",
    verifiedPurchase: true,
    sizePurchased: "M",
    helpfulCount: 8,
  },
  {
    id: "rev-3",
    productId: "139",
    author: "Mahmudur R.",
    rating: 4,
    date: "2026-09-18T18:00:00Z",
    title: "Great quality, slightly loose fit",
    comment: "It has a relaxed fit as mentioned in the notes. Very comfortable and the buttons are sturdy.",
    verifiedPurchase: true,
    sizePurchased: "XL",
    helpfulCount: 5,
  },
  {
    id: "rev-4",
    productId: "137",
    author: "Shahriar Kabir",
    rating: 5,
    date: "2026-09-25T11:20:00Z",
    title: "Heavy GSM textured perfection",
    comment: "You can feel the weight and quality immediately. The dual pockets give it that utility look that is hard to find in local brands.",
    verifiedPurchase: true,
    sizePurchased: "L",
    helpfulCount: 12,
  },
  {
    id: "rev-5",
    productId: "124",
    author: "Imtiaz Hossain",
    rating: 5,
    date: "2026-09-15T16:45:00Z",
    title: "Jacquard weave is stunning",
    comment: "The diamond jacquard pattern looks so high end. Loved the prompt delivery via bKash advance fee payment.",
    verifiedPurchase: true,
    sizePurchased: "M",
    helpfulCount: 9,
  },
];

export const reviewService = {
  async getProductReviews(
    productId: string,
    filters: ReviewFiltersState = {}
  ): Promise<{ reviews: Review[]; summary: ReviewRatingSummary }> {
    let reviews = MOCK_REVIEWS.filter(
      (r) => r.productId === productId || productId === "all"
    );

    if (reviews.length === 0) {
      // Provide generic fallback reviews for demonstration
      reviews = MOCK_REVIEWS.slice(0, 3);
    }

    if (filters.rating) {
      reviews = reviews.filter((r) => r.rating === filters.rating);
    }

    if (filters.withPhotosOnly) {
      reviews = reviews.filter((r) => r.photos && r.photos.length > 0);
    }

    const countsByRating = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let totalScore = 0;

    MOCK_REVIEWS.forEach((r) => {
      if (r.rating in countsByRating) {
        countsByRating[r.rating as keyof typeof countsByRating]++;
        totalScore += r.rating;
      }
    });

    const totalReviews = MOCK_REVIEWS.length;
    const averageRating = totalReviews > 0 ? Number((totalScore / totalReviews).toFixed(1)) : 5.0;

    return {
      reviews,
      summary: {
        averageRating,
        totalReviews,
        countsByRating,
      },
    };
  },

  async submitReview(
    token: string,
    reviewData: {
      rating: number;
      author: string;
      comment: string;
      photos?: string[];
    }
  ): Promise<{ success: boolean; message: string }> {
    // Validate token and payload
    if (!token || !reviewData.rating || !reviewData.comment) {
      return {
        success: false,
        message: "Invalid review submission. Rating and comment are required.",
      };
    }

    return {
      success: true,
      message: "Thank you for reviewing your purchase! Your feedback is now live.",
    };
  },
};
