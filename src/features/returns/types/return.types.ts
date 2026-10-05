export type ReturnRequestType = "Return" | "Exchange";

export type ReturnReason =
  | "Wrong item"
  | "Wrong size"
  | "Damaged product"
  | "Defective product"
  | "Other";

export type ReturnStatus =
  | "Submitted"
  | "Under Review"
  | "Approved"
  | "Rejected"
  | "Item Received"
  | "Completed";

export interface ReturnRequest {
  id: string;
  token: string;
  orderNumber?: string;
  type: ReturnRequestType;
  reason: ReturnReason;
  requestedSize?: string;
  explanation: string;
  photos: string[];
  status: ReturnStatus;
  createdAt: string;
}
