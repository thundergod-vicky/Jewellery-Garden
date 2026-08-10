"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Star, ShieldCheck, Truck, Share2, Heart, ShoppingBag, MapPin, Award, CheckCircle2, ChevronDown, ChevronUp, Zap, Sparkles, RefreshCw } from "lucide-react";
import TopBar from "@/components/header/TopBar";
import MainHeader from "@/components/header/MainHeader";
import CategoryMenu from "@/components/header/CategoryMenu";
import MainFooter from "@/components/footer/MainFooter";
import SeoFooter from "@/components/footer/SeoFooter";
import FloatingActions from "@/components/common/FloatingActions";
import { PRODUCTS_CATALOG, getProductBySlug } from "@/data/siteData";

export default function ProductDetailPage() {
  const params = useParams();
  const categoryParam = Array.isArray(params?.category) ? params.category[0] : params?.category || "";
  const slugParam = Array.isArray(params?.slug) ? params.slug[0] : params?.slug || "";

  // Lookup product by category & slug or fallback to Splendid Flower Nose Pin
  const product = getProductBySlug(categoryParam, slugParam) || PRODUCTS_CATALOG[0];

  const [selectedImg, setSelectedImg] = useState(product.image);
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [showPriceBreakup, setShowPriceBreakup] = useState(true);
  const [showSpecs, setShowSpecs] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length >= 6) {
      setPincodeStatus("Available for 24-48 Hr Express Insured Shipping to " + pincode);
    } else {
      setPincodeStatus("Please enter a valid 6-digit PIN code.");
    }
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const handleShareUrl = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2500);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A]">
      <TopBar />
      <MainHeader />
      <CategoryMenu />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8">
        
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 flex items-center gap-2 mb-6">
          <Link href="/" className="hover:text-[#C8232A]">Home</Link>
          <span>/</span>
          <Link href="/jewellery" className="hover:text-[#C8232A]">Jewellery</Link>
          <span>/</span>
          <Link href={`/jewellery?category=${product.categorySlug}`} className="hover:text-[#C8232A]">
            {product.category}
          </Link>
          <span>/</span>
          <span className="font-semibold text-gray-800 line-clamp-1">{product.name}</span>
        </div>

        {/* PDP Core Section: Image Gallery (Left) & Product Details (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white p-6 sm:p-10 rounded-3xl border border-[#E8E3DA] shadow-luxury">
          
          {/* Left Column: Image Gallery Viewer (5 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative w-full h-[420px] sm:h-[500px] bg-[#F8F8F8] rounded-2xl overflow-hidden border border-gray-100 group">
              <span className="absolute top-4 left-4 z-10 bg-[#C8232A] text-white text-xs font-bold px-3 py-1 rounded shadow">
                {product.purity}
              </span>

              {/* Action Buttons Overlay */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  title="Save to Wishlist"
                  className="w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white transition-all text-gray-700"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-[#C8232A] text-[#C8232A]" : ""}`} />
                </button>
                <button
                  onClick={handleShareUrl}
                  title="Share product link"
                  className="w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white transition-all text-gray-700 hover:text-[#C8232A]"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <Image
                src={selectedImg}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                priority
                unoptimized
              />
            </div>

            {/* Thumbnails Carousel */}
            {product.images && product.images.length > 0 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(img)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      selectedImg === img ? "border-[#C8232A] shadow-md scale-95" : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <Image src={img} alt="Thumbnail" fill className="object-cover" unoptimized />
                  </button>
                ))}
              </div>
            )}

            {copiedUrl && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-lg flex items-center gap-2 animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Unique Shareable URL copied to clipboard!</span>
              </div>
            )}
          </div>

          {/* Right Column: Product Specifications & Actions (7 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Header Info */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#C8232A] uppercase tracking-wider bg-red-50 py-1 px-3 rounded-full">
                  SKU: {product.sku}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-gray-400 font-normal">({product.reviewsCount} Customer Reviews)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#1A1A1A]">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Pricing Box */}
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E8E3DA] space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[#1A1A1A]">
                  ₹ {product.price.toLocaleString("en-IN")}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ₹ {product.originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded">
                  Flat 20% Off Making Charges
                </span>
              </div>
              <p className="text-[11px] text-gray-500">(Price inclusive of all taxes & 3% GST)</p>
            </div>

            {/* Delivery Pincode Checker */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#C8232A]" />
                <span>Check Delivery & Express Shipping Pincode:</span>
              </label>
              <form onSubmit={handleCheckPincode} className="flex items-center gap-2 max-w-sm">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter 6-Digit PIN Code"
                  className="flex-1 text-xs bg-gray-50 border border-gray-300 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-[#C8232A]"
                />
                <button
                  type="submit"
                  className="bg-[#1A1A1A] hover:bg-[#C8232A] text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition-colors"
                >
                  Check
                </button>
              </form>
              {pincodeStatus && (
                <p className="text-xs font-medium text-emerald-700 bg-emerald-50 p-2 rounded border border-emerald-200">
                  ✓ {pincodeStatus}
                </p>
              )}
            </div>

            {/* Detailed Price Breakup Accordion */}
            <div className="border border-[#E8E3DA] rounded-xl overflow-hidden">
              <button
                onClick={() => setShowPriceBreakup(!showPriceBreakup)}
                className="w-full bg-[#FAF8F5] p-3.5 flex items-center justify-between font-semibold text-xs text-[#1A1A1A] hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>Price Breakup Details</span>
                </div>
                {showPriceBreakup ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showPriceBreakup && (
                <div className="p-4 bg-white space-y-2 text-xs text-gray-600 border-t border-[#E8E3DA]">
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span>Gold / Metal Value ({product.grossWeight}):</span>
                    <span className="font-semibold text-gray-800">₹ {(product.goldValue || 8900).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span>Making Charges:</span>
                    <span className="font-semibold text-gray-800">₹ {(product.makingCharges || 3200).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100 text-emerald-600 font-semibold">
                    <span>Making Discount (20% Off):</span>
                    <span>- ₹ {(product.makingDiscount || 640).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span>GST (3%):</span>
                    <span className="font-semibold text-gray-800">₹ {(product.gstAmount || 376).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between pt-2 text-sm font-bold text-[#1A1A1A]">
                    <span>Total Product Price:</span>
                    <span className="text-[#C8232A]">₹ {product.price.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Product Specification Grid Accordion */}
            <div className="border border-[#E8E3DA] rounded-xl overflow-hidden">
              <button
                onClick={() => setShowSpecs(!showSpecs)}
                className="w-full bg-[#FAF8F5] p-3.5 flex items-center justify-between font-semibold text-xs text-[#1A1A1A] hover:bg-gray-100 transition-colors"
              >
                <span>Product Specifications & Purity</span>
                {showSpecs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showSpecs && (
                <div className="p-4 bg-white grid grid-cols-2 gap-3 text-xs border-t border-[#E8E3DA]">
                  <div>
                    <span className="text-gray-400 block">Purity Hallmark:</span>
                    <span className="font-semibold text-gray-800">{product.purity}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Gross Weight:</span>
                    <span className="font-semibold text-gray-800">{product.grossWeight}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Net Weight:</span>
                    <span className="font-semibold text-gray-800">{product.netWeight}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Metal Color:</span>
                    <span className="font-semibold text-gray-800">{product.metalColor}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Main CTAs */}
            <div className="space-y-3 pt-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#C8232A] hover:bg-[#B81D24] text-white font-bold text-sm py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>{addedToCart ? "Added to Shopping Bag ✓" : "ADD TO CART"}</span>
                </button>

                <Link
                  href="/cart"
                  className="bg-[#D4AF37] hover:bg-[#C5A059] text-black font-bold text-sm py-4 px-8 rounded-xl shadow transition-all flex items-center justify-center"
                >
                  BUY NOW
                </Link>
              </div>

              {/* Showroom Booking */}
              <div className="bg-[#FFFBF0] p-4 rounded-xl border border-[#C5A059] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-[#7A5816]">
                  <MapPin className="w-4 h-4 text-[#C8232A] shrink-0" />
                  <span>Try at <strong>Durgapur Bazar</strong> or <strong>City Centre Showroom</strong></span>
                </div>
                <a href="#showrooms" className="font-bold text-[#C8232A] hover:underline underline-offset-2 shrink-0">
                  Book Visit →
                </a>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-gray-100 text-center text-[11px] text-gray-600">
              <div className="space-y-1">
                <Award className="w-5 h-5 text-[#D4AF37] mx-auto" />
                <span className="block font-semibold">100% BIS Hallmarked</span>
              </div>
              <div className="space-y-1">
                <ShieldCheck className="w-5 h-5 text-[#C8232A] mx-auto" />
                <span className="block font-semibold">Certified Diamonds</span>
              </div>
              <div className="space-y-1">
                <Truck className="w-5 h-5 text-[#D4AF37] mx-auto" />
                <span className="block font-semibold">Free Insured Shipping</span>
              </div>
              <div className="space-y-1">
                <RefreshCw className="w-5 h-5 text-[#C8232A] mx-auto" />
                <span className="block font-semibold">15-Day Exchange</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      <MainFooter />
      <SeoFooter />
      <FloatingActions />
    </main>
  );
}
