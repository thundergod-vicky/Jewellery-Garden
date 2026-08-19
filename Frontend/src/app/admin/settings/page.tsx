"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Store,
  ShieldCheck,
  Coins,
  Bell,
  Lock,
  Mail,
  Phone,
  MapPin,
  Percent,
  Check,
  Loader2,
  Moon,
  Sun,
  KeyRound,
  RefreshCw,
  Sliders,
  DollarSign,
} from "lucide-react";
import toast from "react-hot-toast";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<"store" | "security" | "rates" | "system">("store");
  const [saving, setSaving] = useState(false);

  // Store Configuration State
  const [storeName, setStoreName] = useState("Jewellery Garden Pvt Ltd");
  const [gstin, setGstin] = useState("19AABCJ1234F1Z5");
  const [supportEmail, setSupportEmail] = useState("support@jewellerygardenpvtltd.com");
  const [phone, setPhone] = useState("+91 98000 00000");
  const [showroomAddress, setShowroomAddress] = useState("Benachity Bazar & City Centre, Durgapur, West Bengal - 713216");
  const [currency, setCurrency] = useState("INR (₹)");
  const [gstRate, setGstRate] = useState("3%");

  // Security Credentials State
  const [adminEmail, setAdminEmail] = useState("admin@jewellerygardenpvtltd.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sessionExpiry, setSessionExpiry] = useState("7 Days");
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  // Metal Rates State
  const [rate24K, setRate24K] = useState("7650");
  const [rate22K, setRate22K] = useState("7015");
  const [rate18K, setRate18K] = useState("5740");
  const [rateSilver, setRateSilver] = useState("88");
  const [autoRateUpdate, setAutoRateUpdate] = useState(true);

  // System Preferences State
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");
  const [emailNotify, setEmailNotify] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [backupFreq, setBackupFreq] = useState("Daily");

  // Load saved settings from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedStore = localStorage.getItem("admin_setting_storeName");
      if (savedStore) setStoreName(savedStore);

      const savedEmail = localStorage.getItem("admin_email");
      if (savedEmail) setAdminEmail(savedEmail);

      const savedTheme = (localStorage.getItem("admin_theme") as "light" | "dark") || "light";
      setThemeMode(savedTheme);

      const saved24K = localStorage.getItem("admin_rate_24k");
      if (saved24K) setRate24K(saved24K);

      const saved22K = localStorage.getItem("admin_rate_22k");
      if (saved22K) setRate22K(saved22K);
    }
  }, []);

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword && newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match.");
      return;
    }

    setSaving(true);
    try {
      // Simulate network save
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (typeof window !== "undefined") {
        localStorage.setItem("admin_setting_storeName", storeName);
        localStorage.setItem("admin_email", adminEmail);
        localStorage.setItem("admin_theme", themeMode);
        localStorage.setItem("admin_rate_24k", rate24K);
        localStorage.setItem("admin_rate_22k", rate22K);

        if (themeMode === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }

      if (newPassword) {
        toast.success("Admin password and settings updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.success("Settings saved successfully!");
      }
    } catch (err: any) {
      toast.error("Failed to save settings: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "store", label: "Store Configuration", icon: Store },
    { id: "security", label: "Security Credentials", icon: ShieldCheck },
    { id: "rates", label: "Live Metal Rates", icon: Coins },
    { id: "system", label: "System Preferences", icon: Sliders },
  ];

  return (
    <div className="p-6 max-w-[1400px] mx-auto flex flex-col gap-6 text-left">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-2xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              System & Control Panel Settings
            </h1>
            <span className="bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800/50">
              Live Config
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Configure store profile, admin security credentials, gold/silver rates, tax, and system preferences.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="px-5 py-2.5 bg-[#C8232A] hover:bg-[#A81B21] text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2 shrink-0 cursor-pointer disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
          <span>Save Changes</span>
        </button>
      </div>

      {/* Main Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Navigation Sidebar Tabs */}
        <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-2xl p-3 shadow-xs flex flex-col gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left ${
                  isActive
                    ? "bg-[#C8232A] text-white shadow-xs"
                    : "text-gray-600 dark:text-gray-400 hover:bg-[#F7F9FC] dark:hover:bg-[#1A1D23] hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Settings Content Area */}
        <div className="lg:col-span-3 bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-xs">
          <form onSubmit={handleSaveAll} className="flex flex-col gap-6">
            {/* TAB 1: STORE CONFIGURATION */}
            {activeTab === "store" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                    Store Configuration
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Primary company details displayed on receipts, invoices, and customer emails.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      Store Name
                    </label>
                    <div className="relative flex items-center">
                      <Store className="absolute left-3.5 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#C8232A]"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      GSTIN / Business Registration
                    </label>
                    <div className="relative flex items-center">
                      <ShieldCheck className="absolute left-3.5 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={gstin}
                        onChange={(e) => setGstin(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#C8232A]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      Support Email Address
                    </label>
                    <div className="relative flex items-center">
                      <Mail className="absolute left-3.5 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        value={supportEmail}
                        onChange={(e) => setSupportEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#C8232A]"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      Helpline Phone Number
                    </label>
                    <div className="relative flex items-center">
                      <Phone className="absolute left-3.5 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#C8232A]"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Primary Showroom Address
                  </label>
                  <div className="relative flex items-center">
                    <MapPin className="absolute left-3.5 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={showroomAddress}
                      onChange={(e) => setShowroomAddress(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#C8232A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      Default Currency
                    </label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#C8232A]"
                    >
                      <option value="INR (₹)">INR (₹)</option>
                      <option value="USD ($)">USD ($)</option>
                      <option value="EUR (€)">EUR (€)</option>
                      <option value="AED (AED)">AED (AED)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      GST Jewellery Tax Rate
                    </label>
                    <div className="relative flex items-center">
                      <Percent className="absolute left-3.5 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={gstRate}
                        onChange={(e) => setGstRate(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#C8232A]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SECURITY CREDENTIALS */}
            {activeTab === "security" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                    Security Credentials
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Update master admin email address, change admin password, and manage session security.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Admin Email Address
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3.5 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#C8232A]"
                      required
                    />
                  </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-4 flex flex-col gap-4">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    Change Password
                  </h4>

                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      Current Admin Password
                    </label>
                    <div className="relative flex items-center">
                      <Lock className="absolute left-3.5 w-4 h-4 text-gray-400" />
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#C8232A]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        New Password
                      </label>
                      <div className="relative flex items-center">
                        <KeyRound className="absolute left-3.5 w-4 h-4 text-gray-400" />
                        <input
                          type="password"
                          placeholder="New secure password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#C8232A]"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        Confirm New Password
                      </label>
                      <div className="relative flex items-center">
                        <KeyRound className="absolute left-3.5 w-4 h-4 text-gray-400" />
                        <input
                          type="password"
                          placeholder="Repeat new password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#C8232A]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-gray-900 dark:text-white block">
                        Two-Factor Authentication (2FA)
                      </span>
                      <span className="text-[11px] text-gray-400">
                        Require OTP verification on master admin login.
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={twoFactorAuth}
                      onChange={(e) => setTwoFactorAuth(e.target.checked)}
                      className="w-4 h-4 text-[#C8232A] rounded border-gray-300 focus:ring-[#C8232A]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: LIVE METAL RATES */}
            {activeTab === "rates" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                    Live Metal Rates & Pricing Rules
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Set daily benchmark rates per gram for Gold (24K, 22K, 18K) and 925 Sterling Silver.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      24KT Pure Gold Rate (₹/g)
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-gray-400 font-bold text-xs">₹</span>
                      <input
                        type="number"
                        value={rate24K}
                        onChange={(e) => setRate24K(e.target.value)}
                        className="w-full pl-8 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#C8232A]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      22KT Jewellery Gold Rate (₹/g)
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-gray-400 font-bold text-xs">₹</span>
                      <input
                        type="number"
                        value={rate22K}
                        onChange={(e) => setRate22K(e.target.value)}
                        className="w-full pl-8 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#C8232A]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      18KT Diamond Gold Rate (₹/g)
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-gray-400 font-bold text-xs">₹</span>
                      <input
                        type="number"
                        value={rate18K}
                        onChange={(e) => setRate18K(e.target.value)}
                        className="w-full pl-8 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#C8232A]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      925 Sterling Silver Rate (₹/g)
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-gray-400 font-bold text-xs">₹</span>
                      <input
                        type="number"
                        value={rateSilver}
                        onChange={(e) => setRateSilver(e.target.value)}
                        className="w-full pl-8 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#C8232A]"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-[#FAFBFD] dark:bg-[#16181C] border border-[#EAEFF5] dark:border-gray-800 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <RefreshCw className="w-4 h-4 text-emerald-500 shrink-0" />
                    <div className="text-left">
                      <span className="text-xs font-semibold text-gray-900 dark:text-white block">
                        Auto-Update Product Prices from Benchmark Rates
                      </span>
                      <span className="text-[11px] text-gray-400">
                        Dynamically recalculate gold & silver jewellery prices when rates change.
                      </span>
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    checked={autoRateUpdate}
                    onChange={(e) => setAutoRateUpdate(e.target.checked)}
                    className="w-4 h-4 text-[#C8232A] rounded border-gray-300 focus:ring-[#C8232A]"
                  />
                </div>
              </div>
            )}

            {/* TAB 4: SYSTEM PREFERENCES */}
            {activeTab === "system" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                    System Preferences
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Customize themes, notification triggers, and data backup schedules.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between p-3.5 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                      {themeMode === "dark" ? (
                        <Moon className="w-5 h-5 text-indigo-400" />
                      ) : (
                        <Sun className="w-5 h-5 text-amber-500" />
                      )}
                      <div>
                        <span className="text-xs font-semibold text-gray-900 dark:text-white block">
                          Control Panel Interface Theme
                        </span>
                        <span className="text-[11px] text-gray-400">
                          Toggle between Dark Mode and Light Mode.
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setThemeMode(themeMode === "light" ? "dark" : "light")}
                      className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-white rounded-lg shadow-xs hover:bg-gray-50 transition-all cursor-pointer"
                    >
                      {themeMode === "light" ? "Switch to Dark" : "Switch to Light"}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-blue-500" />
                      <div>
                        <span className="text-xs font-semibold text-gray-900 dark:text-white block">
                          Email Notifications on New Orders
                        </span>
                        <span className="text-[11px] text-gray-400">
                          Receive instant alert emails whenever a customer places an order.
                        </span>
                      </div>
                    </div>

                    <input
                      type="checkbox"
                      checked={emailNotify}
                      onChange={(e) => setEmailNotify(e.target.checked)}
                      className="w-4 h-4 text-[#C8232A] rounded border-gray-300 focus:ring-[#C8232A]"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                      <RefreshCw className="w-5 h-5 text-purple-500" />
                      <div>
                        <span className="text-xs font-semibold text-gray-900 dark:text-white block">
                          Database Backup Frequency
                        </span>
                        <span className="text-[11px] text-gray-400">
                          Automatic PostgreSQL database snapshot frequency.
                        </span>
                      </div>
                    </div>

                    <select
                      value={backupFreq}
                      onChange={(e) => setBackupFreq(e.target.value)}
                      className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-white rounded-lg shadow-xs focus:outline-none"
                    >
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Realtime">Realtime Mirroring</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 bg-[#C8232A] hover:bg-[#A81B21] text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                <span>Save All Settings</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
