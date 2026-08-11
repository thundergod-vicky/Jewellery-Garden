"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  Menu,
  X,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [adminEmail, setAdminEmail] = useState("admin@jewellerygardenpvtltd.com");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Synchronize theme with localStorage & document element
  useEffect(() => {
    if (pathname === "/admin/login") return;

    const token = localStorage.getItem("admin_token");
    const email = localStorage.getItem("admin_email");
    const savedTheme = (localStorage.getItem("admin_theme") as "light" | "dark") || "light";

    if (!token) {
      router.push("/admin/login");
    } else if (email) {
      setAdminEmail(email);
    }

    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [pathname, router]);

  // Smooth Circular Wave / Crawl Transition for Dark Mode Toggle
  const toggleTheme = (targetTheme?: "light" | "dark", e?: React.MouseEvent) => {
    const nextTheme = targetTheme || (theme === "light" ? "dark" : "light");
    if (nextTheme === theme) return;

    if (typeof document !== "undefined" && (document as any).startViewTransition) {
      const x = e?.clientX ?? window.innerWidth / 2;
      const y = e?.clientY ?? window.innerHeight / 2;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = (document as any).startViewTransition(() => {
        setTheme(nextTheme);
        localStorage.setItem("admin_theme", nextTheme);
        if (nextTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      });

      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`
        ];
        document.documentElement.animate(
          {
            clipPath: nextTheme === "dark" ? clipPath : [...clipPath].reverse()
          },
          {
            duration: 650,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            pseudoElement: nextTheme === "dark" ? "::view-transition-new(root)" : "::view-transition-old(root)"
          }
        );
      });
    } else {
      setTheme(nextTheme);
      localStorage.setItem("admin_theme", nextTheme);
      if (nextTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

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

  const isDark = theme === "dark";

  return (
    // 100% Full Screen Edge-to-Edge Container with Smooth Theme Transition
    <div
      className={`h-screen w-screen overflow-hidden flex flex-col font-sans antialiased admin-theme-transition ${
        isDark ? "bg-[#0B0C0E] text-gray-100 dark" : "bg-[#F7F9FC] text-[#1A1C1E]"
      }`}
    >
      
      {/* Fixed Top Header Bar (Edge-to-Edge) */}
      <header
        className={`shrink-0 border-b px-5 py-3 flex items-center justify-between gap-4 z-40 transition-colors duration-500 ${
          isDark
            ? "bg-[#121417] border-gray-800/80 text-white"
            : "bg-white border-[#EAEFF5] text-gray-900"
        }`}
      >
        
        {/* Left Brand Selector Pill */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              isDark ? "bg-gray-800/80 hover:bg-gray-700 text-white" : "bg-[#F1F4F8] hover:bg-[#E8EDF3] text-gray-900"
            }`}
          >
            <div className="w-5 h-5 rounded-full bg-[#1A1C1E] text-white font-serif-title flex items-center justify-center text-[10px] ring-1 ring-gold-accent">
              JG
            </div>
            <span className="font-semibold">Jewellery Garden</span>
            <span className="bg-[#12B76A] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
              Admin
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 font-medium">
            <span>Jewellery Garden</span>
            <span>/</span>
            <span className={`font-semibold capitalize ${isDark ? "text-gray-200" : "text-gray-900"}`}>
              {pathname.replace("/admin/", "") || "Dashboard"}
            </span>
          </div>
        </div>

        {/* Center Search Pill Bar */}
        <div
          className={`hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full w-80 lg:w-96 transition-all border ${
            isDark
              ? "bg-[#1A1D23] border-gray-700/60 focus-within:bg-[#20242C] focus-within:border-gray-600"
              : "bg-[#EEF1F5] border-transparent focus-within:bg-white focus-within:border-gray-200"
          }`}
        >
          <Search className="w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search here..."
            className={`bg-transparent text-xs w-full focus:outline-none placeholder-gray-400 ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          />
          <kbd
            className={`hidden lg:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded border ${
              isDark ? "bg-gray-800 text-gray-400 border-gray-700" : "bg-white text-gray-400 border-gray-200"
            }`}
          >
            ⌘S
          </kbd>
          <button className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white">
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Action Icons & User Avatars */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Smooth Crawling Dark Mode Switcher Pill */}
          <div
            className={`flex items-center p-1 rounded-full text-gray-500 transition-colors ${
              isDark ? "bg-[#1A1D23] border border-gray-700/60" : "bg-[#EEF1F5]"
            }`}
          >
            <button
              onClick={(e) => toggleTheme("light", e)}
              title="Light Mode"
              className={`p-1 rounded-full transition-all ${
                !isDark ? "bg-white text-amber-500 shadow-2xs font-bold" : "text-gray-400 hover:text-white"
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={(e) => toggleTheme("dark", e)}
              title="Dark Mode"
              className={`p-1 rounded-full transition-all ${
                isDark ? "bg-indigo-600 text-white shadow-2xs font-bold" : "text-gray-400 hover:text-gray-900"
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Notification Bell */}
          <button
            className={`relative p-2 rounded-full transition-all ${
              isDark ? "bg-[#1A1D23] hover:bg-gray-800 text-gray-300" : "bg-[#EEF1F5] hover:bg-gray-200 text-gray-700"
            }`}
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#F04438]" />
          </button>

          {/* Team Avatars */}
          <div className="hidden sm:flex items-center -space-x-1.5">
            <div className="w-6 h-6 rounded-full bg-amber-500 text-white font-bold text-[9px] flex items-center justify-center ring-2 ring-gray-900">
              SB
            </div>
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold text-[9px] flex items-center justify-center ring-2 ring-gray-900">
              AD
            </div>
            <div className="w-6 h-6 rounded-full bg-indigo-500 text-white font-bold text-[9px] flex items-center justify-center ring-2 ring-gray-900">
              KG
            </div>
            <div className="w-6 h-6 rounded-full bg-gray-700 text-gray-200 font-bold text-[9px] flex items-center justify-center ring-2 ring-gray-900">
              +6
            </div>
          </div>

          {/* Invite Button */}
          <button
            className={`text-xs font-semibold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm transition-all ${
              isDark ? "bg-white text-gray-900 hover:bg-gray-200" : "bg-[#1A1C1E] text-white hover:bg-black"
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Invite</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-full bg-gray-800 text-gray-200"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Body Layout (Flex Row) */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        
        {/* Fixed Left Sidebar (Full Height Dark Support) */}
        <aside
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } lg:flex w-full lg:w-56 h-full shrink-0 overflow-y-auto lg:overflow-y-hidden border-r p-4 flex-col justify-between space-y-4 transition-colors duration-500 ${
            isDark
              ? "bg-[#121417] border-gray-800/80 text-gray-200"
              : "bg-white border-[#EAEFF5] text-gray-800"
          }`}
        >
          <div className="space-y-4">
            
            {/* Admin Welcome Heading */}
            <div className="space-y-0.5 px-1">
              <h2 className={`text-base font-bold font-serif-title ${isDark ? "text-white" : "text-gray-900"}`}>
                Welcome Back, Admin
              </h2>
              <p className="text-[10px] text-gray-400 font-medium">
                Jewellery Garden Control Panel
              </p>
            </div>

            {/* MENU Section */}
            <div className="space-y-1">
              <span className="text-[9px] font-bold text-gray-400 tracking-wider uppercase px-2">
                MENU
              </span>
              <nav className="space-y-0.5 text-xs font-medium">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
                        isActive
                          ? isDark
                            ? "bg-gradient-to-r from-gray-800 to-gray-700 text-white shadow-xs font-semibold border border-gray-700"
                            : "bg-gradient-to-r from-[#1A1C1E] to-[#2D3035] text-white shadow-xs font-semibold"
                          : isDark
                          ? "text-gray-300 hover:bg-gray-800/60 hover:text-white"
                          : "text-gray-600 hover:bg-[#EEF1F5] hover:text-gray-900"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#F0D588]" : "text-gray-400"}`} />
                        <span className="text-[11px]">{item.label}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
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
            <div className="space-y-1">
              <span className="text-[9px] font-bold text-gray-400 tracking-wider uppercase px-2">
                OTHERS
              </span>
              <nav className="space-y-0.5 text-xs font-medium">
                {otherItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
                        isDark ? "text-gray-300 hover:bg-gray-800/60 hover:text-white" : "text-gray-600 hover:bg-[#EEF1F5] hover:text-gray-900"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-[11px]">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[9px] font-bold bg-[#FEE4E2] text-[#C8232A] px-1.5 py-0.2 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-red-500 hover:bg-red-500/10 transition-all text-xs font-semibold"
                >
                  <LogOut className="w-3.5 h-3.5 text-red-500" />
                  <span className="text-[11px]">Logout</span>
                </button>
              </nav>
            </div>

          </div>

          {/* Bottom User Card Profile */}
          <div className={`pt-3 border-t flex items-center gap-2.5 shrink-0 ${isDark ? "border-gray-800" : "border-[#EAEFF5]"}`}>
            <div className="w-8 h-8 rounded-full bg-[#1A1C1E] text-white font-bold text-xs flex items-center justify-center shadow shrink-0 ring-1 ring-gold-accent">
              A
            </div>
            <div className="overflow-hidden leading-tight">
              <h4 className={`text-[11px] font-bold truncate ${isDark ? "text-white" : "text-gray-900"}`}>Master Admin</h4>
              <p className="text-[9px] text-gray-400 truncate">{adminEmail}</p>
            </div>
          </div>

        </aside>

        {/* Dedicated Scrolling Canvas Area */}
        <main
          className={`flex-1 h-full overflow-y-auto p-5 transition-colors duration-500 ${
            isDark ? "bg-[#0B0C0E] text-gray-100" : "bg-[#F7F9FC] text-[#1A1C1E]"
          }`}
        >
          {children}
        </main>

      </div>

    </div>
  );
}
