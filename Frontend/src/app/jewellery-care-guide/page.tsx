"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ShieldAlert, CheckCircle2, Heart, RefreshCw } from "lucide-react";
import TopBar from "@/components/header/TopBar";
import MainHeader from "@/components/header/MainHeader";
import CategoryMenu from "@/components/header/CategoryMenu";
import MainFooter from "@/components/footer/MainFooter";
import SeoFooter from "@/components/footer/SeoFooter";
import FloatingActions from "@/components/common/FloatingActions";

export default function JewelleryCareGuidePage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A]">
      <TopBar />
      <MainHeader />
      <CategoryMenu />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10">
        
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 flex items-center gap-2 mb-6">
          <Link href="/" className="hover:text-[#C8232A]">Home</Link>
          <span>/</span>
          <span className="font-semibold text-gray-800">Jewellery Care Guide</span>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E8E3DA] shadow-luxury space-y-8 max-w-4xl mx-auto text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
          
          <div className="border-b border-gray-100 pb-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C8232A] bg-red-50 py-1 px-3 rounded-full">
              Maintenance & Storage Tips
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#1A1A1A]">
              Jewellery Care & Cleaning Guide
            </h1>
            <p className="text-xs text-gray-500 font-medium">
              Keep your 22KT Gold and 925 Sterling Silver ornaments shining for generations.
            </p>
          </div>

          {/* Section 1: Gold Care */}
          <div className="space-y-4">
            <h2 className="text-xl font-serif-title font-bold text-[#C8232A]">Caring for 22KT & 18KT Gold Jewellery</h2>
            <ul className="space-y-2 text-xs text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Clean gold ornaments using mild lukewarm water and a soft microfiber cloth. Avoid harsh detergents.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Remove gold rings and bangles before applying perfume, hairspray, or household chemicals.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Store each gold necklace individually in soft velvet-lined boxes to prevent scratching.</span>
              </li>
            </ul>
          </div>

          {/* Section 2: Sterling Silver Care */}
          <div className="space-y-4 pt-6 border-t border-gray-100">
            <h2 className="text-xl font-serif-title font-bold text-[#1A1A1A]">Caring for 925 Sterling Silver</h2>
            <p>
              Silver naturally oxidizes when exposed to air and humidity over time. To preserve its lustrous shine:
            </p>
            <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E8E3DA] space-y-2 text-xs text-gray-700">
              <p>✓ Store silver bangles in airtight zip-lock bags with anti-tarnish strips.</p>
              <p>✓ Use silver polishing cloths provided free with your Jewellery Garden order.</p>
              <p>✓ Visit our Durgapur showrooms anytime for complimentary ultrasonic deep cleaning!</p>
            </div>
          </div>

        </div>

      </div>

      <MainFooter />
      <SeoFooter />
      <FloatingActions />
    </main>
  );
}
