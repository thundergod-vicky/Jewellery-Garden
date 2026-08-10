"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CategoryMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const navItems = [
    { label: "All Products", link: "/jewellery" },
    { label: "Gold Jewellery", link: "/jewellery?metal=Gold", hasMega: true, highlight: true },
    { label: "Silver Jewellery", link: "/jewellery?metal=Silver", hasMega: true },
    { label: "Diamond Gold", link: "/jewellery?category=diamond-gold", hasMega: true },
    { label: "Titanium", link: "/jewellery?category=titanium", badge: "New" },
    { label: "9KT Gold", link: "/jewellery?category=9kt", badge: "New" },
    { label: "Collections", link: "/jewellery", hasMega: true },
    { label: "Gifts", link: "/jewellery?category=gifts" },
    { label: "Coins, Bars & Beans", link: "/jewellery?category=silver-utensils" },
    { label: "Showrooms", link: "#showrooms" },
    { label: "Blog", link: "#blog" },
  ];

  const megaColumns = [
    {
      title: "Earrings",
      links: [
        { label: "Studs", href: "/jewellery?category=gold-earrings" },
        { label: "Drops & Danglers", href: "/jewellery?category=gold-earrings" },
        { label: "Hoops", href: "/jewellery?category=gold-earrings" },
        { label: "Baby", href: "/jewellery?category=gold-earrings" },
        { label: "Men", href: "/jewellery?category=gold-earrings" },
        { label: "Solitaire", href: "/jewellery?category=gold-earrings" },
      ],
    },
    {
      title: "Pendant",
      links: [
        { label: "Fancy", href: "/jewellery?category=diamond-gold" },
        { label: "Baby", href: "/jewellery?category=diamond-gold" },
        { label: "God", href: "/jewellery?category=diamond-gold" },
        { label: "Alphabet", href: "/jewellery?category=diamond-gold" },
        { label: "Men", href: "/jewellery?category=diamond-gold" },
        { label: "Solitaire", href: "/jewellery?category=diamond-gold" },
      ],
    },
    {
      title: "Nosepin",
      links: [
        { label: "Casual", href: "/jewellery?category=gold-rings" },
        { label: "Fancy", href: "/jewellery?category=gold-rings" },
      ],
    },
    {
      title: "Necklace",
      links: [
        { label: "Wedding", href: "/jewellery?category=gold-necklaces" },
        { label: "Party", href: "/jewellery?category=gold-necklaces" },
      ],
    },
    {
      title: "Ring",
      links: [
        { label: "Casual", href: "/jewellery?category=gold-rings" },
        { label: "Cocktail", href: "/jewellery?category=gold-rings" },
        { label: "Engagement", href: "/jewellery?category=gold-rings" },
        { label: "Men", href: "/jewellery?category=gold-rings" },
        { label: "Solitaire", href: "/jewellery?category=gold-rings" },
      ],
    },
    {
      title: "Bangle",
      links: [
        { label: "Pola", href: "/jewellery?category=gold-bangles" },
        { label: "Noa", href: "/jewellery?category=gold-bangles" },
        { label: "Churi", href: "/jewellery?category=gold-bangles" },
        { label: "Silver Bangle", href: "/jewellery?category=silver-bangles" },
      ],
    },
    {
      title: "Bracelet",
      links: [
        { label: "Fancy", href: "/jewellery?category=silver-bangles" },
        { label: "Men's Wristlet", href: "/jewellery?category=gold-chains-kadas" },
      ],
    },
    {
      title: "Mangalsutra",
      links: [
        { label: "Modern", href: "/jewellery?category=gold-chains-kadas" },
        { label: "Traditional", href: "/jewellery?category=gold-chains-kadas" },
        { label: "Floral", href: "/jewellery?category=gold-chains-kadas" },
        { label: "Solitaire", href: "/jewellery?category=gold-chains-kadas" },
      ],
    },
    {
      title: "Chain",
      links: [
        { label: "Men", href: "/jewellery?category=gold-chains-kadas" },
        { label: "Unisex", href: "/jewellery?category=gold-chains-kadas" },
        { label: "Chain Pendant", href: "/jewellery?category=gold-chains-kadas" },
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

        {/* Full-width Senco Style Megamenu Dropdown Container */}
        {activeMenu && navItems.find((n) => n.label === activeMenu)?.hasMega && (
          <div
            className="absolute left-0 right-0 top-full bg-white border-b border-[#E8E3DA] shadow-2xl py-8 px-8 z-50 animate-in fade-in slide-in-from-top-1 duration-200"
            onMouseEnter={() => setActiveMenu(activeMenu)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="max-w-[1440px] mx-auto grid grid-cols-9 gap-6 text-left">
              {megaColumns.map((col, i) => (
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
          </div>
        )}
      </div>
    </div>
  );
}
