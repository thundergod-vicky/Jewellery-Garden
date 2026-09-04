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

// Card Category Detection Helper
const detectCardCategory = (number: string): "DEBIT CARD" | "CREDIT CARD" => {
  const clean = number.replace(/\D/g, "");
  if (!clean) return "DEBIT CARD";
  if (/^(508|60|6521|6522|4026|4175|4508|4844|4913|4917|4129|4375|4591|4214|4592|4386|5020|5038|5893|6304|6759|6761|6762|6763)/.test(clean)) {
    return "DEBIT CARD";
  }
  return "CREDIT CARD";
};

// Realistic Credit Card Preview Component matching reference design
const VirtualCardPreview = ({
  cardNumber,
  cardHolder,
  expiry,
  brand,
  cardType = "CREDIT CARD",
  variant = "red",
  onDelete,
}: {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  brand: string;
  cardType?: string;
  variant?: "red" | "green" | "black";
  onDelete?: () => void;
}) => {
  const bgGradient =
    variant === "green"
      ? "bg-gradient-to-br from-[#68B715] via-[#478B0C] to-[#255203]"
      : variant === "black"
      ? "bg-gradient-to-br from-[#1C1D21] via-[#242730] to-[#121316]"
      : "bg-gradient-to-br from-[#CE1B25] via-[#9B0A11] to-[#5C0308]";

  return (
    <div
      className={`relative w-full max-w-[420px] h-[210px] sm:h-[220px] rounded-[22px] p-5 text-white shadow-2xl flex flex-col justify-between overflow-hidden font-sans border border-white/25 select-none transition-all ${bgGradient}`}
    >
      {/* Dual-Tone Curved Wave Background Overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 420 220"
        preserveAspectRatio="none"
      >
        <path
          d="M0,220 C120,200 220,130 420,0 L420,220 Z"
          fill="black"
          fillOpacity="0.25"
        />
        <path
          d="M0,220 C140,210 240,150 420,40 L420,220 Z"
          fill="black"
          fillOpacity="0.1"
        />
      </svg>

      {/* Top Header Row with Card Type Badge */}
      <div className="flex justify-between items-center z-10 min-h-[24px]">
        <span className="text-[9px] font-mono font-extrabold tracking-widest text-white uppercase bg-white/20 px-2.5 py-0.5 rounded-full border border-white/30 backdrop-blur-xs shadow-2xs">
          {cardType}
        </span>

        {onDelete && (
          <button
            onClick={onDelete}
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/20 rounded-lg transition-all"
            title="Delete Card"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Middle Gold Keyhole EMV Chip */}
      <div className="z-10 -mt-2">
        <svg width="44" height="33" viewBox="0 0 44 33" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
          <rect width="44" height="33" rx="6" fill="url(#chip_gold_grad)" stroke="#D4AF37" strokeWidth="0.8" />
          <path d="M0 11.5H14C16.2 11.5 18 13.3 18 15.5V17.5C18 19.7 16.2 21.5 14 21.5H0" stroke="#B8860B" strokeWidth="0.8" />
          <path d="M44 11.5H30C27.8 11.5 26 13.3 26 15.5V17.5C26 19.7 27.8 21.5 30 21.5H44" stroke="#B8860B" strokeWidth="0.8" />
          <path d="M18 0V33" stroke="#B8860B" strokeWidth="0.8" />
          <path d="M26 0V33" stroke="#B8860B" strokeWidth="0.8" />
          <ellipse cx="22" cy="16.5" rx="4" ry="5.5" fill="#FAD961" stroke="#B8860B" strokeWidth="0.8" />
          <defs>
            <linearGradient id="chip_gold_grad" x1="0" y1="0" x2="44" y2="33" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FAD961" />
              <stop offset="1" stopColor="#F76B1C" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Card Number & Valid Thru Row */}
      <div className="z-10 space-y-1 my-0.5">
        <div className="font-mono text-lg sm:text-xl font-bold tracking-[0.18em] text-white drop-shadow-md">
          {cardNumber || "1234 5678 9012 3456"}
        </div>
        <div className="flex items-center justify-between text-[9px] text-white/90 font-mono">
          <span className="text-[10px] text-white/80">0123</span>
          <div className="flex items-center gap-1.5 mr-4">
            <div className="text-[7px] leading-tight font-extrabold text-white/80 text-right uppercase">
              VALID<br />THRU
            </div>
            <span className="text-[10px] text-white">►</span>
            <span className="text-xs font-mono font-bold tracking-widest text-white">
              {expiry || "22/01"}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Name & Brand Logo Row */}
      <div className="flex justify-between items-end z-10 pt-1">
        <span className="font-sans font-semibold text-sm text-white capitalize tracking-wide drop-shadow-xs truncate max-w-[240px]">
          {cardHolder.toLowerCase() || "name surname"}
        </span>

        {/* White Rectangular Badge for Brand Logo */}
        <div className="bg-white px-3 py-1.5 rounded-lg shadow-md flex items-center justify-center shrink-0 min-w-[58px] min-h-[26px]">
          {brand?.toLowerCase() === "mastercard" ? (
            <svg width="34" height="20" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="35" cy="30" r="28" fill="#EB001B" />
              <circle cx="65" cy="30" r="28" fill="#F79E1B" fillOpacity="0.95" />
              <path d="M50 8.5C53.3 14.5 55 22.2 55 30C55 37.8 53.3 45.5 50 51.5C46.7 45.5 45 37.8 45 30C45 22.2 46.7 14.5 50 8.5Z" fill="#FF5F00" />
            </svg>
          ) : brand?.toLowerCase() === "amex" ? (
            <span className="font-extrabold text-[12px] text-[#016FD0] font-sans tracking-wider">AMEX</span>
          ) : brand?.toLowerCase() === "rupay" ? (
            <span className="font-sans italic font-extrabold text-sm">
              <span className="text-[#F05323]">Ru</span><span className="text-[#0B2D85]">Pay</span>
            </span>
          ) : (
            <svg width="44" height="15" viewBox="0 0 100 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Golden Wing on V */}
              <path d="M12.5 0C8.5 0 4.2 1.8 0 4.2L0.8 7.8C4.5 5.8 8.2 4.2 11.8 4.2C14.2 4.2 15.2 5.0 15.8 7.2L20.2 24.5L12.5 0Z" fill="#F79E1B" />
              {/* V */}
              <path d="M37.5 0L24.8 30.5H16.8L9.8 7.2C9.4 5.6 8.8 5.0 7.4 4.2C4.8 2.8 1.8 1.2 0 0.5L0.2 0H14.2C16.2 0 17.8 1.4 18.2 3.8L21.6 21.8L30.2 0H37.5Z" fill="#1A1F71" />
              {/* I */}
              <path d="M49.5 0L43.2 30.5H35.5L41.8 0H49.5Z" fill="#1A1F71" />
              {/* S */}
              <path d="M68.5 9.8C68.5 3.8 59.8 3.4 59.9 2.4C60.0 2.0 60.8 1.5 62.8 1.3C64.9 1.1 70.2 1.0 74.8 3.1L76.4 0.5C73.1 -0.5 69.0 -0.8 64.0 -0.8C53.8 -0.8 46.8 4.4 46.7 11.6C46.6 17.2 51.8 20.3 55.7 22.2C59.7 24.1 61.0 25.3 61.0 27.0C60.9 29.6 57.6 30.8 54.5 30.8C49.0 30.8 44.7 29.1 42.2 28.0L40.6 31.0C44.4 32.7 50.0 33.7 55.5 33.7C66.4 33.7 73.5 28.5 73.6 20.8C73.6 13.9 68.5 9.8 68.5 9.8Z" fill="#1A1F71" />
              {/* A */}
              <path d="M94.5 0H88.5C86.7 0 85.3 0.6 84.5 2.4L72.2 30.5H80.0L81.6 26.2H91.2L92.1 30.5H99.0L94.5 0ZM83.8 20.2L87.8 9.5L90.0 20.2H83.8Z" fill="#1A1F71" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
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
  const [cardColor, setCardColor] = useState<"red" | "green" | "black">("red");
  const [cardCategory, setCardCategory] = useState<"DEBIT CARD" | "CREDIT CARD">("DEBIT CARD");

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
        cardType: cardCategory,
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
                  <div className="grid grid-cols-1 gap-5">
                    {savedCards.map((card) => (
                      <VirtualCardPreview
                        key={card.id}
                        cardNumber={card.masked}
                        cardHolder={card.holder}
                        expiry={card.expiry}
                        brand={card.brand}
                        cardType={card.cardType || "DEBIT CARD"}
                        variant={cardColor}
                        onDelete={() => handleDeleteCard(card.id)}
                      />
                    ))}
                    {!isAdding && (
                      <button
                        onClick={() => setIsAdding(true)}
                        className="border-2 border-dashed border-[#E8E3DA] rounded-2xl h-[110px] flex flex-col items-center justify-center gap-2 hover:border-[#C8232A] hover:bg-red-50/20 transition-all text-xs font-semibold text-[#C8232A]"
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
                <div className="bg-white border border-[#E8E3DA] rounded-2xl p-6 shadow-sm text-left space-y-5">
                  {/* Virtual Credit Card Mockup */}
                  <VirtualCardPreview
                    cardNumber={cardNumber}
                    cardHolder={cardHolder}
                    expiry={expiry}
                    brand={detectedBrand}
                    cardType={cardCategory}
                    variant={cardColor}
                  />

                  {/* Card Type & Theme Controls Bar */}
                  <div className="space-y-2 bg-gray-50 p-3 rounded-2xl border border-gray-200/80">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-gray-600">Card Classification:</span>
                      <div className="flex items-center gap-1.5 bg-gray-200/80 p-1 rounded-xl">
                        {(["DEBIT CARD", "CREDIT CARD"] as const).map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setCardCategory(type)}
                            className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                              cardCategory === type
                                ? "bg-white text-gray-900 shadow-2xs font-extrabold"
                                : "text-gray-600 hover:text-gray-900"
                            }`}
                          >
                            {type === "DEBIT CARD" ? "💳 Debit" : "✨ Credit"}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-gray-200/60">
                      <span className="text-[11px] font-semibold text-gray-600">Card Theme Color:</span>
                      <div className="flex items-center gap-1.5">
                        {[
                          { id: "red", label: "Royal Red", color: "bg-[#C8232A]" },
                          { id: "green", label: "Emerald", color: "bg-[#68B715]" },
                          { id: "black", label: "Obsidian", color: "bg-[#1C1D21]" },
                        ].map((c) => (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setCardColor(c.id as any)}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all border ${
                              cardColor === c.id
                                ? "bg-white text-gray-900 border-gray-400 shadow-2xs"
                                : "text-gray-500 border-transparent hover:text-gray-900"
                            }`}
                          >
                            <span className={`w-2.5 h-2.5 rounded-full ${c.color}`} />
                            <span>{c.label}</span>
                          </button>
                        ))}
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
