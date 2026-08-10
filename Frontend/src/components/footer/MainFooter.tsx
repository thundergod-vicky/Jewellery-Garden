"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { SITE_DATA } from "@/data/siteData";

export default function MainFooter() {
  return (
    <footer className="bg-[#CC2529] text-white pt-14 pb-8 px-4 sm:px-8 border-t-4 border-[#D4AF37]">
      <div className="max-w-[1440px] mx-auto space-y-12">
        
        {/* Top Section: Brand Info & 3 Main Link Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="relative w-48 h-14 bg-white/10 p-2 rounded-lg backdrop-blur-sm">
              <Image
                src={SITE_DATA.logoUrl}
                alt={SITE_DATA.brandName}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <p className="text-xs text-red-100 font-light leading-relaxed">
              Step into Jewellery Garden Pvt Ltd, your premier destination for handcrafted gold, certified diamonds, and sterling silver in Durgapur.
            </p>
            <div className="space-y-1.5 text-xs text-red-100">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#F0D588]" />
                <span>{SITE_DATA.contactPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#F0D588]" />
                <span>{SITE_DATA.supportEmail}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F0D588] shrink-0 mt-0.5" />
                <span>Durgapur Bazar & City Centre Showrooms</span>
              </div>
            </div>
          </div>

          {/* Col 1: Customer Service */}
          <div>
            <h4 className="font-serif-title font-bold text-sm text-[#F0D588] uppercase tracking-wider mb-4">
              Customer Service
            </h4>
            <ul className="space-y-2 text-xs text-red-100">
              <li><Link href="/contact-us" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/payment-policy" className="hover:text-white transition-colors">Payment Policy</Link></li>
              <li><Link href="/return-policy" className="hover:text-white transition-colors">Return & Refund Policy</Link></li>
              <li><Link href="/corporate-sales" className="hover:text-white transition-colors">Corporate Sales Enquiry</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Col 2: About Jewellery Garden */}
          <div>
            <h4 className="font-serif-title font-bold text-sm text-[#F0D588] uppercase tracking-wider mb-4">
              About Jewellery Garden
            </h4>
            <ul className="space-y-2 text-xs text-red-100">
              <li><Link href="/about-us" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/board-of-directors" className="hover:text-white transition-colors">Board Of Directors</Link></li>
              <li><Link href="/corporate-governance" className="hover:text-white transition-colors">Corporate Governance</Link></li>
              <li><Link href="/investor-relations" className="hover:text-white transition-colors">Investors Relations</Link></li>
              <li><Link href="/csr-initiatives" className="hover:text-white transition-colors">CSR Initiatives</Link></li>
            </ul>
          </div>

          {/* Col 3: Help & Guides */}
          <div>
            <h4 className="font-serif-title font-bold text-sm text-[#F0D588] uppercase tracking-wider mb-4">
              Help & Guides
            </h4>
            <ul className="space-y-2 text-red-100 text-xs">
              <li><Link href="/blog" className="hover:text-white transition-colors">Jewellery Blog</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/diamond-certificates" className="hover:text-white transition-colors">Diamond Certificates</Link></li>
              <li><Link href="/jewellery-care-guide" className="hover:text-white transition-colors">Jewellery Care Guide</Link></li>
              <li><Link href="/franchisee-enquiry" className="hover:text-white transition-colors">Franchisee Enquiry</Link></li>
            </ul>
          </div>

        </div>

        {/* Middle Row: Social Connect */}
        <div className="pt-8 border-t border-red-800 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#F0D588]">Social Connect:</span>
            
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#CC2529] flex items-center justify-center transition-all">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>

            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#CC2529] flex items-center justify-center transition-all">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/></svg>
            </a>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-red-800 text-center text-xs text-red-200">
          <p>© 2026 JEWELLERY GARDEN PVT LTD. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
}
