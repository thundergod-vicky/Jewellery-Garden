"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingBag, Search, Download, CheckCircle, Clock, Truck, X, Loader2, Database } from "lucide-react";

interface OrderItem {
  id: string;
  orderNumber: string;
  customerEmail: string;
  customerPhone: string;
  totalAmount: number;
  gstAmount: number;
  itemsCount: number;
  status: "COMPLETED" | "PENDING" | "CANCELLED";
  paymentStatus: "PAID" | "PENDING" | "COD (PENDING)";
  paymentMethod?: string;
  createdAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchOrders = async () => {
    setIsLoading(true);
    let apiOrders: OrderItem[] = [];
    try {
      const res = await fetch("http://localhost:4000/api/orders");
      if (res.ok) {
        const data = await res.json();
        apiOrders = data.map((o: any) => {
          const isCod = (o.paymentMethod || "").toUpperCase() === "COD" || o.paymentStatus === "PENDING" || o.status === "PENDING";
          return {
            id: o.id || o.orderId,
            orderNumber: o.orderNumber || o.orderId || `JG-${o.id.slice(0, 6)}`,
            customerEmail: o.customerEmail || "customer@gmail.com",
            customerPhone: o.customerPhone || "+91 98000 00000",
            totalAmount: o.totalAmount || 0,
            gstAmount: o.gstAmount || 0,
            itemsCount: o.itemsCount || (o.items ? o.items.length : 1),
            status: o.status === "COMPLETED" ? "COMPLETED" : o.status === "CANCELLED" ? "CANCELLED" : "PENDING",
            paymentStatus: isCod ? "COD (PENDING)" : (o.paymentStatus || "PAID"),
            paymentMethod: (o.paymentMethod || "COD").toUpperCase(),
            createdAt: o.createdAt ? new Date(o.createdAt).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "Today",
          };
        });
      }
    } catch (e) {
      console.error("Error fetching orders from PostgreSQL database:", e);
    }

    let localOrders: OrderItem[] = [];
    if (typeof window !== "undefined") {
      try {
        const adminSaved = localStorage.getItem("jg-admin-orders");
        const userSaved = localStorage.getItem("jg-user-orders");

        const parsedAdmin = adminSaved ? JSON.parse(adminSaved) : [];
        const parsedUser = userSaved ? JSON.parse(userSaved) : [];

        [...parsedAdmin, ...parsedUser].forEach((o: any) => {
          const isCod = (o.paymentMethod || "").toUpperCase() === "COD" || o.paymentStatus === "PENDING" || o.status === "PENDING";
          localOrders.push({
            id: o.id || o.orderId,
            orderNumber: o.orderNumber || o.orderId || "JG-UNKNOWN",
            customerEmail: o.customerEmail || "customer@gmail.com",
            customerPhone: o.customerPhone || "+91 98000 00000",
            totalAmount: o.totalAmount || 0,
            gstAmount: Math.round((o.totalAmount || 0) * 0.03),
            itemsCount: o.items ? o.items.length : 1,
            status: o.status === "COMPLETED" ? "COMPLETED" : o.status === "CANCELLED" ? "CANCELLED" : "PENDING",
            paymentStatus: isCod ? "COD (PENDING)" : "PAID",
            paymentMethod: (o.paymentMethod || "COD").toUpperCase(),
            createdAt: o.createdAt ? new Date(o.createdAt).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "Today",
          });
        });
      } catch (err) {
        console.error("Error reading local admin orders:", err);
      }
    }

    const mergedMap = new Map<string, OrderItem>();
    localOrders.forEach((o) => {
      if (o.orderNumber) mergedMap.set(o.orderNumber, o);
    });
    apiOrders.forEach((o) => {
      if (o.orderNumber) mergedMap.set(o.orderNumber, o);
    });

    const combined = Array.from(mergedMap.values());
    setOrders(combined);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOrders();
    const handleSync = () => fetchOrders();
    window.addEventListener("jg-orders-updated", handleSync);
    return () => window.removeEventListener("jg-orders-updated", handleSync);
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`http://localhost:4000/api/orders/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchOrders();
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "ALL" || o.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-5 max-w-[1440px] mx-auto font-sans pb-6">
      
      {/* Top Title Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-[#16181D] p-5 rounded-[24px] border border-[#EBEFF5] dark:border-gray-800 shadow-sm transition-colors duration-500">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C8232A]" />
            <span>Orders & Invoices</span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono px-2 py-0.5 rounded-full flex items-center gap-1">
              <Database className="w-2.5 h-2.5" /> PostgreSQL Table
            </span>
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Monitor and fulfill customer jewellery orders fetched live from PostgreSQL database
          </p>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white dark:bg-[#16181D] border border-[#EBEFF5] dark:border-gray-800 rounded-[28px] p-5 shadow-sm dark:shadow-xl space-y-4 transition-colors duration-500">
        
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search Order ID, Customer Email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-2 bg-[#EEF1F5] dark:bg-gray-800 text-gray-800 dark:text-white rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          {/* Status Filter Pills */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#EEF1F5] dark:bg-gray-800 p-1 rounded-full text-xs">
              {(["ALL", "COMPLETED", "PENDING", "CANCELLED"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={`px-3 py-1 rounded-full font-medium transition-all ${
                    filterStatus === s
                      ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-2xs font-bold"
                      : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <button className="p-2 bg-[#EEF1F5] dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Data Table */}
        <div className="w-full overflow-x-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-16 text-xs text-gray-400">
              No order records found in PostgreSQL database.
            </div>
          ) : (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="text-[9px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
                  <th className="pb-3 pr-2">ORDER ID</th>
                  <th className="pb-3 pr-2">CUSTOMER</th>
                  <th className="pb-3 pr-2">DATE & TIME</th>
                  <th className="pb-3 pr-2">TOTAL AMOUNT</th>
                  <th className="pb-3 pr-2">PAYMENT</th>
                  <th className="pb-3 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800/60">
                {filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="py-3 pr-2 font-mono font-bold text-gray-900 dark:text-white text-xs">
                      {o.orderNumber}
                    </td>
                    <td className="py-3 pr-2 leading-tight">
                      <p className="font-semibold text-gray-900 dark:text-white text-xs">{o.customerEmail}</p>
                      <span className="text-[10px] text-gray-400">{o.customerPhone}</span>
                    </td>
                    <td className="py-3 pr-2 text-gray-500 dark:text-gray-400 text-xs">
                      {o.createdAt}
                    </td>

                    {/* Total Amount */}
                    <td className="py-3 pr-2 font-extrabold text-gray-900 dark:text-white text-xs">
                      ₹{o.totalAmount.toLocaleString("en-IN")}
                      <span className="text-[9px] font-normal text-gray-400 block">incl. 3% GST</span>
                    </td>

                    {/* Payment Status */}
                    <td className="py-3 pr-2">
                      <span
                        className={`font-bold px-2 py-0.5 rounded-full text-[10px] inline-block border ${
                          o.paymentStatus.includes("COD") || o.paymentStatus === "PENDING"
                            ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300"
                            : "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400"
                        }`}
                      >
                        {o.paymentStatus}
                      </span>
                    </td>

                    {/* Status Select */}
                    <td className="py-3 text-right">
                      <select
                        value={o.status}
                        onChange={(e) => handleUpdateStatus(o.id, e.target.value)}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full border focus:outline-none cursor-pointer ${
                          o.status === "COMPLETED"
                            ? "bg-[#E3F9ED] text-[#12B76A] border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-400"
                            : o.status === "CANCELLED"
                            ? "bg-[#FEE4E2] text-[#F04438] border-rose-300 dark:bg-rose-950/60 dark:text-rose-400"
                            : "bg-[#E0F2FE] text-[#0284C7] border-sky-300 dark:bg-sky-950/60 dark:text-sky-400"
                        }`}
                      >
                        <option value="COMPLETED">Completed</option>
                        <option value="PENDING">Pending</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>

    </div>
  );
}
