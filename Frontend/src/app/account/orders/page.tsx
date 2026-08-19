"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import MainHeader from "@/components/header/MainHeader";
import TopBar from "@/components/header/TopBar";
import MainFooter from "@/components/footer/MainFooter";
import { Loader2, ArrowLeft, ShoppingBag, Package } from "lucide-react";

export default function OrdersList() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (user) {
      fetchOrders();
      const handleSync = () => fetchOrders();
      window.addEventListener("jg-orders-updated", handleSync);
      return () => window.removeEventListener("jg-orders-updated", handleSync);
    }
  }, [user, loading, router]);

  const fetchOrders = async () => {
    let apiOrders: any[] = [];
    try {
      const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000").replace("localhost", "127.0.0.1");
      const res = await fetch(`${API_BASE}/api/orders/customer/${user.uid}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          apiOrders = data;
        }
      }
    } catch (err) {
      console.warn("Could not retrieve customer orders from API", err);
    }

    let localOrders: any[] = [];
    if (typeof window !== "undefined") {
      try {
        const globalSaved = localStorage.getItem("jg-user-orders");
        const userSaved = user?.uid ? localStorage.getItem(`jg-orders-${user.uid}`) : null;

        const parsedGlobal = globalSaved ? JSON.parse(globalSaved) : [];
        const parsedUser = userSaved ? JSON.parse(userSaved) : [];

        localOrders = [...parsedUser, ...parsedGlobal];
      } catch (e) {
        console.error("Error reading local orders:", e);
      }
    }

    const getOrderKey = (o: any) => {
      if (o.orderNumber && String(o.orderNumber).startsWith("JG-")) return o.orderNumber;
      if (o.orderId && String(o.orderId).startsWith("JG-")) return o.orderId;
      if (o.id && String(o.id).startsWith("JG-")) return o.id;
      return o.orderNumber || o.orderId || o.id;
    };

    const processOrder = (o: any) => {
      const orderNum = o.orderNumber || o.orderId || o.id;
      return {
        ...o,
        id: orderNum,
        orderId: orderNum,
        orderNumber: orderNum,
      };
    };

    const mergedMap = new Map<string, any>();

    apiOrders.forEach((o) => {
      const normalized = processOrder(o);
      const key = getOrderKey(normalized);
      if (key) mergedMap.set(key, normalized);
    });

    localOrders.forEach((o) => {
      const normalized = processOrder(o);
      const key = getOrderKey(normalized);
      if (key) mergedMap.set(key, normalized);
    });

    const combined = Array.from(mergedMap.values()).sort(
      (a: any, b: any) => new Date(b.createdAt || Date.now()).getTime() - new Date(a.createdAt || Date.now()).getTime()
    );

    setOrders(combined);
    setOrdersLoading(false);
  };

  if (loading || ordersLoading) {
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

      <section className="py-12 px-4 flex-1">
        <div className="max-w-[840px] mx-auto">
          <div className="mb-6">
            <Link
              href="/account"
              className="text-xs font-semibold text-[#C8232A] hover:underline inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              BACK TO ACCOUNT
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="font-serif text-3xl font-medium tracking-widest text-[#1A1A1A] mb-2">
              YOUR ORDERS
            </h1>
            <p className="text-sm text-gray-500">
              Check the status of your past purchases and track deliveries.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {orders.map((order) => {
              let itemsList: any[] = [];
              if (order.items) {
                if (typeof order.items === "string") {
                  try {
                    itemsList = JSON.parse(order.items);
                  } catch (e) {
                    console.error("Failed to parse items for order:", order.id, e);
                  }
                } else if (Array.isArray(order.items)) {
                  itemsList = order.items;
                }
              }

              const orderDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });

              return (
                <div key={order.id} className="bg-white border border-[#E8E3DA] rounded-xl overflow-hidden shadow-sm">
                  {/* Order Card Header */}
                  <div className="bg-[#FAF8F5] border-b border-[#E8E3DA] p-4 sm:p-5 flex flex-wrap items-center gap-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-semibold tracking-wider text-gray-400 uppercase">ORDER PLACED</span>
                      <span className="text-xs font-medium text-[#1A1A1A]">{orderDate}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-semibold tracking-wider text-gray-400 uppercase">TOTAL AMOUNT</span>
                      <span className="text-xs font-medium text-[#1A1A1A]">₹{order.totalAmount?.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-semibold tracking-wider text-gray-400 uppercase">SHIP TO</span>
                      <span className="text-xs font-medium text-[#1A1A1A]">
                        {order.customerEmail || "Customer"}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 ml-auto text-right">
                      <span className="text-[9px] font-semibold tracking-wider text-gray-400 uppercase">ORDER ID</span>
                      <span className="text-xs font-mono font-medium text-[#1A1A1A]">
                        #{order.id.slice(-8).toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Order Delivery Status */}
                  <div className="px-5 py-3 border-b border-[#F0E6D2] bg-white flex items-center text-xs font-medium">
                    <Package className="w-4 h-4 text-[#C5A059] mr-2" />
                    <span className="text-gray-500 mr-1">Status: </span>
                    <span
                      className={`font-semibold ${
                        order.status === "COMPLETED" || order.status === "Delivered"
                          ? "text-emerald-600"
                          : order.status === "Shipped"
                          ? "text-[#C5A059]"
                          : "text-amber-600"
                      }`}
                    >
                      {String(order.status).toUpperCase()}
                    </span>
                  </div>

                  {/* Order Items */}
                  <div className="p-5 flex flex-col gap-4">
                    {itemsList.map((item: any, idx: number) => {
                      const itemProduct = item.product || item;
                      return (
                        <div key={idx} className="flex gap-4 items-start">
                          <img
                            src={
                              itemProduct.image ||
                              item.image ||
                              "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800"
                            }
                            alt={itemProduct.name || item.name}
                            className="w-16 h-16 object-cover rounded-lg border border-[#E8E3DA] shrink-0"
                          />
                          <div className="flex-1 text-left flex flex-col gap-1">
                            <h4 className="text-sm font-semibold text-[#1A1A1A] margin-0">
                              {itemProduct.name || item.name}
                            </h4>
                            <span className="text-xs text-gray-500">
                              Qty: {item.quantity || 1} • Price: ₹{(item.price || itemProduct.price)?.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {orders.length === 0 && (
              <div className="py-16 px-8 bg-white border border-[#E8E3DA] rounded-2xl flex flex-col items-center justify-center text-center">
                <ShoppingBag className="w-10 h-10 text-gray-300 mb-3" />
                <h4 className="text-base font-medium text-[#1A1A1A] mb-1.5">No Orders Placed Yet</h4>
                <p className="text-xs text-gray-500 mb-5">
                  You haven&apos;t ordered any jewellery from Jewellery Garden yet.
                </p>
                <Link
                  href="/jewellery"
                  className="px-6 py-2.5 bg-[#C8232A] hover:bg-[#A81B21] text-white text-xs font-semibold tracking-widest rounded-lg transition-all"
                >
                  GO TO SHOP
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <MainFooter />
    </main>
  );
}
