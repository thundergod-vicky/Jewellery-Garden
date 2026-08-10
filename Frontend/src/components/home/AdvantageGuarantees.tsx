"use client";

import React from "react";
import { Award, ShieldCheck, Truck, Receipt } from "lucide-react";
import { SITE_DATA } from "@/data/siteData";

export default function AdvantageGuarantees() {
  const icons = [
    <Award key="1" className="w-8 h-8 text-[#D4AF37]" />,
    <ShieldCheck key="2" className="w-8 h-8 text-[#C8232A]" />,
    <Truck key="3" className="w-8 h-8 text-[#D4AF37]" />,
    <Receipt key="4" className="w-8 h-8 text-[#C8232A]" />,
  ];

  return (
    <section className="py-14 px-4 sm:px-8 max-w-[1440px] mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#1A1A1A]">
          The Jewellery Garden Advantage
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Purity, certification, and complete pricing transparency in every jewel.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SITE_DATA.trustPillars.map((pillar, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl border border-[#E8E3DA] shadow-luxury text-center space-y-3 hover:-translate-y-1 transition-all"
          >
            <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border border-[#E8E3DA] flex items-center justify-center mx-auto shadow-inner">
              {icons[idx]}
            </div>
            <h3 className="font-serif-title font-bold text-base text-[#1A1A1A]">
              {pillar.title}
            </h3>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              {pillar.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
