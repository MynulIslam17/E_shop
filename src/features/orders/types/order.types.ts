import { Address } from "@/types/common.types";

export type OrderStatusType =
  | "Order Placed"
  | "Payment Verification"
  | "Confirmed"
  | "Processing"
  | "Packed"
  | "Shipped"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled"
  | "Returned";

export interface OrderItem {
  productId: string;
  variantId?: string;
  name: string;
  slug: string;
  image: string;
  size?: string;
  price: number;
  quantity: number;
}

export interface OrderCustomerInfo {
  fullName: string;
  phone: string;
  email?: string;
}

export interface OrderPaymentInfo {
  method: "cod" | "bkash" | "nagad";
  status: "pending_verification" | "verified" | "paid" | "failed";
  senderNumber?: string;
  transactionId?: string;
  advanceAmountPaid?: number;
}

export interface OrderTimelineEvent {
  status: OrderStatusType;
  title: string;
  description: string;
  timestamp: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  token: string;
  customer: OrderCustomerInfo;
  shippingAddress: Address;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  couponCode?: string;
  payment: OrderPaymentInfo;
  orderStatus: OrderStatusType;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
  timeline: OrderTimelineEvent[];
}
