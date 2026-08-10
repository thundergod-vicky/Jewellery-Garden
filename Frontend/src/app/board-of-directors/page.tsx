"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { UserCheck, Award, Briefcase } from "lucide-react";
import TopBar from "@/components/header/TopBar";
import MainHeader from "@/components/header/MainHeader";
import CategoryMenu from "@/components/header/CategoryMenu";
import MainFooter from "@/components/footer/MainFooter";
import SeoFooter from "@/components/footer/SeoFooter";
import FloatingActions from "@/components/common/FloatingActions";

export default function BoardOfDirectorsPage() {
  const directors = [
    {
      name: "Sri Souvik Basu",
      title: "Chairman & Managing Director",
      bio: "Visionary leader with over 20 years of experience scaling luxury retail and retail operations in West Bengal.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Smt. Ananya Basu",
      title: "Executive Director - Design & Merchandising",
      bio: "Master gemologist overseeing authentic gold filigree design curation and diamond procurement.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Sri Rajesh Mukherjee",
      title: "Director - Finance & Corporate Affairs",
      bio: "Chartered Accountant driving financial transparency, GST compliance, and retail expansion.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
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
          <span className="font-semibold text-gray-800">Board Of Directors</span>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C8232A] bg-red-50 py-1 px-3.5 rounded-full">
            Corporate Leadership
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#1A1A1A]">
            Board Of Directors
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-light">
            Meet the leadership team guiding Jewellery Garden Pvt Ltd towards excellence in gold purity and customer trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {directors.map((director, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-[#E8E3DA] shadow-luxury space-y-4 p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="relative w-full h-64 bg-gray-100 rounded-2xl overflow-hidden">
                  <Image
                    src={director.image}
                    alt={director.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <h3 className="font-serif-title font-bold text-lg text-[#1A1A1A]">{director.name}</h3>
                  <span className="text-xs font-semibold text-[#C8232A] block">{director.title}</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed font-light">{director.bio}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      <MainFooter />
      <SeoFooter />
      <FloatingActions />
    </main>
  );
}
