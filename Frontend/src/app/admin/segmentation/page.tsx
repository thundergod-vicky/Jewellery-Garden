"use client";

import React, { useState, useEffect } from "react";
import { Users, Award, TrendingUp, RefreshCw, Mail, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000").replace("localhost", "127.0.0.1");

interface SegmentUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  cohort: "VIP Client" | "Frequent Buyer" | "Dormant" | "New Customer";
  ltv: number;
  totalOrders: number;
  lastPurchase: string;
}

export default function AdminSegmentationPage() {
  const [users, setUsers] = useState<SegmentUser[]>([]);
  const [cohortFilter, setCohortFilter] = useState<string>("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRealCustomers();
  }, []);

  const fetchRealCustomers = async () => {
    setLoading(true);
    let apiCustomers: any[] = [];
    try {
      const res = await fetch(`${API_BASE}/api/customers`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) apiCustomers = data;
      }
    } catch (err) {
      console.warn("Could not fetch customer cohorts from API:", err);
    }

    let localOrders: any[] = [];
    if (typeof window !== "undefined") {
      try {
        const adminSaved = localStorage.getItem("jg-admin-orders");
        const userSaved = localStorage.getItem("jg-user-orders");

        const parsedAdmin = adminSaved ? JSON.parse(adminSaved) : [];
        const parsedUser = userSaved ? JSON.parse(userSaved) : [];

        localOrders = [...parsedAdmin, ...parsedUser];
      } catch (e) {
        console.error("Error reading local orders for segmentation:", e);
      }
    }

    const customerMap = new Map<string, any>();
    apiCustomers.forEach((c) => {
      if (c.email) customerMap.set(c.email.toLowerCase(), c);
    });

    localOrders.forEach((o) => {
      const email = o.customerEmail ? o.customerEmail.toLowerCase() : null;
      if (email) {
        const existing = customerMap.get(email);
        if (existing) {
          existing.totalSpent = (existing.totalSpent || 0) + Number(o.totalAmount || 0);
          existing.totalOrders = (existing.totalOrders || 0) + 1;
        } else {
          customerMap.set(email, {
            id: `cust-${email}`,
            username: o.customerName || email.split("@")[0],
            email,
            phone: o.customerPhone || "Not specified",
            totalSpent: Number(o.totalAmount || 0),
            totalOrders: 1,
            createdAt: o.createdAt || new Date().toISOString(),
          });
        }
      }
    });

    const combinedList = Array.from(customerMap.values());
    const mapped: SegmentUser[] = combinedList.map((c: any) => {
      const ltv = c.totalSpent || 0;
      const orders = c.totalOrders || 0;
      let cohort: "VIP Client" | "Frequent Buyer" | "Dormant" | "New Customer" = "New Customer";

      if (ltv >= 50000 || orders >= 5) {
        cohort = "VIP Client";
      } else if (orders >= 2) {
        cohort = "Frequent Buyer";
      } else if (orders === 0) {
        cohort = "Dormant";
      }

      return {
        id: c.id,
        name: c.username || c.email?.split("@")[0] || "Customer",
        email: c.email || "",
        phone: c.phone || "Not specified",
        cohort,
        ltv,
        totalOrders: orders,
        lastPurchase: c.createdAt ? new Date(c.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Recently",
      };
    });

    setUsers(mapped);
    setLoading(false);
  };

  const handleSendVoucher = (name: string) => {
    toast.success(`Special VIP Voucher sent to ${name}! 💌`);
  };

  const filteredUsers = users.filter((u) => cohortFilter === "ALL" || u.cohort === cohortFilter);

  return (
    <div className="p-6 max-w-[1400px] mx-auto flex flex-col gap-6 text-left">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-2xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Customer RFM Segmentation & Cohorts
            </h1>
            <span className="bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-200 dark:border-purple-800/50">
              RFM Analytics
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Categorize registered clients by Recency, Frequency, and Monetary (LTV) value to target VIP offers and win-back dormant buyers.
          </p>
        </div>
      </div>

      {/* Cohort Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-xl p-4 shadow-xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">VIP Clients (&gt;₹50k)</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {users.filter((u) => u.cohort === "VIP Client").length}
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-xl p-4 shadow-xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">Frequent Buyers</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {users.filter((u) => u.cohort === "Frequent Buyer").length}
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-xl p-4 shadow-xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-600 flex items-center justify-center shrink-0">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">Dormant Clients</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {users.filter((u) => u.cohort === "Dormant").length}
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-xl p-4 shadow-xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">New Customers</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {users.filter((u) => u.cohort === "New Customer").length}
            </span>
          </div>
        </div>
      </div>

      {/* Cohorts Table */}
      <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#EAEFF5] dark:border-gray-800">
          <div className="flex items-center gap-2">
            {["ALL", "VIP Client", "Frequent Buyer", "Dormant", "New Customer"].map((cohort) => (
              <button
                key={cohort}
                onClick={() => setCohortFilter(cohort)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  cohortFilter === cohort
                    ? "bg-[#C8232A] text-white shadow-xs"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200"
                }`}
              >
                {cohort}
              </button>
            ))}
          </div>

          <span className="text-xs text-gray-400 font-medium">
            Showing {filteredUsers.length} clients
          </span>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="py-12 text-center text-xs text-gray-400 space-y-2">
            <Users className="w-8 h-8 text-gray-300 mx-auto" />
            <p>No registered clients found in this cohort segment.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#EAEFF5] dark:border-gray-800 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="pb-3 pl-2">CLIENT</th>
                  <th className="pb-3">COHORT</th>
                  <th className="pb-3">LIFETIME VALUE (LTV)</th>
                  <th className="pb-3">TOTAL ORDERS</th>
                  <th className="pb-3">LAST PURCHASE</th>
                  <th className="pb-3 text-right pr-2">ENGAGEMENT ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="py-3.5 pl-2">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900 dark:text-white">{user.name}</span>
                        <span className="text-[11px] text-gray-400">{user.email} • {user.phone}</span>
                      </div>
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          user.cohort === "VIP Client"
                            ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800"
                            : user.cohort === "Frequent Buyer"
                            ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800"
                            : user.cohort === "Dormant"
                            ? "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800"
                        }`}
                      >
                        {user.cohort}
                      </span>
                    </td>
                    <td className="py-3.5 font-bold text-gray-900 dark:text-white">
                      ₹{user.ltv.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3.5 text-gray-600 dark:text-gray-300">{user.totalOrders} Orders</td>
                    <td className="py-3.5 text-gray-500 dark:text-gray-400">{user.lastPurchase}</td>
                    <td className="py-3.5 text-right pr-2">
                      <button
                        onClick={() => handleSendVoucher(user.name)}
                        className="px-3 py-1.5 bg-gray-900 hover:bg-[#C8232A] text-white text-[11px] font-semibold rounded-lg transition-all inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Send Offer</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
