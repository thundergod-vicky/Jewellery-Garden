"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Zap, Star, ShoppingBag, Eye } from "lucide-react";
import { PRODUCTS_CATALOG } from "@/data/siteData";
import { addToCart, toggleWishlist, getWishlistIds } from "@/lib/cartWishlist";

export default function TopSellers() {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  useEffect(() => {
    setWishlistIds(getWishlistIds());
    const syncWishlist = () => setWishlistIds(getWishlistIds());
    window.addEventListener("jg-wishlist-updated", syncWishlist);
    return () => window.removeEventListener("jg-wishlist-updated", syncWishlist);
  }, []);

  const handleToggleWishlist = (product: any) => {
    toggleWishlist(product);
  };

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <section className="py-14 px-4 sm:px-8 max-w-[1440px] mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
        <div>
          <h2 className="text-2xl sm:text-4xl font-serif-title font-bold text-[#1A1A1A]">
            Top Sellers & Customer Favorites
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Handcrafted bestsellers certified for purity and authentic artistry.
          </p>
        </div>
        <Link
          href="/jewellery"
          className="text-xs sm:text-sm font-semibold text-[#C8232A] hover:underline underline-offset-4"
        >
          View All Bestsellers →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRODUCTS_CATALOG.slice(0, 4).map((product) => {
          const isWishlisted = wishlistIds.includes(product.id);
          const productUrl = `/jewellery/${product.categorySlug}/${product.slug}`;

          return (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden border border-[#E8E3DA] shadow-luxury shadow-luxury-hover transition-all flex flex-col justify-between"
            >
              {/* Product Image Box */}
              <div className="relative w-full h-64 bg-[#F6F6F6] p-4 flex items-center justify-center overflow-hidden">
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-[#C8232A] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow z-10">
                    {product.badge}
                  </span>
                )}

                {product.express && (
                  <span
                    className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow z-10 flex items-center gap-1"
                    style={{ left: product.badge ? "84px" : "12px" }}
                  >
                    <Zap className="w-3 h-3 fill-current" />
                    Express
                  </span>
                )}

                <button
                  onClick={() => handleToggleWishlist(product)}
                  title="Add to Wishlist"
                  className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm shadow flex items-center justify-center hover:bg-white transition-all cursor-pointer"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isWishlisted ? "fill-[#C8232A] text-[#C8232A]" : "text-gray-500 hover:text-[#C8232A]"
                    }`}
                  />
                </button>

                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-500"
                  unoptimized
                />
              </div>

              {/* Product Details */}
              <div className="p-4 bg-white space-y-2 border-t border-[#F0EDE6] flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{product.rating}</span>
                      <span className="text-gray-400 font-normal">({product.reviewsCount})</span>
                    </div>
                  </div>

                  <Link href={productUrl} className="font-semibold text-sm text-[#1A1A1A] line-clamp-1 group-hover:text-[#C8232A] transition-colors block mt-1">
                    {product.name}
                  </Link>

                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="font-bold text-base text-[#1A1A1A]">
                      ₹ {product.price.toLocaleString("en-IN")}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        ₹ {product.originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-3">
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    className="bg-[#C8232A] hover:bg-[#A81B21] text-white font-semibold text-xs py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                  <Link
                    href={productUrl}
                    className="bg-[#FAF8F5] hover:bg-gray-200 text-gray-800 border border-[#E8E3DA] font-semibold text-xs py-2.5 px-3 rounded-lg flex items-center justify-center gap-1 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5 text-gray-500" />
                    <span>Details</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
