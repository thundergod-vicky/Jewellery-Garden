"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  LogOut,
  ShieldCheck,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { SITE_DATA } from "@/data/siteData";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [adminEmail, setAdminEmail] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // If user is on the login page, render children directly without admin shell
    if (pathname === "/admin/login") return;

    const token = localStorage.getItem("admin_token");
    const email = localStorage.getItem("admin_email");

    if (!token) {
      router.push("/admin/login");
    } else {
      setAdminEmail(email || "admin@jewellerygardenpvtltd.com");
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

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Products & Stock", href: "/admin/products", icon: Package },
    { label: "Orders & Fulfillment", href: "/admin/orders", icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-gray-800 flex flex-col lg:flex-row">
      
      {/* Minimalist Sidebar (Desktop) */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-[#E8E3DA] flex-col justify-between p-6 shrink-0 shadow-sm">
        <div className="space-y-8">
          
          {/* Logo Header */}
          <div className="space-y-3">
            <Link href="/" target="_blank" className="block relative w-40 h-10">
              <Image
                src={SITE_DATA.logoUrl}
                alt={SITE_DATA.brandName}
                fill
                className="object-contain"
                unoptimized
              />
            </Link>
            <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 w-fit">
              <ShieldCheck className="w-3 h-3" />
              <span>Admin Subdomain Portal</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs font-medium">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-[#1A1A1A] text-white shadow"
                      : "text-gray-600 hover:bg-gray-100 hover:text-black"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-[#F0D588]" : "text-gray-400"}`} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 ${isActive ? "opacity-100" : "opacity-0"}`} />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Info & Logout */}
        <div className="pt-6 border-t border-gray-200 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C8232A] text-white font-bold text-xs flex items-center justify-center shadow">
              A
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-gray-800 truncate">{adminEmail}</p>
              <span className="text-[10px] text-gray-400 font-medium">Master Admin</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full text-xs font-semibold text-red-600 hover:bg-red-50 py-2 px-3 rounded-xl flex items-center justify-center gap-2 border border-red-200 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Mobile Header Bar */}
        <header className="lg:hidden bg-white border-b border-[#E8E3DA] px-4 py-3 flex items-center justify-between">
          <Link href="/" target="_blank" className="relative w-36 h-8">
            <Image
              src={SITE_DATA.logoUrl}
              alt={SITE_DATA.brandName}
              fill
              className="object-contain"
              unoptimized
            />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-gray-100 text-gray-700"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* Mobile Nav Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-[#E8E3DA] p-4 space-y-2 text-xs font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg ${
                  pathname === item.href ? "bg-[#1A1A1A] text-white" : "text-gray-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full text-left text-red-600 font-bold px-3 py-2.5"
            >
              Sign Out
            </button>
          </div>
        )}

        {/* Top Navbar */}
        <header className="hidden lg:flex bg-white border-b border-[#E8E3DA] px-8 py-4 items-center justify-between">
          <div>
            <h1 className="font-serif-title font-bold text-lg text-[#1A1A1A]">
              Jewellery Garden Admin Console
            </h1>
            <p className="text-xs text-gray-400">Minimalist Management Portal • NestJS Backend Connected</p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-semibold text-gray-600 hover:text-[#C8232A] flex items-center gap-1.5 bg-gray-100 hover:bg-red-50 px-3 py-1.5 rounded-xl transition-all border border-gray-200"
            >
              <span>View Live Storefront</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Child Page Content */}
        <main className="p-4 sm:p-8 flex-1 overflow-y-auto">{children}</main>

      </div>
    </div>
  );
}
