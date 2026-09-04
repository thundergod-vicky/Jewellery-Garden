"use client";

import React, { useState, useEffect } from "react";
import {
  Star,
  CheckCircle2,
  XCircle,
  Trash2,
  Search,
  ShieldCheck,
  Play,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

interface Review {
  id: string;
  customerName: string;
  customerEmail: string;
  productName: string;
  rating: number;
  title?: string;
  comment?: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
  createdAt: string;
  verifiedPurchase: boolean;
  images?: string[];
  video?: string;
  videoDuration?: number;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = () => {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem("jg-user-reviews");
      if (stored) {
        const parsed = JSON.parse(stored);
        const mapped: Review[] = parsed.map((r: any) => ({
          id: r.id,
          customerName: r.userName || "Customer",
          customerEmail: r.userEmail || "customer@jewellerygarden.com",
          productName: r.productName || "Jewellery Item",
          rating: r.rating || 5,
          title: r.title,
          comment: r.comment,
          status: r.status || "APPROVED",
          createdAt: r.createdAt || "Recent",
          verifiedPurchase: true,
          images: r.images || [],
          video: r.video,
          videoDuration: r.videoDuration,
        }));
        setReviews(mapped);
      }
    } catch (e) {
      console.error("Error loading reviews for admin:", e);
    }
  };

  const syncToStorage = (updated: Review[]) => {
    setReviews(updated);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("jg-user-reviews", JSON.stringify(updated));
      } catch (e) {}
    }
  };

  const updateStatus = (id: string, newStatus: "APPROVED" | "PENDING" | "REJECTED") => {
    const updated = reviews.map((r) => (r.id === id ? { ...r, status: newStatus } : r));
    syncToStorage(updated);
    toast.success(`Review ${newStatus.toLowerCase()}!`);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    const updated = reviews.filter((r) => r.id !== id);
    syncToStorage(updated);
    toast.success("Review deleted.");
  };

  const filteredReviews = reviews.filter((r) => {
    const matchesSearch =
      r.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.comment && r.comment.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.title && r.title.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === "ALL" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 max-w-[1400px] mx-auto flex flex-col gap-6 text-left font-sans">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-2xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
              <Star className="w-5 h-5 text-[#C8232A] fill-[#C8232A]" />
              <span>Customer Reviews & Moderation</span>
            </h1>
            <span className="bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800/50">
              {reviews.filter((r) => r.status === "PENDING").length} Pending
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Moderate customer feedback, star ratings, photo attachments, and 10s video reviews submitted by verified buyers.
          </p>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex items-center w-full sm:w-80">
          <Search className="absolute left-3.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search review by customer or product..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-[#F7F9FC] dark:bg-[#1A1D23] text-xs text-gray-900 dark:text-white focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          {["ALL", "APPROVED", "PENDING", "REJECTED"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                statusFilter === st
                  ? "bg-[#C8232A] text-white"
                  : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="bg-white dark:bg-[#121417] border border-gray-200 dark:border-gray-800 rounded-2xl p-12 text-center space-y-3">
            <Sparkles className="w-8 h-8 text-gray-400 mx-auto opacity-50" />
            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">
              No Customer Reviews Submitted Yet
            </h3>
            <p className="text-xs text-gray-400">
              Verified customer ratings, photo uploads, and video reviews will appear here once submitted from account profiles.
            </p>
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-start justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center text-amber-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating ? "fill-amber-400 text-amber-400" : "text-gray-300 dark:text-gray-700"
                        }`}
                      />
                    ))}
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300 ml-1">
                      {rev.rating}.0
                    </span>
                  </div>

                  <span className="font-bold text-xs text-gray-900 dark:text-white">{rev.customerName}</span>
                  <span className="text-xs text-gray-400">• {rev.customerEmail}</span>

                  {rev.verifiedPurchase && (
                    <span className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Verified Purchase
                    </span>
                  )}
                </div>

                <div className="text-xs text-gray-500 font-semibold">
                  Product: <span className="text-gray-800 dark:text-gray-200">{rev.productName}</span>
                </div>

                {rev.title && (
                  <h5 className="font-bold text-xs text-gray-900 dark:text-white">{rev.title}</h5>
                )}

                {rev.comment && (
                  <p className="text-xs text-gray-700 dark:text-gray-300 bg-[#FAFBFD] dark:bg-[#16181C] p-3 rounded-xl border border-gray-100 dark:border-gray-800/60">
                    &quot;{rev.comment}&quot;
                  </p>
                )}

                {/* Attached Images */}
                {rev.images && rev.images.length > 0 && (
                  <div className="flex items-center gap-2 pt-1 overflow-x-auto">
                    {rev.images.map((imgSrc, idx) => (
                      <div
                        key={idx}
                        className="relative w-16 h-16 rounded-xl overflow-hidden border border-gray-200 shrink-0"
                      >
                        <img
                          src={imgSrc}
                          alt="Review Photo"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Attached Video */}
                {rev.video && (
                  <div className="pt-1">
                    <div className="relative max-w-[240px] rounded-xl overflow-hidden border border-gray-300 bg-black">
                      <video src={rev.video} controls className="w-full h-28 object-cover" />
                      {rev.videoDuration && (
                        <span className="absolute top-2 right-2 bg-black/70 text-white text-[9px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Play className="w-2.5 h-2.5 fill-current text-green-400" /> {rev.videoDuration}s (max 10s)
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="text-[11px] text-gray-400 pt-1">Submitted on {rev.createdAt}</div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                {rev.status !== "APPROVED" && (
                  <button
                    onClick={() => updateStatus(rev.id, "APPROVED")}
                    className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1 shadow-xs cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Approve
                  </button>
                )}

                {rev.status !== "REJECTED" && (
                  <button
                    onClick={() => updateStatus(rev.id, "REJECTED")}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1 shadow-xs cursor-pointer"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    Reject
                  </button>
                )}

                <button
                  onClick={() => handleDelete(rev.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                  title="Delete Review"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
