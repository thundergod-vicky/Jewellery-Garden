"use client";

import React, { useState } from "react";
import { ChevronDown, Coins, Sparkles, Gem, ShieldCheck } from "lucide-react";

export default function CategoryMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const navItems = [
    { label: "All Products", link: "/jewellery" },
    { label: "Gold Jewellery", link: "/jewellery?metal=Gold", hasMega: true, highlight: true },
    { label: "18K Gold", link: "/jewellery?metal=Gold&purity=18K", hasMega: true, badge: "New" },
    { label: "Silver Jewellery", link: "/jewellery?metal=Silver", hasMega: true },
    { label: "Diamond Gold", link: "/jewellery?category=diamond-gold", hasMega: true },
    { label: "Titanium", link: "/jewellery?category=titanium", badge: "New" },
    { label: "9KT Gold", link: "/jewellery?category=9kt", badge: "New" },
    { label: "Collections", link: "/jewellery", hasMega: true },
    { label: "Gifts", link: "/jewellery?category=gifts" },
    { label: "Coins, Bars & Beans", link: "/jewellery?purity=24K" },
    { label: "Showrooms", link: "#showrooms" },
    { label: "Blog", link: "#blog" },
  ];

  // 24K Gold Submenu - Coins and Bars Only
  const gold24kMenu = {
    title: "24K Gold",
    subtitle: "Coins & Bars Only (99.9% Pure)",
    links: [
      { label: "24K Gold Coins (1g - 50g)", href: "/jewellery?metal=Gold&purity=24K&category=gold-coins" },
      { label: "24K Gold Bars & Ingots", href: "/jewellery?metal=Gold&purity=24K&category=gold-bars" },
      { label: "Lakshmi & Ganesh Gold Coins", href: "/jewellery?metal=Gold&purity=24K&category=devotional-coins" },
      { label: "Pure Gold Beans & Vedhani", href: "/jewellery?metal=Gold&purity=24K&category=gold-beans" },
      { label: "Custom Inscribed Coins", href: "/jewellery?metal=Gold&purity=24K&category=custom-coins" },
    ],
  };

  // 22K Gold Submenu - Everything else
  const gold22kColumns = [
    {
      title: "Earrings",
      links: [
        { label: "Studs", href: "/jewellery?metal=Gold&purity=22K&category=gold-earrings" },
        { label: "Drops & Danglers", href: "/jewellery?metal=Gold&purity=22K&category=gold-earrings" },
        { label: "Hoops", href: "/jewellery?metal=Gold&purity=22K&category=gold-earrings" },
        { label: "Jhumkas", href: "/jewellery?metal=Gold&purity=22K&category=gold-earrings" },
        { label: "Chandbalis", href: "/jewellery?metal=Gold&purity=22K&category=gold-earrings" },
        { label: "Sui Dhaga", href: "/jewellery?metal=Gold&purity=22K&category=gold-earrings" },
        { label: "Baby", href: "/jewellery?metal=Gold&purity=22K&category=gold-earrings" },
        { label: "Men", href: "/jewellery?metal=Gold&purity=22K&category=gold-earrings" },
      ],
    },
    {
      title: "Pendant",
      links: [
        { label: "Fancy", href: "/jewellery?metal=Gold&purity=22K&category=diamond-gold" },
        { label: "God / Devotional", href: "/jewellery?metal=Gold&purity=22K&category=diamond-gold" },
        { label: "Alphabet", href: "/jewellery?metal=Gold&purity=22K&category=diamond-gold" },
        { label: "Solitaire", href: "/jewellery?metal=Gold&purity=22K&category=diamond-gold" },
        { label: "Baby", href: "/jewellery?metal=Gold&purity=22K&category=diamond-gold" },
        { label: "Men", href: "/jewellery?metal=Gold&purity=22K&category=diamond-gold" },
      ],
    },
    {
      title: "Nosepin",
      links: [
        { label: "Casual", href: "/jewellery?metal=Gold&purity=22K&category=gold-rings" },
        { label: "Fancy", href: "/jewellery?metal=Gold&purity=22K&category=gold-rings" },
        { label: "Press Nosepin", href: "/jewellery?metal=Gold&purity=22K&category=gold-rings" },
        { label: "Diamond Accented", href: "/jewellery?metal=Gold&purity=22K&category=gold-rings" },
      ],
    },
    {
      title: "Necklace",
      links: [
        { label: "Wedding / Bridal", href: "/jewellery?metal=Gold&purity=22K&category=gold-necklaces" },
        { label: "Party Wear", href: "/jewellery?metal=Gold&purity=22K&category=gold-necklaces" },
        { label: "Choker", href: "/jewellery?metal=Gold&purity=22K&category=gold-necklaces" },
        { label: "Rani Haar / Sitahar", href: "/jewellery?metal=Gold&purity=22K&category=gold-necklaces" },
        { label: "Light Weight", href: "/jewellery?metal=Gold&purity=22K&category=gold-necklaces" },
      ],
    },
    {
      title: "Ring",
      links: [
        { label: "Casual", href: "/jewellery?metal=Gold&purity=22K&category=gold-rings" },
        { label: "Cocktail", href: "/jewellery?metal=Gold&purity=22K&category=gold-rings" },
        { label: "Engagement", href: "/jewellery?metal=Gold&purity=22K&category=gold-rings" },
        { label: "Solitaire", href: "/jewellery?metal=Gold&purity=22K&category=gold-rings" },
        { label: "Men", href: "/jewellery?metal=Gold&purity=22K&category=gold-rings" },
      ],
    },
    {
      title: "Bangle",
      links: [
        { label: "Pola", href: "/jewellery?metal=Gold&purity=22K&category=gold-bangles" },
        { label: "Noa", href: "/jewellery?metal=Gold&purity=22K&category=gold-bangles" },
        { label: "Churi", href: "/jewellery?metal=Gold&purity=22K&category=gold-bangles" },
        { label: "Gold Kadas", href: "/jewellery?metal=Gold&purity=22K&category=gold-bangles" },
        { label: "Silver Bangle", href: "/jewellery?category=silver-bangles" },
      ],
    },
    {
      title: "Bracelet",
      links: [
        { label: "Fancy", href: "/jewellery?metal=Gold&purity=22K&category=silver-bangles" },
        { label: "Men's Wristlet", href: "/jewellery?metal=Gold&purity=22K&category=gold-chains-kadas" },
        { label: "Chain Bracelet", href: "/jewellery?metal=Gold&purity=22K&category=gold-chains-kadas" },
      ],
    },
    {
      title: "Mangalsutra",
      links: [
        { label: "Modern", href: "/jewellery?metal=Gold&purity=22K&category=gold-chains-kadas" },
        { label: "Traditional", href: "/jewellery?metal=Gold&purity=22K&category=gold-chains-kadas" },
        { label: "Floral", href: "/jewellery?metal=Gold&purity=22K&category=gold-chains-kadas" },
        { label: "Solitaire", href: "/jewellery?metal=Gold&purity=22K&category=gold-chains-kadas" },
      ],
    },
    {
      title: "Chain",
      links: [
        { label: "Daily Wear", href: "/jewellery?metal=Gold&purity=22K&category=gold-chains-kadas" },
        { label: "Heavy Chains", href: "/jewellery?metal=Gold&purity=22K&category=gold-chains-kadas" },
        { label: "Men's Chain", href: "/jewellery?metal=Gold&purity=22K&category=gold-chains-kadas" },
        { label: "Unisex", href: "/jewellery?metal=Gold&purity=22K&category=gold-chains-kadas" },
      ],
    },
  ];

  // 18K Gold Submenu - Specific 18K items
  const gold18kColumns = [
    {
      title: "18K Diamond Jewellery",
      links: [
        { label: "18K Diamond Rings", href: "/jewellery?metal=Gold&purity=18K&category=gold-rings" },
        { label: "18K Diamond Earrings", href: "/jewellery?metal=Gold&purity=18K&category=gold-earrings" },
        { label: "18K Diamond Pendants", href: "/jewellery?metal=Gold&purity=18K&category=diamond-gold" },
        { label: "18K Diamond Necklaces", href: "/jewellery?metal=Gold&purity=18K&category=gold-necklaces" },
        { label: "18K Diamond Bracelets", href: "/jewellery?metal=Gold&purity=18K&category=gold-chains-kadas" },
      ],
    },
    {
      title: "18K Office & Daily Wear",
      links: [
        { label: "Lightweight Rings", href: "/jewellery?metal=Gold&purity=18K&category=gold-rings" },
        { label: "Sleek Pendants", href: "/jewellery?metal=Gold&purity=18K&category=diamond-gold" },
        { label: "Delicate Chains", href: "/jewellery?metal=Gold&purity=18K&category=gold-chains-kadas" },
        { label: "Office Wear Earrings", href: "/jewellery?metal=Gold&purity=18K&category=gold-earrings" },
        { label: "Minimalist Bangles", href: "/jewellery?metal=Gold&purity=18K&category=gold-bangles" },
      ],
    },
    {
      title: "18K Solitaires",
      links: [
        { label: "Solitaire Engagement Rings", href: "/jewellery?metal=Gold&purity=18K&category=gold-rings" },
        { label: "Solitaire Studs", href: "/jewellery?metal=Gold&purity=18K&category=gold-earrings" },
        { label: "Solitaire Pendants", href: "/jewellery?metal=Gold&purity=18K&category=diamond-gold" },
        { label: "Solitaire Nosepins", href: "/jewellery?metal=Gold&purity=18K&category=gold-rings" },
      ],
    },
    {
      title: "18K Rose & White Gold",
      links: [
        { label: "18K Rose Gold Rings", href: "/jewellery?metal=Gold&purity=18K&category=gold-rings" },
        { label: "18K White Gold Necklaces", href: "/jewellery?metal=Gold&purity=18K&category=gold-necklaces" },
        { label: "Dual-Tone Bangles", href: "/jewellery?metal=Gold&purity=18K&category=gold-bangles" },
        { label: "Rose Gold Pendants", href: "/jewellery?metal=Gold&purity=18K&category=diamond-gold" },
      ],
    },
    {
      title: "18K Men's Collection",
      links: [
        { label: "18K Men's Finger Rings", href: "/jewellery?metal=Gold&purity=18K&category=gold-rings" },
        { label: "18K Heavy Men's Chains", href: "/jewellery?metal=Gold&purity=18K&category=gold-chains-kadas" },
        { label: "18K Kadas & Wristlets", href: "/jewellery?metal=Gold&purity=18K&category=gold-chains-kadas" },
        { label: "18K Diamond Cufflinks", href: "/jewellery?metal=Gold&purity=18K&category=gold-rings" },
      ],
    },
  ];

  // Default / Other Mega Columns (Silver, Diamond, Collections)
  const defaultMegaColumns = [
    {
      title: "Earrings",
      links: [
        { label: "Studs", href: "/jewellery?category=gold-earrings" },
        { label: "Drops & Danglers", href: "/jewellery?category=gold-earrings" },
        { label: "Hoops", href: "/jewellery?category=gold-earrings" },
        { label: "Solitaire", href: "/jewellery?category=gold-earrings" },
      ],
    },
    {
      title: "Necklace & Pendants",
      links: [
        { label: "Choker Necklaces", href: "/jewellery?category=gold-necklaces" },
        { label: "Fancy Pendants", href: "/jewellery?category=diamond-gold" },
        { label: "Bridal Sets", href: "/jewellery?category=gold-necklaces" },
      ],
    },
    {
      title: "Rings & Bangles",
      links: [
        { label: "Engagement Rings", href: "/jewellery?category=gold-rings" },
        { label: "Traditional Bangles", href: "/jewellery?category=gold-bangles" },
        { label: "Silver Bangles", href: "/jewellery?category=silver-bangles" },
      ],
    },
    {
      title: "Special Collections",
      links: [
        { label: "Bengali Heritage", href: "/jewellery" },
        { label: "Royale Bridal Collection", href: "/jewellery" },
        { label: "Dailywear Sleek Gold", href: "/jewellery" },
      ],
    },
  ];

  return (
    <div className="bg-white border-b border-[#E8E3DA] hidden md:block relative z-40">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <ul className="flex items-center justify-between text-[13px] font-medium text-[#222222]">
          {navItems.map((item) => (
            <li
              key={item.label}
              className="relative py-3 group cursor-pointer"
              onMouseEnter={() => setActiveMenu(item.label)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <a
                href={item.link}
                className={`flex items-center gap-1 transition-colors py-1 px-1.5 ${
                  item.highlight ? "text-[#C8232A] font-semibold border-b-2 border-[#C8232A]" : "hover:text-[#C8232A]"
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] font-bold bg-[#C8232A] text-white px-1.5 py-0.5 rounded-full leading-none">
                    {item.badge}
                  </span>
                )}
                {item.hasMega && (
                  <ChevronDown className="w-3 h-3 opacity-60 group-hover:rotate-180 transition-transform" />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Full-width Mega Menu Dropdown Container */}
        {activeMenu && navItems.find((n) => n.label === activeMenu)?.hasMega && (
          <div
            className="absolute left-0 right-0 top-full bg-white border-b border-[#E8E3DA] shadow-2xl py-6 px-8 z-50 animate-in fade-in slide-in-from-top-1 duration-200"
            onMouseEnter={() => setActiveMenu(activeMenu)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            {/* Custom Layout for "Gold Jewellery" Menu */}
            {activeMenu === "Gold Jewellery" ? (
              <div className="max-w-[1440px] mx-auto space-y-6">
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                    <h3 className="font-serif-title font-bold text-lg text-[#1A1A1A]">
                      Gold Jewellery Collection
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                    <span className="flex items-center gap-1 text-[#8B6B23] bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" /> BIS 100% Hallmarked Pure Gold
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-8 text-left">
                  {/* 24K Gold Column (Coins and Bars Only) */}
                  <div className="col-span-3 bg-gradient-to-br from-[#FFFBF0] to-[#FFF6E0] border border-[#E6C687] rounded-xl p-5 shadow-sm space-y-4">
                    <div className="space-y-1 pb-2 border-b border-[#E6C687]">
                      <div className="flex items-center gap-2">
                        <Coins className="w-5 h-5 text-[#8B6B23]" />
                        <h4 className="font-bold text-base text-[#7A5816]">
                          {gold24kMenu.title}
                        </h4>
                      </div>
                      <p className="text-[11px] font-medium text-[#99732B]">
                        {gold24kMenu.subtitle}
                      </p>
                    </div>

                    <ul className="space-y-2 text-xs font-semibold text-[#573F10]">
                      {gold24kMenu.links.map((link, j) => (
                        <li key={j}>
                          <a
                            href={link.href}
                            className="hover:text-[#C8232A] transition-colors flex items-center gap-1.5 py-1 hover:translate-x-1 duration-150"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]"></span>
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-2">
                      <a
                        href="/jewellery?metal=Gold&purity=24K"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#C8232A] hover:underline"
                      >
                        Browse All 24K Investment Gold →
                      </a>
                    </div>
                  </div>

                  {/* 22K Gold Columns (Everything Else) */}
                  <div className="col-span-9 space-y-3">
                    <div className="pb-1 border-b border-gray-200 flex items-center justify-between">
                      <h4 className="font-bold text-sm text-[#1A1A1A] flex items-center gap-1.5">
                        <Gem className="w-4 h-4 text-[#C8232A]" />
                        22K Gold Submenus (All Jewellery Categories)
                      </h4>
                      <span className="text-[11px] text-gray-400 font-normal">
                        BIS 916 Hallmarked Jewellery
                      </span>
                    </div>

                    <div className="grid grid-cols-9 gap-4 text-left">
                      {gold22kColumns.map((col, i) => (
                        <div key={i} className="space-y-2">
                          <h5 className="font-bold text-xs text-[#1A1A1A] pb-1 border-b-2 border-[#333333]">
                            {col.title}
                          </h5>
                          <ul className="space-y-1.5 text-[11px] text-gray-600">
                            {col.links.map((link, j) => (
                              <li key={j}>
                                <a
                                  href={link.href}
                                  className="hover:text-[#C8232A] transition-colors block py-0.5"
                                >
                                  {link.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : activeMenu === "18K Gold" ? (
              /* Custom Layout for "18K Gold" Menu */
              <div className="max-w-[1440px] mx-auto space-y-5">
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#C8232A]" />
                    <h3 className="font-serif-title font-bold text-lg text-[#1A1A1A]">
                      18K Gold Jewellery & Diamond Collection
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-[#C8232A] bg-red-50 px-3 py-1 rounded-full border border-red-100">
                    Modern Lightweight & Fine Diamond Jewellery
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-6 text-left">
                  {gold18kColumns.map((col, i) => (
                    <div key={i} className="bg-gray-50/70 p-4 rounded-xl border border-gray-100 space-y-3">
                      <h4 className="font-bold text-xs text-[#1A1A1A] pb-1 border-b-2 border-[#C8232A]">
                        {col.title}
                      </h4>
                      <ul className="space-y-2 text-xs text-gray-600">
                        {col.links.map((link, j) => (
                          <li key={j}>
                            <a
                              href={link.href}
                              className="hover:text-[#C8232A] transition-colors block py-0.5 font-medium"
                            >
                              {link.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Default Layout for Silver, Diamond, Collections, etc. */
              <div className="max-w-[1440px] mx-auto grid grid-cols-4 gap-8 text-left">
                {defaultMegaColumns.map((col, i) => (
                  <div key={i} className="space-y-3">
                    <h4 className="font-bold text-sm text-[#1A1A1A] pb-1 border-b-2 border-[#333333]">
                      {col.title}
                    </h4>
                    <ul className="space-y-2 text-xs text-gray-600">
                      {col.links.map((link, j) => (
                        <li key={j}>
                          <a
                            href={link.href}
                            className="hover:text-[#C8232A] transition-colors block py-0.5"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

