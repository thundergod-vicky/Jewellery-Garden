"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Search,
  SlidersHorizontal,
  X,
  Package,
  ShoppingBag,
  Users,
  LayoutDashboard,
  FolderTree,
  MessageSquare,
  Star,
  Tag,
  Award,
  MapPin,
  ArrowRightLeft,
  Globe,
  ShieldCheck,
  Settings,
  HelpCircle,
  Plus,
  Moon,
  Sun,
  ArrowRight,
  Sparkles,
  Loader2,
  Clock,
  Command,
} from "lucide-react";
import { PRODUCTS_CATALOG } from "@/data/siteData";

interface AdminUniversalSearchProps {
  isDark: boolean;
  onToggleTheme?: () => void;
}

type TabType = "all" | "products" | "orders" | "customers" | "navigation" | "actions";

interface SearchProductResult {
  id: string;
  sku: string;
  name: string;
  category: string;
  metal: string;
  price: number;
  stock: number;
  image: string;
}

interface SearchOrderResult {
  id: string;
  orderNumber: string;
  customerEmail: string;
  customerPhone?: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
}

interface SearchCustomerResult {
  id: string;
  username: string;
  email: string;
  phone?: string;
  superPearls?: number;
}

interface SearchNavResult {
  label: string;
  href: string;
  icon: any;
  category: string;
  badge?: string;
}

interface SearchActionResult {
  id: string;
  label: string;
  description: string;
  icon: any;
  action: () => void;
}

