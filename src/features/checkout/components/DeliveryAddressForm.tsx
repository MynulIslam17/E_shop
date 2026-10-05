"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deliveryAddressSchema } from "../schemas/checkout.schema";
import { DeliveryFormData } from "../types/checkout.types";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { ArrowRight, MapPin } from "lucide-react";

export interface DeliveryAddressFormProps {
  initialData: DeliveryFormData;
  onSubmit: (data: DeliveryFormData) => void;
}

export function DeliveryAddressForm({
  initialData,
  onSubmit,
}: DeliveryAddressFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DeliveryFormData>({
    resolver: zodResolver(deliveryAddressSchema),
    defaultValues: initialData,
  });

  const selectedZone = watch("shippingZone");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center gap-2 pb-3 border-b border-white/10">
        <MapPin className="w-5 h-5 text-brand-orange" />
        <h3 className="text-lg font-bold text-white uppercase tracking-tight">
          Delivery Address
        </h3>
      </div>

      {/* Shipping Zone Selector */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-white/80">
          Delivery Zone
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label
            className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
              selectedZone === "inside_dhaka"
                ? "border-brand-orange bg-brand-orange/10"
                : "border-white/10 bg-neutral-900/60 hover:border-white/30"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <input
                type="radio"
                value="inside_dhaka"
                {...register("shippingZone")}
                className="accent-brand-orange"
              />
              <div>
                <span className="text-xs font-bold text-white block">
                  Inside Dhaka
                </span>
                <span className="text-[11px] text-white/50">1-2 Days</span>
              </div>
            </div>
            <span className="text-xs font-bold text-brand-orange">৳80</span>
          </label>

          <label
            className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
              selectedZone === "outside_dhaka"
                ? "border-brand-orange bg-brand-orange/10"
                : "border-white/10 bg-neutral-900/60 hover:border-white/30"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <input
                type="radio"
                value="outside_dhaka"
                {...register("shippingZone")}
                className="accent-brand-orange"
              />
              <div>
                <span className="text-xs font-bold text-white block">
                  Outside Dhaka (All BD)
                </span>
                <span className="text-[11px] text-white/50">2-4 Days</span>
              </div>
            </div>
            <span className="text-xs font-bold text-brand-orange">৳115</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          placeholder="e.g. Asif Mahmud"
          required
          error={errors.fullName?.message}
          {...register("fullName")}
        />

        <Input
          label="Phone Number"
          placeholder="01XXXXXXXXX"
          required
          error={errors.phone?.message}
          helperText="For order updates and courier delivery call"
          {...register("phone")}
        />
      </div>

      <Input
        label="Email Address"
        type="email"
        placeholder="asif@example.com (optional)"
        error={errors.email?.message}
        helperText="We will send digital invoice and order tracking to this email"
        {...register("email")}
      />

      <Input
        label="Full Address (House, Road, Area)"
        placeholder="House #12, Road #4, Sector #3, Uttara"
        required
        error={errors.address?.message}
        {...register("address")}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="District"
          placeholder="e.g. Dhaka, Chittagong, Sylhet"
          required
          error={errors.district?.message}
          {...register("district")}
        />

        <Input
          label="Area / Thana / Police Station"
          placeholder="e.g. Uttara, Dhanmondi, Gulshan"
          error={errors.thana?.message}
          {...register("thana")}
        />
      </div>

      <Textarea
        label="Delivery Notes (Optional)"
        placeholder="Any landmark, preferred delivery timing, or gate instructions..."
        rows={2}
        {...register("notes")}
      />

      <Button type="submit" variant="brand" size="lg" className="w-full">
        <span>Proceed to Payment</span>
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </form>
  );
}
