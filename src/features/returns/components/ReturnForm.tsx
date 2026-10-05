"use client";

import React, { useState } from "react";
import { ReturnRequestType, ReturnReason } from "../types/return.types";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { CheckCircle2, Upload, RotateCcw } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export interface ReturnFormProps {
  token: string;
}

export function ReturnForm({ token }: ReturnFormProps) {
  const [requestType, setRequestType] = useState<ReturnRequestType>("Exchange");
  const [reason, setReason] = useState<ReturnReason>("Wrong size");
  const [requestedSize, setRequestedSize] = useState("L");
  const [explanation, setExplanation] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    if (photos.length + files.length > 3) {
      setError("Maximum 3 evidence photos allowed.");
      return;
    }

    const newUrls = files.map((f) => URL.createObjectURL(f));
    setPhotos((prev) => [...prev, ...newUrls]);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!explanation.trim()) {
      setError("Please describe the reason for return/exchange.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  if (isSuccess) {
    return (
      <div className="max-w-lg mx-auto text-center py-16 px-6 bg-[#140A0E] border border-white/10 rounded-3xl space-y-6">
        <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
        <div className="space-y-1">
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">
            Request Status: Submitted
          </span>
          <h2 className="text-2xl font-display uppercase tracking-tight text-white">
            {requestType} Request Logged
          </h2>
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
            Our support desk has received your ticket. A representative will contact you via WhatsApp or phone within 24 hours to schedule courier pickup.
          </p>
        </div>

        <Link href={ROUTES.HOME}>
          <Button variant="brand" size="md">
            Return to Store
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 md:p-8 bg-[#140A0E] border border-white/10 rounded-3xl space-y-6 text-white"
    >
      <div className="flex items-center gap-2 pb-3 border-b border-white/10">
        <RotateCcw className="w-5 h-5 text-brand-orange" />
        <div>
          <h2 className="text-xl font-display uppercase tracking-tight text-white">
            Request Return / Exchange
          </h2>
          <p className="text-xs text-white/50">
            Authenticated order token: {token.slice(0, 12)}...
          </p>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-xs text-red-400">
          {error}
        </div>
      )}

      {/* Type Selector (Return or Exchange) */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-white/80">
          Request Type
        </label>
        <div className="grid grid-cols-2 gap-3">
          {(["Exchange", "Return"] as ReturnRequestType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setRequestType(t)}
              className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                requestType === t
                  ? "bg-brand-orange/10 border-brand-orange text-white"
                  : "bg-neutral-900 border-white/10 text-white/60 hover:border-white/30"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Reason Selector */}
      <Select
        label="Reason for Request"
        value={reason}
        onChange={(e) => setReason(e.target.value as ReturnReason)}
        options={[
          { label: "Wrong size (Need different size)", value: "Wrong size" },
          { label: "Wrong item delivered", value: "Wrong item" },
          { label: "Damaged in transit", value: "Damaged product" },
          { label: "Defective stitching / fabric flaw", value: "Defective product" },
          { label: "Other inquiry", value: "Other" },
        ]}
      />

      {/* If Exchange, pick requested new size */}
      {requestType === "Exchange" && (
        <Select
          label="Desired Replacement Size"
          value={requestedSize}
          onChange={(e) => setRequestedSize(e.target.value)}
          options={[
            { label: "Size S", value: "S" },
            { label: "Size M", value: "M" },
            { label: "Size L", value: "L" },
            { label: "Size XL", value: "XL" },
            { label: "Size XXL", value: "XXL" },
          ]}
        />
      )}

      <Textarea
        label="Explanation & Condition"
        placeholder="Please share details regarding fit or defect..."
        value={explanation}
        onChange={(e) => setExplanation(e.target.value)}
        rows={3}
        required
      />

      {/* Evidence Photo Upload */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-white/80">
          Photographic Evidence (Optional)
        </label>
        <div className="flex items-center gap-3">
          <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-900 border border-white/20 rounded-lg text-xs font-semibold text-white/80 hover:text-white cursor-pointer">
            <Upload className="w-4 h-4" />
            Upload Photo
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          <span className="text-xs text-white/40">{photos.length}/3 photos</span>
        </div>

        {photos.length > 0 && (
          <div className="flex gap-2 pt-2">
            {photos.map((src, i) => (
              <div
                key={i}
                className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/20"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt="Return evidence"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <Button
        type="submit"
        variant="brand"
        size="lg"
        isLoading={isSubmitting}
        className="w-full"
      >
        Submit {requestType} Request
      </Button>
    </form>
  );
}
