"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE_DATA } from "@/data/siteData";

export default function ShopByBudget() {
  return (
    <section className="py-10 px-4 sm:px-8 max-w-[1440px] mx-auto bg-[#FAF8F5] border-y border-[#E8E3DA]">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#1A1A1A]">
          Shop by Budget
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Find your dream jewellery piece within your exact price range.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SITE_DATA.budgetRanges.map((range, index) => (
          <Link
            key={index}
            href={range.link}
            className="group bg-white rounded-2xl overflow-hidden shadow-luxury shadow-luxury-hover border border-[#E8E3DA] transition-all"
          >
            <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
              <Image
                src={range.image}
                alt={range.label}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
            </div>
            <div className="py-3.5 px-4 text-center bg-white border-t border-[#F0EDE6]">
              <span className="font-bold text-sm text-[#C8232A] group-hover:text-[#9E1B21] transition-colors">
                {range.label}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
