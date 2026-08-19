"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import MainHeader from "@/components/header/MainHeader";
import TopBar from "@/components/header/TopBar";
import MainFooter from "@/components/footer/MainFooter";
import { Loader2, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const { user, signup, loginWithGoogle } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.push("/account");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !email || !password || !confirmPassword) return;

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await signup(email, password, username.trim());
      router.push("/account");
    } catch (err) {
      // Error handles in context
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      router.push("/account");
    } catch (err) {
      // Handled in context
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] flex flex-col font-sans">
      <TopBar />
      <MainHeader />

      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="bg-white border border-[#E8E3DA] rounded-2xl shadow-lg p-8 sm:p-12 w-full max-w-[460px] text-center">
          <div className="mb-6">
            <h1 className="font-serif text-2xl font-medium tracking-widest text-[#1A1A1A] mb-3">
              CREATE ACCOUNT
            </h1>
            <p className="text-xs text-gray-500 leading-relaxed max-w-[340px] mx-auto">
              Join Jewellery Garden to track orders, manage addresses, and save your favourite gold & diamond jewellery.
            </p>
          </div>

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-3 border border-[#E8E3DA] hover:border-[#1A1A1A] bg-white text-gray-700 font-semibold text-xs rounded-lg transition-all shadow-xs flex items-center justify-center gap-2.5 mb-6 cursor-pointer"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Sign Up with Google</span>
          </button>

          <div className="flex items-center mb-6 gap-3">
            <div className="flex-1 h-[1px] bg-[#E8E3DA]" />
            <span className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
              OR SIGN UP WITH EMAIL
            </span>
            <div className="flex-1 h-[1px] bg-[#E8E3DA]" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-[10px] font-semibold tracking-wider text-[#1A1A1A] uppercase">
                YOUR NAME
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-3.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full pl-10 pr-4 py-2.5 border border-[#E8E3DA] rounded-lg bg-white text-sm text-[#1A1A1A] focus:border-[#C8232A] focus:ring-1 focus:ring-[#C8232A] focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-[10px] font-semibold tracking-wider text-[#1A1A1A] uppercase">
                EMAIL ADDRESS
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-[#E8E3DA] rounded-lg bg-white text-sm text-[#1A1A1A] focus:border-[#C8232A] focus:ring-1 focus:ring-[#C8232A] focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-[10px] font-semibold tracking-wider text-[#1A1A1A] uppercase">
                PASSWORD
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="•••••••• (Min 6 characters)"
                  className="w-full pl-10 pr-11 py-2.5 border border-[#E8E3DA] rounded-lg bg-white text-sm text-[#1A1A1A] focus:border-[#C8232A] focus:ring-1 focus:ring-[#C8232A] focus:outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-gray-400 hover:text-[#1A1A1A] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-[10px] font-semibold tracking-wider text-[#1A1A1A] uppercase">
                CONFIRM PASSWORD
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 border border-[#E8E3DA] rounded-lg bg-white text-sm text-[#1A1A1A] focus:border-[#C8232A] focus:ring-1 focus:ring-[#C8232A] focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#C8232A] hover:bg-[#A81B21] text-white font-semibold text-xs tracking-widest rounded-lg transition-all shadow-md flex items-center justify-center mt-3 cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "CREATE ACCOUNT"}
            </button>
          </form>

          <div className="mt-8 text-xs text-gray-500 tracking-wider">
            ALREADY HAVE AN ACCOUNT?{" "}
            <Link href="/login" className="text-[#C8232A] font-semibold hover:underline ml-1">
              SIGN IN
            </Link>
          </div>
        </div>
      </div>

      <MainFooter />
    </main>
  );
}
