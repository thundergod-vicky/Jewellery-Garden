"use client";

import React, { useState, useEffect } from "react";
import { ShoppingBag, Truck, CheckCircle2, Clock, ShieldCheck, Search } from "lucide-react";

interface OrderItem {
  id: string;
  orderNumber: string;
  customerEmail: string;
  customerPhone: string;
  totalAmount: number;
  gstAmount: number;
  itemsCount: number;
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED";
  paymentStatus: "PAID" | "PENDING";
  createdAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>([
    {
      id: "ord-1",
      orderNumber: "JG-2026-8812",
      customerEmail: "customer@gmail.com",
      customerPhone: "+91 98321 44556",
      totalAmount: 34800,
      gstAmount: 1013,
      itemsCount: 1,
      status: "PROCESSING",
      paymentStatus: "PAID",
      createdAt: "2026-08-10 14:30",
    },
    {
      id: "ord-2",
      orderNumber: "JG-2026-8813",
      customerEmail: "bengali.bride@gmail.com",
      customerPhone: "+91 97330 99887",
      totalAmount: 89500,
      gstAmount: 2606,
      itemsCount: 1,
      status: "SHIPPED",
      paymentStatus: "PAID",
      createdAt: "2026-08-09 11:15",
    },
    {
      id: "ord-3",
      orderNumber: "JG-2026-8814",
      customerEmail: "durgapur.buyer@yahoo.com",
      customerPhone: "+91 76050 11223",
      totalAmount: 12521,
      gstAmount: 365,
      itemsCount: 1,
      status: "DELIVERED",
      paymentStatus: "PAID",
      createdAt: "2026-08-08 16:45",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch orders from NestJS API
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/orders");
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (err) {
        console.warn("Backend orders fetch warn:", err);
      }
    };
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: "PROCESSING" | "SHIPPED" | "DELIVERED") => {
    try {
      await fetch(`http://localhost:4000/api/orders/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (err) {
      console.warn("Update order status endpoint warning:", err);
    }

    setOrders((prev) =>
      prev.map((o) => (o.id === id || o.orderNumber === id ? { ...o, status: newStatus } : o))
    );
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "ALL" || o.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-[1440px] mx-auto animate-in fade-in duration-300">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#E8E3DA] shadow-sm">
        <div>
          <h2 className="font-serif-title font-bold text-xl text-[#1A1A1A] flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C8232A]" />
            <span>Order Fulfillment & Logistics</span>
          </h2>
          <p className="text-xs text-gray-500">
            Track customer orders, manage express insured shipping, and update order statuses.
          </p>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order ID or Customer Email..."
            className="w-full text-xs pl-10 pr-4 py-2.5 bg-white border border-[#E8E3DA] rounded-xl focus:border-[#C8232A] focus:outline-none shadow-sm"
          />
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-[#E8E3DA] shadow-sm text-xs font-medium">
          {["ALL", "PROCESSING", "SHIPPED", "DELIVERED"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                filterStatus === st
                  ? "bg-[#1A1A1A] text-white font-bold shadow"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Data Table */}
      <div className="bg-white rounded-3xl border border-[#E8E3DA] shadow-sm overflow-hidden text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#E8E3DA] text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="p-4">Order ID & Date</th>
                <th className="p-4">Customer Contact</th>
                <th className="p-4">Total Amount (Inc. GST)</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Delivery Status</th>
                <th className="p-4 text-right">Update Logistics Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-gray-50/80 transition-colors">
                  {/* Order ID & Date */}
                  <td className="p-4">
                    <p className="font-bold text-gray-900 font-mono text-xs">{ord.orderNumber}</p>
                    <span className="text-[10px] text-gray-400 font-medium">{ord.createdAt}</span>
                  </td>

                  {/* Customer Contact */}
                  <td className="p-4">
                    <p className="font-semibold text-gray-800">{ord.customerEmail}</p>
                    <span className="text-[11px] text-gray-500">{ord.customerPhone}</span>
                  </td>

                  {/* Total Amount */}
                  <td className="p-4">
                    <p className="font-bold text-gray-900">₹{ord.totalAmount.toLocaleString("en-IN")}</p>
                    <span className="text-[10px] text-gray-400">Includes 3% GST (₹{ord.gstAmount})</span>
                  </td>

                  {/* Payment */}
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <ShieldCheck className="w-3 h-3" /> PAID
                    </span>
                  </td>

                  {/* Status Pill */}
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full border ${
                        ord.status === "PROCESSING"
                          ? "bg-amber-50 text-amber-800 border-amber-200"
                          : ord.status === "SHIPPED"
                          ? "bg-blue-50 text-blue-800 border-blue-200"
                          : "bg-emerald-50 text-emerald-800 border-emerald-200"
                      }`}
                    >
                      {ord.status === "PROCESSING" && <Clock className="w-3.5 h-3.5" />}
                      {ord.status === "SHIPPED" && <Truck className="w-3.5 h-3.5" />}
                      {ord.status === "DELIVERED" && <CheckCircle2 className="w-3.5 h-3.5" />}
                      <span>{ord.status}</span>
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {ord.status === "PROCESSING" && (
                        <button
                          onClick={() => handleUpdateStatus(ord.id, "SHIPPED")}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] px-3 py-1.5 rounded-xl shadow-sm transition-all"
                        >
                          Mark Shipped
                        </button>
                      )}

                      {ord.status === "SHIPPED" && (
                        <button
                          onClick={() => handleUpdateStatus(ord.id, "DELIVERED")}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] px-3 py-1.5 rounded-xl shadow-sm transition-all"
                        >
                          Mark Delivered
                        </button>
                      )}

                      {ord.status === "DELIVERED" && (
                        <span className="text-[11px] text-gray-400 font-medium">Order Completed</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
