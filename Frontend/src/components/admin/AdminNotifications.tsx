"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  Check,
  ShoppingBag,
  MessageSquare,
  AlertTriangle,
  ShieldCheck,
  X,
  ExternalLink,
  Sparkles,
  Clock,
} from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "order" | "support" | "inventory" | "security";
  link: string;
  badge?: string;
}

export default function AdminNotifications({ isDark }: { isDark: boolean }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const popoverRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Helper to get persistent read IDs from localStorage
  const getReadIds = (): string[] => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("jg_admin_read_notifs");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  // Helper to get persistent dismissed IDs from localStorage
  const getDismissedIds = (): string[] => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("jg_admin_dismissed_notifs");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  // Load and sync notifications with localStorage
  useEffect(() => {
    const readIds = new Set(getReadIds());
    const dismissedIds = new Set(getDismissedIds());

    const baseItems: NotificationItem[] = [
      {
        id: "notif-1",
        title: "New Order Received",
        message: "Order #JG-75628 for ₹13,180 received from drindranilhait@gmail.com",
        timestamp: "2 mins ago",
        read: readIds.has("notif-1"),
        type: "order",
        link: "/admin/orders",
        badge: "₹13,180",
      },
      {
        id: "notif-2",
        title: "Live Support Escalation",
        message: "Customer Souvik Basu requested live agent assistance in Support Desk",
        timestamp: "12 mins ago",
        read: readIds.has("notif-2"),
        type: "support",
        link: "/admin/support",
        badge: "Live Chat",
      },
      {
        id: "notif-3",
        title: "Low Inventory Alert",
        message: "Royal Peacock 22KT Gold Jhumka stock reached threshold (5 left)",
        timestamp: "1 hour ago",
        read: readIds.has("notif-3"),
        type: "inventory",
        link: "/admin/products",
        badge: "5 left",
      },
      {
        id: "notif-4",
        title: "Admin Security Session Active",
        message: "Authorized Admin session verified successfully",
        timestamp: "3 hours ago",
        read: readIds.has("notif-4") || true,
        type: "security",
        link: "/admin/zerotrust",
        badge: "Verified",
      },
    ];

    const fetchLiveNotifications = async () => {
      let liveItems: NotificationItem[] = [];
      try {
        const res = await fetch("http://localhost:4000/api/orders");
        if (res.ok) {
          const orders = await res.json();
          if (Array.isArray(orders) && orders.length > 0) {
            liveItems = orders.slice(0, 5).map((o: any, idx: number) => {
              const id = `live-order-${o.id || o.orderNumber || idx}`;
              return {
                id,
                title: `Order ${o.status === "COMPLETED" ? "Fulfilled" : "Received"}`,
                message: `Order #${o.orderNumber || "JG-1001"} by ${o.customerEmail || "customer"} (₹${(o.totalAmount || 0).toLocaleString("en-IN")})`,
                timestamp: o.createdAt ? new Date(o.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now",
                read: readIds.has(id),
                type: "order" as const,
                link: "/admin/orders",
                badge: o.status || "NEW",
              };
            });
          }
        }
      } catch (err) {}

      const combinedMap = new Map<string, NotificationItem>();
      [...liveItems, ...baseItems].forEach((item) => {
        if (!dismissedIds.has(item.id)) {
          combinedMap.set(item.id, item);
        }
      });

      setNotifications(Array.from(combinedMap.values()));
    };

    fetchLiveNotifications();
  }, []);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    const allIds = notifications.map((n) => n.id);
    const existingRead = getReadIds();
    const updatedReadIds = Array.from(new Set([...existingRead, ...allIds]));
    if (typeof window !== "undefined") {
      localStorage.setItem("jg_admin_read_notifs", JSON.stringify(updatedReadIds));
    }
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    const existingRead = getReadIds();
    if (!existingRead.includes(id)) {
      const updatedReadIds = [...existingRead, id];
      if (typeof window !== "undefined") {
        localStorage.setItem("jg_admin_read_notifs", JSON.stringify(updatedReadIds));
      }
    }
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const dismissNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const existingDismissed = getDismissedIds();
    if (!existingDismissed.includes(id)) {
      const updatedDismissed = [...existingDismissed, id];
      if (typeof window !== "undefined") {
        localStorage.setItem("jg_admin_dismissed_notifs", JSON.stringify(updatedDismissed));
      }
    }
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleNotificationClick = (item: NotificationItem) => {
    markAsRead(item.id);
    setIsOpen(false);
    router.push(item.link);
  };

  const filteredNotifications = notifications.filter(
    (n) => filter === "all" || !n.read
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "order":
        return <ShoppingBag className="w-4 h-4 text-emerald-500" />;
      case "support":
        return <MessageSquare className="w-4 h-4 text-sky-500" />;
      case "inventory":
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case "security":
        return <ShieldCheck className="w-4 h-4 text-indigo-500" />;
      default:
        return <Bell className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <div className="relative shrink-0" ref={popoverRef}>
      {/* Bell Button Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Admin Notifications"
        className={`relative p-2 rounded-full transition-all cursor-pointer ${
          isDark
            ? "bg-[#1A1D23] hover:bg-gray-800 text-gray-300"
            : "bg-[#EEF1F5] hover:bg-gray-200 text-gray-700"
        }`}
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#F04438] text-white text-[10px] font-extrabold flex items-center justify-center border-2 border-white dark:border-[#121417] shadow-sm animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Popover Panel */}
      {isOpen && (
        <div
          className={`absolute right-0 mt-3 w-80 sm:w-96 rounded-[24px] border shadow-2xl z-50 overflow-hidden transition-all animate-in fade-in slide-in-from-top-2 duration-200 ${
            isDark
              ? "bg-[#16181D] border-gray-800 text-white shadow-black/80"
              : "bg-white border-gray-200 text-gray-900 shadow-xl"
          }`}
        >
          {/* Header Bar */}
          <div
            className={`p-4 flex items-center justify-between border-b ${
              isDark ? "border-gray-800 bg-[#121417]" : "border-gray-100 bg-gray-50/80"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-xs">
                <Bell className="w-3.5 h-3.5" />
              </div>
              <h3 className="font-bold text-xs">Notifications</h3>
              {unreadCount > 0 && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20">
                  {unreadCount} new
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-[10px] font-semibold text-amber-500 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Check className="w-3 h-3" /> Mark all read
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Filter Pills Bar */}
          <div
            className={`px-4 py-2 flex items-center gap-2 border-b text-xs ${
              isDark ? "border-gray-800/80 bg-[#16181D]" : "border-gray-100 bg-white"
            }`}
          >
            <button
              onClick={() => setFilter("all")}
              className={`px-2.5 py-0.5 rounded-full font-bold transition-all text-[11px] ${
                filter === "all"
                  ? isDark
                    ? "bg-amber-500 text-gray-900"
                    : "bg-gray-900 text-white"
                  : "text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-2.5 py-0.5 rounded-full font-bold transition-all text-[11px] ${
                filter === "unread"
                  ? isDark
                    ? "bg-amber-500 text-gray-900"
                    : "bg-gray-900 text-white"
                  : "text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>

          {/* Notifications List */}
          <div className="max-h-[340px] overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800/60 p-2 space-y-1">
            {filteredNotifications.length === 0 ? (
              <div className="py-10 text-center space-y-2">
                <Sparkles className="w-6 h-6 text-gray-400 mx-auto opacity-40" />
                <p className="text-xs text-gray-400 font-medium">No notifications to show</p>
              </div>
            ) : (
              filteredNotifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => handleNotificationClick(n)}
                  className={`p-3 rounded-2xl transition-all cursor-pointer flex items-start gap-3 relative group ${
                    !n.read
                      ? isDark
                        ? "bg-gray-800/60 border border-gray-700/50"
                        : "bg-amber-50/70 border border-amber-100"
                      : isDark
                      ? "hover:bg-gray-800/40"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {/* Icon */}
                  <div className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 shrink-0 mt-0.5">
                    {getTypeIcon(n.type)}
                  </div>

                  {/* Body */}
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-bold truncate text-gray-900 dark:text-white">
                        {n.title}
                      </h4>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                      )}
                    </div>

                    <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug mt-0.5">
                      {n.message}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[9px] text-gray-400 font-mono flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" /> {n.timestamp}
                      </span>
                      {n.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                          {n.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action buttons on hover */}
                  <button
                    onClick={(e) => dismissNotification(n.id, e)}
                    className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 p-1 rounded-full text-gray-400 hover:text-red-500 transition-all"
                    title="Dismiss"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Action Bar */}
          <div
            className={`p-3 border-t text-center text-xs font-semibold ${
              isDark ? "border-gray-800 bg-[#121417]" : "border-gray-100 bg-gray-50/80"
            }`}
          >
            <button
              onClick={() => {
                setIsOpen(false);
                router.push("/admin/orders");
              }}
              className="text-amber-500 hover:text-amber-600 transition-colors flex items-center justify-center gap-1 mx-auto text-[11px] font-bold cursor-pointer"
            >
              <span>View All Admin Activity & Orders</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
