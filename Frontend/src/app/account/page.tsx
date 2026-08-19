"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import MainHeader from "@/components/header/MainHeader";
import TopBar from "@/components/header/TopBar";
import MainFooter from "@/components/footer/MainFooter";
import OnboardingWizard from "@/components/account/OnboardingWizard";
import {
  ShoppingBag,
  Lock,
  MapPin,
  CreditCard,
  Mail,
  LogOut,
  ChevronRight,
  Loader2,
} from "lucide-react";

export default function AccountDashboard() {
  const router = useRouter();
  const { user, logout, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#C8232A]" />
      </main>
    );
  }

  const accountCards = [
    {
      title: "Your Orders",
      description: "Track, return, or buy things again",
      icon: <ShoppingBag className="w-6 h-6 text-[#C8232A]" />,
      link: "/account/orders",
    },
    {
      title: "Login & security",
      description: "Edit login details, username, and mobile number",
      icon: <Lock className="w-6 h-6 text-[#C8232A]" />,
      link: "/account/security",
    },
    {
      title: "Your Addresses",
      description: "Edit addresses for orders and deliveries",
      icon: <MapPin className="w-6 h-6 text-[#C8232A]" />,
      link: "/account/addresses",
    },
    {
      title: "Payment options",
      description: "Edit or add secure payment methods",
      icon: <CreditCard className="w-6 h-6 text-[#C8232A]" />,
      link: "/account/payment-options",
    },
    {
      title: "Contact Us",
      description: "Contact customer support or send a query",
      icon: <Mail className="w-6 h-6 text-[#C8232A]" />,
      link: "/account/contact",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] flex flex-col font-sans">
      <TopBar />
      <MainHeader />

      {/* Onboarding Wizard Modal for New Users */}
      <OnboardingWizard />

      <section className="py-12 px-4 flex-1">
        <div className="max-w-[960px] mx-auto">
          <div className="mb-8 text-left">
            <h1 className="font-serif text-3xl font-medium tracking-widest text-[#1A1A1A] mb-2">
              YOUR ACCOUNT
            </h1>
            <p className="text-sm text-gray-500">
              Manage your profile details, shipping preferences, and purchase history.
            </p>
          </div>

          {/* DASHBOARD CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {accountCards.map((card, idx) => (
              <Link
                key={idx}
                href={card.link}
                className="bg-white border border-[#E8E3DA] rounded-xl p-6 block hover:border-[#C8232A] hover:-translate-y-0.5 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  {card.icon}
                  <div className="flex-1 text-left">
                    <h3 className="text-sm font-semibold text-[#1A1A1A]">
                      {card.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 leading-snug">
                      {card.description}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                </div>
              </Link>
            ))}
          </div>

          {/* LOGOUT FOOTER */}
          <div className="border-t border-[#E8E3DA] pt-8 flex justify-start">
            <button
              onClick={logout}
              className="px-7 py-3 border border-red-500 text-red-500 hover:bg-red-50 font-semibold text-xs tracking-widest rounded-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              LOG OUT OF ACCOUNT
            </button>
          </div>
        </div>
      </section>

      <MainFooter />
    </main>
  );
}
