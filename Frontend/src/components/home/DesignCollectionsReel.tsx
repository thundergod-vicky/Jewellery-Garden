"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Share2, Maximize2, Sparkles } from "lucide-react";

export default function DesignCollectionsReel() {
  const [activeIndex, setActiveIndex] = useState(2); // Center on Vivaah Bridal
  const [isMuted, setIsMuted] = useState(true);

  const reels = [
    {
      id: "reel-1",
      title: "AHAM Men's Line",
      tag: "JEWELLERY GARDEN",
      image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "reel-2",
      title: "Solitaire Gold Diamonds",
      tag: "JEWELLERY GARDEN",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "reel-3",
      title: "Vivaah Bridal Gold",
      tag: "JEWELLERY GARDEN",
      image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "reel-4",
      title: "Sterling Silver 925",
      tag: "JEWELLERY GARDEN",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "reel-5",
      title: "Bengali Filigree Gold",
      tag: "JEWELLERY GARDEN",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? reels.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reels.length);
  };

  return (
    <section className="py-16 px-4 sm:px-8 max-w-[1440px] mx-auto overflow-hidden">
      {/* Title Header */}
      <div className="text-center mb-12 space-y-2">
        <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#1A1A1A]">
          Our Jewellery Design Collections
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto">
          Explore handcrafted stories in motion with our 3D reel showcase.
        </p>
      </div>

      {/* 3D Stack Carousel Container */}
      <div className="relative w-full h-[460px] sm:h-[540px] flex items-center justify-center">
        
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          aria-label="Previous Collection Reel"
          className="absolute left-2 sm:left-10 z-40 w-11 h-11 rounded-full bg-black/40 hover:bg-[#C8232A] text-white backdrop-blur-md flex items-center justify-center transition-all shadow-lg hover:scale-110 border border-white/20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next Collection Reel"
          className="absolute right-2 sm:right-10 z-40 w-11 h-11 rounded-full bg-black/40 hover:bg-[#C8232A] text-white backdrop-blur-md flex items-center justify-center transition-all shadow-lg hover:scale-110 border border-white/20"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* 3D Cards Stack with Smooth Motion Transitions */}
        <div className="relative w-full max-w-[1000px] h-full flex items-center justify-center">
          {reels.map((reel, index) => {
            let diff = index - activeIndex;
            if (diff > reels.length / 2) diff -= reels.length;
            if (diff < -reels.length / 2) diff += reels.length;

            const isCenter = diff === 0;
            const isLeft1 = diff === -1;
            const isRight1 = diff === 1;
            const isLeft2 = diff === -2;
            const isRight2 = diff === 2;

            let targetX = 0;
            let targetScale = 1;
            let targetOpacity = 1;
            let targetZ = 30;

            if (isCenter) {
              targetX = 0;
              targetScale = 1;
              targetOpacity = 1;
              targetZ = 30;
            } else if (isLeft1) {
              targetX = -220;
              targetScale = 0.9;
              targetOpacity = 0.85;
              targetZ = 20;
            } else if (isRight1) {
              targetX = 220;
              targetScale = 0.9;
              targetOpacity = 0.85;
              targetZ = 20;
            } else if (isLeft2) {
              targetX = -390;
              targetScale = 0.75;
              targetOpacity = 0.5;
              targetZ = 10;
            } else if (isRight2) {
              targetX = 390;
              targetScale = 0.75;
              targetOpacity = 0.5;
              targetZ = 10;
            } else {
              targetOpacity = 0;
            }

            return (
              <motion.div
                key={reel.id}
                onClick={() => setActiveIndex(index)}
                animate={{
                  x: targetX,
                  scale: targetScale,
                  opacity: targetOpacity,
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ zIndex: targetZ }}
                className={`absolute rounded-3xl overflow-hidden cursor-pointer bg-black ${
                  isCenter
                    ? "w-[270px] sm:w-[320px] h-[440px] sm:h-[520px] shadow-2xl border-2 border-white/60"
                    : "w-[250px] sm:w-[290px] h-[400px] sm:h-[470px] shadow-xl filter brightness-90"
                }`}
              >
                {/* Background Image */}
                <Image
                  src={reel.image}
                  alt={reel.title}
                  fill
                  className="object-cover"
                  unoptimized
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />

                {/* Top Control Bar */}
                <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20">
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                    <span className="font-semibold text-[10px] tracking-wider uppercase">
                      {reel.tag}
                    </span>
                  </div>

                  {isCenter && (
                    <div className="flex items-center gap-2 text-white/90">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMuted(!isMuted);
                        }}
                        title={isMuted ? "Unmute" : "Mute"}
                        className="p-1 hover:text-[#D4AF37] transition-colors"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        title="Share Reel"
                        className="p-1 hover:text-[#D4AF37] transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        title="Expand"
                        className="p-1 hover:text-[#D4AF37] transition-colors"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Bottom Title Bar */}
                <div className="absolute bottom-6 left-5 right-5 z-20 text-white space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                    Featured Reel
                  </span>
                  <h3 className="text-base sm:text-lg font-serif-title font-bold drop-shadow-md">
                    {reel.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
