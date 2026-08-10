"use client";

import React from "react";
import Link from "next/link";

export default function SeoFooter() {
  const sections = [
    {
      title: "POPULAR SEARCHES:",
      links: [
        { label: "Gold Mangalsutra", href: "/jewellery?q=mangalsutra" },
        { label: "Necklace", href: "/jewellery?category=gold-necklaces" },
        { label: "Gold Jewellery", href: "/jewellery?metal=Gold" },
        { label: "Diamond Jewellery", href: "/jewellery?q=diamond" },
        { label: "14 KT Jewellery", href: "/jewellery?q=18KT" },
        { label: "Baby Gold Pendant", href: "/jewellery?q=pendant" },
        { label: "Gold Rings", href: "/jewellery?category=gold-rings" },
        { label: "Gold Bracelet", href: "/jewellery?q=bracelet" },
        { label: "Diamond Rings", href: "/jewellery?q=ring" },
        { label: "Gold Nose Pin", href: "/jewellery?category=gold-nosepin" },
        { label: "Gold Bangle", href: "/jewellery?category=silver-bangles" },
      ],
    },
    {
      title: "TRENDING GOLD JEWELLERY SEARCHES:",
      links: [
        { label: "Gold Rings", href: "/jewellery?category=gold-rings" },
        { label: "Gold Earrings", href: "/jewellery?category=gold-earrings" },
        { label: "Gold Pendants", href: "/jewellery?q=pendant" },
        { label: "Modern Gold Mangalsutras", href: "/jewellery?q=mangalsutra" },
        { label: "Gold Bangles", href: "/jewellery?category=silver-bangles" },
        { label: "Gold Chains for Men", href: "/jewellery?q=chain" },
        { label: "Dailywear Gold Earrings", href: "/jewellery?category=gold-earrings" },
        { label: "Pola Bangle", href: "/jewellery?q=pola" },
        { label: "Gold Kada For Men", href: "/jewellery?q=kada" },
      ],
    },
    {
      title: "DIAMOND JEWELLERY SEARCH TRENDS:",
      links: [
        { label: "Diamond Jewellery", href: "/jewellery?q=diamond" },
        { label: "Diamond Rings", href: "/jewellery?q=ring" },
        { label: "Diamond Earrings", href: "/jewellery?category=gold-earrings" },
        { label: "Diamond Pendants", href: "/jewellery?q=pendant" },
        { label: "Diamond Necklaces", href: "/jewellery?category=gold-necklaces" },
        { label: "Diamond Mangalsutras", href: "/jewellery?q=mangalsutra" },
        { label: "Diamond Bangles", href: "/jewellery?category=silver-bangles" },
        { label: "Diamond Bracelets", href: "/jewellery?q=bracelet" },
      ],
    },
    {
      title: "MEN'S JEWELLERY COLLECTION:",
      links: [
        { label: "Men's Diamond Earrings", href: "/jewellery?q=earring" },
        { label: "Men's Diamond rings", href: "/jewellery?q=ring" },
        { label: "Rings for Men", href: "/jewellery?category=gold-rings" },
        { label: "Men's Kada", href: "/jewellery?q=kada" },
        { label: "Cufflinks for Men", href: "/jewellery?q=cufflinks" },
        { label: "Men's Gold Bracelet", href: "/jewellery?q=bracelet" },
        { label: "Gold chain for men", href: "/jewellery?q=chain" },
        { label: "Mens Gold Rings", href: "/jewellery?category=gold-rings" },
      ],
    },
    {
      title: "SHOWROOM LOCATIONS:",
      links: [
        { label: "Durgapur Bazar Showroom", href: "/contact-us" },
        { label: "Durgapur City Centre Showroom", href: "/contact-us" },
        { label: "Jewellery showroom near me", href: "/contact-us" },
        { label: "Best Silver Jewellery Showroom", href: "/jewellery?metal=Silver" },
        { label: "Certified Diamond Shop Durgapur", href: "/diamond-certificates" },
      ],
    },
  ];

  return (
    <section className="bg-[#FBF8F3] text-gray-600 py-10 px-4 sm:px-8 border-t border-[#E8E3DA]">
      <div className="max-w-[1440px] mx-auto space-y-6">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-1.5 text-xs">
            <h4 className="font-bold text-[#C8232A] uppercase tracking-wider text-[11px]">
              {section.title}
            </h4>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-gray-600 font-light leading-relaxed">
              {section.links.map((link, lIdx) => (
                <React.Fragment key={lIdx}>
                  <Link
                    href={link.href}
                    className="hover:text-[#C8232A] hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                  {lIdx < section.links.length - 1 && (
                    <span className="text-gray-300">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
