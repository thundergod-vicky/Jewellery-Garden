"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/AuthContext";
import MainHeader from "@/components/header/MainHeader";
import TopBar from "@/components/header/TopBar";
import MainFooter from "@/components/footer/MainFooter";
import {
  Loader2,
  ArrowLeft,
  Star,
  Upload,
  Image as ImageIcon,
  Video,
  X,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  Sparkles,
  Play,
} from "lucide-react";
import toast from "react-hot-toast";

interface PurchasedItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  orderId: string;
  purchaseDate: string;
}

interface CustomerReview {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  orderId: string;
  rating: number; // 1 - 5
  title?: string;
  comment?: string;
  images: string[];
  video?: string;
  videoDuration?: number;
  createdAt: string;
  userEmail: string;
  userName: string;
  status: "APPROVED" | "PENDING";
}

export default function CustomerReviewsPage() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();

  const [activeTab, setActiveTab] = useState<"pending" | "submitted">("pending");
  const [purchasedProducts, setPurchasedProducts] = useState<PurchasedItem[]>([]);
  const [submittedReviews, setSubmittedReviews] = useState<CustomerReview[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Review Form Modal State
  const [selectedItem, setSelectedItem] = useState<PurchasedItem | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [video, setVideo] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (user) {
      loadCustomerData();
    }
  }, [user, loading, router]);

  const loadCustomerData = async () => {
    setDataLoading(true);
    let orders: any[] = [];

    // 1. Fetch Orders from Backend API
    try {
      const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000").replace("localhost", "127.0.0.1");
      const res = await fetch(`${API_BASE}/api/orders/customer/${user?.uid}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) orders = data;
      }
    } catch (e) {
      console.warn("Could not fetch customer orders from backend API:", e);
    }

    // 2. Fetch Orders from LocalStorage Fallback
    if (typeof window !== "undefined") {
      try {
        const globalSaved = localStorage.getItem("jg-user-orders");
        const userSaved = user?.uid ? localStorage.getItem(`jg-orders-${user.uid}`) : null;
        const parsedGlobal = globalSaved ? JSON.parse(globalSaved) : [];
        const parsedUser = userSaved ? JSON.parse(userSaved) : [];

        const combinedOrders = [...orders, ...parsedUser, ...parsedGlobal];
        const orderMap = new Map();
        combinedOrders.forEach((o) => {
          const key = o.orderNumber || o.orderId || o.id;
          if (key) orderMap.set(key, o);
        });
        orders = Array.from(orderMap.values());
      } catch (e) {}
    }

    // 3. Extract Unique Purchased Products
    const itemsMap = new Map<string, PurchasedItem>();

    orders.forEach((o: any) => {
      let rawItems: any[] = [];
      if (typeof o.items === "string") {
        try {
          rawItems = JSON.parse(o.items);
        } catch (e) {}
      } else if (Array.isArray(o.items)) {
        rawItems = o.items;
      }

      rawItems.forEach((item: any) => {
        const pId = String(item.id || item.productId || item.name || Math.random());
        if (!itemsMap.has(pId)) {
          itemsMap.set(pId, {
            productId: pId,
            name: item.name || item.title || "Jewellery Product",
            image: item.image || item.img || "/images/placeholder.jpg",
            price: Number(item.price || 0),
            orderId: o.orderNumber || o.id || "JG-ORDER",
            purchaseDate: o.createdAt
              ? new Date(o.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "Recent Purchase",
          });
        }
      });
    });

    const uniquePurchases = Array.from(itemsMap.values());

    // 4. Load Saved Reviews from LocalStorage
    let savedRev: CustomerReview[] = [];
    if (typeof window !== "undefined") {
      try {
        const userRevKey = `jg-user-reviews-${user?.uid}`;
        const globalRevKey = "jg-user-reviews";
        const storedUser = localStorage.getItem(userRevKey);
        const storedGlobal = localStorage.getItem(globalRevKey);

        const parsedUser = storedUser ? JSON.parse(storedUser) : [];
        const parsedGlobal = storedGlobal ? JSON.parse(storedGlobal) : [];

        const revMap = new Map();
        [...parsedUser, ...parsedGlobal].forEach((r: CustomerReview) => {
          if (r.id) revMap.set(r.id, r);
        });
        savedRev = Array.from(revMap.values());
      } catch (e) {}
    }

    setPurchasedProducts(uniquePurchases);
    setSubmittedReviews(savedRev);
    setDataLoading(false);
  };

  // Handle Image Selection
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileList = Array.from(files);
    fileList.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload valid image files (.png, .jpg, .jpeg, .webp)");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });

    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  // Handle Video Selection with Max 10-Second Validation
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      toast.error("Please upload a valid video file (.mp4, .webm, .mov)");
      return;
    }

    // Video Duration Inspector
    const videoElement = document.createElement("video");
    videoElement.preload = "metadata";

    const objectUrl = URL.createObjectURL(file);
    videoElement.src = objectUrl;

    videoElement.onloadedmetadata = () => {
      URL.revokeObjectURL(objectUrl);
      const duration = videoElement.duration;

      if (duration > 10.5) {
        toast.error(
          `Video must be 10 seconds or shorter! (Selected video: ${Math.round(duration)} sec)`
        );
        if (videoInputRef.current) videoInputRef.current.value = "";
        return;
      }

      // Valid video under 10 seconds
      setVideoDuration(Math.round(duration));
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setVideo(event.target.result as string);
          toast.success(`Video attached (${Math.round(duration)}s)`);
        }
      };
      reader.readAsDataURL(file);
    };
  };

  // Handle Form Submission
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedItem) return;

    // MANDATORY 5-STAR RATING CHECK
    if (!rating || rating < 1 || rating > 5) {
      toast.error("Please select a 5-star rating for this product!");
      return;
    }

    setIsSubmitting(true);

    const newReview: CustomerReview = {
      id: "rev_" + Math.random().toString(36).substring(2, 11),
      productId: selectedItem.productId,
      productName: selectedItem.name,
      productImage: selectedItem.image,
      orderId: selectedItem.orderId,
      rating,
      title: title.trim() || undefined,
      comment: comment.trim() || undefined,
      images,
      video: video || undefined,
      videoDuration: videoDuration || undefined,
      createdAt: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      userEmail: user?.email || "customer@jewellerygarden.com",
      userName: profile?.username || user?.displayName || "Verified Customer",
      status: "APPROVED",
    };

    // Save to LocalStorage
    if (typeof window !== "undefined") {
      try {
        const userKey = `jg-user-reviews-${user?.uid}`;
        const globalKey = "jg-user-reviews";

        const existingUser = JSON.parse(localStorage.getItem(userKey) || "[]");
        const existingGlobal = JSON.parse(localStorage.getItem(globalKey) || "[]");

        const updatedUser = [newReview, ...existingUser];
        const updatedGlobal = [newReview, ...existingGlobal];

        localStorage.setItem(userKey, JSON.stringify(updatedUser));
        localStorage.setItem(globalKey, JSON.stringify(updatedGlobal));
      } catch (err) {
        console.error("Error saving review to local storage:", err);
      }
    }

    setSubmittedReviews((prev) => [newReview, ...prev]);
    setIsSubmitting(false);

    toast.success("Thank you! Your verified purchase review has been submitted.");

    // Reset Form State & Close Modal
    setSelectedItem(null);
    setRating(0);
    setTitle("");
    setComment("");
    setImages([]);
    setVideo(null);
    setVideoDuration(null);
    setActiveTab("submitted");
  };

  const getRatingLabel = (val: number) => {
    switch (val) {
      case 1:
        return "1/5 - Poor";
      case 2:
        return "2/5 - Fair";
      case 3:
        return "3/5 - Good";
      case 4:
        return "4/5 - Very Good";
      case 5:
        return "5/5 - Excellent!";
      default:
        return "Select a star rating";
    }
  };

  // Filter out products that have already been reviewed
  const reviewedProductIds = new Set(submittedReviews.map((r) => r.productId));
  const readyToReviewList = purchasedProducts.filter(
    (p) => !reviewedProductIds.has(p.productId)
  );

  if (loading || dataLoading) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#C8232A]" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] flex flex-col font-sans">
      <TopBar />
      <MainHeader />

      <section className="py-10 px-4 flex-1">
        <div className="max-w-[920px] mx-auto">
          {/* Back Navigation */}
          <div className="mb-6">
            <Link
              href="/account"
              className="text-xs font-semibold text-[#C8232A] hover:underline inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              BACK TO ACCOUNT
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="font-serif text-2xl sm:text-3xl font-medium tracking-widest text-[#1A1A1A] mb-2">
              MY REVIEWS & RATINGS
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Share feedback, photos, and short video reviews for items you&apos;ve purchased.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200 mb-8">
            <button
              onClick={() => setActiveTab("pending")}
              className={`pb-3 px-4 font-semibold text-xs sm:text-sm transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
                activeTab === "pending"
                  ? "border-[#C8232A] text-[#C8232A]"
                  : "border-transparent text-gray-400 hover:text-gray-700"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Ready to Review ({readyToReviewList.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("submitted")}
              className={`pb-3 px-4 font-semibold text-xs sm:text-sm transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
                activeTab === "submitted"
                  ? "border-[#C8232A] text-[#C8232A]"
                  : "border-transparent text-gray-400 hover:text-gray-700"
              }`}
            >
              <Star className="w-4 h-4" />
              <span>Submitted Reviews ({submittedReviews.length})</span>
            </button>
          </div>

          {/* TAB 1: READY TO REVIEW (PURCHASED PRODUCTS ONLY) */}
          {activeTab === "pending" && (
            <div>
              {readyToReviewList.length === 0 ? (
                <div className="bg-white border border-[#E8E3DA] rounded-2xl p-10 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-amber-50 text-[#C8232A] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-gray-900">
                    {purchasedProducts.length === 0
                      ? "No Purchased Products Found"
                      : "All Purchased Products Reviewed!"}
                  </h3>
                  <p className="text-xs text-gray-500 max-w-md mx-auto">
                    {purchasedProducts.length === 0
                      ? "Reviews can only be submitted for products you have purchased. Browse our exclusive jewellery collection to get started!"
                      : "You have reviewed all your purchased jewellery items. Thank you for sharing your feedback!"}
                  </p>
                  <Link
                    href="/jewellery/gold"
                    className="inline-block px-6 py-2.5 bg-[#C8232A] text-white text-xs font-semibold tracking-wider rounded-lg hover:bg-[#A81B21] transition-all"
                  >
                    EXPLORE JEWELLERY COLLECTION
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {readyToReviewList.map((item) => (
                    <div
                      key={item.productId}
                      className="bg-white border border-[#E8E3DA] rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition-all space-y-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-flex items-center gap-1 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" /> Verified Purchase
                          </span>
                          <h4 className="font-semibold text-sm text-gray-900 truncate mt-1">
                            {item.name}
                          </h4>
                          <p className="text-xs text-gray-500 font-mono font-medium mt-0.5">
                            ₹{item.price.toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-[10px] text-gray-400 font-mono">
                          Order: {item.orderId}
                        </span>
                        <button
                          onClick={() => {
                            setSelectedItem(item);
                            setRating(0);
                          }}
                          className="px-4 py-1.5 bg-[#1A1A1A] hover:bg-[#C8232A] text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>Write Review</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SUBMITTED REVIEWS */}
          {activeTab === "submitted" && (
            <div>
              {submittedReviews.length === 0 ? (
                <div className="bg-white border border-[#E8E3DA] rounded-2xl p-10 text-center space-y-3">
                  <Star className="w-10 h-10 text-gray-300 mx-auto" />
                  <h3 className="font-bold text-sm text-gray-800">No Submitted Reviews Yet</h3>
                  <p className="text-xs text-gray-500">
                    Your submitted product ratings and video reviews will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 text-left">
                  {submittedReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="bg-white border border-[#E8E3DA] rounded-2xl p-5 shadow-xs space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                            <Image
                              src={rev.productImage || "/images/placeholder.jpg"}
                              alt={rev.productName}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                              <CheckCircle2 className="w-2.5 h-2.5" /> Verified Buyer Review
                            </span>
                            <h4 className="font-bold text-sm text-gray-900 mt-0.5">
                              {rev.productName}
                            </h4>
                          </div>
                        </div>
                        <span className="text-[10px] text-gray-400 font-mono">
                          {rev.createdAt}
                        </span>
                      </div>

                      {/* Rating Stars */}
                      <div className="flex items-center gap-1 text-amber-400">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-4 h-4 ${
                              s <= rev.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"
                            }`}
                          />
                        ))}
                        <span className="text-xs font-bold text-gray-700 ml-1">
                          {rev.rating}.0 / 5
                        </span>
                      </div>

                      {/* Review Title & Content */}
                      {rev.title && (
                        <h5 className="font-bold text-xs text-gray-900">{rev.title}</h5>
                      )}
                      {rev.comment && (
                        <p className="text-xs text-gray-600 leading-relaxed">{rev.comment}</p>
                      )}

                      {/* Attached Images */}
                      {rev.images && rev.images.length > 0 && (
                        <div className="flex items-center gap-2 pt-1 overflow-x-auto">
                          {rev.images.map((imgSrc, idx) => (
                            <div
                              key={idx}
                              className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 shrink-0"
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
                          <div className="relative max-w-[240px] rounded-xl overflow-hidden border border-gray-200 bg-black">
                            <video
                              src={rev.video}
                              controls
                              className="w-full h-32 object-cover"
                            />
                            {rev.videoDuration && (
                              <span className="absolute top-2 right-2 bg-black/70 text-white text-[9px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Play className="w-2.5 h-2.5 fill-current" /> {rev.videoDuration}s (max 10s)
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* REVIEW FORM MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto text-left animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C8232A]" />
                <h3 className="font-bold text-sm text-gray-900">Write Product Review</h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Target Product Banner */}
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-100">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white shrink-0 border border-gray-200">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5" /> Verified Purchase
                </span>
                <h4 className="font-bold text-xs text-gray-900 truncate mt-0.5">
                  {selectedItem.name}
                </h4>
                <p className="text-[11px] text-gray-500 font-mono">
                  ₹{selectedItem.price.toLocaleString("en-IN")} • Order #{selectedItem.orderId}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* 1. MANDATORY 5-STAR RATING SELECTOR */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 flex items-center justify-between">
                  <span>Overall Rating <span className="text-red-500">* (Mandatory)</span></span>
                  <span className="text-[11px] font-normal text-amber-600">
                    {getRatingLabel(hoverRating || rating)}
                  </span>
                </label>

                <div className="flex items-center gap-2 p-3 bg-amber-50/60 rounded-2xl border border-amber-100 justify-center">
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button
                      key={starVal}
                      type="button"
                      onMouseEnter={() => setHoverRating(starVal)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(starVal)}
                      className="p-1 text-amber-400 hover:scale-125 transition-all cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          starVal <= (hoverRating || rating)
                            ? "fill-amber-400 text-amber-400 drop-shadow-xs"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. OPTIONAL TITLE / HEADLINE */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">
                  Review Headline <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Beautiful finish & authentic hallmark gold!"
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C8232A] focus:bg-white"
                />
              </div>

              {/* 3. OPTIONAL DETAILED COMMENT */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">
                  Detailed Review <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Describe the quality, design, and your wearing experience..."
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C8232A] focus:bg-white resize-none"
                />
              </div>

              {/* 4. MEDIA UPLOADS: PHOTOS & SHORT VIDEO (10 SEC MAX) */}
              <div className="space-y-3 pt-1 border-t border-gray-100">
                <label className="text-xs font-bold text-gray-700 flex items-center justify-between">
                  <span>Add Photos & Video <span className="text-gray-400 font-normal">(Optional)</span></span>
                  <span className="text-[10px] text-gray-400">Max 10s video duration</span>
                </label>

                {/* Upload Buttons Row */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    className="flex-1 py-2 px-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <ImageIcon className="w-4 h-4 text-emerald-600" />
                    <span>Upload Images</span>
                  </button>
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => videoInputRef.current?.click()}
                    className="flex-1 py-2 px-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Video className="w-4 h-4 text-purple-600" />
                    <span>Upload Video (≤10s)</span>
                  </button>
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                  />
                </div>

                {/* Image Previews */}
                {images.length > 0 && (
                  <div className="flex items-center gap-2 overflow-x-auto py-1">
                    {images.map((imgSrc, idx) => (
                      <div
                        key={idx}
                        className="relative w-16 h-16 rounded-xl overflow-hidden border border-gray-200 shrink-0 group"
                      >
                        <img
                          src={imgSrc}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setImages((prev) => prev.filter((_, i) => i !== idx))}
                          className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Video Preview */}
                {video && (
                  <div className="relative max-w-[200px] rounded-xl overflow-hidden border border-gray-300 bg-black group">
                    <video src={video} controls className="w-full h-28 object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        setVideo(null);
                        setVideoDuration(null);
                      }}
                      className="absolute top-1.5 right-1.5 bg-red-600 text-white rounded-full p-1 shadow-md hover:bg-red-700 transition-all cursor-pointer"
                      title="Remove Video"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    {videoDuration && (
                      <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[9px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Play className="w-2.5 h-2.5 fill-current text-green-400" /> {videoDuration}s / 10s max
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-3 border-t border-gray-100 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="px-5 py-2.5 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 bg-[#C8232A] hover:bg-[#A81B21] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Star className="w-4 h-4 fill-current" />
                      <span>SUBMIT VERIFIED REVIEW</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <MainFooter />
    </main>
  );
}
