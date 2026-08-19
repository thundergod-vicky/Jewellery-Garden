"use client";

import React, { useState, useEffect, useRef } from "react";
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
  FolderTree,
  MapPin,
  Star,
  Tag,
  Award,
  Globe,
  MessageSquare,
  ShieldCheck,
  ArrowRightLeft,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [adminEmail, setAdminEmail] = useState("admin@jewellerygardenpvtltd.com");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Glowing Wave Ring Animation States
  const [isWaving, setIsWaving] = useState(false);
  const [wavePos, setWavePos] = useState({ x: 0, y: 0 });
  const [targetTheme, setTargetTheme] = useState<"light" | "dark">("light");
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  // Synchronize theme state with localStorage & HTML document class
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

  // Glowing Wave Ring Sweep Transition (Hollow center so text & cards stay 100% visible while morphing)
  const handleToggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = theme === "light" ? "dark" : "light";
    
    // Get exact button click position for wave origin
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    setWavePos({ x, y });
    setTargetTheme(nextTheme);
    setIsWaving(true);

    // Immediately trigger theme morphing so elements change color right as the wave sweeps over them
    setTheme(nextTheme);
    localStorage.setItem("admin_theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // End wave animation
    setTimeout(() => {
      setIsWaving(false);
    }, 950);
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
    { label: "Categories", href: "/admin/categories", icon: FolderTree },
    { label: "Customer Insights", href: "/admin/customers", icon: Users, badge: "Live" },
    { label: "Support Chat Desk", href: "/admin/support", icon: MessageSquare, badge: "Live" },
    { label: "Customer Reviews", href: "/admin/reviews", icon: Star },
    { label: "Promotions & Sales", href: "/admin/sales", icon: Tag },
    { label: "RFM Segmentation", href: "/admin/segmentation", icon: Award },
    { label: "Showrooms & Stores", href: "/admin/locations", icon: MapPin },
    { label: "Stock Transfers", href: "/admin/transfers", icon: ArrowRightLeft },
    { label: "SEO Metadata", href: "/admin/seo", icon: Globe },
    { label: "Zero-Trust Security", href: "/admin/zerotrust", icon: ShieldCheck },
  ];

  const otherItems = [
    { label: "Settings", href: "/admin/settings", icon: Settings },
    { label: "Team Members", href: "#", icon: Users, badge: "3" },
    { label: "Help Center", href: "#", icon: HelpCircle },
  ];

  const isDark = theme === "dark";

  return (
    // 100% Full Screen Edge-to-Edge Container with Smooth Morphing Transitions
    <div
      className={`h-screen w-screen overflow-hidden flex flex-col font-sans antialiased relative transition-colors duration-700 ease-in-out ${
        isDark ? "bg-[#0B0C0E] text-white dark" : "bg-[#F7F9FC] text-[#1A1C1E]"
      }`}
    >
      {/* Translucent Glowing Wave Ring Overlay (Hollow Center - Never blacks out or whites out text) */}
      {isWaving && (
        <div
          style={{
            left: `${wavePos.x}px`,
            top: `${wavePos.y}px`,
          }}
          className={`fixed -translate-x-1/2 -translate-y-1/2 rounded-full z-50 pointer-events-none bg-transparent animate-wave-ring backdrop-blur-[1px] ${
            targetTheme === "dark"
              ? "border-indigo-500/70 shadow-[0_0_120px_rgba(99,102,241,0.7)]"
              : "border-amber-400/70 shadow-[0_0_120px_rgba(251,191,36,0.7)]"
          }`}
        />
      )}

      {/* Fixed Top Header Bar (Edge-to-Edge) */}
      <header
        className={`shrink-0 border-b px-5 py-3 flex items-center justify-between gap-4 z-40 transition-colors duration-700 ease-in-out ${
          isDark
            ? "bg-[#121417] border-gray-800 text-white"
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
            <div className="w-5 h-5 rounded-full bg-[#1A1C1E] text-white font-serif-title flex items-center justify-center text-[10px] ring-1 ring-amber-400">
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
              ? "bg-[#1A1D23] border-gray-700 focus-within:bg-[#20242C] focus-within:border-gray-600 text-white"
              : "bg-[#EEF1F5] border-transparent focus-within:bg-white focus-within:border-gray-200 text-gray-800"
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

        {/* Right Action Icons & Highly Visible Sliding Theme Toggle */}
        <div className="flex items-center gap-3">
          
          {/* HIGHLY VISIBLE THEME TOGGLE SWITCH BUTTON */}
          <button
            ref={toggleBtnRef}
            onClick={handleToggleTheme}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-full font-bold text-xs shadow-md transition-all border shrink-0 ${
              isDark
                ? "bg-[#1E222B] text-amber-300 border-amber-500/40 hover:bg-gray-800 hover:border-amber-400 ring-2 ring-amber-500/20"
                : "bg-gradient-to-r from-amber-100 via-amber-50 to-orange-100 text-gray-900 border-amber-300 hover:shadow-lg ring-2 ring-amber-400/20"
            }`}
          >
            {isDark ? (
              <>
                <Moon className="w-4 h-4 text-indigo-400 animate-pulse" />
                <span className="text-[11px] font-semibold text-white">Dark</span>
                <span className="w-2 h-2 rounded-full bg-indigo-400 shadow-glow" />
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 text-amber-500 animate-spin-slow" />
                <span className="text-[11px] font-semibold text-gray-900">Light</span>
                <span className="w-2 h-2 rounded-full bg-amber-500 shadow-glow" />
              </>
            )}
          </button>

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
        
        {/* Fixed Left Sidebar */}
        <aside
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } lg:flex w-full lg:w-56 h-full shrink-0 overflow-y-auto border-r p-4 flex-col justify-between space-y-4 transition-colors duration-700 ease-in-out ${
            isDark
              ? "bg-[#121417] border-gray-800 text-gray-200"
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
            <div className="w-8 h-8 rounded-full bg-[#1A1C1E] text-white font-bold text-xs flex items-center justify-center shadow shrink-0 ring-1 ring-amber-400">
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
          className={`flex-1 h-full overflow-y-auto p-5 transition-colors duration-700 ease-in-out ${
            isDark ? "bg-[#0B0C0E] text-white" : "bg-[#F7F9FC] text-[#1A1C1E]"
          }`}
        >
          {children}
        </main>

      </div>

    </div>
  );
}
