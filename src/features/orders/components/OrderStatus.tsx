import React from "react";
import { OrderStatusType } from "../types/order.types";
import { Badge } from "@/components/ui/Badge";

export interface OrderStatusProps {
  status: OrderStatusType;
}

export function OrderStatus({ status }: OrderStatusProps) {
  const getVariant = () => {
    switch (status) {
      case "Delivered":
        return "success";
      case "Cancelled":
      case "Returned":
        return "danger";
      case "Payment Verification":
      case "Processing":
      case "Packed":
      case "Shipped":
      case "Out for Delivery":
        return "warning";
      case "Confirmed":
      case "Order Placed":
      default:
        return "brand";
    }
  };

  return (
    <Badge variant={getVariant()} size="md">
      {status}
    </Badge>
  );
}
