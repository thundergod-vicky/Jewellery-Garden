"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, Heart, Zap, Star, ShoppingCart, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import toast from "react-hot-toast";
import TopBar from "@/components/header/TopBar";
import MainHeader from "@/components/header/MainHeader";
import CategoryMenu from "@/components/header/CategoryMenu";
import MainFooter from "@/components/footer/MainFooter";
import SeoFooter from "@/components/footer/SeoFooter";
import FloatingActions from "@/components/common/FloatingActions";
import { PRODUCTS_CATALOG } from "@/data/siteData";
import { addToCart, toggleWishlist, getWishlistIds } from "@/lib/cartWishlist";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialMetal = searchParams.get("metal") || "All";
  const initialCategory = searchParams.get("category") || "all";
  const initialMinPrice = Number(searchParams.get("minPrice")) || 0;
  const initialMaxPrice = Number(searchParams.get("maxPrice")) || 100000;

  const [query, setQuery] = useState(initialQuery);
  const [selectedMetal, setSelectedMetal] = useState(initialMetal);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [minPrice, setMinPrice] = useState<number>(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState<number>(initialMaxPrice);
  const [sortBy, setSortBy] = useState<"featured" | "lowToHigh" | "highToLow" | "rating">("featured");
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    setWishlist(getWishlistIds());
    const syncWishlist = () => setWishlist(getWishlistIds());
    window.addEventListener("jg-wishlist-updated", syncWishlist);
    return () => window.removeEventListener("jg-wishlist-updated", syncWishlist);
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS_CATALOG.filter((product) => {
      // Search query match
      if (query.trim()) {
        const q = query.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesMetal = product.metal.toLowerCase().includes(q);
        const matchesPurity = product.purity.toLowerCase().includes(q);
        if (!matchesName && !matchesCategory && !matchesMetal && !matchesPurity) {
          return false;
        }
      }

      // Metal match
      if (selectedMetal !== "All" && product.metal !== selectedMetal) {
        return false;
      }

      // Category match
      if (selectedCategory !== "all" && product.categorySlug !== selectedCategory) {
        return false;
      }

      // Price match
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "lowToHigh") return a.price - b.price;
      if (sortBy === "highToLow") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [query, selectedMetal, selectedCategory, minPrice, maxPrice, sortBy]);

  const handleToggleWishlist = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10">
      {/* Header Title & Breadcrumb */}
      <div className="mb-8 space-y-2">
        <div className="text-xs text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#C8232A]">Home</Link>
          <span>/</span>
          <span className="font-semibold text-gray-800">Gold & Silver Jewellery</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#1A1A1A]">
          {selectedCategory !== "all"
            ? `${selectedCategory.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}`
            : selectedMetal === "All"
            ? "Gold & Silver Jewellery Collection"
            : `${selectedMetal} Jewellery`}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Showing {filteredProducts.length} authentic 22KT Gold & 925 Sterling Silver pieces with BIS Hallmark guarantee.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Live Filter Search input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search gold, silver, rings..."
            className="w-full text-xs bg-[#F6F6F6] focus:bg-white pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#C8232A] focus:outline-none"
          />
        </div>

        {/* Metal Filter Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#C8232A]" />
            Metal:
          </span>
          {["All", "Gold", "Silver"].map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMetal(m)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                selectedMetal === m
                  ? "bg-[#C8232A] text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#D4AF37]" />
            Sort:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs bg-gray-100 border border-gray-200 py-1.5 px-3 rounded-md font-medium text-gray-800 focus:outline-none"
          >
            <option value="featured">Featured Bestsellers</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
          </select>
        </div>
      </div>

      {/* Main Grid & Filters Sidebar Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <div className="w-full lg:w-64 shrink-0 bg-white p-5 rounded-2xl border border-[#E8E3DA] shadow-sm space-y-6 h-fit">
          <h3 className="font-serif-title font-bold text-sm text-[#1A1A1A] pb-2 border-b border-gray-200">
            Filter Products
          </h3>

          {/* Categories */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#C8232A] uppercase tracking-wider block">
              Categories
            </label>
            <div className="space-y-1.5 text-xs text-gray-600">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`block w-full text-left py-1 hover:text-[#C8232A] ${
                  selectedCategory === "all" ? "font-bold text-[#C8232A]" : ""
                }`}
              >
                All Categories ({PRODUCTS_CATALOG.length})
              </button>
              <button
                onClick={() => setSelectedCategory("gold-nosepin")}
                className={`block w-full text-left py-1 hover:text-[#C8232A] ${
                  selectedCategory === "gold-nosepin" ? "font-bold text-[#C8232A]" : ""
                }`}
              >
                Gold & Diamond Nosepin
              </button>
              <button
                onClick={() => setSelectedCategory("gold-rings")}
                className={`block w-full text-left py-1 hover:text-[#C8232A] ${
                  selectedCategory === "gold-rings" ? "font-bold text-[#C8232A]" : ""
                }`}
              >
                Gold Rings
              </button>
              <button
                onClick={() => setSelectedCategory("gold-earrings")}
                className={`block w-full text-left py-1 hover:text-[#C8232A] ${
                  selectedCategory === "gold-earrings" ? "font-bold text-[#C8232A]" : ""
                }`}
              >
                Gold Earrings & Jhumkas
              </button>
              <button
                onClick={() => setSelectedCategory("gold-necklaces")}
                className={`block w-full text-left py-1 hover:text-[#C8232A] ${
                  selectedCategory === "gold-necklaces" ? "font-bold text-[#C8232A]" : ""
                }`}
              >
                Gold Sitahars & Necklaces
              </button>
              <button
                onClick={() => setSelectedCategory("silver-bangles")}
                className={`block w-full text-left py-1 hover:text-[#C8232A] ${
                  selectedCategory === "silver-bangles" ? "font-bold text-[#C8232A]" : ""
                }`}
              >
                925 Silver Bangles
              </button>
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-gray-700">Max Price:</span>
              <span className="text-[#C8232A]">₹ {maxPrice.toLocaleString("en-IN")}</span>
            </div>
            <input
              type="range"
              min="3000"
              max="100000"
              step="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#C8232A] cursor-pointer"
            />
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-[#E8E3DA] text-center space-y-3">
              <Search className="w-10 h-10 text-gray-300 mx-auto" />
              <h3 className="text-lg font-serif-title font-bold text-gray-700">No Gold or Silver Jewellery Found</h3>
              <p className="text-xs text-gray-500">Try adjusting your search keywords or clearing price filters.</p>
              <button
                onClick={() => { setQuery(""); setSelectedMetal("All"); setSelectedCategory("all"); setMinPrice(0); setMaxPrice(100000); }}
                className="mt-2 inline-block bg-[#C8232A] text-white text-xs font-semibold py-2 px-6 rounded-md"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const isWishlisted = wishlist.includes(product.id);
                // Unique Shareable SEO Link Structure: /jewellery/[categorySlug]/[slug]
                const productUrl = `/jewellery/${product.categorySlug}/${product.slug}`;

                return (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl overflow-hidden border border-[#E8E3DA] shadow-luxury shadow-luxury-hover transition-all flex flex-col justify-between"
                  >
                    <Link href={productUrl} className="block relative w-full h-64 bg-[#F6F6F6] p-4 overflow-hidden">
                      <span className="absolute top-3 left-3 bg-[#C8232A] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow z-10">
                        {product.purity}
                      </span>

                      {product.express && (
                        <span className="absolute top-3 right-14 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow z-10 flex items-center gap-1">
                          <Zap className="w-3 h-3 fill-current" />
                          Express
                        </span>
                      )}

                      <button
                        onClick={(e) => handleToggleWishlist(product, e)}
                        title="Add to Wishlist"
                        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm shadow flex items-center justify-center hover:bg-white transition-all cursor-pointer"
                      >
                        <Heart
                          className={`w-4 h-4 ${
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
                    </Link>

                    <div className="p-4 bg-white space-y-2 border-t border-[#F0EDE6] flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-[#C8232A] uppercase tracking-wider">
                            {product.metal} • {product.category}
                          </span>
                          <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            <span>{product.rating}</span>
                          </div>
                        </div>

                        <Link href={productUrl} className="font-semibold text-sm text-[#1A1A1A] line-clamp-1 group-hover:text-[#C8232A] transition-colors block mt-1">
                          {product.name}
                        </Link>

                        <p className="text-[11px] text-gray-400 mt-0.5">Weight: {product.grossWeight}</p>

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
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </button>
                        <Link
                          href={productUrl}
                          className="bg-[#FAF8F5] hover:bg-gray-200 text-gray-800 border border-[#E8E3DA] font-semibold text-xs py-2.5 px-3 rounded-lg flex items-center justify-center gap-1 transition-all"
                        >
                          <span>Details</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A]">
      <TopBar />
      <MainHeader />
      <CategoryMenu />
      <Suspense fallback={<div className="py-20 text-center text-sm font-semibold">Loading Gold & Silver Products...</div>}>
        <ProductsContent />
      </Suspense>
      <MainFooter />
      <SeoFooter />
      <FloatingActions />
    </main>
  );
}
