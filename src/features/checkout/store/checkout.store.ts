import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CheckoutStep, DeliveryFormData, PaymentFormData } from "../types/checkout.types";
import { STORAGE_KEYS } from "@/constants/storage-keys";
import { storeConfig } from "@/config/store.config";

interface CheckoutState {
  currentStep: CheckoutStep;
  delivery: DeliveryFormData;
  payment: PaymentFormData;
  couponCode: string;
  couponDiscount: number;
  shippingFee: number;
  setStep: (step: CheckoutStep) => void;
  setDelivery: (data: Partial<DeliveryFormData>) => void;
  setPayment: (data: Partial<PaymentFormData>) => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  resetCheckout: () => void;
}

const initialDelivery: DeliveryFormData = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  district: "Dhaka",
  thana: "",
  notes: "",
  shippingZone: "outside_dhaka",
};

const initialPayment: PaymentFormData = {
  method: "cod",
  senderNumber: "",
  transactionId: "",
};

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set, get) => ({
      currentStep: "delivery",
      delivery: initialDelivery,
      payment: initialPayment,
      couponCode: "",
      couponDiscount: 0,
      shippingFee: storeConfig.shipping.defaultFee,

      setStep: (step) => set({ currentStep: step }),

      setDelivery: (data) => {
        const updated = { ...get().delivery, ...data };
        const fee =
          updated.shippingZone === "inside_dhaka"
            ? storeConfig.shipping.zones.insideDhaka.rate
            : storeConfig.shipping.zones.outsideDhaka.rate;

        set({ delivery: updated, shippingFee: fee });
      },

      setPayment: (data) =>
        set((state) => ({ payment: { ...state.payment, ...data } })),

      applyCoupon: (code, discount) =>
        set({ couponCode: code, couponDiscount: discount }),

      removeCoupon: () => set({ couponCode: "", couponDiscount: 0 }),

      resetCheckout: () =>
        set({
          currentStep: "delivery",
          couponCode: "",
          couponDiscount: 0,
          payment: initialPayment,
        }),
    }),
    {
      name: STORAGE_KEYS.CHECKOUT_AUTOFILL,
      storage: createJSONStorage(() => localStorage),
      // ONLY persist non-sensitive delivery info (Prompt Rule 21 & 50)
      partialize: (state) => ({
        delivery: state.delivery,
      }),
    }
  )
);
