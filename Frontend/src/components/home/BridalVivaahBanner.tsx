"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, ArrowRight } from "lucide-react";

export default function BridalVivaahBanner() {
  return (
    <section className="py-12 px-4 sm:px-8 max-w-[1440px] mx-auto">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-r from-red-950 via-red-900 to-black text-white min-h-[440px] flex items-center">
        
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1920&q=80"
            alt="Jewellery Garden Vivaah Collection"
            fill
            className="object-cover object-right opacity-40 mix-blend-overlay"
            unoptimized
          />
        </div>

        {/* Content Box */}
        <div className="relative z-10 p-8 sm:p-14 max-w-[640px] space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider py-1 px-3 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Royal Vivaah Collection</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif-title font-bold leading-tight">
            Jewellery Garden&apos;s Bengali & Indian Bridal Craft
          </h2>

          <p className="text-sm sm:text-base text-gray-200 font-light leading-relaxed">
            Step into timeless grandeur with heavy gold Sitahars, traditional Jhumkas, Polka chokers, and certified diamond sets designed for your special day.
          </p>

          <div className="pt-3">
            <a
              href="#bridal"
              className="inline-flex items-center gap-2 bg-[#C8232A] hover:bg-[#B81D24] text-white font-semibold text-sm py-3.5 px-8 rounded-md shadow-lg transition-all"
            >
              <span>Shop Bridal Vivaah Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
