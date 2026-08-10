"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, FileText, Lock, Building } from "lucide-react";
import TopBar from "@/components/header/TopBar";
import MainHeader from "@/components/header/MainHeader";
import CategoryMenu from "@/components/header/CategoryMenu";
import MainFooter from "@/components/footer/MainFooter";
import SeoFooter from "@/components/footer/SeoFooter";
import FloatingActions from "@/components/common/FloatingActions";

export default function CorporateGovernancePage() {
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
          <span className="font-semibold text-gray-800">Corporate Governance</span>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E8E3DA] shadow-luxury space-y-8 max-w-4xl mx-auto text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
          
          <div className="border-b border-gray-100 pb-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C8232A] bg-red-50 py-1 px-3 rounded-full">
              Ethical Standards & Compliance
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#1A1A1A]">
              Corporate Governance Framework
            </h1>
            <p className="text-xs text-gray-500 font-medium">
              Jewellery Garden Pvt Ltd | Corporate Ethics & Transparency
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-serif-title font-bold text-[#C8232A]">Governance Commitment</h2>
            <p>
              Jewellery Garden Pvt Ltd is committed to maintaining the highest standards of corporate governance, financial transparency, and ethical gold sourcing. Our governance policy ensures strict adherence to Companies Act regulations and Bureau of Indian Standards (BIS) hallmark compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-gray-200 space-y-2">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <h3 className="font-bold text-sm text-[#1A1A1A]">Audit & Compliance</h3>
              <p className="text-xs text-gray-500">Independent financial audit conducted annually by certified Chartered Accountants.</p>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-gray-200 space-y-2">
              <Lock className="w-6 h-6 text-[#C8232A]" />
              <h3 className="font-bold text-sm text-[#1A1A1A]">Responsible Sourcing</h3>
              <p className="text-xs text-gray-500">100% Conflict-free gold and certified natural diamonds from accredited refineries.</p>
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
