export interface PaymentMethodConfig {
  id: "cod" | "bkash" | "nagad" | "sslcommerz";
  name: string;
  type: "offline" | "gateway";
  merchantNumber?: string;
  instructions?: string[];
  advanceFeeOnly?: boolean;
}

export const paymentConfig: {
  methods: PaymentMethodConfig[];
  advancePaymentRequired: boolean;
} = {
  advancePaymentRequired: false,
  methods: [
    {
      id: "cod",
      name: "Cash on Delivery",
      type: "offline",
      instructions: [
        "Pay with cash upon delivery of your parcel.",
        "Please prepare the exact amount for faster handover.",
        "You can inspect the sealed parcel package before receiving.",
      ],
    },
    {
      id: "bkash",
      name: "bKash (Send Money / Merchant)",
      type: "offline",
      merchantNumber: process.env.NEXT_PUBLIC_BKASH_NUMBER || "01700000000",
      instructions: [
        "Go to your bKash Mobile Menu or open the bKash App.",
        "Choose 'Send Money' or 'Make Payment' to: 01700000000",
        "Enter the delivery fee (or total order amount).",
        "Enter reference: RizqHub",
        "Complete transaction with your secret PIN.",
        "Copy and paste the Transaction ID (TrxID) and your sender phone number below.",
      ],
    },
    {
      id: "nagad",
      name: "Nagad (Send Money / Merchant)",
      type: "offline",
      merchantNumber: process.env.NEXT_PUBLIC_NAGAD_NUMBER || "01700000000",
      instructions: [
        "Go to your Nagad Mobile Menu or open the Nagad App.",
        "Choose 'Send Money' to: 01700000000",
        "Enter the required amount.",
        "Enter reference: RizqHub",
        "Confirm with your PIN.",
        "Input the Transaction ID and sender number below.",
      ],
    },
  ],
};
