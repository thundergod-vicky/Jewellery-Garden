"use client";

import React from "react";
import Link from "next/link";
import { RefreshCw, ShieldCheck, Truck, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import TopBar from "@/components/header/TopBar";
import MainHeader from "@/components/header/MainHeader";
import CategoryMenu from "@/components/header/CategoryMenu";
import MainFooter from "@/components/footer/MainFooter";
import SeoFooter from "@/components/footer/SeoFooter";
import FloatingActions from "@/components/common/FloatingActions";

export default function ReturnPolicyPage() {
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
          <span className="font-semibold text-gray-800">Return & Refund Policy</span>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E8E3DA] shadow-luxury space-y-8 max-w-4xl mx-auto">
          
          <div className="border-b border-gray-100 pb-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C8232A] bg-red-50 py-1 px-3 rounded-full">
              Hassle-Free Returns
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#1A1A1A]">
              15-Day Return & Refund Guarantee
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Jewellery Garden Pvt Ltd guarantees 100% customer satisfaction across all Gold & Silver products.
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E8E3DA] space-y-2">
              <Clock className="w-8 h-8 text-[#C8232A] mx-auto" />
              <h3 className="font-bold text-sm text-[#1A1A1A]">15-Day Easy Return</h3>
              <p className="text-[11px] text-gray-500">Return or exchange any gold/silver item within 15 days of delivery.</p>
            </div>
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E8E3DA] space-y-2">
              <Truck className="w-8 h-8 text-[#D4AF37] mx-auto" />
              <h3 className="font-bold text-sm text-[#1A1A1A]">Free Insured Pickup</h3>
              <p className="text-[11px] text-gray-500">We arrange complimentary door pickup with logistics insurance.</p>
            </div>
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E8E3DA] space-y-2">
              <RefreshCw className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-sm text-[#1A1A1A]">100% Value Credit</h3>
              <p className="text-[11px] text-gray-500">Instant store credit or direct bank refund upon quality verification.</p>
            </div>
          </div>

          {/* Section 1: Conditions for Return */}
          <div className="space-y-4 pt-4">
            <h2 className="text-xl font-serif-title font-bold text-[#C8232A]">
              Return Conditions
            </h2>
            <ul className="space-y-2 text-xs text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>The item must be in its original, unused condition with original price tag intact.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>The original BIS Hallmark Certificate / Diamond Certificate must be returned along with the piece.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Customized or engraved rings/bangles are eligible for exchange under our Lifetime Exchange Guarantee.</span>
              </li>
            </ul>
          </div>

          {/* Section 2: How to Initiate a Return */}
          <div className="space-y-4 pt-6 border-t border-gray-100">
            <h2 className="text-xl font-serif-title font-bold text-[#1A1A1A]">
              How to Initiate a Return
            </h2>
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E8E3DA] text-xs text-gray-700 space-y-3">
              <p><strong>Step 1:</strong> Call our customer care helpline at <strong>1800-103-0017</strong> or email <strong>support@jewellerygardenpvtltd.com</strong>.</p>
              <p><strong>Step 2:</strong> Our logistics partner will arrive at your address with tamper-proof insured courier packaging.</p>
              <p><strong>Step 3:</strong> Once received at our Durgapur quality lab, purity inspection is completed within 24 hours.</p>
              <p><strong>Step 4:</strong> Refund is initiated directly to your original payment bank account or UPI within 3-5 business days.</p>
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
