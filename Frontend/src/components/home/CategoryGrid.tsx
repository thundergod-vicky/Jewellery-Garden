"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE_DATA } from "@/data/siteData";

export default function CategoryGrid() {
  const cats = SITE_DATA.categories;
  const tallLeft = cats.find((c) => c.id === "silver-bangles") || cats[2];
  const col2Top = cats.find((c) => c.id === "gold-necklaces") || cats[4];
  const col2Bottom = cats.find((c) => c.id === "gold-rings") || cats[1];
  const tallCenter = cats.find((c) => c.id === "silver-utensils") || cats[5];
  const col4Top = cats.find((c) => c.id === "gold-earrings") || cats[0];
  const col4Bottom = cats.find((c) => c.id === "gold-nosepin") || cats[3];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-8 max-w-[1440px] mx-auto">
      {/* Title Header */}
      <div className="text-center mb-10 space-y-2">
        <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#1A1A1A]">
          Shop Jewellery by Category
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">
          Explore handcrafted 22KT gold, certified solitaire diamonds, and sterling silver collections.
        </p>
      </div>

      {/* Senco Asymmetric Bento Grid (4 Columns Layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 h-auto lg:h-[520px]">
        
        {/* Column 1: Tall Full-Height Card (Left) */}
        <Link
          href={tallLeft.link}
          className="group relative rounded-2xl overflow-hidden block bg-black shadow-luxury shadow-luxury-hover border border-[#E8E3DA] transition-all h-[360px] lg:h-full"
        >
          <Image
            src={tallLeft.image}
            alt={tallLeft.title}
            fill
            className="object-cover group-hover:scale-108 transition-transform duration-700"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 z-10 text-white space-y-0.5">
            <h3 className="font-serif-title font-bold text-lg sm:text-xl drop-shadow-md">
              {tallLeft.title}
            </h3>
            <span className="text-xs text-gray-300 font-medium block">
              {tallLeft.count}
            </span>
          </div>
        </Link>

        {/* Column 2: Stacked 2 Cards */}
        <div className="grid grid-rows-2 gap-4 h-[360px] lg:h-full">
          {/* Top Card */}
          <Link
            href={col2Top.link}
            className="group relative rounded-2xl overflow-hidden block bg-black shadow-luxury shadow-luxury-hover border border-[#E8E3DA] transition-all h-full"
          >
            <Image
              src={col2Top.image}
              alt={col2Top.title}
              fill
              className="object-cover group-hover:scale-108 transition-transform duration-700"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 z-10 text-white space-y-0.5">
              <h3 className="font-serif-title font-bold text-base sm:text-lg drop-shadow-md">
                {col2Top.title}
              </h3>
              <span className="text-[11px] text-gray-300 font-medium block">
                {col2Top.count}
              </span>
            </div>
          </Link>

          {/* Bottom Card */}
          <Link
            href={col2Bottom.link}
            className="group relative rounded-2xl overflow-hidden block bg-black shadow-luxury shadow-luxury-hover border border-[#E8E3DA] transition-all h-full"
          >
            <Image
              src={col2Bottom.image}
              alt={col2Bottom.title}
              fill
              className="object-cover group-hover:scale-108 transition-transform duration-700"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 z-10 text-white space-y-0.5">
              <h3 className="font-serif-title font-bold text-base sm:text-lg drop-shadow-md">
                {col2Bottom.title}
              </h3>
              <span className="text-[11px] text-gray-300 font-medium block">
                {col2Bottom.count}
              </span>
            </div>
          </Link>
        </div>

        {/* Column 3: Tall Full-Height Card (Center-Right) */}
        <Link
          href={tallCenter.link}
          className="group relative rounded-2xl overflow-hidden block bg-black shadow-luxury shadow-luxury-hover border border-[#E8E3DA] transition-all h-[360px] lg:h-full"
        >
          <Image
            src={tallCenter.image}
            alt={tallCenter.title}
            fill
            className="object-cover group-hover:scale-108 transition-transform duration-700"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 z-10 text-white space-y-0.5">
            <h3 className="font-serif-title font-bold text-lg sm:text-xl drop-shadow-md">
              {tallCenter.title}
            </h3>
            <span className="text-xs text-gray-300 font-medium block">
              {tallCenter.count}
            </span>
          </div>
        </Link>

        {/* Column 4: Stacked 2 Cards (Right) */}
        <div className="grid grid-rows-2 gap-4 h-[360px] lg:h-full">
          {/* Top Card */}
          <Link
            href={col4Top.link}
            className="group relative rounded-2xl overflow-hidden block bg-black shadow-luxury shadow-luxury-hover border border-[#E8E3DA] transition-all h-full"
          >
            <Image
              src={col4Top.image}
              alt={col4Top.title}
              fill
              className="object-cover group-hover:scale-108 transition-transform duration-700"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 z-10 text-white space-y-0.5">
              <h3 className="font-serif-title font-bold text-base sm:text-lg drop-shadow-md">
                {col4Top.title}
              </h3>
              <span className="text-[11px] text-gray-300 font-medium block">
                {col4Top.count}
              </span>
            </div>
          </Link>

          {/* Bottom Card */}
          <Link
            href={col4Bottom.link}
            className="group relative rounded-2xl overflow-hidden block bg-black shadow-luxury shadow-luxury-hover border border-[#E8E3DA] transition-all h-full"
          >
            <Image
              src={col4Bottom.image}
              alt={col4Bottom.title}
              fill
              className="object-cover group-hover:scale-108 transition-transform duration-700"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 z-10 text-white space-y-0.5">
              <h3 className="font-serif-title font-bold text-base sm:text-lg drop-shadow-md">
                {col4Bottom.title}
              </h3>
              <span className="text-[11px] text-gray-300 font-medium block">
                {col4Bottom.count}
              </span>
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
}
