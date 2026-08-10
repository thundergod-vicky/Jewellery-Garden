"use client";

import React from "react";
import { RefreshCw, Calendar, Coins, Gift } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: <RefreshCw className="w-6 h-6 text-[#C8232A]" />,
      title: "Old Gold Exchange Plan",
      desc: "0% Deduction on old gold exchange at current market gold rates.",
      link: "#exchange",
    },
    {
      icon: <Calendar className="w-6 h-6 text-[#D4AF37]" />,
      title: "Flexi Monthly Savings Plan",
      desc: "Pay 10 monthly installments, get the 11th installment free from Jewellery Garden.",
      link: "#flexi",
    },
    {
      icon: <Coins className="w-6 h-6 text-[#C8232A]" />,
      title: "myDigiGold & myDigiSilver",
      desc: "Start digital gold & silver investments starting at just ₹100.",
      link: "#digigold",
    },
    {
      icon: <Gift className="w-6 h-6 text-[#D4AF37]" />,
      title: "Instant Digital Gift Cards",
      desc: "Gift your loved ones freedom of choice for weddings and anniversaries.",
      link: "#giftcards",
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-8 max-w-[1440px] mx-auto bg-[#FAF8F5] border-y border-[#E8E3DA]">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#1A1A1A]">
          Benefits Crafted For You
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Exclusive customer schemes, digital gold plans, and instant gift cards.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((srv, idx) => (
          <a
            key={idx}
            href={srv.link}
            className="bg-white p-5 rounded-xl border border-[#E8E3DA] shadow-luxury shadow-luxury-hover transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] flex items-center justify-center border border-[#E8E3DA]">
                {srv.icon}
              </div>
              <h3 className="font-semibold text-sm text-[#1A1A1A]">
                {srv.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed font-light">
                {srv.desc}
              </p>
            </div>
            <div className="pt-4 text-xs font-semibold text-[#C8232A] flex items-center gap-1">
              <span>Know More</span>
              <span>→</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
