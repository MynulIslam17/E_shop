"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

export interface ProductGalleryProps {
  images: string[];
  productName: string;
  hasDiscount?: boolean;
}

export function ProductGallery({
  images,
  productName,
  hasDiscount = false,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  const currentImage = images[activeIndex] || "/images/placeholder.svg";

  // Loupe dimensions and magnification factor
  const LENS_SIZE = 220;
  const ZOOM_FACTOR = 2.5;
  const lensRadius = LENS_SIZE / 2;

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  // When active image changes, update lens background immediately
  useEffect(() => {
    if (lensRef.current) {
      lensRef.current.style.backgroundImage = `url(${currentImage})`;
    }
  }, [currentImage]);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !lensRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    lensRef.current.style.opacity = "1";
    lensRef.current.style.transform = `translate3d(${x - lensRadius}px, ${y - lensRadius}px, 0) scale(1)`;
    lensRef.current.style.backgroundSize = `${rect.width * ZOOM_FACTOR}px ${rect.height * ZOOM_FACTOR}px`;
    lensRef.current.style.backgroundPosition = `${lensRadius - x * ZOOM_FACTOR}px ${lensRadius - y * ZOOM_FACTOR}px`;
  }, [lensRadius, ZOOM_FACTOR]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !lensRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      if (!lensRef.current || !containerRef.current) return;
      lensRef.current.style.transform = `translate3d(${x - lensRadius}px, ${y - lensRadius}px, 0) scale(1)`;
      lensRef.current.style.backgroundPosition = `${lensRadius - x * ZOOM_FACTOR}px ${lensRadius - y * ZOOM_FACTOR}px`;
    });
  }, [lensRadius, ZOOM_FACTOR]);

  const handleMouseLeave = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    if (lensRef.current) {
      // Smooth fade-out and subtle scale-down when mouse is removed
      lensRef.current.style.opacity = "0";
      lensRef.current.style.transform += " scale(0.92)";
    }
  }, []);

  return (
    <div className="flex flex-col lg:flex-row-reverse gap-4 w-full">
      {/* Main Image Stage */}
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative aspect-[3/4] flex-1 rounded-2xl overflow-hidden bg-[#1A0F13] border border-white/10 group cursor-crosshair select-none"
      >
        <Image
          src={currentImage}
          alt={`${productName} - View ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 55vw"
          className="object-cover object-top pointer-events-none"
        />

        {/* Ultra-Smooth Hardware-Accelerated Magnifying Glass Loupe */}
        <div
          ref={lensRef}
          className="absolute rounded-full pointer-events-none z-30 opacity-0"
          style={{
            width: `${LENS_SIZE}px`,
            height: `${LENS_SIZE}px`,
            top: 0,
            left: 0,
            backgroundImage: `url(${currentImage})`,
            backgroundRepeat: "no-repeat",
            border: "2px solid rgba(255, 255, 255, 0.7)",
            boxShadow:
              "0 15px 35px rgba(0, 0, 0, 0.7), inset 0 0 25px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.25)",
            transition: "opacity 0.22s ease-out, transform 0.05s ease-out",
            willChange: "transform, background-position, opacity",
          }}
        />

        {/* Slide Counter on Top-Right (e.g. 1 / 2) */}
        {images.length > 1 && (
          <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono font-bold text-white/90 select-none pointer-events-none">
            {activeIndex + 1} / {images.length}
          </div>
        )}

        {/* Zoom Lightbox Trigger */}
        <button
          type="button"
          onClick={() => setIsZoomOpen(true)}
          className="absolute bottom-4 right-4 p-2.5 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/90 backdrop-blur-md border border-white/10 transition-all opacity-0 group-hover:opacity-100 z-20 active:scale-95"
          aria-label="Enlarge image"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Carousel arrows for multiple images */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/15 flex items-center justify-center text-white/90 hover:text-white hover:bg-black/90 backdrop-blur-md transition-all active:scale-95 z-20"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/15 flex items-center justify-center text-white/90 hover:text-white hover:bg-black/90 backdrop-blur-md transition-all active:scale-95 z-20"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Side Column Thumbnails (Restored) */}
      {images.length > 1 && (
        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto no-scrollbar shrink-0">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-lg overflow-hidden shrink-0 bg-neutral-900 border transition-all ${
                activeIndex === idx
                  ? "border-white ring-2 ring-white/30"
                  : "border-white/10 hover:border-white/40 opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover object-top"
              />
              {hasDiscount && idx === 0 && (
                <span className="absolute top-1 left-1 bg-black/80 text-white text-[8px] font-bold px-1.5 py-0.5 rounded border border-white/10 pointer-events-none">
                  SALE
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      <Modal
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
        maxWidth="xl"
      >
        <div className="relative aspect-[3/4] w-full max-h-[80vh] rounded-xl overflow-hidden bg-black">
          <Image
            src={currentImage}
            alt={productName}
            fill
            className="object-contain"
            sizes="100vw"
          />
        </div>
      </Modal>
    </div>
  );
}
