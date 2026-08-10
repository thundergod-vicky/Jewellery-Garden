"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2, Share2, Sparkles } from "lucide-react";
import TopBar from "@/components/header/TopBar";
import MainHeader from "@/components/header/MainHeader";
import CategoryMenu from "@/components/header/CategoryMenu";
import MainFooter from "@/components/footer/MainFooter";
import SeoFooter from "@/components/footer/SeoFooter";
import FloatingActions from "@/components/common/FloatingActions";
import { PRODUCTS_CATALOG } from "@/data/siteData";

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([
    PRODUCTS_CATALOG[0],
    PRODUCTS_CATALOG[1],
  ]);

  const removeFromWishlist = (id: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A]">
      <TopBar />
      <MainHeader />
      <CategoryMenu />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10">
        
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 flex items-center gap-2 mb-6">
          <Link href="/" className="hover:text-[#C8232A]">Home</Link>
          <span>/</span>
          <span className="font-semibold text-gray-800">My Wishlist</span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-serif-title font-bold text-[#1A1A1A]">
              My Gold & Silver Wishlist ({wishlistItems.length})
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Your saved 22KT Gold & 925 Sterling Silver favorites.
            </p>
          </div>

          {wishlistItems.length > 0 && (
            <button
              onClick={() => alert("Wishlist share link copied!")}
              className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-semibold text-xs py-2.5 px-4 rounded-xl shadow-sm transition-all"
            >
              <Share2 className="w-4 h-4 text-[#C8232A]" />
              <span>Share My Wishlist</span>
            </button>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-[#E8E3DA] text-center space-y-4 shadow-luxury">
            <Heart className="w-12 h-12 text-gray-300 mx-auto" />
            <h2 className="text-xl font-serif-title font-bold text-gray-800">Your Wishlist is Empty</h2>
            <p className="text-xs text-gray-500">Save gold and silver designs you love while browsing.</p>
            <Link
              href="/jewellery"
              className="inline-block bg-[#C8232A] text-white font-semibold text-xs py-3 px-8 rounded-xl shadow"
            >
              Explore Gold & Silver Designs →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistItems.map((product) => {
              const productUrl = `/jewellery/${product.categorySlug}/${product.slug}`;

              return (
                <div
                  key={product.id}
                  className="group bg-[#FFFFFF] rounded-2xl overflow-hidden border border-[#E8E3DA] shadow-luxury shadow-luxury-hover transition-all flex flex-col justify-between"
                >
                  <div className="relative w-full h-64 bg-[#F6F6F6] p-4 overflow-hidden">
                    <span className="absolute top-3 left-3 bg-[#C8232A] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow z-10">
                      {product.purity}
                    </span>

                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      title="Remove from Wishlist"
                      className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-red-50 text-gray-500 hover:text-red-600 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-108 transition-transform duration-500"
                      unoptimized
                    />
                  </div>

                  <div className="p-4 bg-white space-y-2 border-t border-[#F0EDE6]">
                    <span className="text-[11px] font-bold text-[#C8232A] uppercase tracking-wider block">
                      {product.metal} • {product.category}
                    </span>

                    <Link href={productUrl} className="font-semibold text-sm text-[#1A1A1A] line-clamp-1 group-hover:text-[#C8232A] transition-colors block">
                      {product.name}
                    </Link>

                    <p className="text-[11px] text-gray-400">Weight: {product.grossWeight}</p>

                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="font-bold text-base text-[#1A1A1A]">
                        ₹ {product.price.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <Link
                      href="/cart"
                      className="w-full mt-3 bg-[#C8232A] hover:bg-[#B81D24] text-white font-semibold text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Shopping Bag</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      <MainFooter />
      <SeoFooter />
      <FloatingActions />
    </main>
  );
}
