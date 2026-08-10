"use client";

import React from "react";
import Link from "next/link";
import { TrendingUp, FileText, Download, PieChart, ShieldCheck } from "lucide-react";
import TopBar from "@/components/header/TopBar";
import MainHeader from "@/components/header/MainHeader";
import CategoryMenu from "@/components/header/CategoryMenu";
import MainFooter from "@/components/footer/MainFooter";
import SeoFooter from "@/components/footer/SeoFooter";
import FloatingActions from "@/components/common/FloatingActions";

export default function InvestorRelationsPage() {
  const financialReports = [
    { title: "Annual Financial Statement FY 2024-25", date: "June 2025", size: "2.4 MB PDF" },
    { title: "Quarterly Performance Update Q3 FY 2025-26", date: "January 2026", size: "1.8 MB PDF" },
    { title: "Corporate Governance & Audit Report 2025", date: "September 2025", size: "3.1 MB PDF" },
  ];

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
          <span className="font-semibold text-gray-800">Investor Relations</span>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E8E3DA] shadow-luxury space-y-8 max-w-4xl mx-auto">
          
          <div className="border-b border-gray-100 pb-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C8232A] bg-red-50 py-1 px-3 rounded-full">
              Financial Highlights & Filings
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#1A1A1A]">
              Investor Relations
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Jewellery Garden Pvt Ltd | Shareholder Communications & Annual Filings
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-gray-200 space-y-1">
              <TrendingUp className="w-6 h-6 text-emerald-600 mx-auto" />
              <span className="text-xs text-gray-400 block">Annual Revenue Growth</span>
              <span className="text-xl font-bold text-[#1A1A1A]">+24.5% YoY</span>
            </div>

            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-gray-200 space-y-1">
              <PieChart className="w-6 h-6 text-[#C8232A] mx-auto" />
              <span className="text-xs text-gray-400 block">Active Showroom Network</span>
              <span className="text-xl font-bold text-[#1A1A1A]">Durgapur Flagships</span>
            </div>

            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-gray-200 space-y-1">
              <ShieldCheck className="w-6 h-6 text-[#D4AF37] mx-auto" />
              <span className="text-xs text-gray-400 block">Gold Purity Compliance</span>
              <span className="text-xl font-bold text-[#1A1A1A]">100% BIS 916</span>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h2 className="text-lg font-serif-title font-bold text-[#C8232A]">Financial Filings & Reports</h2>
            <div className="space-y-3">
              {financialReports.map((report, idx) => (
                <div key={idx} className="p-4 bg-[#FAF8F5] rounded-2xl border border-gray-200 flex items-center justify-between gap-4 text-xs">
                  <div className="space-y-0.5">
                    <span className="font-bold text-[#1A1A1A] block">{report.title}</span>
                    <span className="text-gray-400">Published: {report.date} • {report.size}</span>
                  </div>
                  <button onClick={() => alert(`Downloading ${report.title}`)} className="flex items-center gap-1.5 bg-[#C8232A] text-white py-2 px-3.5 rounded-lg text-xs font-semibold hover:bg-[#B81D24]">
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              ))}
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
