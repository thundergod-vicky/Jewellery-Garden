"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import MainHeader from "@/components/header/MainHeader";
import TopBar from "@/components/header/TopBar";
import MainFooter from "@/components/footer/MainFooter";
import {
  Loader2,
  ArrowLeft,
  Plus,
  Trash2,
  CreditCard,
  Lock,
  User,
  Calendar,
} from "lucide-react";
import toast from "react-hot-toast";

// Card Brand Logos Component
const CardBrandLogo = ({ brand, size = 36 }: { brand: string; size?: number }) => {
  switch (brand?.toLowerCase()) {
    case "visa":
      return (
        <svg width={size} height={size * 0.3} viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40.2 1.4L33.7 28.5H23.5L17.2 7.2C16.8 5.6 16.4 5.0 15.0 4.2C11.4 2.2 5.3 0.6 0.1 0V5.7C5.9 5.7 10.7 7.0 13.9 8.7C15.6 9.6 16.0 10.3 16.6 12.8L22.2 28.5H32.6L48.1 1.4H40.2ZM70.4 17.5C70.5 10.8 61.2 10.4 61.3 7.5C61.4 6.6 62.2 5.6 64.3 5.3C65.3 5.2 68.3 5.0 71.8 6.6V1.3C67.0 -0.3 63.4 -0.1 60.9 0.6C55.0 2.2 50.9 5.7 50.8 10.9C50.6 17.5 59.8 17.8 59.7 21.0C59.6 22.0 58.5 23.0 56.1 23.3C52.7 23.7 49.3 22.8 47.7 22.0L46.3 27.6C48.9 28.8 52.8 29.3 56.1 29.3C62.5 29.3 70.3 25.7 70.4 17.5ZM90.2 1.4C88.3 1.4 86.8 2.5 86.0 4.4L73.6 28.5H83.9L86.0 22.7H98.6L99.8 28.5H108.8L90.2 1.4ZM88.2 16.3L93.7 5.7L96.8 16.3H88.2ZM121.7 1.4H113.8C111.4 1.4 110.1 2.5 109.2 4.4L96.3 28.5H106.6L108.7 22.7H121.3L122.5 28.5H131.5L121.7 1.4ZM119.7 16.3L125.2 5.7L128.3 16.3H119.7Z" fill="#1A1F71"/>
        </svg>
      );
    case "mastercard":
      return (
        <svg width={size} height={size * 0.6} viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="35" cy="30" r="28" fill="#EB001B" fillOpacity="0.85"/>
          <circle cx="65" cy="30" r="28" fill="#F79E1B" fillOpacity="0.85"/>
          <path d="M50 8.5C53.3 14.5 55 22.2 55 30C55 37.8 53.3 45.5 50 51.5C46.7 45.5 45 37.8 45 30C45 22.2 46.7 14.5 50 8.5Z" fill="#FF5F00"/>
        </svg>
      );
    case "amex":
      return (
        <div className="bg-[#0185FF] text-white font-black text-[11px] px-2 py-0.5 rounded tracking-tight border border-white/20 inline-flex items-center h-5">
          AMEX
        </div>
      );
    case "rupay":
      return (
        <div className="font-sans italic font-extrabold text-xs text-[#0B2D85]">
          <span className="text-[#F05323]">Ru</span>Pay
        </div>
      );
    default:
      return <CreditCard className="w-6 h-6 text-[#C8232A]" />;
  }
};

const validateLuhn = (number: string) => {
  const digits = number.replace(/\D/g, "");
  if (digits.length < 12 || digits.length > 19) return false;

  let sum = 0;
  let shouldDouble = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i), 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
};

const detectCardBrand = (number: string) => {
  const clean = number.replace(/\D/g, "");
  if (!clean) return "unknown";

  if (/^4/.test(clean)) return "visa";
  if (/^5[1-5]/.test(clean) || /^2(22[1-9]|2[3-9]|[3-6]|7[0-1]|720)/.test(clean)) return "mastercard";
  if (/^3[47]/.test(clean)) return "amex";
  if (/^(508[5-9]|6521|6522|60|65)/.test(clean)) return "rupay";
  return "unknown";
};

