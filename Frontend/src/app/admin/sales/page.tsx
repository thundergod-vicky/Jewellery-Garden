"use client";

import React, { useState } from "react";
import {
  Tag,
  Plus,
  Percent,
  Calendar,
  Sparkles,
  CheckCircle2,
  X,
  Trash2,
  Edit,
  Flame,
} from "lucide-react";
import toast from "react-hot-toast";

interface Campaign {
  id: string;
  name: string;
  code: string;
  discount: string;
  startDate: string;
  endDate: string;
  redemptions: number;
  status: "ACTIVE" | "SCHEDULED" | "EXPIRED";
}

const INITIAL_CAMPAIGNS: Campaign[] = [];

export default function AdminSalesPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("10% OFF");
  const [startDate, setStartDate] = useState("2026-09-01");
  const [endDate, setEndDate] = useState("2026-09-30");

  const openAddModal = () => {
    setName("");
    setCode("");
    setDiscount("10% OFF");
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !code.trim()) {
      toast.error("Please enter campaign name and coupon code.");
      return;
    }

    const newCamp: Campaign = {
      id: `camp-${Date.now()}`,
      name,
      code: code.toUpperCase(),
      discount,
      startDate,
      endDate,
      redemptions: 0,
      status: "ACTIVE",
    };

    setCampaigns((prev) => [newCamp, ...prev]);
    toast.success("Sales campaign launched!");
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to end this campaign?")) return;
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
    toast.success("Campaign removed.");
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto flex flex-col gap-6 text-left">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-2xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Promotions & Flash Sale Manager
            </h1>
            <span className="bg-red-50 text-[#C8232A] dark:bg-red-900/30 dark:text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-200 dark:border-red-800/50 flex items-center gap-1">
              <Flame className="w-3 h-3 text-[#C8232A]" />
              {campaigns.filter((c) => c.status === "ACTIVE").length} Active Sales
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Create promotional coupon codes, festive making-charge discounts, and seasonal campaign banners.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-[#C8232A] hover:bg-[#A81B21] text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Create Campaign
        </button>
      </div>

      {/* Grid of Campaigns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {campaigns.map((camp) => (
          <div
            key={camp.id}
            className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between gap-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    camp.status === "ACTIVE"
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border border-emerald-200"
                      : camp.status === "SCHEDULED"
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border border-blue-200"
                      : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                  {camp.status}
                </span>

                <span className="font-mono text-xs font-bold text-[#C8232A] bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded border border-red-100 dark:border-red-900/30">
                  {camp.code}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-sm text-gray-900 dark:text-white line-clamp-2">
                  {camp.name}
                </h3>
                <div className="text-lg font-extrabold text-gray-900 dark:text-white mt-1">
                  {camp.discount}
                </div>
              </div>

              <div className="text-[11px] text-gray-500 dark:text-gray-400 space-y-1 pt-2 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>{camp.startDate} - {camp.endDate}</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{camp.redemptions} Redemptions</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-end">
              <button
                onClick={() => handleDelete(camp.id)}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                title="Delete Campaign"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-2xl p-6 w-full max-w-[480px] shadow-2xl text-left flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm">Create New Sales Campaign</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-700 dark:hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-700 dark:text-gray-300">Campaign Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Diwali Making Charge Offer"
                  className="px-3.5 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-gray-900 dark:text-white focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300">Coupon Code</label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="e.g. FESTIVE20"
                    className="px-3.5 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-gray-900 dark:text-white focus:outline-none uppercase font-mono"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300">Discount Value</label>
                  <input
                    type="text"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    placeholder="e.g. 15% OFF"
                    className="px-3.5 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-gray-900 dark:text-white focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C8232A] text-white text-xs font-semibold rounded-xl hover:bg-[#A81B21]"
                >
                  Launch Sale
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
