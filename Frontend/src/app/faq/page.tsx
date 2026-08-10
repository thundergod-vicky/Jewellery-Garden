"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, ShieldCheck, Truck, RefreshCw, Award } from "lucide-react";
import TopBar from "@/components/header/TopBar";
import MainHeader from "@/components/header/MainHeader";
import CategoryMenu from "@/components/header/CategoryMenu";
import MainFooter from "@/components/footer/MainFooter";
import SeoFooter from "@/components/footer/SeoFooter";
import FloatingActions from "@/components/common/FloatingActions";

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How do I verify the BIS Hallmark purity of my Gold purchase?",
      a: "Every gold item sold by Jewellery Garden is laser-stamped with 3 mandatory BIS marks: the BIS logo, Karat Purity (22K916 for 22KT or 18K750 for 18KT), and our unique 6-digit HUID code. You can verify your HUID code on the BIS CARE mobile app.",
    },
    {
      q: "Are the diamonds used in Jewellery Garden ornaments natural and certified?",
      a: "Yes, 100% of our diamonds are natural, conflict-free solitaires certified by independent laboratories (IGLI / SGL). Every diamond order includes an authentic certificate of quality grading.",
    },
    {
      q: "What is your 15-Day Return and Exchange policy?",
      a: "We offer a 15-day no-questions-asked return or exchange on all unused gold and silver jewellery. Simply contact our support team at 1800-103-0017 to arrange free door pickup with logistics insurance.",
    },
    {
      q: "Can I book a live trial at your Durgapur showrooms?",
      a: "Absolutely! You can select any product on our e-store and click 'Book Live Trial' to schedule an in-store appointment at either our Durgapur Bazar Showroom or Durgapur City Centre Showroom.",
    },
    {
      q: "How are making charges and GST calculated on my bill?",
      a: "Our bills are 100% transparent. Your final total consists of: (Gold/Silver Net Weight × Live Rate) + (Making Charges minus active offer discount) + 3% Goods & Services Tax (GST).",
    },
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
          <span className="font-semibold text-gray-800">Frequently Asked Questions</span>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C8232A] bg-red-50 py-1 px-3.5 rounded-full">
            Help Center
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#1A1A1A]">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-light">
            Find instant answers regarding gold hallmarking, shipping, returns, and showroom visits.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="bg-white rounded-2xl border border-[#E8E3DA] shadow-sm overflow-hidden transition-all">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif-title font-bold text-sm text-[#1A1A1A] hover:text-[#C8232A] transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[#C8232A] shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#C8232A]" : ""}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs text-gray-600 leading-relaxed border-t border-gray-100 mt-1 font-light">
                    <p className="pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      <MainFooter />
      <SeoFooter />
      <FloatingActions />
    </main>
  );
}