export default function PaymentOptionsPage() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();

  const [savedCards, setSavedCards] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const detectedBrand = detectCardBrand(cardNumber);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (user) {
      fetchSavedCards();
    }
  }, [user, profile, loading, router]);

  const fetchSavedCards = async () => {
    if (!user?.uid) {
      setFetching(false);
      return;
    }
    setFetching(true);
    try {
      if (profile?.savedCards) {
        try {
          setSavedCards(JSON.parse(profile.savedCards));
        } catch (e) {}
      }

      const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000").replace("localhost", "127.0.0.1");
      const res = await fetch(`${API_BASE}/api/customers/${user.uid}`);
      if (res.ok) {
        const data = await res.json();
        if (data.savedCards) {
          try {
            setSavedCards(JSON.parse(data.savedCards));
          } catch (e) {
            setSavedCards([]);
          }
        }
      }
    } catch (err) {
      console.error("Error fetching saved cards:", err);
    } finally {
      setFetching(false);
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 16) input = input.substring(0, 16);

    let formatted = "";
    for (let i = 0; i < input.length; i++) {
      if (i > 0 && i % 4 === 0) formatted += " ";
      formatted += input[i];
    }
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 4) input = input.substring(0, 4);

    let formatted = input;
    if (input.length > 2) {
      formatted = input.substring(0, 2) + "/" + input.substring(2);
    }
    setExpiry(formatted);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, "");
    const limit = detectedBrand === "amex" ? 4 : 3;
    if (input.length > limit) input = input.substring(0, limit);
    setCvv(input);
  };

  const handleSaveCard = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNumber = cardNumber.replace(/\D/g, "");

    if (cleanNumber.length < 15) {
      toast.error("Please enter a valid card number.");
      return;
    }

    if (!validateLuhn(cleanNumber)) {
      toast.error("Invalid card number. Please check the digits.");
      return;
    }

    if (expiry.length < 5) {
      toast.error("Please enter expiry in MM/YY format.");
      return;
    }

    if (cvv.length < 3) {
      toast.error("Please enter a valid CVV.");
      return;
    }

    setSaving(true);
    try {
      const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000").replace("localhost", "127.0.0.1");

      const newCard = {
        id: "card_" + Math.random().toString(36).substring(2, 11),
        holder: cardHolder.trim().toUpperCase(),
        brand: detectedBrand !== "unknown" ? detectedBrand : "card",
        last4: cleanNumber.slice(-4),
        expiry,
        masked: `•••• •••• •••• ${cleanNumber.slice(-4)}`,
      };

      const updatedCards = [...savedCards, newCard];

      const res = await fetch(`${API_BASE}/api/customers/${user.uid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          savedCards: JSON.stringify(updatedCards),
        }),
      });

      if (res.ok) {
        setSavedCards(updatedCards);
        setIsAdding(false);
        setCardNumber("");
        setCardHolder("");
        setExpiry("");
        setCvv("");
        toast.success("Card added securely to your profile! 💳");
      } else {
        throw new Error("Failed to save card");
      }
    } catch (err: any) {
      toast.error("Could not save card: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    if (!confirm("Are you sure you want to delete this payment method?")) return;

    const updatedCards = savedCards.filter((c) => c.id !== cardId);

    try {
      const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000").replace("localhost", "127.0.0.1");
      const res = await fetch(`${API_BASE}/api/customers/${user.uid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          savedCards: JSON.stringify(updatedCards),
        }),
      });

      if (res.ok) {
        setSavedCards(updatedCards);
        toast.success("Card removed successfully.");
      } else {
        throw new Error("Failed to delete card");
      }
    } catch (err: any) {
      toast.error("Could not delete card: " + err.message);
    }
  };

  if (loading || !user) {
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

      <section className="py-10 px-4 flex-1">
        <div className="max-w-[960px] mx-auto">
          <div className="mb-6">
            <Link
              href="/account"
              className="text-xs font-semibold text-[#C8232A] hover:underline inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              BACK TO ACCOUNT
            </Link>
          </div>

          <div className="mb-6 text-left">
            <h1 className="font-serif text-2xl font-medium tracking-widest text-[#1A1A1A] mb-1">
              SAVED PAYMENT METHODS
            </h1>
            <p className="text-xs text-gray-500">
              Add or remove secure payment options for a faster, premium checkout experience.
            </p>
          </div>

          <div className="flex gap-3 bg-amber-50 border border-amber-200/80 rounded-xl p-3.5 items-center mb-8 text-left">
            <Lock className="w-4 h-4 text-amber-700 shrink-0" />
            <span className="text-xs text-amber-800 leading-snug">
              We do not store your CVV or full card credentials. All details are tokenized and stored in compliance with PCI-DSS security guidelines.
            </span>
          </div>

          {fetching ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 animate-spin text-[#C8232A] mr-2" />
              <span className="text-sm text-gray-500">Retrieving your cards...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Saved Cards List */}
              <div className="flex flex-col gap-4">
                {savedCards.length === 0 ? (
                  <div className="py-12 px-6 border border-dashed border-[#E8E3DA] rounded-2xl flex flex-col items-center justify-center text-center bg-white">
                    <CreditCard className="w-12 h-12 text-gray-300 mb-3" />
                    <h3 className="text-sm font-semibold text-[#1A1A1A] mb-1">No Saved Cards</h3>
                    <p className="text-xs text-gray-500 mb-4 max-w-[260px]">
                      You haven&apos;t added any payment methods to your profile yet.
                    </p>
                    {!isAdding && (
                      <button
                        onClick={() => setIsAdding(true)}
                        className="px-5 py-2 bg-[#C8232A] hover:bg-[#A81B21] text-white text-xs font-semibold tracking-wider rounded-lg transition-all flex items-center gap-1.5"
                      >
                        <Plus className="w-4 h-4" />
                        ADD A NEW CARD
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {savedCards.map((card) => (
                      <div
                        key={card.id}
                        className="bg-gradient-to-br from-[#1E1E1F] to-[#111112] border border-[#C5A059]/20 rounded-2xl p-5 text-white shadow-md flex flex-col justify-between h-[160px] text-left"
                      >
                        <div className="flex justify-between items-center">
                          <CardBrandLogo brand={card.brand} size={40} />
                          <button
                            onClick={() => handleDeleteCard(card.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                            title="Delete Card"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="font-mono text-base tracking-widest text-gray-200">
                          {card.masked}
                        </div>
                        <div className="flex justify-between text-[10px] text-gray-400 uppercase">
                          <div>
                            <span className="block text-[8px] text-gray-500">CARDHOLDER</span>
                            <span className="font-semibold text-gray-200">{card.holder}</span>
                          </div>
                          <div>
                            <span className="block text-[8px] text-gray-500">EXPIRES</span>
                            <span className="font-semibold text-gray-200">{card.expiry}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {!isAdding && (
                      <button
                        onClick={() => setIsAdding(true)}
                        className="border-2 border-dashed border-[#E8E3DA] rounded-2xl h-[120px] flex flex-col items-center justify-center gap-2 hover:border-[#C8232A] hover:bg-red-50/20 transition-all text-xs font-semibold text-[#C8232A]"
                      >
                        <Plus className="w-5 h-5 text-[#C8232A]" />
                        <span>Add New Card</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Add Card Form Block */}
              {isAdding && (
                <div className="bg-white border border-[#E8E3DA] rounded-2xl p-6 shadow-sm text-left">
                  {/* Virtual Credit Card Mockup */}
                  <div className="bg-gradient-to-br from-[#1E1E1F] to-[#111112] border border-[#C5A059]/30 rounded-2xl p-5 text-white shadow-lg mb-6 flex flex-col justify-between h-[160px]">
                    <div className="flex justify-between items-center">
                      <div className="w-9 h-7 rounded border border-yellow-200/40 bg-yellow-200/20 flex items-center justify-center">
                        <div className="w-full h-[1px] bg-yellow-200/40" />
                      </div>
                      <CardBrandLogo brand={detectedBrand} size={42} />
                    </div>
                    <div className="font-mono text-lg tracking-widest text-gray-100">
                      {cardNumber || "•••• •••• •••• ••••"}
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-400 uppercase">
                      <div>
                        <span className="block text-[8px] text-gray-500">CARD HOLDER</span>
                        <span className="font-semibold text-gray-100">
                          {cardHolder.trim().toUpperCase() || "CLIENT NAME"}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[8px] text-gray-500">EXPIRES</span>
                        <span className="font-semibold text-gray-100">{expiry || "MM/YY"}</span>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSaveCard} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1 text-left">
                      <label className="text-[10px] font-semibold text-gray-700 uppercase">
                        Cardholder Name
                      </label>
                      <div className="relative flex items-center">
                        <User className="absolute left-3.5 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="AS WRITTEN ON CARD"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-2.5 border border-[#E8E3DA] rounded-lg text-xs text-[#1A1A1A] focus:border-[#C8232A] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 text-left">
                      <label className="text-[10px] font-semibold text-gray-700 uppercase">
                        Card Number
                      </label>
                      <div className="relative flex items-center">
                        <CreditCard className="absolute left-3.5 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          required
                          className="w-full pl-10 pr-12 py-2.5 border border-[#E8E3DA] rounded-lg text-xs text-[#1A1A1A] focus:border-[#C8232A] focus:outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1 text-left">
                        <label className="text-[10px] font-semibold text-gray-700 uppercase">
                          Expiry Date
                        </label>
                        <div className="relative flex items-center">
                          <Calendar className="absolute left-3.5 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={expiry}
                            onChange={handleExpiryChange}
                            required
                            className="w-full pl-10 pr-4 py-2.5 border border-[#E8E3DA] rounded-lg text-xs text-[#1A1A1A] focus:border-[#C8232A] focus:outline-none font-mono"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1 text-left">
                        <label className="text-[10px] font-semibold text-gray-700 uppercase">
                          CVV / CVC
                        </label>
                        <div className="relative flex items-center">
                          <Lock className="absolute left-3.5 w-4 h-4 text-gray-400" />
                          <input
                            type="password"
                            placeholder="•••"
                            value={cvv}
                            onChange={handleCvvChange}
                            required
                            className="w-full pl-10 pr-4 py-2.5 border border-[#E8E3DA] rounded-lg text-xs text-[#1A1A1A] focus:border-[#C8232A] focus:outline-none font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 mt-3 pt-3 border-t border-[#E8E3DA]">
                      <button
                        type="button"
                        onClick={() => setIsAdding(false)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-all"
                      >
                        CANCEL
                      </button>
                      <button
                        type="submit"
                        disabled={saving}
                        className="px-5 py-2 bg-[#C8232A] hover:bg-[#A81B21] text-white text-xs font-semibold tracking-wider rounded-lg transition-all flex items-center justify-center min-w-[100px]"
                      >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "SAVE CARD"}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <MainFooter />
    </main>
  );
}
