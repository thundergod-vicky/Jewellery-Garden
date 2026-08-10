"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Users, GraduationCap, TreePine, Sparkles } from "lucide-react";
import TopBar from "@/components/header/TopBar";
import MainHeader from "@/components/header/MainHeader";
import CategoryMenu from "@/components/header/CategoryMenu";
import MainFooter from "@/components/footer/MainFooter";
import SeoFooter from "@/components/footer/SeoFooter";
import FloatingActions from "@/components/common/FloatingActions";

export default function CsrInitiativesPage() {
  const initiatives = [
    {
      title: "Artisan Welfare & Karigar Support Fund",
      desc: "Empowering traditional Bengali filigree craftsmen with healthcare insurance, child education scholarships, and safe workshop infrastructure.",
      icon: Users,
    },
    {
      title: "Girl Child Education Sponsorship",
      desc: "Supporting primary and higher secondary education for underprivileged young girls across the Durgapur regional area.",
      icon: GraduationCap,
    },
    {
      title: "Sustainable Green Sourcing & Solar Crafting",
      desc: "Transitioning showroom energy and manufacturing facilities towards 100% renewable solar energy.",
      icon: TreePine,
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
          <span className="font-semibold text-gray-800">CSR Initiatives</span>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C8232A] bg-red-50 py-1 px-3.5 rounded-full">
            Social Responsibility & Community
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#1A1A1A]">
            CSR Initiatives
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-light">
            At Jewellery Garden Pvt Ltd, giving back to our artisan communities and environment is integral to our heritage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {initiatives.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-[#E8E3DA] shadow-luxury space-y-3">
                <Icon className="w-8 h-8 text-[#C8232A]" />
                <h3 className="font-serif-title font-bold text-base text-[#1A1A1A]">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-light">{item.desc}</p>
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
