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

interface MonthData {
  month: string;
  leftPercent: string;
  change: string;
  status: "up" | "down" | "neutral";
  gold: string;
  silver: string;
  diamond: string;
  barHeight: string;
}

export default function AdminDashboardPage() {
  const [selectedMonth, setSelectedMonth] = useState("Month");
  const [activeHoverMonth, setActiveHoverMonth] = useState<string | null>(null);

  // Clean 3-Color Logic: UP (Green), DOWN (Red), NEUTRAL (White)
  const monthChartData: Record<string, MonthData> = {
    Jan: { month: "Jan", leftPercent: "7%", change: "+8%", status: "up", gold: "₹62.0k", silver: "₹18.2k", diamond: "₹25.0k", barHeight: "h-20" },
    Feb: { month: "Feb", leftPercent: "21%", change: "-5%", status: "down", gold: "₹48.5k", silver: "₹14.0k", diamond: "₹20.1k", barHeight: "h-12" },
    Mar: { month: "Mar", leftPercent: "35%", change: "+3%", status: "up", gold: "₹71.2k", silver: "₹21.5k", diamond: "₹30.4k", barHeight: "h-24" },
    Apr: { month: "Apr", leftPercent: "49%", change: "+2%", status: "up", gold: "₹75.5k", silver: "₹24.4k", diamond: "₹36.8k", barHeight: "h-28" },
    May: { month: "May", leftPercent: "63%", change: "-10%", status: "down", gold: "₹42.0k", silver: "₹12.8k", diamond: "₹18.5k", barHeight: "h-14" },
    Jun: { month: "Jun", leftPercent: "77%", change: "+5%", status: "up", gold: "₹82.0k", silver: "₹26.1k", diamond: "₹40.2k", barHeight: "h-28" },
    Jul: { month: "Jul", leftPercent: "91%", change: "+3%", status: "up", gold: "₹69.4k", silver: "₹20.8k", diamond: "₹28.9k", barHeight: "h-24" },
  };

  const currentHoverData = activeHoverMonth ? monthChartData[activeHoverMonth] : null;

  // Recent Transactions Data
  const transactions = [
    {
      id: "TK-98421",
      productName: "Splendid Flower Diamond Nose Pin",
      subtext: "18KT Gold Solitaire",
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
      subtext: "22KT 916 BIS Hallmark",
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
    <div className="space-y-5 max-w-[1440px] mx-auto animate-in fade-in duration-300 font-sans text-[#1A1C1E] pb-6">
      
      {/* Top Grid: Total Profit Overview (Left 2 Col) + Sales Performance Gauge (Right 1 Col) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        
        {/* Widget 1: Total Profit Overview (3-Color Up/Down/Neutral Logic) */}
        <div className="xl:col-span-2 bg-gradient-to-br from-[#FFF5F2] via-[#F5F8FF] to-[#E8F6F3] border border-white/80 rounded-[28px] p-5 shadow-sm flex flex-col justify-between space-y-4">
          
          {/* Card Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-white/90 flex items-center justify-center shadow-2xs">
                <TrendingUp className="w-3.5 h-3.5 text-[#1A1C1E]" />
              </div>
              <h3 className="font-bold text-sm text-gray-900">
                Total Profit Overview
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 bg-white/90 hover:bg-white text-[11px] font-semibold px-2.5 py-1 rounded-full border border-gray-200 shadow-2xs">
                <span>{selectedMonth}</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>
              <button className="p-1 rounded-full bg-white/90 hover:bg-white text-gray-600 border border-gray-200">
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Hero Big Metric */}
          <div className="space-y-0.5">
            <h2 className="text-3xl font-extrabold text-[#1A1C1E] tracking-tight">
              ₹ 1,36,821
            </h2>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-[#12B76A] font-bold flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" /> +₹10,250
              </span>
              <span className="text-gray-400 font-medium">Compare to last month</span>
            </div>
          </div>

          {/* Hover-based Bar Chart with 3-Color Logic */}
          <div
            onMouseLeave={() => setActiveHoverMonth(null)}
            className="relative pt-12"
          >
            
            {/* Carbon Tooltip Card (Appears ONLY when hovered) */}
            {currentHoverData && (
              <div
                style={{ left: currentHoverData.leftPercent }}
                className="absolute top-0 -translate-x-1/2 bg-[#1A1C1E] text-white p-2.5 rounded-2xl shadow-xl z-20 w-36 border border-gray-800 text-[10px] space-y-1 transition-all duration-200 pointer-events-none animate-in fade-in zoom-in-95"
              >
                <div className="flex items-center justify-between text-gray-400 font-mono text-[9px]">
                  <span>{currentHoverData.month} 2026</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> 22KT Gold
                  </span>
                  <span className="font-bold">{currentHoverData.gold}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-amber-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> 925 Silver
                  </span>
                  <span className="font-bold">{currentHoverData.silver}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-blue-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Diamond
                  </span>
                  <span className="font-bold">{currentHoverData.diamond}</span>
                </div>
              </div>
            )}

            {/* 3-Color Bar Columns Grid: UP (Green), DOWN (Red), HOVER (Carbon Dark) */}
            <div className="grid grid-cols-7 gap-3 items-end h-32 border-b border-gray-200/80 pb-2">
              {Object.keys(monthChartData).map((mKey) => {
                const item = monthChartData[mKey];
                const isHovered = activeHoverMonth === mKey;

                // Determine 3-color column style
                let colStyle = "bg-white/80 border-white text-gray-400";
                if (isHovered) {
                  colStyle = "bg-[#1A1C1E] border-black shadow-md text-white scale-105";
                } else if (item.status === "up") {
                  colStyle = "bg-[#E3F9ED] border-[#12B76A]/30 text-[#12B76A]";
                } else if (item.status === "down") {
                  colStyle = "bg-[#FEE4E2] border-[#F04438]/30 text-[#F04438]";
                }

                return (
                  <div
                    key={mKey}
                    onMouseEnter={() => setActiveHoverMonth(mKey)}
                    className="flex flex-col items-center gap-1.5 h-full justify-end cursor-pointer group"
                  >
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full transition-all ${
                        item.status === "up"
                          ? "bg-[#E3F9ED] text-[#12B76A]"
                          : item.status === "down"
                          ? "bg-[#FEE4E2] text-[#F04438]"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {item.change}
                    </span>

                    {/* Column Bar */}
                    <div
                      className={`w-full rounded-xl transition-all duration-200 border ${item.barHeight} ${colStyle}`}
                    />

                    <span
                      className={`text-[11px] font-medium transition-colors ${
                        isHovered ? "text-gray-900 font-bold" : "text-gray-400"
                      }`}
                    >
                      {mKey}
                    </span>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

        {/* Widget 2: Sales Performance SVG Arc Gauge */}
        <div className="bg-white border border-[#EBEFF5] rounded-[28px] p-5 shadow-sm flex flex-col justify-between space-y-4">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#12B76A]" />
              <h3 className="font-bold text-sm text-gray-900">
                Sales Performance
              </h3>
            </div>
            <button className="p-1 rounded-full hover:bg-gray-100 text-gray-400">
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* SVG Arc Meter */}
          <div className="flex flex-col items-center justify-center py-1 relative">
            <svg viewBox="0 0 200 110" className="w-40 h-24 overflow-visible">
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="#EAEFF5"
                strokeWidth="18"
                strokeLinecap="round"
              />
              <path
                d="M 20 100 A 80 80 0 0 1 155 42"
                fill="none"
                stroke="#12B76A"
                strokeWidth="18"
                strokeLinecap="round"
              />
            </svg>
            <div className="text-center absolute bottom-1">
              <span className="text-2xl font-extrabold text-gray-900 block leading-tight">80%</span>
              <p className="text-[10px] text-gray-400 font-medium">Sales Goal</p>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
            <div>
              <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium mb-0.5">
                <span>Sales Number</span>
                <span className="bg-[#E3F9ED] text-[#12B76A] font-bold px-1 py-0.2 rounded-full text-[8px]">
                  +6%
                </span>
              </div>
              <h4 className="text-lg font-extrabold text-gray-900">1,660</h4>
            </div>

            <div>
              <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium mb-0.5">
                <span>Total Revenue</span>
                <span className="bg-[#FEE4E2] text-[#F04438] font-bold px-1 py-0.2 rounded-full text-[8px]">
                  -2%
                </span>
              </div>
              <h4 className="text-lg font-extrabold text-gray-900">₹92,120</h4>
            </div>
          </div>

          {/* Bottom Dark Notification Strip */}
          <div className="bg-[#1A1C1E] text-white p-2.5 rounded-xl flex items-center justify-between text-xs shadow-md">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
              <span className="font-medium text-[10px] truncate">Your daily customer has increased</span>
            </div>
            <button className="text-gray-400 hover:text-white shrink-0 ml-1">
              <X className="w-3 h-3" />
            </button>
          </div>

        </div>

      </div>

      {/* Bottom Grid: Recent Transactions Data Table + Top Market & Product */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        
        {/* Widget 3: Recent Transactions Data Table */}
        <div className="xl:col-span-2 bg-white border border-[#EBEFF5] rounded-[28px] p-5 shadow-sm space-y-4 overflow-hidden">
          
          {/* Header Controls */}
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-bold text-sm text-gray-900">
              Recent Transaction
            </h3>

            <div className="flex items-center gap-2">
              <div className="relative w-36 sm:w-44">
                <Search className="w-3 h-3 text-gray-400 absolute left-2.5 top-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full text-[10px] pl-7 pr-2.5 py-1 bg-[#EEF1F5] rounded-full focus:outline-none"
                />
              </div>

              <button className="bg-[#1A1C1E] hover:bg-black text-white text-[10px] font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm transition-all shrink-0">
                <Download className="w-3 h-3" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Clean Data Table */}
          <div className="w-full">
            <table className="w-full text-left text-[11px] border-collapse">
              <thead>
                <tr className="text-[9px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  <th className="pb-2.5 pr-2 w-[12%]">ORDER ID</th>
                  <th className="pb-2.5 pr-2 w-[42%]">PRODUCT NAME</th>
                  <th className="pb-2.5 pr-2 w-[22%]">DATE & TIME</th>
                  <th className="pb-2.5 pr-2 w-[14%]">CUSTOMER</th>
                  <th className="pb-2.5 text-right w-[10%]">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50/80 transition-colors">
                    
                    {/* Order ID */}
                    <td className="py-2.5 pr-2 font-bold font-mono text-gray-800 text-[10px]">
                      {tx.id}
                    </td>
                    
                    {/* Product Name & Subtext */}
                    <td className="py-2.5 pr-2">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <div className="relative w-7 h-7 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                          <Image
                            src={tx.image}
                            alt={tx.productName}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="overflow-hidden leading-tight">
                          <p className="font-semibold text-gray-900 text-[11px] truncate">{tx.productName}</p>
                          <span className="text-[9px] text-gray-400 block truncate">{tx.subtext}</span>
                        </div>
                      </div>
                    </td>

                    {/* Date & Time */}
                    <td className="py-2.5 pr-2 text-gray-500 font-medium text-[10px] leading-tight">
                      <p>{tx.date}</p>
                      <span className="text-[9px] text-gray-400">{tx.time}</span>
                    </td>

                    {/* Customer */}
                    <td className="py-2.5 pr-2">
                      <div className="flex items-center gap-1.5 overflow-hidden">
                        <Image
                          src={tx.avatar}
                          alt={tx.customer}
                          width={20}
                          height={20}
                          className="rounded-full object-cover shrink-0"
                          unoptimized
                        />
                        <span className="font-semibold text-gray-800 text-[10px] truncate">{tx.customer}</span>
                      </div>
                    </td>

                    {/* Status Pill */}
                    <td className="py-2.5 text-right">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-semibold ${
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
        <div className="space-y-5">
          
          {/* Top Market Card */}
          <div className="bg-white border border-[#EBEFF5] rounded-[28px] p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-gray-900">
                Top Market
              </h3>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50/80 border border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-sm">🇮🇳</span>
                  <span className="font-semibold text-gray-800 text-[11px]">Durgapur Bazar</span>
                </div>
                <div className="flex items-center gap-1.5 font-bold text-[11px]">
                  <span>₹62,100</span>
                  <span className="bg-[#E3F9ED] text-[#12B76A] text-[9px] px-1.5 py-0.2 rounded-full">
                    40%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50/80 border border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-sm">🇮🇳</span>
                  <span className="font-semibold text-gray-800 text-[11px]">City Centre</span>
                </div>
                <div className="flex items-center gap-1.5 font-bold text-[11px]">
                  <span>₹24,500</span>
                  <span className="bg-[#E3F9ED] text-[#12B76A] text-[9px] px-1.5 py-0.2 rounded-full">
                    25%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50/80 border border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-sm">🇮🇳</span>
                  <span className="font-semibold text-gray-800 text-[11px]">Online Direct</span>
                </div>
                <div className="flex items-center gap-1.5 font-bold text-[11px]">
                  <span>₹15,500</span>
                  <span className="bg-[#E3F9ED] text-[#12B76A] text-[9px] px-1.5 py-0.2 rounded-full">
                    10%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Product Preview Card */}
          <div className="bg-gradient-to-br from-[#E6F5F0] to-[#E8EEF5] border border-white/80 rounded-[28px] p-4 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs text-gray-900">
                Top Bestselling Product
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-[#1A1C1E] p-1.5 relative shadow-md overflow-hidden shrink-0">
                <Image
                  src="/images/gifts/wedding.png"
                  alt="Top Product"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-[11px] text-gray-900">Bengali Sitahar Gold Necklace</h4>
                <p className="text-[9px] text-gray-500 font-medium">10K sales • +17% growth</p>
                <span className="inline-block bg-[#12B76A] text-white text-[8px] font-bold px-1.5 py-0.2 rounded-full">
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
