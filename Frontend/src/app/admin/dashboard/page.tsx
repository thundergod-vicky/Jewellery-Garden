"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  TrendingUp,
  Search,
  ChevronDown,
  Download,
  MoreHorizontal,
  X,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [selectedMonth, setSelectedMonth] = useState("Month");

  // Recent Transactions Data
  const transactions = [
    {
      id: "TK-98421",
      productName: "Splendid Flower Diamond Nose Pin",
      subtext: "18KT Gold, Certified Solitaire",
      image: "/images/gifts/birthday.png",
      date: "19 Nov 2025",
      time: "10:32 AM",
      customer: "Ethan Clarke",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      price: "₹12,796",
      status: "Completed",
      statusType: "completed",
    },
    {
      id: "TK-98422",
      productName: "Crescent Wave 22KT Gold Ring",
      subtext: "22KT 916 BIS Hallmarked",
      image: "/images/gifts/engagement.png",
      date: "19 Nov 2025",
      time: "11:05 AM",
      customer: "Ava Mitchell",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80",
      price: "₹12,521",
      status: "Cancelled",
      statusType: "cancelled",
    },
    {
      id: "TK-98423",
      productName: "Handcrafted 925 Sterling Silver Bangle",
      subtext: "925 Gossip Silver",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
      date: "19 Nov 2025",
      time: "11:44 AM",
      customer: "Liam Parker",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      price: "₹4,850",
      status: "Pending",
      statusType: "pending",
    },
    {
      id: "TK-98424",
      productName: "Royal Peacock 22KT Gold Jhumka",
      subtext: "22KT BIS Hallmarked",
      image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80",
      date: "19 Nov 2025",
      time: "12:10 PM",
      customer: "Sophia Hayes",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
      price: "₹34,800",
      status: "Completed",
      statusType: "completed",
    },
    {
      id: "TK-98425",
      productName: "Bengali Traditional Sitahar Gold Necklace",
      subtext: "22KT Heavy Bridal Gold",
      image: "/images/gifts/wedding.png",
      date: "19 Nov 2025",
      time: "12:40 PM",
      customer: "Noah Bennett",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
      price: "₹89,500",
      status: "Completed",
      statusType: "completed",
    },
  ];

  return (
    <div className="space-y-6 max-w-[1440px] mx-auto animate-in fade-in duration-300 text-[#1A1C1E] pb-8">
      
      {/* Top Grid: Total Profit Overview (Left) + Sales Performance Gauge (Right) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Widget 1: Total Profit Overview (2 Columns Wide) */}
        <div className="xl:col-span-2 bg-gradient-to-br from-[#FFF5F2] via-[#F5F8FF] to-[#E8F6F3] border border-white/80 rounded-[28px] p-6 shadow-sm flex flex-col justify-between space-y-6">
          
          {/* Card Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white/80 flex items-center justify-center shadow-2xs">
                <TrendingUp className="w-4 h-4 text-[#1A1C1E]" />
              </div>
              <h3 className="font-serif-title font-bold text-base text-gray-900">
                Total Profit Overview
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 bg-white/80 hover:bg-white text-xs font-semibold px-3 py-1.5 rounded-full border border-gray-200 shadow-2xs">
                <span>{selectedMonth}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>
              <button className="p-1.5 rounded-full bg-white/80 hover:bg-white text-gray-600 border border-gray-200">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Hero Big Metric */}
          <div className="space-y-1">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-title text-[#1A1C1E]">
              ₹ 1,36,821
            </h2>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#12B76A] font-bold flex items-center gap-0.5">
                <ArrowUpRight className="w-4 h-4" /> +₹10,250
              </span>
              <span className="text-gray-400 font-medium">Compare to last month</span>
            </div>
          </div>

          {/* Bar Chart Visual Container */}
          <div className="relative pt-12 pb-2">
            
            {/* Floating Carbon Active Tooltip Card (Aligned over Apr Bar) */}
            <div className="absolute top-0 left-[50%] -translate-x-1/2 bg-[#1A1C1E] text-white p-3 rounded-2xl shadow-xl z-20 w-36 border border-gray-800 text-[11px] space-y-1">
              <div className="flex items-center justify-between text-gray-400 font-mono text-[10px]">
                <span>Apr 2026</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> 22KT Gold
                </span>
                <span className="font-bold">₹75.5k</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-amber-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> 925 Silver
                </span>
                <span className="font-bold">₹24.4k</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-blue-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Diamond
                </span>
                <span className="font-bold">₹36.8k</span>
              </div>
            </div>

            {/* Bar Columns Grid */}
            <div className="grid grid-cols-7 gap-3 items-end h-40 border-b border-gray-200/60 pb-3">
              
              {/* Jan */}
              <div className="flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] font-bold text-[#12B76A] bg-[#E3F9ED] px-2 py-0.5 rounded-full">
                  +8%
                </span>
                <div className="w-full bg-white/70 rounded-2xl h-24 border border-white/80" />
                <span className="text-xs text-gray-400 font-medium">Jan</span>
              </div>

              {/* Feb */}
              <div className="flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] font-bold text-[#F04438] bg-[#FEE4E2] px-2 py-0.5 rounded-full">
                  -5%
                </span>
                <div className="w-full bg-white/70 rounded-2xl h-14 border border-white/80" />
                <span className="text-xs text-gray-400 font-medium">Feb</span>
              </div>

              {/* Mar */}
              <div className="flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] font-bold text-[#12B76A] bg-[#E3F9ED] px-2 py-0.5 rounded-full">
                  +3%
                </span>
                <div className="w-full bg-white/70 rounded-2xl h-28 border border-white/80" />
                <span className="text-xs text-gray-400 font-medium">Mar</span>
              </div>

              {/* Apr (Active Carbon Pillar) */}
              <div className="flex flex-col items-center gap-2 h-full justify-end">
                <div className="w-full bg-[#1A1C1E] rounded-2xl h-32 border border-black shadow-lg relative overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-white/10" />
                </div>
                <span className="text-xs text-gray-900 font-bold">Apr</span>
              </div>

              {/* May */}
              <div className="flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] font-bold text-[#F04438] bg-[#FEE4E2] px-2 py-0.5 rounded-full">
                  -10%
                </span>
                <div className="w-full bg-white/70 rounded-2xl h-16 border border-white/80" />
                <span className="text-xs text-gray-400 font-medium">May</span>
              </div>

              {/* Jun */}
              <div className="flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] font-bold text-[#12B76A] bg-[#E3F9ED] px-2 py-0.5 rounded-full">
                  +5%
                </span>
                <div className="w-full bg-white/70 rounded-2xl h-32 border border-white/80" />
                <span className="text-xs text-gray-400 font-medium">Jun</span>
              </div>

              {/* Jul */}
              <div className="flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] font-bold text-[#12B76A] bg-[#E3F9ED] px-2 py-0.5 rounded-full">
                  +3%
                </span>
                <div className="w-full bg-white/70 rounded-2xl h-28 border border-white/80" />
                <span className="text-xs text-gray-400 font-medium">Jul</span>
              </div>

            </div>

          </div>

        </div>

        {/* Widget 2: Sales Performance Radial Gauge Chart (1 Column) */}
        <div className="bg-white border border-[#EBEFF5] rounded-[28px] p-6 shadow-sm flex flex-col justify-between space-y-6">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#12B76A]" />
              <h3 className="font-serif-title font-bold text-base text-gray-900">
                Sales Performance
              </h3>
            </div>
            <button className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Radial Arc Gauge Chart Container (Spacious layout, no clipping) */}
          <div className="relative flex flex-col items-center justify-center pt-4 pb-2">
            <div className="relative w-44 h-24 flex items-end justify-center overflow-hidden">
              {/* Semi circle radial arcs */}
              <div className="w-44 h-44 rounded-full border-[18px] border-emerald-500 border-b-transparent border-l-transparent -rotate-45 flex items-center justify-center">
                <div className="rotate-45 text-center pt-8">
                  <span className="text-3xl font-bold text-gray-900 font-serif-title block">80%</span>
                  <p className="text-[11px] text-gray-400 font-medium">Sales Goal</p>
                </div>
              </div>
            </div>
          </div>

          {/* Numbers Grid */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            <div>
              <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium mb-1">
                <span>Sales Number</span>
                <span className="bg-[#E3F9ED] text-[#12B76A] font-bold px-1.5 py-0.5 rounded-full text-[9px]">
                  +6%
                </span>
              </div>
              <h4 className="text-xl font-bold text-gray-900">1,660</h4>
            </div>

            <div>
              <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium mb-1">
                <span>Total Revenue</span>
                <span className="bg-[#FEE4E2] text-[#F04438] font-bold px-1.5 py-0.5 rounded-full text-[9px]">
                  -2%
                </span>
              </div>
              <h4 className="text-xl font-bold text-gray-900">₹92,120</h4>
            </div>
          </div>

          {/* Bottom Dark Notification Strip */}
          <div className="bg-[#1A1C1E] text-white p-3 rounded-2xl flex items-center justify-between text-xs shadow-md">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="font-medium text-[11px]">Your daily customer has increased</span>
            </div>
            <button className="text-gray-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* Bottom Grid: Recent Transactions Table (Left 2 Col) + Top Market & Product (Right 1 Col) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Widget 3: Recent Transactions Data Table */}
        <div className="xl:col-span-2 bg-white border border-[#EBEFF5] rounded-[28px] p-6 shadow-sm space-y-5">
          
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h3 className="font-serif-title font-bold text-base text-gray-900">
              Recent Transaction
            </h3>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-48">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full text-xs pl-8 pr-3 py-1.5 bg-[#EEF1F5] rounded-full focus:outline-none"
                />
              </div>

              <button className="bg-[#1A1C1E] hover:bg-black text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-sm transition-all shrink-0">
                <Download className="w-3.5 h-3.5" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Clean Table View with Explicit Column Widths */}
          <div className="overflow-x-auto min-w-full">
            <table className="w-full text-left text-xs border-collapse min-w-[640px]">
              <thead>
                <tr className="text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  <th className="pb-3 w-[15%]">Order ID</th>
                  <th className="pb-3 w-[35%]">Product Name</th>
                  <th className="pb-3 w-[20%]">Date & Time</th>
                  <th className="pb-3 w-[18%]">Customer</th>
                  <th className="pb-3 w-[12%]">Price</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-4 font-bold font-mono text-gray-900">{tx.id}</td>
                    
                    <td className="py-4 pr-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                          <Image
                            src={tx.image}
                            alt={tx.productName}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="overflow-hidden">
                          <p className="font-bold text-gray-900 truncate text-xs">{tx.productName}</p>
                          <span className="text-[10px] text-gray-400 font-medium block truncate">{tx.subtext}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 text-gray-500 font-medium text-[11px]">
                      <div>{tx.date}</div>
                      <div className="text-[10px] text-gray-400">{tx.time}</div>
                    </td>

                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <Image
                          src={tx.avatar}
                          alt={tx.customer}
                          width={24}
                          height={24}
                          className="rounded-full object-cover"
                          unoptimized
                        />
                        <span className="font-semibold text-gray-800 text-xs truncate">{tx.customer}</span>
                      </div>
                    </td>

                    <td className="py-4 font-bold text-gray-900 text-xs">{tx.price}</td>

                    <td className="py-4 text-right">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold ${
                          tx.statusType === "completed"
                            ? "bg-[#E3F9ED] text-[#12B76A]"
                            : tx.statusType === "cancelled"
                            ? "bg-[#FEE4E2] text-[#F04438]"
                            : "bg-[#E0F2FE] text-[#0284C7]"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        {/* Widget 4: Top Market & Top Product Stack */}
        <div className="space-y-6">
          
          {/* Top Market Card */}
          <div className="bg-white border border-[#EBEFF5] rounded-[28px] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-title font-bold text-base text-gray-900">
                Top Market
              </h3>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50/80 border border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-base">🇮🇳</span>
                  <span className="font-semibold text-gray-800">Durgapur Bazar</span>
                </div>
                <div className="flex items-center gap-2 font-bold">
                  <span>₹62,100</span>
                  <span className="bg-[#E3F9ED] text-[#12B76A] text-[10px] px-2 py-0.5 rounded-full">
                    40%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50/80 border border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-base">🇮🇳</span>
                  <span className="font-semibold text-gray-800">City Centre</span>
                </div>
                <div className="flex items-center gap-2 font-bold">
                  <span>₹24,500</span>
                  <span className="bg-[#E3F9ED] text-[#12B76A] text-[10px] px-2 py-0.5 rounded-full">
                    25%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50/80 border border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-base">🇮🇳</span>
                  <span className="font-semibold text-gray-800">Online Direct</span>
                </div>
                <div className="flex items-center gap-2 font-bold">
                  <span>₹15,500</span>
                  <span className="bg-[#E3F9ED] text-[#12B76A] text-[10px] px-2 py-0.5 rounded-full">
                    10%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Product Preview Card */}
          <div className="bg-gradient-to-br from-[#E6F5F0] to-[#E8EEF5] border border-white/80 rounded-[28px] p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-title font-bold text-sm text-gray-900">
                Top Bestselling Product
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-[#1A1C1E] p-2 relative shadow-md overflow-hidden shrink-0">
                <Image
                  src="/images/gifts/wedding.png"
                  alt="Top Product"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-xs text-gray-900">Bengali Sitahar Gold Necklace</h4>
                <p className="text-[10px] text-gray-500 font-medium">10K sales • +17% growth</p>
                <span className="inline-block bg-[#12B76A] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                  #1 Bestseller
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
