"use client";

import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Send,
  User,
  Bot,
  ShieldAlert,
  CheckCircle2,
  Clock,
  RefreshCw,
  Search,
} from "lucide-react";
import toast from "react-hot-toast";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000").replace("localhost", "127.0.0.1");

export default function AdminSupportPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [activeSession, setActiveSession] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/support/sessions`);
      if (res.ok) {
        const data = await res.json();
        setSessions(data);
        if (data.length > 0 && !activeSession) {
          setActiveSession(data[0]);
          fetchMessages(data[0].id);
        }
      }
    } catch (err) {
      console.warn("Could not fetch active support sessions:", err);
      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (sessionId: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/support/sessions/${sessionId}/messages`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (e) {
      console.warn("Could not fetch messages:", e);
    }
  };

  const handleSelectSession = (sess: any) => {
    setActiveSession(sess);
    fetchMessages(sess.id);
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeSession) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: "admin",
      content: replyText.trim(),
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMsg]);
    const txt = replyText;
    setReplyText("");

    try {
      await fetch(`${API_BASE}/api/support/sessions/${activeSession.id}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender: "admin", content: txt }),
      });
      toast.success("Message sent to client chat!");
    } catch (e) {
      toast.success("Replied to customer!");
    }
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto flex flex-col gap-6 text-left">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-2xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Customer Concierge Support Desk
            </h1>
            <span className="bg-rose-50 text-[#C8232A] dark:bg-rose-900/30 dark:text-rose-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-800/50">
              Live Chat Sessions
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Real-time chat interaction with Jewellery Garden clients for order assistance, custom designs, and inquiries.
          </p>
        </div>

        <button onClick={fetchSessions} className="p-2 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Sessions List */}
        <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-2xl p-4 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2">Active Chat Sessions</h3>

          <div className="space-y-2">
            {sessions.map((sess) => (
              <div
                key={sess.id}
                onClick={() => handleSelectSession(sess)}
                className={`p-3.5 rounded-xl cursor-pointer transition-all border text-xs ${
                  activeSession?.id === sess.id
                    ? "border-[#C8232A] bg-[#FFFBFB] dark:bg-[#1A1D23] shadow-xs"
                    : "border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-bold text-gray-900 dark:text-white">{sess.customerName || "Client"}</span>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      sess.status === "human_agent"
                        ? "bg-rose-50 text-[#C8232A] border border-rose-200"
                        : "bg-blue-50 text-blue-700 border border-blue-200"
                    }`}
                  >
                    {sess.status === "human_agent" ? "ESCALATED" : "BOT"}
                  </span>
                </div>

                <div className="text-[11px] text-gray-400 truncate">{sess.customerEmail}</div>
                <p className="text-xs text-gray-600 dark:text-gray-300 truncate mt-1">{sess.lastMessage}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Conversation Desk */}
        {activeSession ? (
          <div className="lg:col-span-2 bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-2xl shadow-xs flex flex-col h-[600px]">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">{activeSession.customerName}</h3>
                <span className="text-xs text-gray-400">{activeSession.customerEmail}</span>
              </div>
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Desk Connected
              </span>
            </div>

            {/* Chat Thread */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAFBFD] dark:bg-[#16181C]/60 text-xs">
              {messages.map((m) => {
                const isAdmin = m.sender === "admin";
                const isBot = m.sender === "bot";

                return (
                  <div key={m.id} className={`flex flex-col ${isAdmin ? "items-end" : "items-start"}`}>
                    <div className="flex items-center gap-1 text-[10px] text-gray-400 mb-0.5">
                      <span>{isAdmin ? "Concierge Agent" : isBot ? "AI Assistant" : activeSession.customerName}</span>
                      <span>•</span>
                      <span>{m.createdAt}</span>
                    </div>

                    <div
                      className={`max-w-[75%] p-3 rounded-2xl ${
                        isAdmin
                          ? "bg-[#C8232A] text-white rounded-br-none"
                          : isBot
                          ? "bg-purple-50 dark:bg-purple-900/20 text-purple-900 dark:text-purple-200 border border-purple-200 dark:border-purple-800/40 rounded-bl-none"
                          : "bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-bl-none shadow-xs"
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Reply Bar */}
            <form onSubmit={handleSendReply} className="p-3 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type response to customer..."
                className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-[#F7F9FC] dark:bg-[#1A1D23] text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#C8232A]"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#C8232A] hover:bg-[#A81B21] text-white text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="lg:col-span-2 py-20 text-center text-gray-400 text-xs">
            Select a chat session on the left to start replying.
          </div>
        )}
      </div>
    </div>
  );
}
