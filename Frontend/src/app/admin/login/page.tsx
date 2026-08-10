"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { SITE_DATA } from "@/data/siteData";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@jewellerygardenpvtltd.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Connect to NestJS Backend API
      const res = await fetch("http://localhost:4000/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid Admin credentials.");
      }

      // Save token in localStorage
      localStorage.setItem("admin_token", data.accessToken);
      localStorage.setItem("admin_email", data.admin.email);

      // Redirect to Admin Dashboard
      router.push("/admin/dashboard");
    } catch (err: any) {
      console.error("Admin Login Error:", err);
      setError(err.message || "Authentication failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] flex flex-col justify-center items-center p-4">
      {/* Container Box */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-luxury border border-[#E8E3DA] p-8 sm:p-10 space-y-8 animate-in fade-in zoom-in duration-300">
        
        {/* Brand Logo & Header */}
        <div className="text-center space-y-3">
          <div className="relative w-44 h-12 mx-auto">
            <Image
              src={SITE_DATA.logoUrl}
              alt={SITE_DATA.brandName}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Portal • Controlled via .ENV</span>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Admin Email ID
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@jewellerygardenpvtltd.com"
                className="w-full text-xs pl-10 pr-4 py-2.5 bg-gray-50 focus:bg-white border border-gray-300 focus:border-[#C8232A] rounded-xl focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Master Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full text-xs pl-10 pr-4 py-2.5 bg-gray-50 focus:bg-white border border-gray-300 focus:border-[#C8232A] rounded-xl focus:outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1A1A1A] hover:bg-[#C8232A] text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50"
          >
            <span>{isLoading ? "Verifying Credentials..." : "Authenticate Admin Access"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Note */}
        <p className="text-center text-[11px] text-gray-400">
          Controlled by NestJS Backend JWT Guard & ENV configuration.
        </p>

      </div>
    </div>
  );
}
