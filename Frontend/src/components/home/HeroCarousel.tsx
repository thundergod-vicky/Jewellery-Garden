"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { SITE_DATA } from "@/data/siteData";

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SITE_DATA.heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? SITE_DATA.heroSlides.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SITE_DATA.heroSlides.length);
  };

  return (
    <div className="relative w-full h-[520px] sm:h-[580px] bg-[#111111] overflow-hidden group">
      {SITE_DATA.heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          {/* Background Image with Dark Gradient Overlay */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover object-center scale-105 transition-transform duration-10000 ease-linear"
              priority={index === 0}
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
          </div>

          {/* Content Container */}
          <div className="relative z-20 max-w-[1440px] h-full mx-auto px-6 sm:px-12 flex flex-col justify-center text-white">
            <div className="max-w-[640px] space-y-4 animate-in fade-in slide-in-from-left-6 duration-700">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#E5C365] text-[#1A1A1A] font-bold text-xs uppercase tracking-wider py-1 px-3 rounded-full shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{slide.subtitle}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-serif-title font-bold leading-tight drop-shadow-md">
                {slide.title}
              </h1>

              <p className="text-sm sm:text-base text-gray-200 font-light leading-relaxed">
                {slide.description}
              </p>

              <div className="pt-2 flex items-center gap-4">
                <a
                  href={slide.ctaLink}
                  className="bg-[#C8232A] hover:bg-[#B81D24] text-white font-semibold text-sm py-3 px-8 rounded-md transition-all shadow-lg hover:shadow-red-900/40 hover:-translate-y-0.5"
                >
                  {slide.ctaText}
                </a>
                <a
                  href="#showrooms"
                  className="border border-white/60 hover:border-white text-white font-medium text-sm py-3 px-6 rounded-md backdrop-blur-sm transition-all hover:bg-white/10"
                >
                  Visit Showrooms
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/20 hover:bg-white/80 text-white hover:text-black backdrop-blur-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/20 hover:bg-white/80 text-white hover:text-black backdrop-blur-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicator Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {SITE_DATA.heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all ${
              i === currentSlide
                ? "w-8 h-2.5 bg-[#C8232A] rounded-full"
                : "w-2.5 h-2.5 bg-white/50 hover:bg-white rounded-full"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
