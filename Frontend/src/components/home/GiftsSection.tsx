"use client";

import React, { useState } from "react";
import { Gift, ArrowRight } from "lucide-react";

export default function GiftsSection() {
  const [activeTab, setActiveTab] = useState("Wedding");

  const tabs = ["Engagement", "Birthday", "Wedding", "Small Wonders", "Anniversary"];

  return (
    <section className="py-12 px-4 sm:px-8 max-w-[1440px] mx-auto bg-gradient-to-b from-[#FAF8F5] to-white border-y border-[#E8E3DA]">
      <div className="text-center mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C8232A] uppercase tracking-wider bg-red-50 py-1 px-3 rounded-full">
          <Gift className="w-3.5 h-3.5" />
          <span>Curated Presents</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif-title font-bold text-[#1A1A1A]">
          A Perfect Gift
        </h2>
      </div>

      {/* Occasion Tabs */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap mb-10">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              activeTab === tab
                ? "bg-[#C8232A] text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-[#E8E3DA]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="text-center">
        <a
          href="#all-gifts"
          className="inline-flex items-center gap-2 border-1.5 border-[#C8232A] text-[#C8232A] hover:bg-[#C8232A] hover:text-white font-semibold text-sm py-3 px-8 rounded-full transition-all shadow-sm"
        >
          <span>Explore All Gifts for {activeTab}</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
