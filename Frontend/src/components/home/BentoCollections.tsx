"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export default function BentoCollections() {
  const [startIndex, setStartIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(2);

  const collections = [
    {
      id: "temple",
      title: "Temple",
      image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80",
      link: "/jewellery?category=gold-necklaces",
    },
    {
      id: "diamond-ring",
      title: "Diamond Ring",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
      link: "/jewellery?category=gold-rings",
    },
    {
      id: "aham",
      title: "Aham",
      image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80",
      link: "/jewellery?category=gold-chains-kadas",
    },
    {
      id: "kids",
      title: "Kids Gold",
      image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80",
      link: "/jewellery?category=gold-earrings",
    },
    {
      id: "polki",
      title: "Polki",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
      link: "/jewellery?category=gold-necklaces",
    },
    {
      id: "vivaah",
      title: "Vivaah Bridal",
      image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80",
      link: "/jewellery?category=gold-necklaces",
    },
    {
      id: "silver-925",
      title: "925 Silver",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
      link: "/jewellery?category=silver-bangles",
    },
  ];

  const visibleCards = 5;

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? collections.length - visibleCards : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % (collections.length - visibleCards + 1));
  };

  const visibleCollections = collections.slice(startIndex, startIndex + visibleCards);

  return (
    <section className="py-16 px-4 sm:px-8 max-w-[1440px] mx-auto overflow-hidden">
      {/* Section Title */}
      <div className="text-center mb-10 space-y-2">
        <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#1A1A1A]">
          Explore our Collections
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto">
          Discover handcrafted heritage themes and artisanal gold & silver creations.
        </p>
      </div>

      {/* Collections Slider Container */}
      <div className="relative w-full py-6 flex items-center justify-center">
        
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          aria-label="Previous Collection"
          className="absolute left-2 sm:left-4 z-40 w-11 h-11 rounded-full bg-black/60 hover:bg-[#C8232A] text-white backdrop-blur-md flex items-center justify-center transition-all shadow-xl hover:scale-110 border border-white/20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next Collection"
          className="absolute right-2 sm:right-4 z-40 w-11 h-11 rounded-full bg-black/60 hover:bg-[#C8232A] text-white backdrop-blur-md flex items-center justify-center transition-all shadow-xl hover:scale-110 border border-white/20"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Seamless Motion Layout Grid (No White Flashes!) */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 items-center">
          {visibleCollections.map((col, idx) => {
            const isHovered = hoveredIndex === idx;

            return (
              <motion.div
                key={col.id}
                layout
                initial={{ scale: 0.95, opacity: 0.9 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 25,
                }}
              >
                <Link
                  href={col.link}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  className={`relative group rounded-2xl overflow-hidden block transition-transform duration-500 ease-out bg-black cursor-pointer h-[340px] sm:h-[400px] ${
                    isHovered
                      ? "z-30 scale-105 sm:scale-108 -translate-y-2 shadow-2xl shadow-black/80 ring-2 ring-[#D4AF37]"
                      : "z-10 opacity-90 hover:opacity-100 scale-98 shadow-md"
                  }`}
                >
                  {/* Background Image */}
                  <Image
                    src={col.image}
                    alt={col.title}
                    fill
                    className={`object-cover transition-transform duration-700 ${
                      isHovered ? "scale-115" : "scale-100"
                    }`}
                    unoptimized
                  />

                  {/* Dark Vignette Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Top Badge (Visible on Zoom) */}
                  {isHovered && (
                    <div className="absolute top-4 left-4 z-20 animate-in fade-in duration-300">
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-[#C8232A] text-white py-1 px-2.5 rounded shadow">
                        Explore Line
                      </span>
                    </div>
                  )}

                  {/* Bottom Card Footer */}
                  <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between text-white">
                    <div className="space-y-0.5">
                      <h3 className="font-serif-title font-bold text-base sm:text-lg tracking-wide drop-shadow-md">
                        {col.title}
                      </h3>
                    </div>

                    <div
                      className={`w-9 h-9 rounded-full border border-white/60 backdrop-blur-sm flex items-center justify-center transition-all ${
                        isHovered
                          ? "bg-[#C8232A] border-[#C8232A] scale-110 shadow-lg"
                          : "bg-black/40 hover:bg-[#C8232A]"
                      }`}
                    >
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
