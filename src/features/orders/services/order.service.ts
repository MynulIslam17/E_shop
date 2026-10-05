import { Order } from "../types/order.types";
import { localStorageService } from "@/services/storage/local-storage";

const ORDERS_STORAGE_KEY = "rizqhub_mock_orders";

const DEFAULT_ORDERS: Order[] = [
  {
    id: "ord-20261004-1234",
    orderNumber: "ECOM-20261004-1234",
    token: "tok_ecom_1234",
    customer: {
      fullName: "Tanvir Ahmed",
      phone: "01712345678",
      email: "tanvir@example.com",
    },
    shippingAddress: {
      fullName: "Tanvir Ahmed",
      phone: "01712345678",
      address: "House 42, Road 11, Block D, Banani",
      district: "Dhaka",
      thana: "Banani",
      notes: "Please call before arrival",
    },
    items: [
      {
        productId: "139",
        name: "Half Sleeve Cuban Collar Shirt",
        slug: "half-sleeve-cuban-collar-shirt",
        image: "https://cdn.heemsbd.com/products/c9612622-b2db-4956-a816-9bd300cd35fa.jpg",
        size: "L",
        price: 400,
        quantity: 1,
      },
    ],
    subtotal: 400,
    discount: 0,
    shippingFee: 80,
    total: 480,
    payment: {
      method: "bkash",
      status: "pending_verification",
      senderNumber: "01712345678",
      transactionId: "TRX992834BD",
    },
    orderStatus: "Payment Verification",
    createdAt: "2026-10-04T12:00:00Z",
    timeline: [
      {
        status: "Order Placed",
        title: "Order Placed",
        description: "Your order has been recorded in our system.",
        timestamp: "2026-10-04 12:00 PM",
        isCompleted: true,
        isCurrent: false,
      },
      {
        status: "Payment Verification",
        title: "Payment Verification",
        description: "Checking transaction ID TRX992834BD with bKash merchant gateway.",
        timestamp: "2026-10-04 12:05 PM",
        isCompleted: false,
        isCurrent: true,
      },
      {
        status: "Confirmed",
        title: "Confirmed",
        description: "Order is confirmed and queued for fulfillment.",
        timestamp: "Pending",
        isCompleted: false,
        isCurrent: false,
      },
      {
        status: "Processing",
        title: "Processing",
        description: "Items picked from warehouse and quality checked.",
        timestamp: "Pending",
        isCompleted: false,
        isCurrent: false,
      },
      {
        status: "Packed",
        title: "Packed",
        description: "Sealed in tamper-evident RizqHub signature packaging.",
        timestamp: "Pending",
        isCompleted: false,
        isCurrent: false,
      },
      {
        status: "Shipped",
        title: "Shipped",
        description: "Handed over to delivery courier.",
        timestamp: "Pending",
        isCompleted: false,
        isCurrent: false,
      },
      {
        status: "Out for Delivery",
        title: "Out for Delivery",
        description: "Rider is delivering to your address today.",
        timestamp: "Pending",
        isCompleted: false,
        isCurrent: false,
      },
      {
        status: "Delivered",
        title: "Delivered",
        description: "Parcel successfully received.",
        timestamp: "Pending",
        isCompleted: false,
        isCurrent: false,
      },
    ],
  },
];

export const orderService = {
  getStoredOrders(): Order[] {
    return localStorageService.getItem<Order[]>(ORDERS_STORAGE_KEY, DEFAULT_ORDERS);
  },

  saveOrder(order: Order): void {
    const orders = this.getStoredOrders();
    const updated = [order, ...orders.filter((o) => o.id !== order.id && o.orderNumber !== order.orderNumber)];
    localStorageService.setItem(ORDERS_STORAGE_KEY, updated);
  },

  async getOrderById(orderIdOrNumber: string): Promise<Order | null> {
    const orders = this.getStoredOrders();
    const clean = orderIdOrNumber.trim().toUpperCase();
    const found = orders.find(
      (o) =>
        o.id.toUpperCase() === clean ||
        o.orderNumber.toUpperCase() === clean ||
        o.orderNumber.toUpperCase().endsWith(clean)
    );
    return found || null;
  },

  async getOrderByToken(token: string): Promise<Order | null> {
    const orders = this.getStoredOrders();
    const found = orders.find((o) => o.token === token || o.id === token);
    return found || null;
  },

  async trackOrder(identifier: string): Promise<Order | null> {
    const orders = this.getStoredOrders();
    const clean = identifier.trim().toLowerCase();
    const found = orders.find(
      (o) =>
        o.orderNumber.toLowerCase() === clean ||
        o.id.toLowerCase() === clean ||
        o.customer.phone.replace(/\D/g, "") === clean.replace(/\D/g, "")
    );
    return found || null;
  },
};
