"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  BarChart3,
  Users,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  Search,
  SlidersHorizontal,
  Sun,
  Moon,
  Bell,
  UserPlus,
  ChevronDown,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { SITE_DATA } from "@/data/siteData";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [adminEmail, setAdminEmail] = useState("admin@jewellerygardenpvtltd.com");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") return;

    const token = localStorage.getItem("admin_token");
    const email = localStorage.getItem("admin_email");

    if (!token) {
      router.push("/admin/login");
    } else if (email) {
      setAdminEmail(email);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_email");
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const menuItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Products", href: "/admin/products", icon: Package, badge: "5" },
    { label: "Orders & Invoices", href: "/admin/orders", icon: ShoppingBag, badge: "3" },
    { label: "Sales Analytics", href: "#", icon: BarChart3 },
    { label: "Customer Insights", href: "#", icon: Users },
    { label: "Reports", href: "#", icon: FileText, badge: "2" },
  ];

  const otherItems = [
    { label: "Settings", href: "#", icon: Settings },
    { label: "Team Members", href: "#", icon: Users, badge: "3" },
    { label: "Help Center", href: "#", icon: HelpCircle },
  ];

  return (
    // Outer Ambient Pastel Gradient Container (Matching Screenshot Background)
    <div className="min-h-screen bg-gradient-to-br from-[#F5E6ED] via-[#E8EEF5] to-[#E6F5F0] p-2 sm:p-5 flex items-center justify-center font-sans antialiased text-[#1A1C1E]">
      
      {/* Floating Main Glass Shell Container */}
      <div className="w-full max-w-[1520px] bg-[#F7F9FC] border border-white/80 shadow-2xl rounded-[32px] lg:rounded-[36px] overflow-hidden flex flex-col min-h-[92vh]">
        
        {/* Top Header Bar */}
        <header className="bg-white/70 backdrop-blur-md px-6 py-3.5 border-b border-[#EAEFF5] flex items-center justify-between gap-4 sticky top-0 z-40">
          
          {/* Left Brand Selector Pill */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#F1F4F8] hover:bg-[#E8EDF3] px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer">
              <div className="w-6 h-6 rounded-full bg-[#1A1C1E] text-white font-serif-title flex items-center justify-center text-xs">
                JG
              </div>
              <span className="text-gray-900 font-semibold">Jewellery Garden</span>
              <span className="bg-[#12B76A] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                Pro
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 font-medium">
              <span>Jewellery Garden</span>
              <span>/</span>
              <span className="text-gray-900 font-semibold capitalize">
                {pathname.replace("/admin/", "") || "Dashboard"}
              </span>
            </div>
          </div>

          {/* Center Search Pill Bar */}
          <div className="hidden md:flex items-center gap-2 bg-[#EEF1F5] focus-within:bg-white focus-within:ring-2 focus-within:ring-black/10 px-4 py-2 rounded-full w-80 lg:w-96 transition-all border border-transparent focus-within:border-gray-200">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search here..."
              className="bg-transparent text-xs w-full focus:outline-none text-gray-800 placeholder-gray-400"
            />
            <kbd className="hidden lg:inline-block text-[10px] bg-white text-gray-400 font-mono px-1.5 py-0.5 rounded border border-gray-200 shadow-2xs">
              ⌘S
            </kbd>
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-600">
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right Action Icons & User Avatars */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Pill */}
            <div className="flex items-center bg-[#EEF1F5] p-1 rounded-full text-gray-500">
              <button className="p-1.5 rounded-full bg-white text-gray-900 shadow-2xs">
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button className="p-1.5 rounded-full hover:text-gray-900">
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Notification Bell */}
            <button className="relative p-2.5 rounded-full bg-[#EEF1F5] hover:bg-gray-200 text-gray-700 transition-all">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F04438]" />
            </button>

            {/* Team Avatars */}
            <div className="hidden sm:flex items-center -space-x-2">
              <div className="w-7 h-7 rounded-full bg-amber-500 text-white font-bold text-[10px] flex items-center justify-center ring-2 ring-white">
                SB
              </div>
              <div className="w-7 h-7 rounded-full bg-emerald-500 text-white font-bold text-[10px] flex items-center justify-center ring-2 ring-white">
                AD
              </div>
              <div className="w-7 h-7 rounded-full bg-indigo-500 text-white font-bold text-[10px] flex items-center justify-center ring-2 ring-white">
                KG
              </div>
              <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-600 font-bold text-[10px] flex items-center justify-center ring-2 ring-white">
                +6
              </div>
            </div>

            {/* Invite Button */}
            <button className="bg-[#1A1C1E] hover:bg-black text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-sm transition-all">
              <UserPlus className="w-3.5 h-3.5" />
              <span>Invite</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-gray-200 text-gray-800"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Content Body Grid */}
        <div className="flex-1 flex flex-col lg:flex-row min-w-0">
          
          {/* Left Navigation Sidebar */}
          <aside
            className={`${
              isMobileMenuOpen ? "block" : "hidden"
            } lg:block w-full lg:w-64 bg-white/50 backdrop-blur-sm border-r border-[#EAEFF5] p-5 flex-col justify-between shrink-0 space-y-6`}
          >
            <div className="space-y-6">
              
              {/* Admin Welcome Heading */}
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-gray-900 font-serif-title">
                  Welcome Back, Admin 👋
                </h2>
                <p className="text-[11px] text-gray-400 font-medium">
                  Jewellery Garden Control Panel
                </p>
              </div>

              {/* MENU Section */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase px-3">
                  MENU
                </span>
                <nav className="space-y-1 text-xs font-medium">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all ${
                          isActive
                            ? "bg-gradient-to-r from-[#1A1C1E] to-[#2D3035] text-white shadow-md font-semibold"
                            : "text-gray-600 hover:bg-[#EEF1F5] hover:text-gray-900"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 ${isActive ? "text-[#F0D588]" : "text-gray-400"}`} />
                          <span>{item.label}</span>
                        </div>

                        {item.badge && (
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              isActive
                                ? "bg-[#C8232A] text-white"
                                : "bg-[#FEE4E2] text-[#C8232A]"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* OTHERS Section */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase px-3">
                  OTHERS
                </span>
                <nav className="space-y-1 text-xs font-medium">
                  {otherItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-gray-600 hover:bg-[#EEF1F5] hover:text-gray-900 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-gray-400" />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="text-[10px] font-bold bg-[#FEE4E2] text-[#C8232A] px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-red-600 hover:bg-red-50 transition-all text-xs font-semibold"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span>Logout</span>
                  </button>
                </nav>
              </div>

            </div>

            {/* Bottom User Card Profile */}
            <div className="pt-4 border-t border-[#EAEFF5] flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#1A1C1E] text-white font-bold text-xs flex items-center justify-center shadow shrink-0">
                A
              </div>
              <div className="overflow-hidden leading-tight">
                <h4 className="text-xs font-bold text-gray-900 truncate">Master Admin</h4>
                <p className="text-[10px] text-gray-400 truncate">{adminEmail}</p>
              </div>
            </div>

          </aside>

          {/* Main Dashboard Canvas Area */}
          <main className="flex-1 p-4 sm:p-6 overflow-y-auto bg-[#F7F9FC]">
            {children}
          </main>

        </div>

      </div>
    </div>
  );
}
