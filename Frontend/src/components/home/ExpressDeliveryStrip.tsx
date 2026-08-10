"use client";

import React from "react";
import { Zap, Plane } from "lucide-react";

export default function ExpressDeliveryStrip() {
  return (
    <div className="bg-gradient-to-r from-red-50 via-white to-red-50 border-y border-[#E8E3DA] py-3.5 px-4">
      <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#C8232A] text-white flex items-center justify-center shrink-0 shadow-md">
            <Zap className="w-5 h-5 fill-amber-300" />
          </div>
          <div>
            <span className="font-bold text-[#C8232A] text-sm uppercase tracking-wide mr-2">
              Express Delivery
            </span>
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              Excited to see products available for 24-48 hr Express Delivery?
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <a
            href="#express-products"
            className="bg-[#C8232A] hover:bg-[#B81D24] text-white font-semibold text-xs py-2 px-5 rounded-full transition-all shadow hover:shadow-red-800/30"
          >
            Click Now
          </a>
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <Plane className="w-4 h-4 text-[#C8232A] animate-pulse" />
            <span>Fully Insured Shipping Across India</span>
          </div>
        </div>
      </div>
    </div>
  );
}
