"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE_DATA } from "@/data/siteData";

export default function CategoryGrid() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-8 max-w-[1440px] mx-auto">
      <div className="text-center mb-10 space-y-2">
        <h2 className="text-2xl sm:text-4xl font-serif-title font-bold text-[#1A1A1A]">
          Shop Jewellery by Category
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">
          Explore handcrafted gold, diamond, and sterling silver collections tailored for every celebration.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {SITE_DATA.categories.map((cat) => (
          <Link
            key={cat.id}
            href={cat.link || `/jewellery?category=${cat.id}`}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-luxury shadow-luxury-hover border border-[#E8E3DA] transition-all flex flex-col justify-between"
          >
            <div className="relative w-full h-44 sm:h-48 bg-[#F4F6F9] overflow-hidden">
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                unoptimized
              />
            </div>
            <div className="p-3.5 text-center bg-white border-t border-[#F0EDE6]">
              <h3 className="font-semibold text-sm text-[#1A1A1A] group-hover:text-[#C8232A] transition-colors">
                {cat.title}
              </h3>
              <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                {cat.count}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
