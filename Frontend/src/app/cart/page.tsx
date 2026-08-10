"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShieldCheck, ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import TopBar from "@/components/header/TopBar";
import MainHeader from "@/components/header/MainHeader";
import CategoryMenu from "@/components/header/CategoryMenu";
import MainFooter from "@/components/footer/MainFooter";
import SeoFooter from "@/components/footer/SeoFooter";
import FloatingActions from "@/components/common/FloatingActions";
import { PRODUCTS_CATALOG } from "@/data/siteData";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    { product: PRODUCTS_CATALOG[0], quantity: 1, size: "14" },
  ]);

  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as typeof prev
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== id));
  };

  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === "JGD2026" || couponCode.toUpperCase() === "WELCOME") {
      setDiscountPercent(10);
      setCouponMsg("Coupon code applied! 10% off making charges.");
    } else {
      setCouponMsg("Invalid coupon code. Try JGD2026");
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const gstAmount = Math.round((subtotal - discountAmount) * 0.03);
  const grandTotal = subtotal - discountAmount + gstAmount;

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
          <span className="font-semibold text-gray-800">Shopping Cart</span>
        </div>

        <h1 className="text-3xl font-serif-title font-bold text-[#1A1A1A] mb-8">
          Your Shopping Cart ({cartItems.length} {cartItems.length === 1 ? "Item" : "Items"})
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-[#E8E3DA] text-center space-y-4 shadow-luxury">
            <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto" />
            <h2 className="text-xl font-serif-title font-bold text-gray-800">Your Shopping Cart is Empty</h2>
            <p className="text-xs text-gray-500">Explore authentic 22KT Gold and 925 Sterling Silver collections.</p>
            <Link
              href="/jewellery"
              className="inline-block bg-[#C8232A] text-white font-semibold text-xs py-3 px-8 rounded-xl shadow"
            >
              Browse Gold & Silver Collection →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(({ product, quantity, size }) => (
                <div
                  key={product.id}
                  className="bg-white p-5 rounded-2xl border border-[#E8E3DA] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-24 h-24 bg-[#F6F6F6] rounded-xl overflow-hidden shrink-0 border border-gray-100">
                      <Image src={product.image} alt={product.name} fill className="object-cover" unoptimized />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold bg-red-50 text-[#C8232A] px-2 py-0.5 rounded uppercase">
                        {product.metal} • {product.purity}
                      </span>
                      <h3 className="font-semibold text-sm text-[#1A1A1A]">{product.name}</h3>
                      <p className="text-xs text-gray-500">Gross Weight: {product.grossWeight} | Size: {size}</p>
                      <p className="text-sm font-bold text-[#1A1A1A]">
                        ₹ {product.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  {/* Quantity & Delete Controls */}
                  <div className="flex items-center gap-6 shrink-0">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                      <button
                        onClick={() => updateQuantity(product.id, -1)}
                        className="p-2 hover:bg-gray-200 text-gray-700 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-4 text-xs font-bold text-gray-800">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, 1)}
                        className="p-2 hover:bg-gray-200 text-gray-700 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(product.id)}
                      title="Remove Item"
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Box */}
            <div className="bg-white p-6 rounded-3xl border border-[#E8E3DA] shadow-luxury h-fit space-y-6">
              <h3 className="font-serif-title font-bold text-base text-[#1A1A1A] pb-3 border-b border-gray-100">
                Order Summary
              </h3>

              {/* Coupon Form */}
              <form onSubmit={applyCoupon} className="space-y-2">
                <label className="text-xs font-semibold text-gray-700 block">Apply Offer Coupon:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter JGD2026"
                    className="flex-1 text-xs bg-gray-50 border border-gray-200 p-2.5 rounded-lg focus:outline-none focus:border-[#C8232A]"
                  />
                  <button
                    type="submit"
                    className="bg-[#1A1A1A] hover:bg-[#C8232A] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponMsg && (
                  <p className={`text-[11px] font-medium ${discountPercent > 0 ? "text-emerald-600" : "text-red-500"}`}>
                    {couponMsg}
                  </p>
                )}
              </form>

              {/* Price Calculations */}
              <div className="space-y-3 text-xs text-gray-600 border-t border-gray-100 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-gray-800">₹ {subtotal.toLocaleString("en-IN")}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Coupon Discount (10%):</span>
                    <span>- ₹ {discountAmount.toLocaleString("en-IN")}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>GST (3%):</span>
                  <span className="font-semibold text-gray-800">₹ {gstAmount.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Insured Door Shipping:</span>
                  <span>FREE</span>
                </div>

                <div className="flex justify-between items-baseline pt-3 border-t border-gray-200 text-base font-bold text-[#1A1A1A]">
                  <span>Total Payable:</span>
                  <span className="text-xl text-[#C8232A]">₹ {grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => alert("Redirecting to secure Jewellery Garden Checkout Gateway...")}
                className="w-full bg-[#C8232A] hover:bg-[#B81D24] text-white font-semibold text-sm py-3.5 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Encrypted & BIS Certified Transaction</span>
              </div>
            </div>

          </div>
        )}

      </div>

      <MainFooter />
      <SeoFooter />
      <FloatingActions />
    </main>
  );
}
