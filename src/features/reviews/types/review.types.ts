export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  title?: string;
  comment: string;
  photos?: string[];
  verifiedPurchase: boolean;
  sizePurchased?: string;
  helpfulCount?: number;
}

export interface ReviewRatingSummary {
  averageRating: number;
  totalReviews: number;
  countsByRating: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export interface ReviewFiltersState {
  rating?: number;
  withPhotosOnly?: boolean;
}
