"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShoppingBag, Search, Download, CheckCircle, Clock, Truck, X } from "lucide-react";

interface OrderItem {
  id: string;
  orderNumber: string;
  customerEmail: string;
  customerPhone: string;
  totalAmount: number;
  gstAmount: number;
  itemsCount: number;
  status: "COMPLETED" | "PENDING" | "CANCELLED";
  paymentStatus: "PAID" | "PENDING";
  createdAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>([
    {
      id: "ord-1",
      orderNumber: "TK-98421",
      customerEmail: "customer@gmail.com",
      customerPhone: "+91 98321 44556",
      totalAmount: 34800,
      gstAmount: 1013,
      itemsCount: 1,
      status: "COMPLETED",
      paymentStatus: "PAID",
      createdAt: "19 Nov 2025, 10:32",
    },
    {
      id: "ord-2",
      orderNumber: "TK-98422",
      customerEmail: "bengali.bride@gmail.com",
      customerPhone: "+91 97330 99887",
      totalAmount: 89500,
      gstAmount: 2606,
      itemsCount: 1,
      status: "CANCELLED",
      paymentStatus: "PAID",
      createdAt: "19 Nov 2025, 11:05",
    },
    {
      id: "ord-3",
      orderNumber: "TK-98423",
      customerEmail: "durgapur.buyer@yahoo.com",
      customerPhone: "+91 76050 11223",
      totalAmount: 12521,
      gstAmount: 365,
      itemsCount: 1,
      status: "PENDING",
      paymentStatus: "PAID",
      createdAt: "19 Nov 2025, 11:44",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const handleUpdateStatus = (id: string, newStatus: "COMPLETED" | "PENDING" | "CANCELLED") => {
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
    <div className="space-y-6 max-w-[1440px] mx-auto animate-in fade-in duration-300 text-[#1A1C1E]">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-[28px] border border-[#EBEFF5] shadow-sm">
        <div>
          <h2 className="font-serif-title font-bold text-xl text-gray-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#1A1C1E]" />
            <span>Orders & Invoices</span>
          </h2>
          <p className="text-xs text-gray-400">
            Track customer orders, manage express insured shipping, and view invoice details.
          </p>
        </div>

        <button className="bg-[#1A1C1E] hover:bg-black text-white text-xs font-semibold px-4 py-2.5 rounded-full flex items-center gap-1.5 shadow-sm transition-all">
          <Download className="w-4 h-4" />
          <span>Export All Invoices</span>
        </button>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order ID or Customer..."
            className="w-full text-xs pl-10 pr-4 py-2.5 bg-[#EEF1F5] rounded-full focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 bg-white p-1.5 rounded-full border border-[#EBEFF5] shadow-2xs text-xs font-medium">
          {["ALL", "COMPLETED", "PENDING", "CANCELLED"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-4 py-1.5 rounded-full transition-all ${
                filterStatus === st
                  ? "bg-[#1A1C1E] text-white font-bold shadow"
                  : "text-gray-600 hover:bg-[#EEF1F5]"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Data Table */}
      <div className="bg-white rounded-[28px] border border-[#EBEFF5] shadow-sm overflow-hidden text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#EBEFF5] text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="p-4">Order ID & Date</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Total Price</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Logistics Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4 font-bold font-mono text-gray-800">
                    <p>{ord.orderNumber}</p>
                    <span className="text-[10px] text-gray-400 font-sans">{ord.createdAt}</span>
                  </td>

                  <td className="p-4 font-semibold text-gray-800">
                    <p>{ord.customerEmail}</p>
                    <span className="text-[10px] text-gray-400">{ord.customerPhone}</span>
                  </td>

                  <td className="p-4 font-bold text-gray-900">
                    ₹{ord.totalAmount.toLocaleString("en-IN")}
                  </td>

                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#E3F9ED] text-[#12B76A] px-3 py-1 rounded-full">
                      PAID
                    </span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`inline-block px-3.5 py-1 rounded-full text-[11px] font-semibold ${
                        ord.status === "COMPLETED"
                          ? "bg-[#E3F9ED] text-[#12B76A]"
                          : ord.status === "CANCELLED"
                          ? "bg-[#FEE4E2] text-[#F04438]"
                          : "bg-[#E0F2FE] text-[#0284C7]"
                      }`}
                    >
                      {ord.status}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {ord.status === "PENDING" && (
                        <button
                          onClick={() => handleUpdateStatus(ord.id, "COMPLETED")}
                          className="bg-[#1A1C1E] text-white text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-2xs hover:bg-black"
                        >
                          Mark Completed
                        </button>
                      )}
                      {ord.status === "COMPLETED" && (
                        <span className="text-gray-400 text-[11px] font-medium">Completed</span>
                      )}
                      {ord.status === "CANCELLED" && (
                        <span className="text-gray-400 text-[11px] font-medium">Order Cancelled</span>
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
