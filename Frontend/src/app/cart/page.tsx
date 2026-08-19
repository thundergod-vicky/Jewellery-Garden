"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Trash2,
  Plus,
  Minus,
  ShieldCheck,
  ArrowRight,
  ShoppingBag,
  Check,
  CreditCard,
  Truck,
  RotateCcw,
  Sparkles,
  MapPin,
  Phone,
  User,
  CheckCircle2,
  Lock,
  Loader2,
  QrCode,
  Banknote,
} from "lucide-react";
import toast from "react-hot-toast";
import TopBar from "@/components/header/TopBar";
import MainHeader from "@/components/header/MainHeader";
import CategoryMenu from "@/components/header/CategoryMenu";
import MainFooter from "@/components/footer/MainFooter";
import { useAuth } from "@/lib/AuthContext";
import { PRODUCTS_CATALOG } from "@/data/siteData";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000").replace("localhost", "127.0.0.1");

export default function CartPage() {
  const router = useRouter();
  const { user, profile } = useAuth();

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");

  // Checkout Steps
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "address" | "payment" | "success">("cart");

  // Shipping Form State
  const [fullName, setFullName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [pincode, setPincode] = useState("");
  const [flat, setFlat] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("Durgapur");
  const [stateVal, setStateVal] = useState("West Bengal");

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "netbanking" | "cod">("card");
  const [placingOrder, setPlacingOrder] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  useEffect(() => {
    loadCartFromStorage();
    window.addEventListener("jg-cart-updated", loadCartFromStorage);
    return () => window.removeEventListener("jg-cart-updated", loadCartFromStorage);
  }, []);

  useEffect(() => {
    if (profile) {
      setFullName(profile.username || user?.displayName || "");
      setPhoneNum(profile.phone || "");

      if (profile.addresses && profile.addresses.length > 0) {
        try {
          const parsed = JSON.parse(profile.addresses[0]);
          setFlat(parsed.flat || "");
          setArea(parsed.area || "");
          setCity(parsed.city || "Durgapur");
          setStateVal(parsed.state || "West Bengal");
          setPincode(parsed.pincode || "713216");
        } catch (e) {}
      }
    }
  }, [profile, user]);

  const loadCartFromStorage = () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("jg-cart-items");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Hydrate products if missing image or price
          const hydrated = parsed.map((item: any) => {
            const catalogMatch = PRODUCTS_CATALOG.find((p) => p.id === (item.product?.id || item.id));
            const prod = item.product || catalogMatch || {
              id: item.id || "item-1",
              name: "Jewellery Item",
              price: 12500,
              image: "/logo.svg",
              category: "Jewellery",
            };
            return {
              ...item,
              product: prod,
              quantity: item.quantity || 1,
            };
          });
          setCartItems(hydrated);
        } catch (e) {
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    const updated = cartItems
      .map((item) => {
        if ((item.product?.id || item.id) === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean) as any[];

    setCartItems(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("jg-cart-items", JSON.stringify(updated));
      window.dispatchEvent(new Event("jg-cart-updated"));
    }
  };

  const removeItem = (id: string) => {
    const updated = cartItems.filter((item) => (item.product?.id || item.id) !== id);
    setCartItems(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("jg-cart-items", JSON.stringify(updated));
      window.dispatchEvent(new Event("jg-cart-updated"));
    }
    toast.success("Item removed from cart");
  };

  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === "JGD2026" || code === "WELCOME10" || code === "SAAJ10") {
      setDiscountPercent(10);
      setAppliedCoupon(code);
      toast.success("Coupon code applied! 10% discount deducted.");
    } else {
      toast.error("Invalid coupon code. Try JGD2026");
    }
  };

  // Pricing calculations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.product?.price || 0) * item.quantity,
    0
  );
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const gstAmount = Math.round((subtotal - discountAmount) * 0.03);
  const grandTotal = subtotal - discountAmount + gstAmount;

  const handleProceedToAddress = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    setCheckoutStep("address");
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNum.trim() || !pincode.trim() || !flat.trim()) {
      toast.error("Please fill in all shipping address fields.");
      return;
    }
    setCheckoutStep("payment");
  };

  const handlePlaceOrder = async () => {
    setPlacingOrder(true);
    try {
      const orderId = `JG-${Math.floor(10000 + Math.random() * 90000)}`;

      const isCod = paymentMethod.toUpperCase() === "COD";
      const orderPayload = {
        id: orderId,
        orderId,
        firebaseId: user?.uid || "guest-user",
        customerName: fullName || user?.displayName || "Valued Customer",
        customerEmail: user?.email || "customer@jewellerygarden.com",
        customerPhone: phoneNum || "",
        address: `${flat}, ${area}, ${city}, ${stateVal} - ${pincode}`,
        totalAmount: grandTotal,
        paymentMethod: paymentMethod.toUpperCase(),
        paymentStatus: isCod ? "PENDING" : "PAID",
        status: isCod ? "PENDING" : "COMPLETED",
        createdAt: new Date().toISOString(),
        items: cartItems.map((item) => ({
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.images ? item.product.images[0] : item.product.image,
        })),
      };

      try {
        const res = await fetch(`${API_BASE}/api/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderPayload),
        });

        if (res.ok) {
          const orderData = await res.json();
          setCompletedOrder(orderData);
        } else {
          setCompletedOrder(orderPayload);
        }
      } catch (err) {
        setCompletedOrder(orderPayload);
      }

      // Always persist to local customer order history for instant visibility
      if (typeof window !== "undefined") {
        try {
          const existing = localStorage.getItem("jg-user-orders");
          let list = existing ? JSON.parse(existing) : [];
          list.unshift(orderPayload);
          localStorage.setItem("jg-user-orders", JSON.stringify(list));

          const adminExisting = localStorage.getItem("jg-admin-orders");
          let adminList = adminExisting ? JSON.parse(adminExisting) : [];
          adminList.unshift(orderPayload);
          localStorage.setItem("jg-admin-orders", JSON.stringify(adminList));

          if (user?.uid) {
            const userSpecific = localStorage.getItem(`jg-orders-${user.uid}`);
            let userList = userSpecific ? JSON.parse(userSpecific) : [];
            userList.unshift(orderPayload);
            localStorage.setItem(`jg-orders-${user.uid}`, JSON.stringify(userList));
          }

          localStorage.removeItem("jg-cart-items");
          window.dispatchEvent(new Event("jg-cart-updated"));
          window.dispatchEvent(new Event("jg-orders-updated"));
        } catch (e) {
          console.error("Failed to save local order:", e);
        }
      }

      setCheckoutStep("success");
      toast.success("Order placed successfully! 🎉");
    } catch (err: any) {
      console.warn("Order creation error:", err);
      toast.error("Error processing order. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] flex flex-col font-sans">
      <TopBar />
      <MainHeader />
      <CategoryMenu />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 flex-1 w-full text-left">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 flex items-center gap-2 mb-6">
          <Link href="/" className="hover:text-[#C8232A]">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-gray-800">
            {checkoutStep === "cart"
              ? "Shopping Bag"
              : checkoutStep === "address"
              ? "Shipping Address"
              : checkoutStep === "payment"
              ? "Payment & Review"
              : "Order Confirmation"}
          </span>
        </div>

        {/* Step Progress Bar */}
        <div className="bg-white border border-[#E8E3DA] rounded-2xl p-4 mb-8 shadow-xs flex items-center justify-between max-w-[800px] mx-auto">
          <div
            onClick={() => checkoutStep !== "success" && setCheckoutStep("cart")}
            className={`flex items-center gap-2 text-xs font-semibold cursor-pointer ${
              checkoutStep === "cart" ? "text-[#C8232A]" : "text-gray-400"
            }`}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              checkoutStep === "cart" ? "bg-[#C8232A] text-white" : "bg-gray-100 text-gray-500"
            }`}>
              1
            </span>
            <span>Shopping Bag</span>
          </div>

          <div className="w-12 h-px bg-gray-200" />

          <div
            onClick={() => checkoutStep !== "success" && cartItems.length > 0 && setCheckoutStep("address")}
            className={`flex items-center gap-2 text-xs font-semibold cursor-pointer ${
              checkoutStep === "address" ? "text-[#C8232A]" : "text-gray-400"
            }`}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              checkoutStep === "address" ? "bg-[#C8232A] text-white" : "bg-gray-100 text-gray-500"
            }`}>
              2
            </span>
            <span>Shipping Details</span>
          </div>

          <div className="w-12 h-px bg-gray-200" />

          <div
            className={`flex items-center gap-2 text-xs font-semibold ${
              checkoutStep === "payment" ? "text-[#C8232A]" : "text-gray-400"
            }`}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              checkoutStep === "payment" ? "bg-[#C8232A] text-white" : "bg-gray-100 text-gray-500"
            }`}>
              3
            </span>
            <span>Payment</span>
          </div>
        </div>

        {/* STEP 1: SHOPPING BAG VIEW */}
        {checkoutStep === "cart" && (
          <div>
            <h1 className="text-3xl font-serif font-medium tracking-wide text-[#1A1A1A] mb-8">
              YOUR SHOPPING BAG ({cartItems.length} {cartItems.length === 1 ? "Item" : "Items"})
            </h1>

            {cartItems.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-[#E8E3DA] text-center space-y-4 shadow-sm max-w-[600px] mx-auto my-8">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto" />
                <h2 className="text-xl font-serif font-semibold text-gray-800">Your Shopping Bag is Empty</h2>
                <p className="text-xs text-gray-500">Explore authentic 22KT Gold and 925 Sterling Silver collections.</p>
                <Link
                  href="/jewellery"
                  className="inline-block bg-[#C8232A] hover:bg-[#A81B21] text-white font-semibold text-xs py-3 px-8 rounded-xl shadow-sm transition-all"
                >
                  Browse Gold & Silver Collection →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.map((item) => {
                    const prod = item.product || {};
                    const itemId = prod.id || item.id;
                    const imageSrc = prod.images ? prod.images[0] : prod.image || "/logo.svg";

                    return (
                      <div
                        key={itemId}
                        className="bg-white p-5 rounded-2xl border border-[#E8E3DA] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6"
                      >
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          <div className="relative w-20 h-20 bg-[#FAF8F5] rounded-xl overflow-hidden shrink-0 border border-gray-100">
                            <Image
                              src={imageSrc}
                              alt={prod.name || "Product"}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-wider block">
                              {prod.category || "Authentic Jewellery"}
                            </span>
                            <h3 className="font-semibold text-xs text-[#1A1A1A] line-clamp-2">
                              {prod.name}
                            </h3>
                            <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                              <span>BIS 916 Hallmarked</span>
                              <span>•</span>
                              <span>Size: {item.size || "14"}</span>
                            </div>
                            <div className="font-bold text-sm text-[#C8232A] mt-1">
                              ₹{(prod.price || 0).toLocaleString()}
                            </div>
                          </div>
                        </div>

                        {/* Quantity Controls & Delete */}
                        <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-[#F6F6F6]">
                            <button
                              onClick={() => updateQuantity(itemId, -1)}
                              className="p-2 hover:bg-gray-200 text-gray-600 transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-xs font-semibold text-gray-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(itemId, 1)}
                              className="p-2 hover:bg-gray-200 text-gray-600 transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="font-bold text-sm text-gray-900 min-w-[90px] text-right">
                            ₹{((prod.price || 0) * item.quantity).toLocaleString()}
                          </div>

                          <button
                            onClick={() => removeItem(itemId)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Remove Item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Order Summary Side Card */}
                <div className="bg-white p-6 rounded-2xl border border-[#E8E3DA] shadow-xs space-y-6">
                  <h2 className="text-base font-serif font-bold text-gray-900 border-b border-gray-100 pb-3">
                    Order Summary
                  </h2>

                  {/* Coupon Code Input */}
                  <form onSubmit={applyCoupon} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Coupon (e.g. JGD2026)"
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-xl bg-[#F6F6F6] text-xs uppercase text-gray-900 focus:outline-none focus:border-[#C8232A]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#C8232A] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>

                  {appliedCoupon && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs px-3 py-2 rounded-xl flex items-center justify-between font-semibold">
                      <span>Applied: {appliedCoupon} (-10%)</span>
                      <button onClick={() => setDiscountPercent(0)} className="text-red-500 text-[10px]">
                        Remove
                      </button>
                    </div>
                  )}

                  {/* Pricing Rows */}
                  <div className="space-y-3 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>Subtotal ({cartItems.length} items)</span>
                      <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString()}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>Coupon Discount</span>
                        <span>-₹{discountAmount.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Estimated GST (3%)</span>
                      <span className="font-semibold text-gray-900">₹{gstAmount.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Express Insured Shipping</span>
                      <span className="font-semibold text-emerald-600">FREE</span>
                    </div>

                    <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-bold text-[#1A1A1A]">
                      <span>Grand Total</span>
                      <span className="text-[#C8232A]">₹{grandTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleProceedToAddress}
                    className="w-full py-3.5 bg-[#C8232A] hover:bg-[#A81B21] text-white text-xs font-semibold tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <span>PROCEED TO CHECKOUT</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="pt-2 border-t border-gray-100 grid grid-cols-3 gap-2 text-[10px] text-gray-500 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>100% Certified</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Truck className="w-4 h-4 text-blue-600" />
                      <span>Insured Transit</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <RotateCcw className="w-4 h-4 text-amber-600" />
                      <span>15-Day Return</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: SHIPPING ADDRESS DETAILS */}
        {checkoutStep === "address" && (
          <div className="max-w-[700px] mx-auto bg-white p-8 rounded-2xl border border-[#E8E3DA] shadow-xs">
            <h2 className="text-xl font-serif font-semibold text-gray-900 mb-2">
              Shipping & Delivery Address
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              Enter the recipient details where your insured jewellery package will be delivered.
            </p>

            <form onSubmit={handleProceedToPayment} className="flex flex-col gap-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-gray-700">Full Name</label>
                  <div className="relative flex items-center">
                    <User className="absolute left-3.5 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Souvik Basu"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-[#F9F9F9] text-xs text-gray-900 focus:outline-none focus:border-[#C8232A]"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-gray-700">Mobile Phone Number</label>
                  <div className="relative flex items-center">
                    <Phone className="absolute left-3.5 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      value={phoneNum}
                      onChange={(e) => setPhoneNum(e.target.value)}
                      placeholder="+91 98000 00000"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-[#F9F9F9] text-xs text-gray-900 focus:outline-none focus:border-[#C8232A]"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-gray-700">Flat / House No. / Building Name</label>
                <div className="relative flex items-center">
                  <MapPin className="absolute left-3.5 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={flat}
                    onChange={(e) => setFlat(e.target.value)}
                    placeholder="e.g. Flat 4B, Emerald Heights"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-[#F9F9F9] text-xs text-gray-900 focus:outline-none focus:border-[#C8232A]"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-gray-700">Street / Area / Landmark</label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. City Centre, Near Junction Mall"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-[#F9F9F9] text-xs text-gray-900 focus:outline-none focus:border-[#C8232A]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-gray-700">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl bg-[#F9F9F9] text-xs text-gray-900 focus:outline-none focus:border-[#C8232A]"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-gray-700">State</label>
                  <input
                    type="text"
                    value={stateVal}
                    onChange={(e) => setStateVal(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl bg-[#F9F9F9] text-xs text-gray-900 focus:outline-none focus:border-[#C8232A]"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-gray-700">Pincode</label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="713216"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl bg-[#F9F9F9] text-xs text-gray-900 focus:outline-none focus:border-[#C8232A]"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center border-t border-gray-100 mt-4">
                <button
                  type="button"
                  onClick={() => setCheckoutStep("cart")}
                  className="px-5 py-2.5 border border-gray-200 text-gray-700 text-xs font-semibold rounded-xl hover:bg-gray-50 transition-all"
                >
                  Back to Bag
                </button>

                <button
                  type="submit"
                  className="px-7 py-2.5 bg-[#C8232A] hover:bg-[#A81B21] text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 3: PAYMENT & REVIEW */}
        {checkoutStep === "payment" && (
          <div className="max-w-[750px] mx-auto bg-white p-8 rounded-2xl border border-[#E8E3DA] shadow-xs space-y-6">
            <div>
              <h2 className="text-xl font-serif font-semibold text-gray-900 mb-1">
                Select Payment Method
              </h2>
              <p className="text-xs text-gray-500">
                All transactions are tokenized and encrypted with PCI-DSS 256-bit SSL security.
              </p>
            </div>

            {/* Payment Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setPaymentMethod("card")}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                  paymentMethod === "card"
                    ? "border-[#C8232A] bg-[#FFFBFB] shadow-xs"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-red-50 text-[#C8232A] flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Credit / Debit Card</h4>
                  <p className="text-[10px] text-gray-400">Visa, Mastercard, RuPay, Amex</p>
                </div>
              </div>

              <div
                onClick={() => setPaymentMethod("upi")}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                  paymentMethod === "upi"
                    ? "border-[#C8232A] bg-[#FFFBFB] shadow-xs"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">UPI Instant Payment</h4>
                  <p className="text-[10px] text-gray-400">GPay, PhonePe, Paytm, BHIM</p>
                </div>
              </div>

              <div
                onClick={() => setPaymentMethod("netbanking")}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                  paymentMethod === "netbanking"
                    ? "border-[#C8232A] bg-[#FFFBFB] shadow-xs"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">NetBanking</h4>
                  <p className="text-[10px] text-gray-400">HDFC, ICICI, SBI, Axis Bank</p>
                </div>
              </div>

              <div
                onClick={() => setPaymentMethod("cod")}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                  paymentMethod === "cod"
                    ? "border-[#C8232A] bg-[#FFFBFB] shadow-xs"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Banknote className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Cash on Delivery (COD)</h4>
                  <p className="text-[10px] text-gray-400">Pay cash upon delivery verification</p>
                </div>
              </div>
            </div>

            {/* Order Review Box */}
            <div className="bg-[#FAF8F5] border border-[#E8E3DA] p-4 rounded-xl space-y-2 text-xs text-gray-700">
              <div className="flex justify-between">
                <span>Shipping Recipient:</span>
                <span className="font-semibold text-gray-900">{fullName} ({phoneNum})</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Address:</span>
                <span className="font-semibold text-gray-900 text-right">{flat}, {city} - {pincode}</span>
              </div>
              <div className="flex justify-between text-sm font-bold border-t border-gray-200 pt-2 text-[#1A1A1A]">
                <span>Total Amount Payable:</span>
                <span className="text-[#C8232A]">₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center border-t border-gray-100">
              <button
                type="button"
                onClick={() => setCheckoutStep("address")}
                className="px-5 py-2.5 border border-gray-200 text-gray-700 text-xs font-semibold rounded-xl hover:bg-gray-50 transition-all"
              >
                Back to Address
              </button>

              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={placingOrder}
                className="px-8 py-3 bg-[#C8232A] hover:bg-[#A81B21] text-white text-xs font-semibold tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                {placingOrder ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>CONFIRM & PLACE ORDER</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: ORDER CONFIRMATION SUCCESS */}
        {checkoutStep === "success" && completedOrder && (
          <div className="max-w-[650px] mx-auto bg-white p-8 rounded-2xl border border-[#E8E3DA] shadow-md text-center space-y-6 my-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#C5A059] uppercase block mb-1">
                ORDER CONFIRMED
              </span>
              <h2 className="text-2xl font-serif font-bold text-gray-900">
                Thank You, {completedOrder.customerName || fullName}!
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Your jewellery order has been received and sent to our master craftsmen for dispatch.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#E8E3DA] space-y-2 text-xs text-left">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Order Reference ID:</span>
                <span className="font-mono font-bold text-gray-900">{completedOrder.orderId}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Total Paid:</span>
                <span className="font-bold text-[#C8232A]">₹{grandTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Payment Mode:</span>
                <span className="font-semibold text-gray-900">{paymentMethod.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Estimated Delivery:</span>
                <span className="font-semibold text-emerald-700">3 - 5 Business Days (Insured)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/account/orders"
                className="w-full sm:w-auto px-6 py-3 bg-[#C8232A] hover:bg-[#A81B21] text-white text-xs font-semibold rounded-xl transition-all shadow-xs"
              >
                View In Your Orders
              </Link>
              <Link
                href="/jewellery"
                className="w-full sm:w-auto px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-800 text-xs font-semibold rounded-xl transition-all"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>

      <MainFooter />
    </main>
  );
}
