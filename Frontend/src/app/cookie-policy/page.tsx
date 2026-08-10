"use client";

import React from "react";
import Link from "next/link";
import { Cookie, Settings, ShieldCheck } from "lucide-react";
import TopBar from "@/components/header/TopBar";
import MainHeader from "@/components/header/MainHeader";
import CategoryMenu from "@/components/header/CategoryMenu";
import MainFooter from "@/components/footer/MainFooter";
import SeoFooter from "@/components/footer/SeoFooter";
import FloatingActions from "@/components/common/FloatingActions";

export default function CookiePolicyPage() {
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
          <span className="font-semibold text-gray-800">Cookie Policy</span>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E8E3DA] shadow-luxury space-y-8 max-w-4xl mx-auto text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
          
          <div className="border-b border-gray-100 pb-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C8232A] bg-red-50 py-1 px-3 rounded-full">
              Browser Security
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#1A1A1A]">
              Cookie Policy
            </h1>
            <p className="text-xs text-gray-500 font-medium">
              Jewellery Garden Pvt Ltd | Website Cookies & Preferences
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-serif-title font-bold text-[#C8232A]">What Are Cookies?</h2>
            <p>
              Cookies are small encrypted text files placed on your browser to remember your shopping cart items, wishlist choices, and login session securely across visits.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h2 className="text-lg font-serif-title font-bold text-[#1A1A1A]">Types of Cookies We Use</h2>
            <div className="space-y-3">
              <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-gray-200">
                <span className="font-bold text-[#1A1A1A] block">Essential Cookies:</span>
                <span className="text-xs text-gray-500">Required to remember shopping cart items, checkout sessions, and security verification.</span>
              </div>
              <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-gray-200">
                <span className="font-bold text-[#1A1A1A] block">Performance & Analytics:</span>
                <span className="text-xs text-gray-500">Allows us to analyze page load speeds and optimize e-commerce search results.</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h2 className="text-lg font-serif-title font-bold text-[#1A1A1A]">Managing Your Preferences</h2>
            <p>
              You can accept or disable optional performance cookies anytime in your browser settings. Essential security cookies remain active to process your transactions safely.
            </p>
          </div>

        </div>

      </div>

      <MainFooter />
      <SeoFooter />
      <FloatingActions />
    </main>
  );
}
