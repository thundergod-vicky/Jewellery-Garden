"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { SITE_DATA } from "@/data/siteData";

export default function ShowroomsSection() {
  return (
    <section id="showrooms" className="py-14 px-4 sm:px-8 max-w-[1440px] mx-auto bg-[#FAF8F5] border-y border-[#E8E3DA]">
      <div className="text-center mb-10 space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#C8232A] bg-red-50 py-1 px-3 rounded-full">
          Store Locator
        </span>
        <h2 className="text-2xl sm:text-4xl font-serif-title font-bold text-[#1A1A1A]">
          Visit Our Showrooms in Durgapur
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">
          Experience authentic gold purity testing, live custom trial, and personalized consultation at our authorized Jewellery Garden showrooms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SITE_DATA.showrooms.map((showroom) => (
          <div
            key={showroom.id}
            className="bg-white rounded-2xl overflow-hidden border border-[#E8E3DA] shadow-luxury shadow-luxury-hover transition-all flex flex-col sm:flex-row"
          >
            {/* Showroom Image */}
            <div className="relative w-full sm:w-1/2 h-56 sm:h-auto bg-gray-100 shrink-0">
              <Image
                src={showroom.image}
                alt={showroom.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Showroom Info */}
            <div className="p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <h3 className="text-xl font-serif-title font-bold text-[#C8232A]">
                  {showroom.name}
                </h3>

                <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#C8232A] shrink-0 mt-0.5" />
                    <span>{showroom.address}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#C8232A] shrink-0" />
                    <span className="font-semibold text-gray-800">{showroom.phone}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{showroom.timing}</span>
                  </div>
                </div>
              </div>

              <div>
                <a
                  href={showroom.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-[#C8232A] text-white font-semibold text-xs py-2.5 px-4 rounded-lg transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions on Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
