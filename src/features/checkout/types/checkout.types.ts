import { Address } from "@/types/common.types";
import { OrderPaymentInfo } from "@/features/orders/types/order.types";

export type CheckoutStep = "delivery" | "payment" | "review";

export interface DeliveryFormData {
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  district: string;
  thana?: string;
  notes?: string;
  shippingZone: "inside_dhaka" | "outside_dhaka";
}

export interface PaymentFormData {
  method: "cod" | "bkash" | "nagad";
  senderNumber?: string;
  transactionId?: string;
}

export interface PlaceOrderPayload {
  customer: {
    fullName: string;
    phone: string;
    email?: string;
  };
  shippingAddress: Address;
  items: {
    productId: string;
    variantId?: string;
    size?: string;
    quantity: number;
  }[];
  couponCode?: string;
  payment: OrderPaymentInfo;
  notes?: string;
}
