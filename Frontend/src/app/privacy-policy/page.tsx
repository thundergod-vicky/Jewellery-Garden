"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText, Server } from "lucide-react";
import TopBar from "@/components/header/TopBar";
import MainHeader from "@/components/header/MainHeader";
import CategoryMenu from "@/components/header/CategoryMenu";
import MainFooter from "@/components/footer/MainFooter";
import SeoFooter from "@/components/footer/SeoFooter";
import FloatingActions from "@/components/common/FloatingActions";

export default function PrivacyPolicyPage() {
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
          <span className="font-semibold text-gray-800">Privacy Policy</span>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E8E3DA] shadow-luxury space-y-8 max-w-4xl mx-auto text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
          
          <div className="border-b border-gray-100 pb-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C8232A] bg-red-50 py-1 px-3 rounded-full">
              Legal & Transparency
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#1A1A1A]">
              Privacy Policy
            </h1>
            <p className="text-xs text-gray-500 font-medium">
              Effective Date: January 1, 2026 | Jewellery Garden Pvt Ltd
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-serif-title font-bold text-[#C8232A]">1. Overview</h2>
            <p>
              Jewellery Garden Pvt Ltd (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;) operates the e-commerce store at <Link href="/" className="text-[#C8232A] font-semibold">https://jewellerygardenpvtltd.com</Link> and our authorized showrooms in Durgapur. This Privacy Policy details how we collect, protect, and handle your personal identity, order history, and payment information.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h2 className="text-lg font-serif-title font-bold text-[#1A1A1A]">2. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Personal Identity:</strong> Full Name, Mobile Phone Number, Delivery Address, PIN code, Email Address.</li>
              <li><strong>KYC Documents:</strong> PAN card details for gold purchases exceeding ₹2,00,000 as mandated by Income Tax regulations in India.</li>
              <li><strong>Transactional Data:</strong> Payment order ID, billing history, warranty registrations, and Hallmark certificate serials.</li>
            </ul>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h2 className="text-lg font-serif-title font-bold text-[#1A1A1A]">3. Data Protection & Encryption</h2>
            <p>
              We maintain LRQA ISO 27001 Information Security certification. All customer databases are encrypted using AES-256 bit algorithms. We never sell, rent, or trade your personal data with third-party advertising brokers.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h2 className="text-lg font-serif-title font-bold text-[#1A1A1A]">4. Contact Privacy Officer</h2>
            <p>
              If you have any questions regarding data access or privacy rights, please write to our Privacy Officer at <strong>privacy@jewellerygardenpvtltd.com</strong>.
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
