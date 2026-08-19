"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import MainHeader from "@/components/header/MainHeader";
import TopBar from "@/components/header/TopBar";
import MainFooter from "@/components/footer/MainFooter";
import {
  Loader2,
  ArrowLeft,
  Send,
  MessageSquare,
  Bot,
  User,
  ShieldAlert,
} from "lucide-react";
import toast from "react-hot-toast";

const getApiUrl = () => {
  const url = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000";
  return url.replace("localhost", "127.0.0.1");
};
const API_BASE = getApiUrl();

export default function ContactSettings() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [sessions, setSessions] = useState<any[]>([]);
  const [activeSession, setActiveSession] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState("");
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [escalating, setEscalating] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (user) {
      fetchSessions();
    }
  }, [user, loading, router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!activeSession) return;

    fetchMessages(activeSession.id);
    const interval = setInterval(() => {
      fetchMessages(activeSession.id);
      refreshActiveSession(activeSession.id);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeSession?.id]);

  const fetchSessions = async () => {
    if (!user) return;
    setLoadingSessions(true);
    try {
      const res = await fetch(`${API_BASE}/api/support/sessions?firebaseId=${user.uid}`);
      if (res.ok) {
        const data = await res.json();
        setSessions(data);
      }
    } catch (e) {
      console.error("Failed to load sessions", e);
    } finally {
      setLoadingSessions(false);
    }
  };

  const refreshActiveSession = async (sessionId: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/support/sessions?firebaseId=${user.uid}`);
      if (res.ok) {
        const data = await res.json();
        const fresh = data.find((s: any) => s.id === sessionId);
        if (fresh) {
          setActiveSession(fresh);
        }
      }
    } catch (e) {
      console.warn("Could not refresh session status", e);
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
      console.error("Failed to load messages", e);
    }
  };

  const handleStartNewChat = async () => {
    if (!user) return;
    const toastId = toast.loading("Starting new support session...");
    try {
      const res = await fetch(`${API_BASE}/api/support/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firebaseId: user.uid }),
      });
      if (res.ok) {
        const sess = await res.json();
        setActiveSession(sess);
        setMessages([]);
        fetchSessions();
        toast.success("New support chat started!", { id: toastId });
        fetchMessages(sess.id);
      } else {
        toast.error("Failed to start support session.", { id: toastId });
      }
    } catch (e) {
      toast.error("Error connecting to server.", { id: toastId });
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeSession || sendingMessage) return;

    const text = inputText.trim();
    setInputText("");
    setSendingMessage(true);

    try {
      const res = await fetch(`${API_BASE}/api/support/sessions/${activeSession.id}/messages?sender=user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      } else {
        toast.error("Failed to send message");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error");
    } finally {
      setSendingMessage(false);
    }
  };

  const handleEscalate = async () => {
    if (!activeSession) return;
    setEscalating(true);
    const toastId = toast.loading("Escalating to human representative...");
    try {
      const res = await fetch(`${API_BASE}/api/support/sessions/${activeSession.id}/escalate`, {
        method: "POST",
      });
      if (res.ok) {
        const updated = await res.json();
        setActiveSession(updated);
        fetchMessages(activeSession.id);
        toast.success("Human representative requested!", { id: toastId });
      } else {
        toast.error("Failed to escalate chat.", { id: toastId });
      }
    } catch (e) {
      toast.error("Network error.", { id: toastId });
    } finally {
      setEscalating(false);
    }
  };

  if (loading || (loadingSessions && sessions.length === 0)) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#C8232A]" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] flex flex-col font-sans">
      <TopBar />
      <MainHeader />

      <section className="py-10 px-4 flex-1 flex items-center justify-center">
        <div className={`w-full mx-auto ${activeSession ? "max-w-[760px]" : "max-w-[540px]"}`}>
          <div className="mb-5 text-left">
            <Link
              href="/account"
              className="text-xs font-semibold text-[#C8232A] hover:underline inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              BACK TO ACCOUNT
            </Link>
          </div>

          {!activeSession ? (
            /* SELECTION MENU */
            <div className="bg-white border border-[#E8E3DA] rounded-2xl p-8 sm:p-10 shadow-sm text-left">
              <div className="mb-8">
                <h1 className="font-serif text-2xl font-medium tracking-widest text-[#1A1A1A] mb-2">
                  CUSTOMER SUPPORT
                </h1>
                <p className="text-xs text-gray-500">
                  Chat with our customer service bot or connect with a support specialist.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <button
                  onClick={handleStartNewChat}
                  className="w-full py-4 bg-[#C8232A] hover:bg-[#A81B21] text-white font-semibold text-xs tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  START A NEW CHAT
                </button>

                {sessions.length > 0 && (
                  <div>
                    <h3 className="text-[11px] font-semibold text-gray-400 tracking-wider uppercase mb-3">
                      Continue Previous Conversations
                    </h3>
                    <div className="flex flex-col gap-2.5 max-h-[240px] overflow-y-auto pr-1">
                      {sessions.map((sess) => (
                        <div
                          key={sess.id}
                          onClick={() => setActiveSession(sess)}
                          className="p-3.5 bg-[#FAF8F5] border border-[#E8E3DA] rounded-xl cursor-pointer hover:border-[#C8232A] transition-all flex flex-col gap-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-[#1A1A1A]">
                              Chat ID: #{sess.id.slice(-6)}
                            </span>
                            <span
                              className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                                sess.status === "bot"
                                  ? "bg-amber-50 text-amber-700"
                                  : sess.status === "resolved"
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-red-50 text-red-700"
                              }`}
                            >
                              {sess.status === "bot"
                                ? "AI Bot"
                                : sess.status === "resolved"
                                ? "Resolved"
                                : "Live Escalated"}
                            </span>
                          </div>
                          <span className="text-[10px] text-gray-400">
                            Created: {new Date(sess.createdAt).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* LIVE CHAT WINDOW */
            <div className="bg-white border border-[#E8E3DA] rounded-2xl shadow-sm flex flex-col h-[580px] overflow-hidden text-left">
              <div className="p-4 border-b border-[#E8E3DA] flex items-center justify-between bg-[#FFFCF7]">
                <button
                  onClick={() => {
                    setActiveSession(null);
                    setMessages([]);
                  }}
                  className="text-xs text-gray-500 hover:text-[#1A1A1A] flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Menu
                </button>

                <div className="flex flex-col items-center">
                  <span className="text-xs font-semibold text-[#1A1A1A]">
                    Support Session #{activeSession.id.slice(-6)}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {activeSession.status === "bot" && "🤖 Connected to AI Bot"}
                    {activeSession.status === "escalated" && "⏳ Waiting for Support Specialist..."}
                    {activeSession.status === "human" && "👥 Connected to Live Agent"}
                    {activeSession.status === "resolved" && "✅ Session resolved"}
                  </span>
                </div>

                {activeSession.status === "bot" ? (
                  <button
                    onClick={handleEscalate}
                    disabled={escalating}
                    className="px-3 py-1.5 border border-[#C8232A] text-[#C8232A] hover:bg-red-50 text-[11px] font-semibold rounded-lg transition-all"
                  >
                    TALK TO HUMAN
                  </button>
                ) : (
                  <div className="w-16" />
                )}
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-5 overflow-y-auto bg-[#FAF8F5] flex flex-col gap-4">
                {messages.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <Bot className="w-8 h-8 text-[#C8232A] mb-2" />
                    <p className="text-xs text-gray-500">Starting conversation...</p>
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isUser = msg.sender === "user";
                    const isSystem =
                      msg.sender === "bot" &&
                      (msg.content.includes("joined") ||
                        msg.content.includes("escalated") ||
                        msg.content.includes("resolved"));

                    if (isSystem) {
                      return (
                        <div key={msg.id} className="self-center my-1 text-center">
                          <span className="text-[10px] text-gray-500 italic bg-white px-3 py-1 rounded-full border border-[#E8E3DA]">
                            {msg.content}
                          </span>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={msg.id}
                        className={`flex items-start ${isUser ? "justify-end" : "justify-start"}`}
                      >
                        {!isUser && (
                          <div className="w-7 h-7 rounded-full bg-[#C8232A] text-white flex items-center justify-center mr-2 shrink-0">
                            {msg.sender === "bot" ? <Bot className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                          </div>
                        )}
                        <div className="flex flex-col max-w-[75%]">
                          <span
                            className={`text-[9px] text-gray-400 mb-1 ${
                              isUser ? "self-end" : "self-start"
                            }`}
                          >
                            {msg.sender === "bot" ? "AI Bot" : msg.sender === "admin" ? "Live Agent" : "You"} •{" "}
                            {new Date(msg.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          <div
                            className={`p-3 text-xs leading-relaxed ${
                              isUser
                                ? "bg-[#C8232A] text-white rounded-2xl rounded-tr-xs"
                                : "bg-white text-[#1A1A1A] border border-[#E8E3DA] rounded-2xl rounded-tl-xs"
                            }`}
                          >
                            {msg.content}
                          </div>
                        </div>
                        {isUser && (
                          <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center ml-2 shrink-0">
                            <User className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              {activeSession.status !== "resolved" && (
                <form
                  onSubmit={handleSendMessage}
                  className="p-3.5 border-t border-[#E8E3DA] flex gap-2 bg-white"
                >
                  <input
                    type="text"
                    placeholder="Type a message here..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    disabled={sendingMessage}
                    className="flex-1 px-3.5 py-2 border border-[#E8E3DA] rounded-xl text-xs text-[#1A1A1A] focus:border-[#C8232A] focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim() || sendingMessage}
                    className="w-9 h-9 rounded-xl bg-[#C8232A] hover:bg-[#A81B21] text-white flex items-center justify-center transition-all disabled:opacity-50"
                  >
                    {sendingMessage ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </section>

      <MainFooter />
    </main>
  );
}
