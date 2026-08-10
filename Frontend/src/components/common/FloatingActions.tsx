"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, ArrowUp, X, Send, Sparkles } from "lucide-react";
import { SITE_DATA } from "@/data/siteData";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  options?: { label: string; action: string }[];
  showWhatsAppButton?: boolean;
}

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m-1",
      sender: "bot",
      text: "Hello! 👋 Welcome to Jewellery Garden Pvt Ltd. I am your AI Assistant powered by Next.js AI Engine. How can I help you today?",
      options: [
        { label: "👑 Gold Purity & Hallmarking", action: "purity" },
        { label: "🚚 Shipping & PIN Code Delivery", action: "shipping" },
        { label: "💎 Certified Diamonds & 4Cs", action: "diamonds" },
        { label: "🏬 Durgapur Showroom Timings", action: "showrooms" },
        { label: "🔄 15-Day Returns & Exchanges", action: "returns" },
        { label: "💰 Price Breakup & GST", action: "pricing" },
      ],
      showWhatsAppButton: true,
    },
  ]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isChatOpen]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSelectOption = (action: string, labelText: string) => {
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: labelText,
    };

    let botResponseText = "";
    if (action === "purity") {
      botResponseText = "100% of our Gold ornaments are 22KT (BIS 916) or 18KT (BIS 750) hallmarked with 6-digit laser-inscribed HUID numbers. You can verify HUID validity on the government BIS Care App.";
    } else if (action === "shipping") {
      botResponseText = "We offer FREE insured transit door delivery across all PIN codes in India. Express orders are dispatched within 24-48 hours with full courier insurance.";
    } else if (action === "diamonds") {
      botResponseText = "Every solitaire diamond is natural and certified by international gem labs (IGLI / SGL) featuring EF to GH color grades and VVS1-VS2 clarity.";
    } else if (action === "showrooms") {
      botResponseText = "Visit us at Durgapur Bazar Showroom (10:30 AM - 8:30 PM) or Durgapur City Centre Showroom (11:00 AM - 9:00 PM). You can also book a live trial online!";
    } else if (action === "returns") {
      botResponseText = "We guarantee a 15-Day Money-Back & Exchange policy on all unused gold and 925 silver jewellery. We arrange free door pickup with logistics insurance.";
    } else if (action === "pricing") {
      botResponseText = "Our pricing is 100% transparent: Gold Net Weight × Live Rate + Making Charges (with flat 20% discount) + 3% GST. Full tax invoices are provided with every order.";
    } else {
      botResponseText = "Thank you for reaching out! You can speak directly with our Durgapur sales advisor on WhatsApp.";
    }

    const botMsg: ChatMessage = {
      id: `b-${Date.now()}`,
      sender: "bot",
      text: botResponseText,
      options: [
        { label: "👑 Gold Purity", action: "purity" },
        { label: "🏬 Showrooms", action: "showrooms" },
        { label: "🔄 Returns", action: "returns" },
      ],
      showWhatsAppButton: true,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userText = inputMessage.trim();
    setInputMessage("");

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: userText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Call AI Chat API Route (/api/chat)
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: userText }],
        }),
      });

      const dataText = await res.text();
      let aiText = "";

      // Parse data stream response
      if (dataText.startsWith("0:")) {
        try {
          aiText = JSON.parse(dataText.substring(2).trim());
        } catch {
          aiText = dataText;
        }
      } else {
        aiText = dataText;
      }

      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: "bot",
        text: aiText || "Thank you for reaching out! Click below to speak directly with our sales team on WhatsApp.",
        showWhatsAppButton: true,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("AI Error:", err);
      const fallbackMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: "bot",
        text: "I am here to help you explore our 22KT Gold, Solitaire Diamonds, and 925 Sterling Silver collections! You can also chat directly on WhatsApp below.",
        showWhatsAppButton: true,
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Buttons (Fixed Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-600 text-white shadow-xl flex items-center justify-center transition-all hover:scale-110 border-2 border-white"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          aria-label="Open AI Assistant"
          className="relative w-14 h-14 rounded-full bg-[#C8232A] hover:bg-[#B81D24] text-white shadow-2xl flex items-center justify-center transition-all hover:scale-110 border-2 border-white ring-4 ring-red-500/20"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full animate-pulse" />
        </button>
      </div>

      {/* Interactive AI Chatbot Window Popup */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[380px] h-[520px] bg-white rounded-3xl shadow-2xl border border-[#E8E3DA] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header Bar */}
          <div className="bg-[#CC2529] text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-white/20 p-1 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#F0D588]" />
              </div>
              <div>
                <h3 className="font-serif-title font-bold text-sm leading-tight text-white">
                  Jewellery Garden AI Assistant
                </h3>
                <span className="text-[10px] text-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  JW AI • Online
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsChatOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Stream Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#FAF8F5] text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#C8232A] text-white rounded-br-none shadow"
                      : "bg-white text-gray-800 border border-[#E8E3DA] rounded-bl-none shadow-sm"
                  }`}
                >
                  <p>{msg.text}</p>
                </div>

                {/* Quick Action Options */}
                {msg.options && msg.options.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[95%]">
                    {msg.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectOption(opt.action, opt.label)}
                        className="bg-white hover:bg-[#C8232A] text-gray-700 hover:text-white border border-gray-300 hover:border-[#C8232A] text-[11px] font-medium py-1.5 px-3 rounded-full shadow-sm transition-all text-left"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Direct WhatsApp Support Button */}
                {msg.showWhatsAppButton && (
                  <div className="mt-3 w-full max-w-[90%]">
                    <a
                      href={`https://wa.me/${SITE_DATA.whatsappPhone.replace(/[^0-9]/g, "")}?text=Hello%20Jewellery%20Garden%20Team,%20I%20need%20assistance`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow transition-all"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" />
                      <span>Chat on WhatsApp Support</span>
                    </a>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                <Sparkles className="w-4 h-4 text-[#C8232A] animate-spin" />
                <span>AI is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Form Bar */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask AI anything (e.g. Hi, Gold purity...)"
              className="flex-1 text-xs bg-gray-100 focus:bg-white border border-gray-300 focus:border-[#C8232A] px-3.5 py-2.5 rounded-xl focus:outline-none"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#C8232A] hover:bg-[#B81D24] text-white p-2.5 rounded-xl shadow transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
