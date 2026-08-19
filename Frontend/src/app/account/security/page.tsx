"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import MainHeader from "@/components/header/MainHeader";
import TopBar from "@/components/header/TopBar";
import MainFooter from "@/components/footer/MainFooter";
import { Loader2, ArrowLeft, User, Phone, Mail } from "lucide-react";

export default function SecuritySettings() {
  const router = useRouter();
  const { user, profile, loading, updateUserProfile } = useAuth();

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (profile) {
      setUsername(profile.username || "");
      setPhone(profile.phone || "");
    }
  }, [user, profile, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateUserProfile({
        username: username.trim(),
        phone: phone.trim(),
      });
    } catch (err) {
      // Error handled in Context
    } finally {
      setSaving(false);
    }
  };

  if (loading && !profile) {
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

      <section className="py-12 px-4 flex-1">
        <div className="max-w-[520px] mx-auto">
          <div className="mb-6">
            <Link
              href="/account"
              className="text-xs font-semibold text-[#C8232A] hover:underline inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              BACK TO ACCOUNT
            </Link>
          </div>

          <div className="bg-white border border-[#E8E3DA] rounded-2xl p-8 sm:p-10 shadow-sm text-center">
            <div className="mb-8 text-left">
              <h1 className="font-serif text-2xl font-medium tracking-widest text-[#1A1A1A] mb-2">
                LOGIN & SECURITY
              </h1>
              <p className="text-xs text-gray-500">
                Update your personal profile details and account preferences.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 text-left">
                <label className="text-[10px] font-semibold tracking-wider text-[#1A1A1A] uppercase">
                  EMAIL ADDRESS (READ-ONLY)
                </label>
                <div className="relative flex items-center opacity-60">
                  <Mail className="absolute left-3.5 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="w-full pl-10 pr-4 py-3 border border-[#E8E3DA] rounded-lg bg-[#FAF8F5] text-sm text-gray-500 cursor-not-allowed outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 text-left">
                <label className="text-[10px] font-semibold tracking-wider text-[#1A1A1A] uppercase">
                  USERNAME / DISPLAY NAME
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-3.5 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full pl-10 pr-4 py-3 border border-[#E8E3DA] rounded-lg bg-white text-sm text-[#1A1A1A] focus:border-[#C8232A] focus:ring-1 focus:ring-[#C8232A] focus:outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 text-left">
                <label className="text-[10px] font-semibold tracking-wider text-[#1A1A1A] uppercase">
                  MOBILE PHONE NUMBER
                </label>
                <div className="relative flex items-center">
                  <Phone className="absolute left-3.5 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full pl-10 pr-4 py-3 border border-[#E8E3DA] rounded-lg bg-white text-sm text-[#1A1A1A] focus:border-[#C8232A] focus:ring-1 focus:ring-[#C8232A] focus:outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full py-3.5 bg-[#C8232A] hover:bg-[#A81B21] text-white font-semibold text-xs tracking-widest rounded-lg transition-all shadow-md flex items-center justify-center mt-2"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "SAVE CHANGES"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <MainFooter />
    </main>
  );
}
