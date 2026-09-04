"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Star,
  CheckCircle2,
  ThumbsUp,
  Play,
  Sparkles,
} from "lucide-react";

interface ReviewItem {
  id: string;
  customerName: string;
  rating: number;
  date: string;
  title?: string;
  comment?: string;
  verified: boolean;
  images?: string[];
  video?: string;
  videoDuration?: number;
  helpfulCount: number;
}

export default function ProductReviewsSection({ product }: { product: any }) {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [filter, setFilter] = useState<"ALL" | "MEDIA" | "5STAR">("ALL");
  const [helpfulMap, setHelpfulMap] = useState<Record<string, number>>({});
  const [userVoted, setUserVoted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    loadProductReviews();
  }, [product]);

  const loadProductReviews = () => {
    let customerReviews: ReviewItem[] = [];

    // Read from LocalStorage for real submitted customer reviews matching this product
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("jg-user-reviews");
        if (stored) {
          const parsed = JSON.parse(stored);
          const filtered = parsed.filter(
            (r: any) =>
              r.productId === product.id ||
              (r.productName && r.productName.toLowerCase() === product.name.toLowerCase()) ||
              (r.productName && product.name.toLowerCase().includes(r.productName.toLowerCase()))
          );

          customerReviews = filtered.map((r: any) => ({
            id: r.id,
            customerName: r.userName || "Verified Buyer",
            rating: r.rating || 5,
            date: r.createdAt || "Recently",
            title: r.title,
            comment: r.comment,
            verified: true,
            images: r.images || [],
            video: r.video,
            videoDuration: r.videoDuration,
            helpfulCount: 0,
          }));
        }
      } catch (e) {}
    }

    setReviews(customerReviews);

    // Initial Helpful Counter state
    const initialHelpful: Record<string, number> = {};
    customerReviews.forEach((r) => {
      initialHelpful[r.id] = r.helpfulCount || 0;
    });
    setHelpfulMap(initialHelpful);
  };

  const handleHelpfulClick = (id: string) => {
    if (userVoted[id]) return;
    setUserVoted((prev) => ({ ...prev, [id]: true }));
    setHelpfulMap((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const filteredReviews = reviews.filter((r) => {
    if (filter === "MEDIA") return (r.images && r.images.length > 0) || Boolean(r.video);
    if (filter === "5STAR") return r.rating === 5;
    return true;
  });

  const totalReviewsCount = reviews.length;
  const avgRating = totalReviewsCount > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviewsCount).toFixed(1) : "5.0";

  const starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    const star = Math.min(Math.max(Math.round(r.rating), 1), 5) as 1 | 2 | 3 | 4 | 5;
    starCounts[star] = (starCounts[star] || 0) + 1;
  });

  return (
    <div id="customer-reviews" className="mt-12 bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E3DA] shadow-luxury space-y-8 text-left font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span>Customer Reviews & Ratings</span>
            <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full font-sans font-semibold">
              Verified Buyers
            </span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Real feedback, photos, and short video reviews from verified customers.
          </p>
        </div>

        <Link
          href="/account/reviews"
          className="px-5 py-2.5 bg-[#C8232A] hover:bg-[#A81B21] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Star className="w-4 h-4 fill-current" />
          <span>Write a Review</span>
        </Link>
      </div>

      {/* Ratings Summary Box */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#FAF8F5] p-6 rounded-2xl border border-[#E8E3DA]">
        {/* Rating Score */}
        <div className="md:col-span-4 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-gray-200/80 pb-6 md:pb-0 md:pr-6">
          <span className="text-5xl font-extrabold text-gray-900 font-serif">
            {totalReviewsCount > 0 ? avgRating : "5.0"}
          </span>
          <div className="flex items-center text-amber-400 gap-1 my-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-xs text-gray-500 font-medium">
            Based on {totalReviewsCount} Verified Buyer Reviews
          </span>
        </div>

        {/* Rating Progress Bars */}
        <div className="md:col-span-8 space-y-2 flex flex-col justify-center">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = starCounts[stars as 1|2|3|4|5] || 0;
            const pct = totalReviewsCount > 0 ? Math.round((count / totalReviewsCount) * 100) : 0;
            return (
              <div key={stars} className="flex items-center gap-3 text-xs">
                <span className="w-12 text-gray-600 font-bold font-mono">{stars} ★</span>
                <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${pct}%` }}
                    className="h-full bg-amber-400 rounded-full"
                  />
                </div>
                <span className="w-10 text-right text-gray-400 font-mono">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-4 overflow-x-auto">
        <div className="flex items-center gap-2">
          {[
            { id: "ALL", label: `All Reviews (${reviews.length})` },
            { id: "MEDIA", label: "With Photos / Videos" },
            { id: "5STAR", label: "5 Star Reviews Only" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                filter === tab.id
                  ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6 divide-y divide-gray-100">
        {filteredReviews.length === 0 ? (
          <div className="py-10 text-center space-y-3">
            <Star className="w-8 h-8 text-amber-300 mx-auto" />
            <h4 className="font-bold text-sm text-gray-800">No Verified Customer Reviews Yet</h4>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Be the first verified customer to submit a review and rating for this product!
            </p>
            <Link
              href="/account/reviews"
              className="inline-block px-5 py-2.5 bg-[#C8232A] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#A81B21] transition-all cursor-pointer"
            >
              Write a Review
            </Link>
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div key={rev.id} className="pt-6 space-y-3">
              {/* Top User Info & Verified Badge */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-amber-100 text-[#C8232A] font-bold text-xs flex items-center justify-center border border-amber-200">
                    {rev.customerName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-gray-900 flex items-center gap-1.5">
                      <span>{rev.customerName}</span>
                      {rev.verified && (
                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded-full inline-flex items-center gap-1 border border-emerald-200">
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" /> Verified Buyer
                        </span>
                      )}
                    </h4>
                    <span className="text-[10px] text-gray-400 font-mono">{rev.date}</span>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center text-amber-400 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Title & Comment */}
              {rev.title && (
                <h5 className="font-bold text-sm text-gray-900">{rev.title}</h5>
              )}
              {rev.comment && (
                <p className="text-xs text-gray-600 leading-relaxed max-w-3xl">
                  {rev.comment}
                </p>
              )}

              {/* Customer Photos */}
              {rev.images && rev.images.length > 0 && (
                <div className="flex items-center gap-3 pt-2 overflow-x-auto">
                  {rev.images.map((imgSrc, idx) => (
                    <div
                      key={idx}
                      className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 shadow-2xs group cursor-pointer"
                    >
                      <img
                        src={imgSrc}
                        alt="Customer Uploaded Photo"
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Customer Video (10s max) */}
              {rev.video && (
                <div className="pt-2">
                  <div className="relative max-w-[260px] rounded-2xl overflow-hidden border border-gray-300 bg-black shadow-md">
                    <video src={rev.video} controls className="w-full h-36 object-cover" />
                    {rev.videoDuration && (
                      <span className="absolute top-2.5 right-2.5 bg-black/70 text-white text-[9px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Play className="w-2.5 h-2.5 fill-current text-emerald-400" /> {rev.videoDuration}s (max 10s)
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Footer Helpful Button */}
              <div className="pt-2 flex items-center justify-between text-xs text-gray-400">
                <button
                  onClick={() => handleHelpfulClick(rev.id)}
                  disabled={userVoted[rev.id]}
                  className={`flex items-center gap-1.5 text-[11px] font-semibold transition-all px-3 py-1 rounded-lg border cursor-pointer ${
                    userVoted[rev.id]
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${userVoted[rev.id] ? "fill-current" : ""}`} />
                  <span>
                    {userVoted[rev.id] ? "Helpful ✓" : "Was this review helpful?"} ({helpfulMap[rev.id] || 0})
                  </span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
