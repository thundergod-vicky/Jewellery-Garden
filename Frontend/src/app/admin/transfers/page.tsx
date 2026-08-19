"use client";

import React, { useState } from "react";
import {
  ArrowRightLeft,
  Plus,
  Building,
  Package,
  Calendar,
  CheckCircle2,
  Clock,
  X,
  Truck,
} from "lucide-react";
import toast from "react-hot-toast";

interface Transfer {
  id: string;
  source: string;
  destination: string;
  itemsCount: number;
  totalWeightGram: number;
  requestedBy: string;
  date: string;
  status: "IN_TRANSIT" | "DELIVERED" | "PENDING_APPROVAL";
}

const INITIAL_TRANSFERS: Transfer[] = [];

export default function AdminTransfersPage() {
  const [transfers, setTransfers] = useState<Transfer[]>(INITIAL_TRANSFERS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [source, setSource] = useState("Durgapur Central Vault");
  const [destination, setDestination] = useState("Benachity Showroom");
  const [itemsCount, setItemsCount] = useState(5);
  const [totalWeightGram, setTotalWeightGram] = useState(50);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newTr: Transfer = {
      id: `TR-${Math.floor(9000 + Math.random() * 1000)}`,
      source,
      destination,
      itemsCount: Number(itemsCount),
      totalWeightGram: Number(totalWeightGram),
      requestedBy: "Master Admin",
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      status: "IN_TRANSIT",
    };

    setTransfers((prev) => [newTr, ...prev]);
    toast.success("Stock transfer dispatch logged!");
    setIsModalOpen(false);
  };

  const updateStatus = (id: string, newStatus: "IN_TRANSIT" | "DELIVERED" | "PENDING_APPROVAL") => {
    setTransfers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
    toast.success(`Transfer status updated to ${newStatus}`);
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto flex flex-col gap-6 text-left">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-2xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Inventory Transfers & Vault Stock Movement
            </h1>
            <span className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800/50">
              {transfers.filter((t) => t.status === "IN_TRANSIT").length} In Transit
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Track inter-showroom gold and silver inventory transfers, weight ledgers, and transit dispatches.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-[#C8232A] hover:bg-[#A81B21] text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Request Stock Transfer
        </button>
      </div>

      {/* Transfers Ledger Table */}
      <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#EAEFF5] dark:border-gray-800 font-bold text-xs text-gray-900 dark:text-white">
          STOCK MOVEMENT LEDGER
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAFBFD] dark:bg-[#16181C] border-b border-[#EAEFF5] dark:border-gray-800 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                <th className="py-3.5 px-5">TRANSFER ID</th>
                <th className="py-3.5 px-5">SOURCE -&gt; DESTINATION</th>
                <th className="py-3.5 px-5">ITEMS & WEIGHT</th>
                <th className="py-3.5 px-5">REQUESTED BY</th>
                <th className="py-3.5 px-5">DATE</th>
                <th className="py-3.5 px-5 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEFF5] dark:divide-gray-800/60">
              {transfers.map((tr) => (
                <tr key={tr.id} className="hover:bg-[#FAFBFD] dark:hover:bg-[#16181C]/50 transition-colors">
                  <td className="py-4 px-5 font-mono font-bold text-gray-900 dark:text-white">{tr.id}</td>

                  <td className="py-4 px-5 font-semibold text-gray-800 dark:text-gray-200">
                    <div className="flex items-center gap-2">
                      <span>{tr.source}</span>
                      <span className="text-gray-400">➔</span>
                      <span className="text-[#C8232A]">{tr.destination}</span>
                    </div>
                  </td>

                  <td className="py-4 px-5 text-gray-700 dark:text-gray-300">
                    <span className="font-bold text-gray-900 dark:text-white">{tr.itemsCount} Pieces</span>
                    <span className="text-gray-400"> ({tr.totalWeightGram}g Gold)</span>
                  </td>

                  <td className="py-4 px-5 text-gray-500">{tr.requestedBy}</td>
                  <td className="py-4 px-5 text-gray-500 font-mono text-[11px]">{tr.date}</td>

                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() =>
                        updateStatus(
                          tr.id,
                          tr.status === "IN_TRANSIT"
                            ? "DELIVERED"
                            : tr.status === "PENDING_APPROVAL"
                            ? "IN_TRANSIT"
                            : "DELIVERED"
                        )
                      }
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full cursor-pointer transition-all ${
                        tr.status === "DELIVERED"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border border-emerald-200"
                          : tr.status === "IN_TRANSIT"
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border border-blue-200"
                          : "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border border-amber-200"
                      }`}
                    >
                      {tr.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-2xl p-6 w-full max-w-[480px] shadow-2xl text-left flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm">Request Inventory Transfer</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-700 dark:hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-700 dark:text-gray-300">Source Vault / Branch</label>
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="px-3.5 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-gray-900 dark:text-white focus:outline-none"
                >
                  <option value="Durgapur Central Vault">Durgapur Central Vault</option>
                  <option value="Kolkata Hub Vault">Kolkata Hub Vault</option>
                  <option value="Benachity Showroom">Benachity Showroom</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-700 dark:text-gray-300">Destination Showroom</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="px-3.5 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-gray-900 dark:text-white focus:outline-none"
                >
                  <option value="Benachity Showroom">Benachity Showroom</option>
                  <option value="City Centre Boutique">City Centre Boutique</option>
                  <option value="Park Street Showroom">Park Street Showroom</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300">Total Pieces</label>
                  <input
                    type="number"
                    value={itemsCount}
                    onChange={(e) => setItemsCount(Number(e.target.value))}
                    className="px-3.5 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-gray-900 dark:text-white focus:outline-none"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300">Total Gold Weight (g)</label>
                  <input
                    type="number"
                    value={totalWeightGram}
                    onChange={(e) => setTotalWeightGram(Number(e.target.value))}
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
                  Dispatch Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
