"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Plus,
  Trash2,
  Edit,
  Eye,
  MapPin,
  CreditCard,
  Mail,
  Phone,
  Calendar,
  Loader2,
  X,
  CheckCircle2,
  ShieldCheck,
  Building,
} from "lucide-react";
import toast from "react-hot-toast";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000").replace("localhost", "127.0.0.1");

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  // Modal States
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  // Form Fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    let apiCustomers: any[] = [];
    try {
      const res = await fetch(`${API_BASE}/api/customers`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) apiCustomers = data;
      }
    } catch (err) {
      console.warn("Could not fetch customers from backend API:", err);
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
        console.error("Error reading local orders for customer directory:", e);
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
            phone: o.customerPhone || "+91 98000 00000",
            addresses: [o.address || "Durgapur, West Bengal"],
            totalSpent: Number(o.totalAmount || 0),
            totalOrders: 1,
            role: "CUSTOMER",
            createdAt: o.createdAt || new Date().toISOString(),
          });
        }
      }
    });

    const combined = Array.from(customerMap.values());
    setCustomers(combined);
    setLoading(false);
  };

  const openAddModal = () => {
    setEditingCustomer(null);
    setUsername("");
    setEmail("");
    setPhone("");
    setAddressLine("");
    setCity("");
    setStateVal("");
    setPincode("");
    setIsFormModalOpen(true);
  };

  const openEditModal = (cust: any) => {
    setEditingCustomer(cust);
    setUsername(cust.username || "");
    setEmail(cust.email || "");
    setPhone(cust.phone || "");

    let parsedAddress: any = {};
    if (cust.addresses && cust.addresses.length > 0) {
      try {
        parsedAddress = JSON.parse(cust.addresses[0]);
      } catch (e) {
        parsedAddress = { flat: cust.addresses[0] };
      }
    }

    setAddressLine(parsedAddress.flat || parsedAddress.area || "");
    setCity(parsedAddress.city || "");
    setStateVal(parsedAddress.state || "");
    setPincode(parsedAddress.pincode || "");

    setIsFormModalOpen(true);
  };

  const handleSaveCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !email.trim()) {
      toast.error("Please fill in name and email.");
      return;
    }

    setSaving(true);
    try {
      const addressObj = {
        fullName: username.trim(),
        flat: addressLine.trim(),
        city: city.trim(),
        state: stateVal.trim(),
        pincode: pincode.trim(),
        country: "India",
        isDefault: true,
        addressType: "House",
      };

      const payload = {
        firebaseId: editingCustomer ? editingCustomer.firebaseId : `jg-uid-${Date.now()}`,
        email: email.trim(),
        username: username.trim(),
        phone: phone.trim(),
        addresses: [JSON.stringify(addressObj)],
      };

      if (editingCustomer) {
        const res = await fetch(`${API_BASE}/api/customers/${editingCustomer.firebaseId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          toast.success("Customer updated successfully!");
        }
      } else {
        const res = await fetch(`${API_BASE}/api/customers`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          toast.success("Customer created successfully!");
        }
      }

      setIsFormModalOpen(false);
      fetchCustomers();
    } catch (err: any) {
      toast.error("Failed to save customer: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCustomer = async (id: string) => {
    if (!confirm("Are you sure you want to delete this customer account?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/customers/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Customer account removed.");
        setCustomers((prev) => prev.filter((c) => c.id !== id && c.firebaseId !== id));
      } else {
        toast.error("Failed to delete customer");
      }
    } catch (err: any) {
      toast.error("Delete failed: " + err.message);
    }
  };

  // Filter customers by search query
  const filteredCustomers = customers.filter((cust) => {
    const q = searchQuery.toLowerCase();
    const nameStr = (cust.username || "").toLowerCase();
    const emailStr = (cust.email || "").toLowerCase();
    const phoneStr = (cust.phone || "").toLowerCase();

    let addrStr = "";
    if (cust.addresses) {
      addrStr = cust.addresses.join(" ").toLowerCase();
    }

    return nameStr.includes(q) || emailStr.includes(q) || phoneStr.includes(q) || addrStr.includes(q);
  });

  return (
    <div className="p-6 max-w-[1600px] mx-auto flex flex-col gap-6 text-left">
      {/* Top Banner Header */}
      <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-2xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Customer Directory & Insights
            </h1>
            <span className="bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/50 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Verified Directory
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            View and manage registered Jewellery Garden clients, saved addresses, contact numbers, and purchase credentials.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-[#C8232A] hover:bg-[#A81B21] text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Customer
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-xl p-4 shadow-xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block">
              Total Clients
            </span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {customers.length}
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-xl p-4 shadow-xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block">
              Verified Accounts
            </span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {customers.length}
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-xl p-4 shadow-xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block">
              Saved Delivery Addresses
            </span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {customers.reduce((acc, c) => acc + (c.addresses?.length || 0), 0)}
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-xl p-4 shadow-xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block">
              Tokenized Saved Cards
            </span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {customers.reduce((acc, c) => {
                if (!c.savedCards) return acc;
                try {
                  return acc + JSON.parse(c.savedCards).length;
                } catch (e) {
                  return acc;
                }
              }, 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-2xl shadow-xs overflow-hidden">
        {/* Search Control Bar */}
        <div className="p-4 border-b border-[#EAEFF5] dark:border-gray-800 flex items-center justify-between flex-wrap gap-3">
          <div className="relative flex items-center w-full sm:w-80">
            <Search className="absolute left-3.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Name, Email, Phone, City..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-[#F7F9FC] dark:bg-[#1A1D23] text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#C8232A]"
            />
          </div>

          <div className="text-xs text-gray-400 dark:text-gray-500">
            Showing <strong className="text-gray-900 dark:text-white">{filteredCustomers.length}</strong> of{" "}
            <strong>{customers.length}</strong> customers
          </div>
        </div>

        {/* Customer Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 animate-spin text-[#C8232A] mr-2" />
              <span className="text-xs text-gray-500">Loading customer database...</span>
            </div>
          ) : filteredCustomers.length === 0 ? (
            <div className="py-16 text-center text-gray-500 dark:text-gray-400 text-xs">
              No customers found matching your search.
            </div>
          ) : (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FAFBFD] dark:bg-[#16181C] border-b border-[#EAEFF5] dark:border-gray-800 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  <th className="py-3.5 px-5">CUSTOMER</th>
                  <th className="py-3.5 px-5">PHONE & CONTACT</th>
                  <th className="py-3.5 px-5">PRIMARY ADDRESS</th>
                  <th className="py-3.5 px-5">SAVED CARDS</th>
                  <th className="py-3.5 px-5">REGISTERED</th>
                  <th className="py-3.5 px-5 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEFF5] dark:divide-gray-800/60">
                {filteredCustomers.map((cust) => {
                  let primaryAddress: any = null;
                  if (cust.addresses && cust.addresses.length > 0) {
                    try {
                      primaryAddress = JSON.parse(cust.addresses[0]);
                    } catch (e) {
                      primaryAddress = { flat: cust.addresses[0] };
                    }
                  }

                  let cardsCount = 0;
                  if (cust.savedCards) {
                    try {
                      cardsCount = JSON.parse(cust.savedCards).length;
                    } catch (e) {}
                  }

                  const regDate = new Date(cust.createdAt || Date.now()).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  });

                  return (
                    <tr
                      key={cust.id}
                      className="hover:bg-[#FAFBFD] dark:hover:bg-[#16181C]/50 transition-colors"
                    >
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#1A1C1E] text-white font-serif flex items-center justify-center font-bold text-xs shrink-0 ring-1 ring-amber-400/40">
                            {cust.username ? cust.username.charAt(0).toUpperCase() : "C"}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">
                              {cust.username || "Anonymous Customer"}
                            </div>
                            <div className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                              <Mail className="w-3 h-3 text-gray-400" />
                              {cust.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-5">
                        {cust.phone ? (
                          <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                            <span>{cust.phone}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 italic text-[11px]">Not provided</span>
                        )}
                      </td>

                      <td className="py-4 px-5">
                        {primaryAddress ? (
                          <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 max-w-[240px] truncate">
                            <MapPin className="w-3.5 h-3.5 text-[#C8232A] shrink-0" />
                            <span className="truncate">
                              {primaryAddress.flat || primaryAddress.area},{" "}
                              {primaryAddress.city || "Durgapur"}
                            </span>
                            {cust.addresses.length > 1 && (
                              <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0">
                                +{cust.addresses.length - 1} more
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 italic text-[11px]">No address on file</span>
                        )}
                      </td>

                      <td className="py-4 px-5">
                        {cardsCount > 0 ? (
                          <span className="inline-flex items-center gap-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-purple-200 dark:border-purple-800/40">
                            <CreditCard className="w-3 h-3 text-purple-600" />
                            {cardsCount} {cardsCount === 1 ? "Saved Card" : "Saved Cards"}
                          </span>
                        ) : (
                          <span className="text-gray-400 italic text-[11px]">None</span>
                        )}
                      </td>

                      <td className="py-4 px-5 text-gray-500 dark:text-gray-400">
                        {regDate}
                      </td>

                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => {
                              setSelectedCustomer(cust);
                              setIsDetailModalOpen(true);
                            }}
                            className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => openEditModal(cust)}
                            className="p-1.5 text-gray-500 hover:text-[#C8232A] hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                            title="Edit Customer"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDeleteCustomer(cust.id)}
                            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                            title="Delete Customer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Customer Details Modal */}
      {isDetailModalOpen && selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-2xl p-6 w-full max-w-[560px] shadow-2xl text-left flex flex-col gap-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1A1C1E] text-white font-serif flex items-center justify-center font-bold text-sm">
                  {selectedCustomer.username?.charAt(0).toUpperCase() || "C"}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                    {selectedCustomer.username}
                  </h3>
                  <p className="text-xs text-gray-400">{selectedCustomer.email}</p>
                </div>
              </div>

              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-white rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-4 text-xs text-gray-700 dark:text-gray-300">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Customer ID / Firebase UID
                </span>
                <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-800 dark:text-gray-200">
                  {selectedCustomer.firebaseId || selectedCustomer.id}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Saved Delivery Addresses ({selectedCustomer.addresses?.length || 0})
                </span>
                {selectedCustomer.addresses && selectedCustomer.addresses.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {selectedCustomer.addresses.map((addrStr: string, i: number) => {
                      let parsed: any = {};
                      try {
                        parsed = JSON.parse(addrStr);
                      } catch (e) {
                        parsed = { flat: addrStr };
                      }
                      return (
                        <div
                          key={i}
                          className="p-3 bg-[#FAFBFD] dark:bg-[#1A1D23] border border-[#EAEFF5] dark:border-gray-800 rounded-xl"
                        >
                          <div className="font-semibold text-gray-900 dark:text-white mb-0.5">
                            {parsed.fullName || selectedCustomer.username}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400">
                            {parsed.flat}, {parsed.area}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400">
                            {parsed.city}, {parsed.state} - {parsed.pincode}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <span className="text-gray-400 italic">No addresses saved</span>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-end">
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-800 dark:text-white text-xs font-semibold rounded-xl transition-all"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Customer Modal */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-2xl p-6 w-full max-w-[500px] shadow-2xl text-left flex flex-col gap-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                {editingCustomer ? "Edit Customer Details" : "Add New Customer"}
              </h3>
              <button
                onClick={() => setIsFormModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-white rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCustomer} className="flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-700 dark:text-gray-300">Full Name</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. Souvik Basu"
                  className="px-3.5 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-gray-900 dark:text-white focus:outline-none focus:border-[#C8232A]"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-700 dark:text-gray-300">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="px-3.5 py-2 border border-[#EAEFF5] dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-gray-900 dark:text-white focus:outline-none focus:border-[#C8232A]"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-700 dark:text-gray-300">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                  className="px-3.5 py-2 border border-[#EAEFF5] dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-gray-900 dark:text-white focus:outline-none focus:border-[#C8232A]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-700 dark:text-gray-300">Address Line</label>
                <input
                  type="text"
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  placeholder="Flat No, Building, Street Address"
                  className="px-3.5 py-2 border border-[#EAEFF5] dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-gray-900 dark:text-white focus:outline-none focus:border-[#C8232A]"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Durgapur"
                    className="px-3.5 py-2 border border-[#EAEFF5] dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-gray-900 dark:text-white focus:outline-none focus:border-[#C8232A]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300">State</label>
                  <input
                    type="text"
                    value={stateVal}
                    onChange={(e) => setStateVal(e.target.value)}
                    placeholder="West Bengal"
                    className="px-3.5 py-2 border border-[#EAEFF5] dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-gray-900 dark:text-white focus:outline-none focus:border-[#C8232A]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300">Pincode</label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="713216"
                    className="px-3.5 py-2 border border-[#EAEFF5] dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-gray-900 dark:text-white focus:outline-none focus:border-[#C8232A]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-[#C8232A] hover:bg-[#A81B21] text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center min-w-[90px]"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Customer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
