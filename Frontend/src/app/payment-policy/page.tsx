"use client";

import React from "react";
import Link from "next/link";
import { CreditCard, ShieldCheck, Lock, DollarSign, Award, CheckCircle2 } from "lucide-react";
import TopBar from "@/components/header/TopBar";
import MainHeader from "@/components/header/MainHeader";
import CategoryMenu from "@/components/header/CategoryMenu";
import MainFooter from "@/components/footer/MainFooter";
import SeoFooter from "@/components/footer/SeoFooter";
import FloatingActions from "@/components/common/FloatingActions";

export default function PaymentPolicyPage() {
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
          <span className="font-semibold text-gray-800">Payment Policy</span>
        </div>

        {/* Header Box */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E8E3DA] shadow-luxury space-y-8 max-w-4xl mx-auto">
          <div className="border-b border-gray-100 pb-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C8232A] bg-red-50 py-1 px-3 rounded-full">
              Customer Trust & Security
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#1A1A1A]">
              Payment & Security Policy
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Last Updated: January 2026 | Jewellery Garden Pvt Ltd
            </p>
          </div>

          {/* Section 1: Accepted Payment Methods */}
          <div className="space-y-4">
            <h2 className="text-xl font-serif-title font-bold text-[#C8232A] flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#C8232A]" />
              Accepted Modes of Payment
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
              Jewellery Garden Pvt Ltd offers multiple secure payment gateways for all 22KT Gold and 925 Sterling Silver purchases across India:
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-700">
              <li className="p-3 bg-[#FAF8F5] rounded-xl border border-gray-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Credit & Debit Cards (Visa, MasterCard, RuPay, Amex)</span>
              </li>
              <li className="p-3 bg-[#FAF8F5] rounded-xl border border-gray-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instant UPI Payment (Google Pay, PhonePe, Paytm, BHIM)</span>
              </li>
              <li className="p-3 bg-[#FAF8F5] rounded-xl border border-gray-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Net Banking across 50+ Major Indian Banks</span>
              </li>
              <li className="p-3 bg-[#FAF8F5] rounded-xl border border-gray-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Easy No-Cost EMI Options on Select Bank Credit Cards</span>
              </li>
            </ul>
          </div>

          {/* Section 2: 256-Bit SSL Encryption & PCI DSS */}
          <div className="space-y-4 pt-6 border-t border-gray-100">
            <h2 className="text-xl font-serif-title font-bold text-[#1A1A1A] flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-600" />
              100% Encrypted & PCI DSS Compliant Transactions
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
              Your financial safety is our highest priority. All transactions processed on the Jewellery Garden e-commerce platform are encrypted using 256-Bit SSL socket layer protocols and verified under PCI DSS Bank Security Standard Level 1.
            </p>
          </div>

          {/* Section 3: Detailed GST Invoice */}
          <div className="space-y-4 pt-6 border-t border-gray-100">
            <h2 className="text-xl font-serif-title font-bold text-[#1A1A1A] flex items-center gap-2">
              <Award className="w-5 h-5 text-[#D4AF37]" />
              GST Tax Invoice & Purity Breakdown
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
              Every dispatched gold or silver order includes a government-valid tax invoice detailing:
            </p>
            <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E8E3DA] text-xs text-gray-700 space-y-1">
              <p>✓ Exact Gold/Silver Net Weight (in grams up to 3 decimal places)</p>
              <p>✓ Karat Purity Hallmark Number (22KT 916 / 18KT / 925 Silver)</p>
              <p>✓ Making Charges with applicable offer discounts</p>
              <p>✓ Applicable 3% Goods & Services Tax (GST)</p>
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
