"use client";

import React from "react";
import { MapPin, Phone, MessageSquare, ChevronDown } from "lucide-react";
import { SITE_DATA } from "@/data/siteData";

export default function TopBar() {
  return (
    <div className="bg-[#F4F6F9] border-b border-[#E8E3DA] text-[12px] font-medium text-[#444444] py-1.5 px-4 sm:px-8">
      <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left: Stores Link */}
        <div className="flex items-center gap-4">
          <a
            href="#showrooms"
            className="flex items-center gap-1.5 hover:text-[#C8232A] transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-[#C8232A]" />
            <span>Showrooms (Durgapur Bazar & City Centre)</span>
          </a>
          <span className="hidden md:inline-block text-[#CCCCCC]">|</span>
          <span className="hidden md:inline-block text-[#C8232A] font-semibold">
            {SITE_DATA.tagline}
          </span>
        </div>

        {/* Right: Contact & Currency */}
        <div className="flex items-center gap-5">
          <a
            href={`tel:${SITE_DATA.contactPhone}`}
            className="flex items-center gap-1 hover:text-[#C8232A] transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{SITE_DATA.contactPhone}</span>
          </a>

          <a
            href={`https://wa.me/${SITE_DATA.whatsappPhone.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-emerald-600 transition-colors text-emerald-700 font-semibold"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-emerald-600 text-white" />
            <span>WhatsApp Chat</span>
          </a>

          <div className="flex items-center gap-1 cursor-pointer hover:text-[#C8232A] font-medium">
            <span>🇮🇳 INR</span>
            <ChevronDown className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