export default function AdminUniversalSearch({ isDark, onToggleTheme }: AdminUniversalSearchProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Search Results State
  const [apiProducts, setApiProducts] = useState<SearchProductResult[]>([]);
  const [apiOrders, setApiOrders] = useState<SearchOrderResult[]>([]);
  const [apiCustomers, setApiCustomers] = useState<SearchCustomerResult[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const modalInputRef = useRef<HTMLInputElement>(null);

  // All Nav Items
  const navItems: SearchNavResult[] = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, category: "Overview" },
    { label: "Products Catalog", href: "/admin/products", icon: Package, category: "Inventory", badge: "Live" },
    { label: "Orders & Invoices", href: "/admin/orders", icon: ShoppingBag, category: "Sales", badge: "Live" },
    { label: "Product Categories", href: "/admin/categories", icon: FolderTree, category: "Inventory" },
    { label: "Customer Insights", href: "/admin/customers", icon: Users, category: "CRM", badge: "Live" },
    { label: "Support Chat Desk", href: "/admin/support", icon: MessageSquare, category: "Support", badge: "Desk" },
    { label: "Customer Reviews", href: "/admin/reviews", icon: Star, category: "CRM" },
    { label: "Promotions & Sales", href: "/admin/sales", icon: Tag, category: "Marketing" },
    { label: "RFM Segmentation", href: "/admin/segmentation", icon: Award, category: "Analytics" },
    { label: "Showrooms & Stores", href: "/admin/locations", icon: MapPin, category: "Retail" },
    { label: "Stock Transfers", href: "/admin/transfers", icon: ArrowRightLeft, category: "Inventory" },
    { label: "SEO Metadata", href: "/admin/seo", icon: Globe, category: "Marketing" },
    { label: "Zero-Trust Security", href: "/admin/zerotrust", icon: ShieldCheck, category: "Security" },
    { label: "Settings", href: "/admin/settings", icon: Settings, category: "System" },
  ];

  // Quick Admin Actions
  const adminActions: SearchActionResult[] = [
    {
      id: "add-product",
      label: "Add New Product",
      description: "Create a gold, silver, or diamond item in product catalog",
      icon: Plus,
      action: () => {
        setIsOpen(false);
        router.push("/admin/products");
      },
    },
    {
      id: "view-pending-orders",
      label: "View Pending Orders",
      description: "Filter and fulfill customer jewellery orders",
      icon: ShoppingBag,
      action: () => {
        setIsOpen(false);
        router.push("/admin/orders");
      },
    },
    {
      id: "toggle-theme",
      label: `Switch to ${isDark ? "Light" : "Dark"} Mode`,
      description: "Toggle theme color sweep overlay across the workspace",
      icon: isDark ? Sun : Moon,
      action: () => {
        if (onToggleTheme) onToggleTheme();
        setIsOpen(false);
      },
    },
    {
      id: "open-support",
      label: "Open Live Support Desk",
      description: "Respond to customer chats and escalations in real-time",
      icon: MessageSquare,
      action: () => {
        setIsOpen(false);
        router.push("/admin/support");
      },
    },
  ];

  // Debounced API Search with Fallback
  useEffect(() => {
    if (!isOpen) return;

    const trimmed = query.trim();
    if (!trimmed) {
      setApiProducts([]);
      setApiOrders([]);
      setApiCustomers([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/admin/search?q=${encodeURIComponent(trimmed)}`);
        if (res.ok) {
          const data = await res.json();
          setApiProducts(data.products || []);
          setApiOrders(data.orders || []);
          setApiCustomers(data.customers || []);
        } else {
          fallbackSearch(trimmed);
        }
      } catch (err) {
        fallbackSearch(trimmed);
      } finally {
        setIsLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query, isOpen]);

  // Client-side fallback search when backend is unavailable
  const fallbackSearch = (q: string) => {
    const lowerQ = q.toLowerCase();
    
    // Storefront Catalog Items
    const matchedCatalog: SearchProductResult[] = PRODUCTS_CATALOG
      .filter((p: any) =>
        p.name.toLowerCase().includes(lowerQ) ||
        (p.sku && p.sku.toLowerCase().includes(lowerQ)) ||
        (p.category && p.category.toLowerCase().includes(lowerQ))
      )
      .slice(0, 8)
      .map((p: any) => ({
        id: p.id,
        sku: p.sku || `SKU-${p.id}`,
        name: p.name,
        category: p.category || "Jewellery",
        metal: p.categorySlug === "silver" ? "Silver" : "Gold",
        price: p.price,
        stock: 20,
        image: p.image || p.images?.[0] || "/images/gifts/wedding.png",
      }));

    setApiProducts(matchedCatalog);

    // Check Local Storage Orders
    let localOrders: SearchOrderResult[] = [];
    if (typeof window !== "undefined") {
      try {
        const adminSaved = localStorage.getItem("jg-admin-orders");
        const userSaved = localStorage.getItem("jg-user-orders");
        const parsed = [...(adminSaved ? JSON.parse(adminSaved) : []), ...(userSaved ? JSON.parse(userSaved) : [])];
        localOrders = parsed
          .filter((o: any) =>
            (o.orderNumber && o.orderNumber.toLowerCase().includes(lowerQ)) ||
            (o.customerEmail && o.customerEmail.toLowerCase().includes(lowerQ))
          )
          .slice(0, 5)
          .map((o: any) => ({
            id: o.id || o.orderId,
            orderNumber: o.orderNumber || o.orderId || "JG-1001",
            customerEmail: o.customerEmail || "customer@gmail.com",
            customerPhone: o.customerPhone || "+91 98000 00000",
            totalAmount: o.totalAmount || 0,
            status: o.status || "PENDING",
            paymentStatus: o.paymentStatus || "PAID",
          }));
      } catch (e) {
        console.error("Local storage search fallback error:", e);
      }
    }
    setApiOrders(localOrders);
  };

  // Filtered Nav Items matching query
  const filteredNav = navItems.filter((item) =>
    query.trim() === "" ||
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  // Filtered Actions matching query
  const filteredActions = adminActions.filter((act) =>
    query.trim() === "" ||
    act.label.toLowerCase().includes(query.toLowerCase()) ||
    act.description.toLowerCase().includes(query.toLowerCase())
  );

  // Global Keyboard Shortcuts (Cmd+K, Cmd+S, /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K" || e.key === "s" || e.key === "S")) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus modal input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => modalInputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Build flattened navigable item list for keyboard navigation
  const allFlattenedItems = useCallback(() => {
    const items: Array<{ type: string; item: any; action: () => void }> = [];

    if (activeTab === "all" || activeTab === "products") {
      apiProducts.forEach((p) => {
        items.push({
          type: "product",
          item: p,
          action: () => {
            setIsOpen(false);
            router.push(`/admin/products`);
          },
        });
      });
    }

    if (activeTab === "all" || activeTab === "orders") {
      apiOrders.forEach((o) => {
        items.push({
          type: "order",
          item: o,
          action: () => {
            setIsOpen(false);
            router.push(`/admin/orders`);
          },
        });
      });
    }

    if (activeTab === "all" || activeTab === "customers") {
      apiCustomers.forEach((c) => {
        items.push({
          type: "customer",
          item: c,
          action: () => {
            setIsOpen(false);
            router.push(`/admin/customers`);
          },
        });
      });
    }

    if (activeTab === "all" || activeTab === "navigation") {
      filteredNav.forEach((n) => {
        items.push({
          type: "navigation",
          item: n,
          action: () => {
            setIsOpen(false);
            router.push(n.href);
          },
        });
      });
    }

    if (activeTab === "all" || activeTab === "actions") {
      filteredActions.forEach((a) => {
        items.push({
          type: "action",
          item: a,
          action: a.action,
        });
      });
    }

    return items;
  }, [activeTab, apiProducts, apiOrders, apiCustomers, filteredNav, filteredActions, router]);

  const flattenedList = allFlattenedItems();

  // Keyboard navigation within modal
  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, flattenedList.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + flattenedList.length) % Math.max(1, flattenedList.length));
    } else if (e.key === "Enter" && flattenedList[selectedIndex]) {
      e.preventDefault();
      flattenedList[selectedIndex].action();
    }
  };

  const hasResults =
    apiProducts.length > 0 ||
    apiOrders.length > 0 ||
    apiCustomers.length > 0 ||
    filteredNav.length > 0 ||
    filteredActions.length > 0;

  return (
    <>
      {/* Header Search Input Trigger */}
      <div
        onClick={() => setIsOpen(true)}
        className={`hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full w-80 lg:w-96 transition-all border cursor-pointer group ${
          isDark
            ? "bg-[#1A1D23] border-gray-700 hover:border-gray-500 text-white"
            : "bg-[#EEF1F5] border-transparent hover:bg-white hover:border-gray-300 text-gray-800"
        }`}
      >
        <Search className="w-3.5 h-3.5 text-gray-400 group-hover:text-amber-400 transition-colors" />
        <span className="text-xs text-gray-400 font-medium truncate flex-1">
          Search products, orders, customers, pages...
        </span>
        <kbd
          className={`hidden lg:inline-flex items-center gap-0.5 text-[10px] font-mono px-1.5 py-0.5 rounded border shadow-2xs ${
            isDark ? "bg-gray-800 text-gray-300 border-gray-700" : "bg-white text-gray-500 border-gray-200"
          }`}
        >
          <Command className="w-2.5 h-2.5" />K
        </kbd>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
          className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Command Palette Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-12 sm:pt-16 px-4 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleModalKeyDown}
            className={`w-full max-w-3xl rounded-[24px] border shadow-2xl overflow-hidden flex flex-col max-h-[85vh] transition-all duration-300 ${
              isDark
                ? "bg-[#121418] border-gray-800 text-white shadow-black/80"
                : "bg-white border-gray-200 text-gray-900 shadow-xl"
            }`}
          >
            {/* Top Search Input Bar */}
            <div
              className={`p-4 flex items-center gap-3 border-b shrink-0 ${
                isDark ? "border-gray-800 bg-[#161920]" : "border-gray-100 bg-gray-50/80"
              }`}
            >
              <Search className="w-5 h-5 text-amber-500 shrink-0" />
              <input
                ref={modalInputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type to search live products, orders, customers, pages, actions..."
                className="w-full bg-transparent text-sm font-medium focus:outline-none placeholder-gray-400"
              />
              {isLoading && <Loader2 className="w-4 h-4 text-amber-500 animate-spin shrink-0" />}
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd
                onClick={() => setIsOpen(false)}
                className={`text-[10px] font-mono px-2 py-1 rounded border cursor-pointer shrink-0 ${
                  isDark ? "bg-gray-800 text-gray-400 border-gray-700" : "bg-gray-100 text-gray-500 border-gray-200"
                }`}
              >
                ESC
              </kbd>
            </div>

            {/* Category Tabs */}
            <div
              className={`flex items-center gap-1.5 px-4 py-2 border-b overflow-x-auto shrink-0 scrollbar-none ${
                isDark ? "border-gray-800/80 bg-[#121418]" : "border-gray-100 bg-white"
              }`}
            >
              {(
                [
                  { id: "all", label: "All", icon: Sparkles },
                  { id: "products", label: `Products (${apiProducts.length})`, icon: Package },
                  { id: "orders", label: `Orders (${apiOrders.length})`, icon: ShoppingBag },
                  { id: "customers", label: `Customers (${apiCustomers.length})`, icon: Users },
                  { id: "navigation", label: "Pages", icon: LayoutDashboard },
                  { id: "actions", label: "Actions", icon: ArrowRight },
                ] as const
              ).map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setSelectedIndex(0);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? isDark
                          ? "bg-amber-500 text-gray-900 shadow-sm"
                          : "bg-gray-900 text-white shadow-sm"
                        : isDark
                        ? "text-gray-400 hover:text-white hover:bg-gray-800"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Search Results List Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5 divide-y divide-gray-100 dark:divide-gray-800/60">
              
              {/* Empty query state: Popular suggestions */}
              {!query.trim() && (
                <div className="space-y-4 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-amber-500" />
                      Popular Quick Searches
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Gold Rings",
                      "Silver Necklaces",
                      "ORD-1002",
                      "Pending Orders",
                      "Support Chat Desk",
                      "Add New Product",
                      "SEO Metadata",
                      "RFM Segmentation",
                    ].map((s) => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                          isDark
                            ? "bg-gray-800/60 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
                            : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* No results message */}
              {query.trim() !== "" && !hasResults && !isLoading && (
                <div className="text-center py-12 space-y-2">
                  <Package className="w-8 h-8 text-gray-400 mx-auto opacity-50" />
                  <p className="text-xs font-semibold text-gray-400">
                    No results found for &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-[11px] text-gray-500">
                    Try searching for SKU, product name, order ID, email, or admin section.
                  </p>
                </div>
              )}

              {/* PRODUCTS SECTION */}
              {(activeTab === "all" || activeTab === "products") && apiProducts.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400 px-1">
                    <span className="flex items-center gap-1.5">
                      <Package className="w-3 h-3 text-amber-500" /> Products Catalog ({apiProducts.length})
                    </span>
                  </div>

                  <div className="space-y-1">
                    {apiProducts.map((p, idx) => {
                      const itemIndex = flattenedList.findIndex(
                        (f) => f.type === "product" && f.item.id === p.id
                      );
                      const isSelected = itemIndex === selectedIndex;
                      return (
                        <div
                          key={p.id}
                          onClick={() => {
                            setIsOpen(false);
                            router.push("/admin/products");
                          }}
                          className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                            isSelected
                              ? isDark
                                ? "bg-gray-800 ring-1 ring-amber-500/50"
                                : "bg-amber-50 ring-1 ring-amber-400/50"
                              : isDark
                              ? "hover:bg-gray-800/50"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0 border border-gray-200 dark:border-gray-700">
                              <Image src={p.image} alt={p.name} fill className="object-cover" unoptimized />
                            </div>
                            <div className="truncate">
                              <h4 className="text-xs font-bold truncate text-gray-900 dark:text-white">
                                {p.name}
                              </h4>
                              <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium">
                                <span className="font-mono">{p.sku}</span>
                                <span>•</span>
                                <span>{p.category}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0 text-right">
                            <div>
                              <p className="text-xs font-extrabold text-gray-900 dark:text-white">
                                ₹{p.price.toLocaleString("en-IN")}
                              </p>
                              <span className="text-[9px] font-bold text-emerald-500">
                                {p.stock} in stock
                              </span>
                            </div>
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                                p.metal === "Gold"
                                  ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                                  : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300"
                              }`}
                            >
                              {p.metal}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ORDERS SECTION */}
              {(activeTab === "all" || activeTab === "orders") && apiOrders.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400 px-1">
                    <span className="flex items-center gap-1.5">
                      <ShoppingBag className="w-3 h-3 text-rose-500" /> Orders & Invoices ({apiOrders.length})
                    </span>
                  </div>

                  <div className="space-y-1">
                    {apiOrders.map((o) => {
                      const itemIndex = flattenedList.findIndex(
                        (f) => f.type === "order" && f.item.id === o.id
                      );
                      const isSelected = itemIndex === selectedIndex;
                      return (
                        <div
                          key={o.id}
                          onClick={() => {
                            setIsOpen(false);
                            router.push("/admin/orders");
                          }}
                          className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                            isSelected
                              ? isDark
                                ? "bg-gray-800 ring-1 ring-amber-500/50"
                                : "bg-amber-50 ring-1 ring-amber-400/50"
                              : isDark
                              ? "hover:bg-gray-800/50"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold text-xs shrink-0">
                              <ShoppingBag className="w-4 h-4" />
                            </div>
                            <div className="truncate">
                              <h4 className="text-xs font-bold text-gray-900 dark:text-white font-mono">
                                {o.orderNumber}
                              </h4>
                              <p className="text-[10px] text-gray-400 truncate">{o.customerEmail}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0 text-right">
                            <div>
                              <p className="text-xs font-extrabold text-gray-900 dark:text-white">
                                ₹{o.totalAmount.toLocaleString("en-IN")}
                              </p>
                              <span
                                className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full border ${
                                  o.status === "COMPLETED"
                                    ? "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400"
                                    : "bg-sky-50 text-sky-600 border-sky-200 dark:bg-sky-950/60 dark:text-sky-400"
                                }`}
                              >
                                {o.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* CUSTOMERS SECTION */}
              {(activeTab === "all" || activeTab === "customers") && apiCustomers.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400 px-1">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3 h-3 text-indigo-500" /> Customers ({apiCustomers.length})
                    </span>
                  </div>

                  <div className="space-y-1">
                    {apiCustomers.map((c) => {
                      const itemIndex = flattenedList.findIndex(
                        (f) => f.type === "customer" && f.item.id === c.id
                      );
                      const isSelected = itemIndex === selectedIndex;
                      return (
                        <div
                          key={c.id}
                          onClick={() => {
                            setIsOpen(false);
                            router.push("/admin/customers");
                          }}
                          className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                            isSelected
                              ? isDark
                                ? "bg-gray-800 ring-1 ring-amber-500/50"
                                : "bg-amber-50 ring-1 ring-amber-400/50"
                              : isDark
                              ? "hover:bg-gray-800/50"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0">
                              {c.username ? c.username[0].toUpperCase() : "C"}
                            </div>
                            <div className="truncate">
                              <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                                {c.username}
                              </h4>
                              <p className="text-[10px] text-gray-400 truncate">{c.email}</p>
                            </div>
                          </div>

                          {c.superPearls !== undefined && (
                            <span className="text-[9px] font-bold bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full border border-amber-500/20">
                              💎 {c.superPearls} Pearls
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* NAVIGATION PAGES SECTION */}
              {(activeTab === "all" || activeTab === "navigation") && filteredNav.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400 px-1">
                    <span className="flex items-center gap-1.5">
                      <LayoutDashboard className="w-3 h-3 text-emerald-500" /> Admin Navigation Pages ({filteredNav.length})
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {filteredNav.map((n) => {
                      const Icon = n.icon;
                      const itemIndex = flattenedList.findIndex(
                        (f) => f.type === "navigation" && f.item.href === n.href
                      );
                      const isSelected = itemIndex === selectedIndex;
                      return (
                        <div
                          key={n.label}
                          onClick={() => {
                            setIsOpen(false);
                            router.push(n.href);
                          }}
                          className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                            isSelected
                              ? isDark
                                ? "bg-gray-800 ring-1 ring-amber-500/50"
                                : "bg-amber-50 ring-1 ring-amber-400/50"
                              : isDark
                              ? "hover:bg-gray-800/50"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <Icon className="w-4 h-4 text-amber-500 shrink-0" />
                            <div className="truncate">
                              <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">
                                {n.label}
                              </h4>
                              <span className="text-[9px] text-gray-400 font-medium">
                                {n.category}
                              </span>
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* QUICK ADMIN ACTIONS SECTION */}
              {(activeTab === "all" || activeTab === "actions") && filteredActions.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400 px-1">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-sky-400" /> Quick Admin Actions ({filteredActions.length})
                    </span>
                  </div>

                  <div className="space-y-1">
                    {filteredActions.map((a) => {
                      const Icon = a.icon;
                      const itemIndex = flattenedList.findIndex(
                        (f) => f.type === "action" && f.item.id === a.id
                      );
                      const isSelected = itemIndex === selectedIndex;
                      return (
                        <div
                          key={a.id}
                          onClick={() => a.action()}
                          className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                            isSelected
                              ? isDark
                                ? "bg-gray-800 ring-1 ring-amber-500/50"
                                : "bg-amber-50 ring-1 ring-amber-400/50"
                              : isDark
                              ? "hover:bg-gray-800/50"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold shrink-0">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="truncate">
                              <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                                {a.label}
                              </h4>
                              <p className="text-[10px] text-gray-400 truncate">{a.description}</p>
                            </div>
                          </div>

                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 shrink-0">
                            Execute
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Footer bar with Keyboard navigation hints */}
            <div
              className={`px-4 py-2.5 border-t flex items-center justify-between text-[10px] text-gray-400 shrink-0 ${
                isDark ? "border-gray-800 bg-[#161920]" : "border-gray-100 bg-gray-50/80"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-800 font-mono text-[9px]">↑↓</kbd> navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-800 font-mono text-[9px]">↵</kbd> select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-800 font-mono text-[9px]">esc</kbd> close
                </span>
              </div>

              <div className="font-semibold text-amber-500">
                Jewellery Garden Universal Search
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
