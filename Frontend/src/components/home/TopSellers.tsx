"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Zap, Star, ShoppingCart } from "lucide-react";
import { PRODUCTS_CATALOG } from "@/data/siteData";

export default function TopSellers() {
  const [wishlist, setWishlist] = useState<string[]>([]);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
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
          const isWishlisted = wishlist.includes(product.id);
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
                  onClick={() => toggleWishlist(product.id)}
                  title="Add to Wishlist"
                  className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm shadow flex items-center justify-center hover:bg-white transition-all"
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
              <div className="p-4 bg-white space-y-2 border-t border-[#F0EDE6]">
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

                <Link href={productUrl} className="font-semibold text-sm text-[#1A1A1A] line-clamp-1 group-hover:text-[#C8232A] transition-colors block">
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

                <Link href={productUrl} className="w-full mt-3 bg-[#FAF8F5] hover:bg-[#C8232A] text-[#1A1A1A] hover:text-white border border-[#E8E3DA] hover:border-[#C8232A] font-semibold text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all">
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>View Product Details</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
