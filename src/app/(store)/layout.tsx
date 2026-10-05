import React from "react";
import { StoreLayout } from "@/components/layout/StoreLayout";

export default function StoreGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StoreLayout>{children}</StoreLayout>;
}
