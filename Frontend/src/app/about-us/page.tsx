"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, Gem, ShieldCheck, Heart, MapPin, Sparkles } from "lucide-react";
import TopBar from "@/components/header/TopBar";
import MainHeader from "@/components/header/MainHeader";
import CategoryMenu from "@/components/header/CategoryMenu";
import MainFooter from "@/components/footer/MainFooter";
import SeoFooter from "@/components/footer/SeoFooter";
import FloatingActions from "@/components/common/FloatingActions";
import { SITE_DATA } from "@/data/siteData";

export default function AboutUsPage() {
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
          <span className="font-semibold text-gray-800">About Us</span>
        </div>

        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-black text-white p-8 sm:p-16 mb-12 shadow-luxury border border-[#E8E3DA]">
          <Image
            src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1920&q=80"
            alt="Jewellery Garden Heritage"
            fill
            className="object-cover opacity-35"
            unoptimized
          />
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-black/60 backdrop-blur-md px-3 py-1 rounded border border-[#D4AF37]/40">
              Legacy of Purity & Artistry
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif-title font-bold leading-tight">
              Welcome to Jewellery Garden Pvt Ltd
            </h1>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-light">
              Crafting timeless 22KT Gold, certified natural diamonds, and 925 Sterling Silver jewellery with authentic Bengali filigree traditions and modern elegance.
            </p>
          </div>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-[#E8E3DA] shadow-sm space-y-3">
            <Award className="w-8 h-8 text-[#C8232A]" />
            <h3 className="font-serif-title font-bold text-base text-[#1A1A1A]">100% BIS Hallmarked</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Every gold piece at Jewellery Garden is laser-inscribed with government BIS 916 Hallmark purity assurance.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E8E3DA] shadow-sm space-y-3">
            <Gem className="w-8 h-8 text-[#D4AF37]" />
            <h3 className="font-serif-title font-bold text-base text-[#1A1A1A]">Certified Solitaires</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Natural diamonds certified by international gemological institutes with complete cut, clarity, and color transparency.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E8E3DA] shadow-sm space-y-3">
            <MapPin className="w-8 h-8 text-emerald-600" />
            <h3 className="font-serif-title font-bold text-base text-[#1A1A1A]">Durgapur Showrooms</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Serving thousands of happy families at our flagship Durgapur Bazar and City Centre Showrooms.
            </p>
          </div>
        </div>

        {/* Brand Narrative Content Box */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E8E3DA] shadow-luxury space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed font-light max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif-title font-bold text-[#C8232A]">Our Story & Craftsmanship</h2>
          <p>
            At <strong>Jewellery Garden Pvt Ltd</strong>, jewellery is not merely an ornament—it is a cherished emotion that marks life&apos;s grandest milestones. From traditional Bengali Sitahars and Jhumkas for royal wedding ceremonies to lightweight 925 gossip silver for modern workday wear, our collections embody artisanal devotion.
          </p>
          <p>
            Our master karigars (craftsmen) combine centuries-old hand filigree techniques with cutting-edge 3D CAD design, ensuring every gold ring, necklace, and silver bangle fits comfortably and shines brightly for generations.
          </p>
        </div>

      </div>

      <MainFooter />
      <SeoFooter />
      <FloatingActions />
    </main>
  );
}
