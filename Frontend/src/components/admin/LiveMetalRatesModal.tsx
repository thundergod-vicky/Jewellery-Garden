"use client";

import React, { useState, useEffect } from "react";
import { X, Coins, Check, RefreshCw } from "lucide-react";

interface LiveMetalRatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark?: boolean;
}

export default function LiveMetalRatesModal({
  isOpen,
  onClose,
  isDark = false,
}: LiveMetalRatesModalProps) {
  const [rate24K, setRate24K] = useState("7650");
  const [rate22K, setRate22K] = useState("7015");
  const [rate18K, setRate18K] = useState("5740");
  const [rateSilver, setRateSilver] = useState("88");
  const [autoRateUpdate, setAutoRateUpdate] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const s24K = localStorage.getItem("admin_rate_24k");
      if (s24K) setRate24K(s24K);

      const s22K = localStorage.getItem("admin_rate_22k");
      if (s22K) setRate22K(s22K);

      const s18K = localStorage.getItem("admin_rate_18k");
      if (s18K) setRate18K(s18K);

      const sSil = localStorage.getItem("admin_rate_silver");
      if (sSil) setRateSilver(sSil);

      const sAuto = localStorage.getItem("admin_auto_rate_update");
      if (sAuto !== null) setAutoRateUpdate(sAuto === "true");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    if (typeof window !== "undefined") {
      localStorage.setItem("admin_rate_24k", rate24K);
      localStorage.setItem("admin_rate_22k", rate22K);
      localStorage.setItem("admin_rate_18k", rate18K);
      localStorage.setItem("admin_rate_silver", rateSilver);
      localStorage.setItem("admin_auto_rate_update", String(autoRateUpdate));
      localStorage.setItem("admin_rate_last_updated", new Date().toISOString());

      // Trigger custom event so navbar button & settings page update instantly
      window.dispatchEvent(new Event("metalRatesUpdated"));
    }

    setTimeout(() => {
      setIsSaving(false);
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        onClose();
      }, 1000);
    }, 400);
  };

  return (
    <div className="fixed inset-0 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 z-[999] animate-in fade-in">
      <div
        className={`w-full max-w-xl rounded-[28px] p-6 border shadow-2xl space-y-5 transition-all ${
          isDark
            ? "bg-[#16181D] text-white border-gray-800"
            : "bg-white text-gray-900 border-gray-200"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center ring-1 ring-amber-500/30 shrink-0">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base flex items-center gap-2">
                <span>Live Metal Rates & Pricing Rules</span>
                <span className="text-[9px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Daily Benchmark
                </span>
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Set daily benchmark rates per gram for Gold (24K, 22K, 18K) and 925 Sterling Silver.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* 24K Gold Rate */}
            <div className="space-y-1.5">
              <label className="font-semibold text-gray-700 dark:text-gray-300">
                24KT Pure Gold Rate (₹/g)
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-gray-400 font-bold text-xs">₹</span>
                <input
                  type="number"
                  required
                  value={rate24K}
                  onChange={(e) => setRate24K(e.target.value)}
                  className="w-full pl-8 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-[#1E222A] text-xs font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>
            </div>

            {/* 22K Gold Rate */}
            <div className="space-y-1.5">
              <label className="font-semibold text-gray-700 dark:text-gray-300">
                22KT Jewellery Gold Rate (₹/g)
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-gray-400 font-bold text-xs">₹</span>
                <input
                  type="number"
                  required
                  value={rate22K}
                  onChange={(e) => setRate22K(e.target.value)}
                  className="w-full pl-8 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-[#1E222A] text-xs font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>
            </div>

            {/* 18K Gold Rate */}
            <div className="space-y-1.5">
              <label className="font-semibold text-gray-700 dark:text-gray-300">
                18KT Diamond Gold Rate (₹/g)
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-gray-400 font-bold text-xs">₹</span>
                <input
                  type="number"
                  required
                  value={rate18K}
                  onChange={(e) => setRate18K(e.target.value)}
                  className="w-full pl-8 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-[#1E222A] text-xs font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>
            </div>

            {/* 925 Silver Rate */}
            <div className="space-y-1.5">
              <label className="font-semibold text-gray-700 dark:text-gray-300">
                925 Sterling Silver Rate (₹/g)
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-gray-400 font-bold text-xs">₹</span>
                <input
                  type="number"
                  required
                  value={rateSilver}
                  onChange={(e) => setRateSilver(e.target.value)}
                  className="w-full pl-8 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-[#1E222A] text-xs font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>
            </div>
          </div>

          {/* Auto-Update Banner Checkbox */}
          <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-[#1E222A] border border-gray-200 dark:border-gray-700/80 flex items-start gap-3">
            <input
              type="checkbox"
              id="autoRateModal"
              checked={autoRateUpdate}
              onChange={(e) => setAutoRateUpdate(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-[#C8232A] focus:ring-[#C8232A] accent-[#C8232A] cursor-pointer"
            />
            <label htmlFor="autoRateModal" className="text-xs cursor-pointer select-none">
              <span className="font-bold text-gray-900 dark:text-white block">
                Auto-Update Product Prices from Benchmark Rates
              </span>
              <span className="text-[11px] text-gray-500 dark:text-gray-400">
                Dynamically recalculate gold & silver jewellery prices storefront-wide when rates change.
              </span>
            </label>
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex items-center justify-between border-t border-gray-100 dark:border-gray-800">
            <span className="text-[10px] text-gray-400 font-mono">
              Updated in real-time across storefront
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-md flex items-center gap-2 transition-all cursor-pointer ${
                  savedSuccess
                    ? "bg-emerald-600"
                    : "bg-[#C8232A] hover:bg-[#B01E24]"
                }`}
              >
                {isSaving ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : savedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Save All Settings</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
