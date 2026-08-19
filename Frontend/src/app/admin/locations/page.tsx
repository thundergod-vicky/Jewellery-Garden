"use client";

import React, { useState } from "react";
import {
  MapPin,
  Plus,
  Phone,
  Clock,
  ExternalLink,
  Edit,
  Trash2,
  Building,
  CheckCircle2,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

interface Showroom {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  manager: string;
  hours: string;
  status: "Open" | "Coming Soon";
  googleMapsUrl: string;
}

const INITIAL_SHOWROOMS: Showroom[] = [];

export default function AdminLocationsPage() {
  const [showrooms, setShowrooms] = useState<Showroom[]>(INITIAL_SHOWROOMS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingShowroom, setEditingShowroom] = useState<Showroom | null>(null);

  // Form
  const [name, setName] = useState("");
  const [city, setCity] = useState("Durgapur");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [manager, setManager] = useState("");
  const [hours, setHours] = useState("10:30 AM - 8:30 PM (Mon-Sun)");
  const [status, setStatus] = useState<"Open" | "Coming Soon">("Open");

  const openAddModal = () => {
    setEditingShowroom(null);
    setName("");
    setCity("Durgapur");
    setAddress("");
    setPhone("");
    setManager("");
    setHours("10:30 AM - 8:30 PM (Mon-Sun)");
    setStatus("Open");
    setIsModalOpen(true);
  };

  const openEditModal = (loc: Showroom) => {
    setEditingShowroom(loc);
    setName(loc.name);
    setCity(loc.city);
    setAddress(loc.address);
    setPhone(loc.phone);
    setManager(loc.manager);
    setHours(loc.hours);
    setStatus(loc.status);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !address.trim()) {
      toast.error("Please enter showroom name and address.");
      return;
    }

    if (editingShowroom) {
      setShowrooms((prev) =>
        prev.map((s) =>
          s.id === editingShowroom.id
            ? { ...s, name, city, address, phone, manager, hours, status }
            : s
        )
      );
      toast.success("Showroom details updated!");
    } else {
      const newLoc: Showroom = {
        id: `loc-${Date.now()}`,
        name,
        city,
        address,
        phone,
        manager,
        hours,
        status,
        googleMapsUrl: `https://maps.google.com/?q=${encodeURIComponent(name)}`,
      };
      setShowrooms((prev) => [...prev, newLoc]);
      toast.success("New showroom added!");
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to remove this showroom?")) return;
    setShowrooms((prev) => prev.filter((s) => s.id !== id));
    toast.success("Showroom removed.");
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto flex flex-col gap-6 text-left">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-2xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Showroom & Retail Store Network
            </h1>
            <span className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800/50">
              {showrooms.length} Showrooms
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Manage flagship showrooms, branch operating hours, store manager contacts, and directions.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-[#C8232A] hover:bg-[#A81B21] text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Showroom
        </button>
      </div>

      {/* Grid of Showrooms */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {showrooms.map((loc) => (
          <div
            key={loc.id}
            className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between gap-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-900/20 text-[#C8232A] flex items-center justify-center shrink-0">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white">{loc.name}</h3>
                    <span className="text-[11px] text-gray-400 font-medium">{loc.city}, West Bengal</span>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    loc.status === "Open"
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border border-emerald-200"
                      : "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border border-amber-200"
                  }`}
                >
                  {loc.status}
                </span>
              </div>

              <div className="text-xs text-gray-600 dark:text-gray-300 flex items-start gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                <MapPin className="w-4 h-4 text-[#C8232A] shrink-0 mt-0.5" />
                <span>{loc.address}</span>
              </div>

              <div className="text-xs text-gray-600 dark:text-gray-300 flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <span>{loc.phone} (Mgr: {loc.manager})</span>
              </div>

              <div className="text-xs text-gray-600 dark:text-gray-300 flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-500 shrink-0" />
                <span>{loc.hours}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <a
                href={loc.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(loc)}
                  className="p-1.5 text-gray-500 hover:text-[#C8232A] hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                  title="Edit Showroom"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(loc.id)}
                  className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                  title="Delete Showroom"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-2xl p-6 w-full max-w-[500px] shadow-2xl text-left flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                {editingShowroom ? "Edit Showroom" : "Add New Showroom"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-700 dark:hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-700 dark:text-gray-300">Showroom Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Flagship Showroom — Benachity"
                  className="px-3.5 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-gray-900 dark:text-white focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="px-3.5 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-gray-900 dark:text-white focus:outline-none"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    className="px-3.5 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-gray-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-700 dark:text-gray-300">Full Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street, Landmark, Pincode"
                  className="px-3.5 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-gray-900 dark:text-white focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300">Manager Name</label>
                  <input
                    type="text"
                    value={manager}
                    onChange={(e) => setManager(e.target.value)}
                    placeholder="e.g. Subhashis Roy"
                    className="px-3.5 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-gray-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="px-3.5 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-gray-900 dark:text-white focus:outline-none"
                  >
                    <option value="Open">Open</option>
                    <option value="Coming Soon">Coming Soon</option>
                  </select>
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
                  Save Showroom
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
