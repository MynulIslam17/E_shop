export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt?: string;
}

export type Status = "idle" | "loading" | "success" | "error";

export interface Address {
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  district: string;
  thana?: string;
  notes?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
