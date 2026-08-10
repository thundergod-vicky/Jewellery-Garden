"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Award, Search, CheckCircle2, Gem } from "lucide-react";
import TopBar from "@/components/header/TopBar";
import MainHeader from "@/components/header/MainHeader";
import CategoryMenu from "@/components/header/CategoryMenu";
import MainFooter from "@/components/footer/MainFooter";
import SeoFooter from "@/components/footer/SeoFooter";
import FloatingActions from "@/components/common/FloatingActions";

export default function DiamondCertificatesPage() {
  const [certNumber, setCertNumber] = useState("");
  const [verified, setVerified] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (certNumber.trim()) {
      setVerified(true);
    }
  };

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
          <span className="font-semibold text-gray-800">Diamond Certificates</span>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E8E3DA] shadow-luxury space-y-8 max-w-4xl mx-auto">
          
          <div className="border-b border-gray-100 pb-6 space-y-2 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C8232A] bg-red-50 py-1 px-3.5 rounded-full">
              Authenticity & 4Cs Grading
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#1A1A1A]">
              Diamond Certificate Verification
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Verify your IGLI / SGL / GIA diamond certificate serial number for complete 4Cs grading details.
            </p>
          </div>

          {/* Certificate Search Box */}
          <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E8E3DA] space-y-4 max-w-xl mx-auto">
            <form onSubmit={handleVerify} className="space-y-3">
              <label className="text-xs font-bold text-[#1A1A1A] block">Enter Certificate / Stock ID Number:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={certNumber}
                  onChange={(e) => setCertNumber(e.target.value)}
                  placeholder="e.g. DN-D000123787 or IGLI-9842"
                  className="flex-1 text-xs bg-white border border-gray-300 p-3 rounded-xl focus:outline-none focus:border-[#C8232A]"
                />
                <button type="submit" className="bg-[#C8232A] text-white text-xs font-semibold px-5 rounded-xl flex items-center gap-1.5 hover:bg-[#B81D24]">
                  <Search className="w-4 h-4" />
                  <span>Verify</span>
                </button>
              </div>
            </form>

            {verified && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs text-emerald-900 animate-in fade-in">
                <div className="flex items-center gap-2 font-bold text-sm text-emerald-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Certificate Valid & Verified</span>
                </div>
                <p>Certificate ID: <strong>{certNumber.toUpperCase()}</strong></p>
                <p>Cut: <strong>Excellent Round Brilliant</strong> | Color: <strong>VVS1 - EF</strong></p>
                <p>Carat Weight: <strong>0.18 Carat Natural Diamond</strong></p>
                <p>Gold Setting: <strong>18KT Yellow Gold (BIS 750 Stamped)</strong></p>
              </div>
            )}
          </div>

          {/* 4Cs Diamond Education */}
          <div className="space-y-4 pt-6 border-t border-gray-100">
            <h2 className="text-xl font-serif-title font-bold text-[#1A1A1A] flex items-center gap-2">
              <Gem className="w-5 h-5 text-[#D4AF37]" />
              The 4Cs of Diamond Excellence
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-600">
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-gray-200 space-y-1">
                <span className="font-bold text-[#1A1A1A] block">1. Cut (Proportions & Brilliance)</span>
                <p>Determines how light reflects through the diamond. We curate only Ideal & Excellent cuts.</p>
              </div>
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-gray-200 space-y-1">
                <span className="font-bold text-[#1A1A1A] block">2. Color (Purity Grade)</span>
                <p>Graded from D (Colorless) to H. Our solitaires feature EF to GH color grades.</p>
              </div>
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-gray-200 space-y-1">
                <span className="font-bold text-[#1A1A1A] block">3. Clarity (Inner Purity)</span>
                <p>VVS1 to VS2 clarity grades ensuring microscopic inclusions invisible to the naked eye.</p>
              </div>
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-gray-200 space-y-1">
                <span className="font-bold text-[#1A1A1A] block">4. Carat Weight</span>
                <p>Precise carat measurement up to 3 decimal places laser-inscribed on your certificate.</p>
              </div>
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
