"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function GiftsSection() {
  const [startIndex, setStartIndex] = useState(0);

  const gifts = [
    {
      id: "engagement",
      title: "Engagement",
      image: "/images/gifts/engagement.png",
      link: "/jewellery?category=gold-rings",
    },
    {
      id: "birthday",
      title: "Birthday",
      image: "/images/gifts/birthday.png",
      link: "/jewellery?category=gold-nosepin",
    },
    {
      id: "wedding",
      title: "Wedding",
      image: "/images/gifts/wedding.png",
      link: "/jewellery?category=gold-necklaces",
    },
    {
      id: "small-wonders",
      title: "Small Wonders",
      image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80",
      link: "/jewellery?category=gold-earrings",
    },
    {
      id: "anniversary",
      title: "Anniversary",
      image: "/images/gifts/anniversary.png",
      link: "/jewellery?category=gold-rings",
    },
    {
      id: "festive",
      title: "Festive Gifting",
      image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80",
      link: "/jewellery?category=gold-earrings",
    },
    {
      id: "silver-gifts",
      title: "Silver Coins & Utensils",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
      link: "/jewellery?category=silver-bangles",
    },
  ];

  const visibleCards = 5;

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? gifts.length - visibleCards : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % (gifts.length - visibleCards + 1));
  };

  const visibleGifts = gifts.slice(startIndex, startIndex + visibleCards);

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-8 max-w-[1440px] mx-auto overflow-hidden">
      {/* Title Header */}
      <div className="text-center mb-10 space-y-2">
        <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#1A1A1A]">
          A Perfect Gift
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">
          Celebrate life&apos;s precious moments with handcrafted 22KT gold & certified solitaire gifts.
        </p>
      </div>

      {/* 5-Card Full-Bleed Slider Strip matching Senco Screenshot */}
      <div className="relative w-full flex items-center justify-center">
        
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          aria-label="Previous Gift Category"
          className="absolute left-2 sm:left-4 z-40 w-10 h-10 rounded-full bg-black/50 hover:bg-[#C8232A] text-white backdrop-blur-md flex items-center justify-center transition-all shadow-lg hover:scale-110 border border-white/20"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next Gift Category"
          className="absolute right-2 sm:right-4 z-40 w-10 h-10 rounded-full bg-black/50 hover:bg-[#C8232A] text-white backdrop-blur-md flex items-center justify-center transition-all shadow-lg hover:scale-110 border border-white/20"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* 5-Card Grid Strip */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 items-center">
          {visibleGifts.map((gift) => (
            <Link
              key={gift.id}
              href={gift.link}
              className="group bg-white rounded-2xl overflow-hidden shadow-luxury shadow-luxury-hover border border-[#E8E3DA] transition-all flex flex-col justify-between h-[360px] sm:h-[430px]"
            >
              {/* Full Bleed Image Box */}
              <div className="relative w-full h-full bg-gray-100 overflow-hidden">
                <Image
                  src={gift.image}
                  alt={gift.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>

              {/* Bottom White Label Box */}
              <div className="py-3 px-3 text-center bg-white border-t border-[#F0EDE6] shrink-0">
                <h3 className="font-serif-title font-bold text-sm sm:text-base text-[#1A1A1A] group-hover:text-[#C8232A] transition-colors">
                  {gift.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
