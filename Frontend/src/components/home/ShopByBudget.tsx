"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ShopByBudget() {
  const budgetRanges = [
    {
      label: "Under 10K",
      maxPrice: 10000,
      link: "/jewellery?maxPrice=10000",
      image: "/images/gifts/birthday.png",
    },
    {
      label: "10K - 25K",
      minPrice: 10000,
      maxPrice: 25000,
      link: "/jewellery?minPrice=10000&maxPrice=25000",
      image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80",
    },
    {
      label: "25K - 50K",
      minPrice: 25000,
      maxPrice: 50000,
      link: "/jewellery?minPrice=25000&maxPrice=50000",
      image: "/images/gifts/engagement.png",
    },
    {
      label: "50K Above",
      minPrice: 50000,
      maxPrice: 200000,
      link: "/jewellery?minPrice=50000",
      image: "/images/gifts/wedding.png",
    },
  ];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-8 max-w-[1440px] mx-auto bg-[#FAF8F5] border-y border-[#E8E3DA]">
      {/* Title Header */}
      <div className="text-center mb-10 space-y-2">
        <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#1A1A1A]">
          Shop by Budget
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">
          Find your dream 22KT gold & certified diamond piece within your price preference.
        </p>
      </div>

      {/* 4 Square Cards Grid matching Senco Screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {budgetRanges.map((range, index) => (
          <Link
            key={index}
            href={range.link}
            className="group bg-white rounded-2xl overflow-hidden shadow-luxury shadow-luxury-hover border border-[#E8E3DA] transition-all flex flex-col justify-between"
          >
            {/* Square Studio Image Box */}
            <div className="relative w-full h-64 sm:h-72 bg-[#F6F4F0] overflow-hidden">
              <Image
                src={range.image}
                alt={range.label}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
            </div>

            {/* Bottom White Label Box */}
            <div className="py-3.5 px-4 text-center bg-white border-t border-[#F0EDE6]">
              <h3 className="font-serif-title font-bold text-sm sm:text-base text-[#1A1A1A] group-hover:text-[#C8232A] transition-colors">
                {range.label}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
