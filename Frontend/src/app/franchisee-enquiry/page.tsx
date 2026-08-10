"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Store, Building2, MapPin, Send, CheckCircle2, TrendingUp } from "lucide-react";
import TopBar from "@/components/header/TopBar";
import MainHeader from "@/components/header/MainHeader";
import CategoryMenu from "@/components/header/CategoryMenu";
import MainFooter from "@/components/footer/MainFooter";
import SeoFooter from "@/components/footer/SeoFooter";
import FloatingActions from "@/components/common/FloatingActions";

export default function FranchiseeEnquiryPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    spaceArea: "1000 - 2000 Sq. Ft.",
    investmentBudget: "₹ 1 Cr - ₹ 2.5 Cr",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A]">
      <TopBar />
      <MainHeader />
      <CategoryMenu />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10">
        
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 flex items-center gap-2 mb-6">
          <Link href="/" className="hover:text-[#C8232A]">Home</Link>
          <span>/</span>
          <span className="font-semibold text-gray-800">Franchisee Enquiry</span>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C8232A] bg-red-50 py-1 px-3.5 rounded-full">
            Franchise & Retail Expansion
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif-title font-bold text-[#1A1A1A]">
            Partner with Jewellery Garden
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-light">
            Become a franchise partner with Eastern India&apos;s fastest growing gold & 925 sterling silver retail brand.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Franchise Benefits (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-[#E8E3DA] shadow-luxury space-y-4">
              <h2 className="text-xl font-serif-title font-bold text-[#C8232A]">
                Why Franchise With Us?
              </h2>

              <ul className="space-y-3 text-xs text-gray-700">
                <li className="p-3 bg-[#FAF8F5] rounded-xl border border-gray-200 flex items-start gap-2">
                  <Store className="w-5 h-5 text-[#C8232A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#1A1A1A] block">Turnkey Showroom Setup:</span>
                    <span className="text-gray-500">End-to-end interior design, security vaults, and POS software deployment.</span>
                  </div>
                </li>
                <li className="p-3 bg-[#FAF8F5] rounded-xl border border-gray-200 flex items-start gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#1A1A1A] block">High Return on Investment:</span>
                    <span className="text-gray-500">Proven high inventory turnover model across 22KT gold & silver collections.</span>
                  </div>
                </li>
                <li className="p-3 bg-[#FAF8F5] rounded-xl border border-gray-200 flex items-start gap-2">
                  <Building2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#1A1A1A] block">Marketing & Media Backing:</span>
                    <span className="text-gray-500">Statewide TV, print, and digital campaign support across West Bengal.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Franchise Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E8E3DA] shadow-luxury space-y-6">
              <div>
                <h2 className="text-2xl font-serif-title font-bold text-[#1A1A1A]">Franchise Application Form</h2>
                <p className="text-xs text-gray-500 mt-1">Submit your details below and our retail expansion manager will reach out.</p>
              </div>

              {submitted ? (
                <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-lg font-serif-title font-bold text-emerald-900">Franchise Inquiry Submitted!</h3>
                  <p className="text-xs text-emerald-700 max-w-md mx-auto">
                    Thank you for your interest in Jewellery Garden Pvt Ltd. Our business development team will contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 bg-[#C8232A] text-white text-xs font-semibold py-2 px-6 rounded-lg"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-700 block">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Souvik Basu"
                        className="w-full text-xs bg-gray-50 border border-gray-300 p-3 rounded-xl focus:outline-none focus:border-[#C8232A]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-700 block">Mobile Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98321 00000"
                        className="w-full text-xs bg-gray-50 border border-gray-300 p-3 rounded-xl focus:outline-none focus:border-[#C8232A]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-700 block">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="souvik@example.com"
                        className="w-full text-xs bg-gray-50 border border-gray-300 p-3 rounded-xl focus:outline-none focus:border-[#C8232A]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-700 block">Proposed City / Location *</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Durgapur / Asansol / Bardhaman"
                        className="w-full text-xs bg-gray-50 border border-gray-300 p-3 rounded-xl focus:outline-none focus:border-[#C8232A]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-700 block">Showroom Carpet Area</label>
                      <select
                        value={formData.spaceArea}
                        onChange={(e) => setFormData({ ...formData, spaceArea: e.target.value })}
                        className="w-full text-xs bg-gray-50 border border-gray-300 p-3 rounded-xl focus:outline-none focus:border-[#C8232A]"
                      >
                        <option value="500 - 1000 Sq. Ft.">500 - 1000 Sq. Ft.</option>
                        <option value="1000 - 2000 Sq. Ft.">1000 - 2000 Sq. Ft.</option>
                        <option value="2000+ Sq. Ft. Flagship">2000+ Sq. Ft. Flagship</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-700 block">Investment Capacity</label>
                      <select
                        value={formData.investmentBudget}
                        onChange={(e) => setFormData({ ...formData, investmentBudget: e.target.value })}
                        className="w-full text-xs bg-gray-50 border border-gray-300 p-3 rounded-xl focus:outline-none focus:border-[#C8232A]"
                      >
                        <option value="₹ 50 Lakhs - ₹ 1 Cr">₹ 50 Lakhs - ₹ 1 Cr</option>
                        <option value="₹ 1 Cr - ₹ 2.5 Cr">₹ 1 Cr - ₹ 2.5 Cr</option>
                        <option value="₹ 2.5 Cr+">₹ 2.5 Cr+</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700 block">Additional Details</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe your business background or proposed retail location..."
                      className="w-full text-xs bg-gray-50 border border-gray-300 p-3 rounded-xl focus:outline-none focus:border-[#C8232A]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#C8232A] hover:bg-[#B81D24] text-white font-semibold text-sm py-3.5 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Franchise Application</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>

      <MainFooter />
      <SeoFooter />
      <FloatingActions />
    </main>
  );
}
