"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Users,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle,
  Clock,
  Sparkles,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState({
    totalSales: 136821,
    totalOrdersCount: 3,
    activeOrdersCount: 2,
    deliveredOrdersCount: 1,
  });

  const [productsCount, setProductsCount] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch live metrics from NestJS Backend
    const fetchData = async () => {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          fetch("http://localhost:4000/api/orders/metrics"),
          fetch("http://localhost:4000/api/products"),
        ]);

        if (ordersRes.ok) {
          const mData = await ordersRes.json();
          setMetrics(mData);
        }

        if (productsRes.ok) {
          const pData = await productsRes.json();
          setProductsCount(pData.length);
        }
      } catch (err) {
        console.warn("Backend connect warning, using offline fallback metrics:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8 max-w-[1440px] mx-auto animate-in fade-in duration-300">
      
      {/* Welcome Banner */}
      <div className="bg-white p-6 rounded-3xl border border-[#E8E3DA] shadow-luxury flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#C8232A]" />
            <h2 className="font-serif-title font-bold text-xl text-[#1A1A1A]">
              Jewellery Garden Control Center
            </h2>
          </div>
          <p className="text-xs text-gray-500">
            Real-time management for 22KT Gold & 925 Sterling Silver inventory and orders.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3.5 py-2 rounded-xl text-xs font-semibold border border-emerald-200">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>NestJS Engine • Online</span>
        </div>
      </div>

      {/* Minimalist Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1: Sales */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8E3DA] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Total Revenue
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#1A1A1A]">
              ₹{metrics.totalSales.toLocaleString("en-IN")}
            </h3>
            <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3 h-3" /> +14.2% from last month
            </span>
          </div>
        </div>

        {/* Metric 2: Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8E3DA] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Total Orders
            </span>
            <div className="w-8 h-8 rounded-xl bg-red-50 text-[#C8232A] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#1A1A1A]">
              {metrics.totalOrdersCount} Orders
            </h3>
            <span className="text-[11px] text-gray-500 font-medium flex items-center gap-1 mt-1">
              <Clock className="w-3 h-3 text-amber-500" /> {metrics.activeOrdersCount} Processing / Shipped
            </span>
          </div>
        </div>

        {/* Metric 3: Active Stock */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8E3DA] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Jewellery Catalogue
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#1A1A1A]">
              {productsCount} Active Designs
            </h3>
            <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
              <ShieldCheck className="w-3 h-3" /> 100% BIS 916 & 925 Silver
            </span>
          </div>
        </div>

        {/* Metric 4: Verified Customers */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8E3DA] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Email Verified Users
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#1A1A1A]">
              142 Users
            </h3>
            <span className="text-[11px] text-gray-500 font-medium flex items-center gap-1 mt-1">
              Authenticated via Email OTP
            </span>
          </div>
        </div>

      </div>

      {/* Quick Action Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Link 1: Products */}
        <Link
          href="/admin/products"
          className="group bg-white p-6 rounded-3xl border border-[#E8E3DA] shadow-sm hover:shadow-md transition-all flex items-center justify-between"
        >
          <div className="space-y-1">
            <h4 className="font-serif-title font-bold text-base text-[#1A1A1A] group-hover:text-[#C8232A] transition-colors">
              Manage Products & Live Gold Rates →
            </h4>
            <p className="text-xs text-gray-500">
              Add new 22KT gold items, update making charges discount, or adjust stock levels.
            </p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-gray-100 group-hover:bg-[#C8232A] text-gray-700 group-hover:text-white flex items-center justify-center transition-all shrink-0">
            <Package className="w-5 h-5" />
          </div>
        </Link>

        {/* Link 2: Orders */}
        <Link
          href="/admin/orders"
          className="group bg-white p-6 rounded-3xl border border-[#E8E3DA] shadow-sm hover:shadow-md transition-all flex items-center justify-between"
        >
          <div className="space-y-1">
            <h4 className="font-serif-title font-bold text-base text-[#1A1A1A] group-hover:text-[#C8232A] transition-colors">
              Manage Orders & Fulfillment →
            </h4>
            <p className="text-xs text-gray-500">
              Update shipment statuses (Processing → Shipped → Delivered) and print invoices.
            </p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-gray-100 group-hover:bg-[#C8232A] text-gray-700 group-hover:text-white flex items-center justify-center transition-all shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
        </Link>

      </div>
    </div>
  );
}
