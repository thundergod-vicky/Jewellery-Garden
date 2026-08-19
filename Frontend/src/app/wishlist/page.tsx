"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2, ShoppingBag, Loader2, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import TopBar from "@/components/header/TopBar";
import MainHeader from "@/components/header/MainHeader";
import CategoryMenu from "@/components/header/CategoryMenu";
import MainFooter from "@/components/footer/MainFooter";
import { PRODUCTS_CATALOG } from "@/data/siteData";
import { addToCart, toggleWishlist, getWishlistIds } from "@/lib/cartWishlist";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000").replace("localhost", "127.0.0.1");

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [apiProducts, setApiProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    loadWishlist();

    const handleSync = () => loadWishlist();
    window.addEventListener("jg-wishlist-updated", handleSync);
    return () => window.removeEventListener("jg-wishlist-updated", handleSync);
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/products`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setApiProducts(data);
        }
      }
    } catch (err) {
      console.warn("Using local product catalog for wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadWishlist = () => {
    setWishlistItems(getWishlistIds());
  };

  const handleRemoveFromWishlist = (product: any) => {
    toggleWishlist(product);
    loadWishlist();
  };

  const handleAddToCartClick = (product: any) => {
    addToCart(product, 1);
  };

  // Combine local catalog and API products so any wishlisted ID is resolved
  const allProductsMap = useMemo(() => {
    const map = new Map<string, any>();
    PRODUCTS_CATALOG.forEach((p) => map.set(p.id, p));
    apiProducts.forEach((p) => map.set(p.id, p));
    return map;
  }, [apiProducts]);

  const lovedProducts = useMemo(() => {
    return wishlistItems
      .map((id) => allProductsMap.get(id))
      .filter(Boolean);
  }, [wishlistItems, allProductsMap]);

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] flex flex-col font-sans">
      <TopBar />
      <MainHeader />
      <CategoryMenu />

      <section className="py-10 px-4 sm:px-8 flex-1 max-w-[1440px] mx-auto w-full text-left">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 flex items-center gap-2 mb-6">
          <Link href="/" className="hover:text-[#C8232A]">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-gray-800">My Wishlist</span>
        </div>

        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-serif font-medium tracking-wide text-[#1A1A1A]">
              YOUR WISHLIST
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Save your favorite 22KT Gold & 925 Sterling Silver pieces for later or add them to your cart.
            </p>
          </div>

          {lovedProducts.length > 0 && (
            <span className="bg-[#FFF3DC] text-[#C5A059] border border-[#F5E1BA] text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 fill-[#C5A059]" />
              {lovedProducts.length} Saved {lovedProducts.length === 1 ? "Item" : "Items"}
            </span>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#C8232A]" />
          </div>
        ) : lovedProducts.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-[#E8E3DA] text-center space-y-4 shadow-sm max-w-[600px] mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-[#FFF5F5] border border-red-100 text-[#C8232A] flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 text-[#C8232A]" />
            </div>
            <h2 className="text-xl font-serif font-semibold text-gray-900">Your Wishlist is Empty</h2>
            <p className="text-xs text-gray-500 leading-relaxed">
              Explore our handcrafted collection of authentic Bengali Sitahar, Solitaire Rings, and Silver Ornaments.
            </p>
            <Link
              href="/jewellery"
              className="inline-flex items-center gap-2 bg-[#C8232A] hover:bg-[#A81B21] text-white font-semibold text-xs py-3 px-7 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <span>Explore Gold & Silver Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {lovedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-[#E8E3DA] overflow-hidden hover:border-[#C8232A] hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-square bg-[#FAF8F5] overflow-hidden">
                    <Image
                      src={product.image || (product.images ? product.images[0] : "/logo.svg")}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />

                    {/* Delete Button */}
                    <button
                      onClick={() => handleRemoveFromWishlist(product)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-white transition-all cursor-pointer"
                      title="Remove from Wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {product.badge && (
                      <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded bg-[#C8232A] text-white">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="text-[10px] font-bold text-[#C5A059] uppercase tracking-wider mb-1">
                      {product.category || "Jewellery"}
                    </div>
                    <h3 className="font-semibold text-xs text-gray-900 line-clamp-2 mb-2 group-hover:text-[#C8232A] transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#1A1A1A]">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => handleAddToCartClick(product)}
                    className="w-full py-2.5 bg-[#1A1A1A] hover:bg-[#C8232A] text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <MainFooter />
    </main>
  );
}
