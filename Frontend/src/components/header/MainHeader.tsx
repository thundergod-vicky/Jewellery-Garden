"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, Camera, Mic, Gift, User, Heart, ShoppingBag, Sparkles } from "lucide-react";
import { SITE_DATA } from "@/data/siteData";

export default function MainHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const router = useRouter();

  React.useEffect(() => {
    const syncCounts = () => {
      if (typeof window !== "undefined") {
        const savedCart = localStorage.getItem("jg-cart-items");
        if (savedCart) {
          try {
            const items = JSON.parse(savedCart);
            const total = items.reduce((acc: number, item: any) => acc + (item.quantity || 1), 0);
            setCartCount(total);
          } catch (e) {
            setCartCount(0);
          }
        } else {
          setCartCount(0);
        }

        const savedWishlist = localStorage.getItem("jg-wishlist-items");
        if (savedWishlist) {
          try {
            const items = JSON.parse(savedWishlist);
            setWishlistCount(items.length);
          } catch (e) {
            setWishlistCount(0);
          }
        } else {
          setWishlistCount(0);
        }
      }
    };

    syncCounts();
    window.addEventListener("jg-cart-updated", syncCounts);
    window.addEventListener("jg-wishlist-updated", syncCounts);

    return () => {
      window.removeEventListener("jg-cart-updated", syncCounts);
      window.removeEventListener("jg-wishlist-updated", syncCounts);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/jewellery?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push(`/jewellery`);
    }
  };

  return (
    <div className="bg-white border-b border-[#E8E3DA] sticky top-0 z-50 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo */}
        <a href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-[180px] h-[52px]">
            <Image
              src={SITE_DATA.logoUrl}
              alt={SITE_DATA.brandName}
              fill
              className="object-contain"
              priority
              unoptimized
            />
          </div>
        </a>

        {/* Center: Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-[560px] relative hidden md:block">
          <div className="relative flex items-center">
            <button type="submit" className="absolute left-4 text-gray-400 hover:text-[#C8232A] transition-colors">
              <Search className="w-4 h-4" />
            </button>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search for "22KT Gold Ring", "Bengali Sitahar", "925 Silver"...'
              className="w-full bg-[#F6F6F6] hover:bg-[#F0F0F0] focus:bg-white text-sm text-[#1A1A1A] placeholder:text-gray-400 pl-11 pr-20 py-2.5 rounded-full border border-transparent focus:border-[#C8232A] focus:outline-none transition-all shadow-inner"
            />
            <div className="absolute right-3 flex items-center gap-2 text-gray-400">
              <button
                type="button"
                title="Visual Search"
                className="hover:text-[#C8232A] transition-colors p-1"
              >
                <Camera className="w-4 h-4" />
              </button>
              <button
                type="button"
                title="Voice Search"
                className="hover:text-[#C8232A] transition-colors p-1"
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>

        {/* Right: Quick Action Scheme Cards & Utility Icons */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Gold & Silver Schemes Badge */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href="#schemes"
              className="flex items-center gap-1.5 bg-[#FFFBF0] border border-[#C5A059] hover:bg-[#F9F0D9] text-[#7A5816] text-[12px] font-semibold py-1.5 px-3 rounded-md transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Jewellery Garden Schemes</span>
            </a>
          </div>

          {/* Dedicated Icons */}
          <div className="flex items-center gap-2 sm:gap-3 text-gray-700">
            <a
              href="/jewellery"
              title="Browse All Jewellery"
              className="hover:text-[#C8232A] p-2 hover:bg-red-50 rounded-full transition-all md:hidden"
            >
              <Search className="w-5 h-5" />
            </a>

            <button
              title="Gift Cards"
              className="hover:text-[#C8232A] p-2 hover:bg-red-50 rounded-full transition-all relative"
            >
              <Gift className="w-5 h-5 text-gray-700" />
            </button>

            <a
              href="/wishlist"
              title="Wishlist"
              className="hover:text-[#C8232A] p-2 hover:bg-red-50 rounded-full transition-all relative"
            >
              <Heart className="w-5 h-5 text-gray-700" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C8232A] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </a>

            <a
              href="/cart"
              title="Shopping Cart"
              className="hover:text-[#C8232A] p-2 hover:bg-red-50 rounded-full transition-all relative"
            >
              <ShoppingBag className="w-5 h-5 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C8232A] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </a>

            <a
              href="/account"
              title="User Account"
              className="hover:text-[#C8232A] p-2 hover:bg-red-50 rounded-full transition-all"
            >
              <User className="w-5 h-5 text-gray-700" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
