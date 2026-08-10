"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";
import TopBar from "@/components/header/TopBar";
import MainHeader from "@/components/header/MainHeader";
import CategoryMenu from "@/components/header/CategoryMenu";
import MainFooter from "@/components/footer/MainFooter";
import SeoFooter from "@/components/footer/SeoFooter";
import FloatingActions from "@/components/common/FloatingActions";

export default function BlogPage() {
  const blogPosts = [
    {
      id: "gold-purity-guide",
      title: "Understanding Gold Karats: 22KT vs 18KT Hallmarking Guide",
      date: "February 2, 2026",
      readTime: "4 min read",
      category: "Gold Buying Guide",
      excerpt: "Learn how government BIS 916 hallmarks protect your gold investment and how to choose between 22KT for bridal sets and 18KT for diamond settings.",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "bengali-bridal-jewellery",
      title: "Top 7 Must-Have Bengali Bridal Gold Designs for Vivaah Season",
      date: "January 24, 2026",
      readTime: "6 min read",
      category: "Bridal Fashion",
      excerpt: "From majestic Sitahars to intricate Royal Peacock Jhumkas, explore essential traditional Bengali gold jewellery styles.",
      image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "silver-maintenance-tips",
      title: "How to Care for 925 Sterling Silver Bangles & Coins",
      date: "January 10, 2026",
      readTime: "3 min read",
      category: "Jewellery Care",
      excerpt: "Simple home methods to maintain anti-tarnish shine on your pure 925 sterling silver gossip bangles and puja silver utensils.",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
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
          <span className="font-semibold text-gray-800">Jewellery Blog</span>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C8232A] bg-red-50 py-1 px-3.5 rounded-full">
            Styles, Purity & Care Insights
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#1A1A1A]">
            The Jewellery Garden Blog
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-light">
            Expert guides on gold hallmarks, solitaire buying tips, and timeless Bengali bridal heritage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-3xl overflow-hidden border border-[#E8E3DA] shadow-luxury flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <span className="absolute top-3 left-3 bg-[#C8232A] text-white text-[10px] font-bold px-2.5 py-1 rounded shadow">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 space-y-2">
                  <div className="flex items-center gap-3 text-[11px] text-gray-400">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-[#C8232A]" />{post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#D4AF37]" />{post.readTime}</span>
                  </div>

                  <h3 className="font-serif-title font-bold text-base text-[#1A1A1A] group-hover:text-[#C8232A] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-gray-500 leading-relaxed font-light line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0">
                <button onClick={() => alert(`Reading ${post.title}`)} className="text-xs font-bold text-[#C8232A] flex items-center gap-1 hover:gap-2 transition-all">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>

      <MainFooter />
      <SeoFooter />
      <FloatingActions />
    </main>
  );
}
