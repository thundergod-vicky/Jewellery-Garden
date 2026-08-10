"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Building2, Award, Coins, Gift, Send, CheckCircle2 } from "lucide-react";
import TopBar from "@/components/header/TopBar";
import MainHeader from "@/components/header/MainHeader";
import CategoryMenu from "@/components/header/CategoryMenu";
import MainFooter from "@/components/footer/MainFooter";
import SeoFooter from "@/components/footer/SeoFooter";
import FloatingActions from "@/components/common/FloatingActions";

export default function CorporateSalesPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    quantity: "50-100 Pieces",
    productType: "Custom Gold/Silver Coins",
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
          <span className="font-semibold text-gray-800">Corporate Sales Enquiry</span>
        </div>

        {/* Hero Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C8232A] bg-red-50 py-1 px-3.5 rounded-full">
            B2B & Corporate Gifting
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif-title font-bold text-[#1A1A1A]">
            Corporate Gold & Silver Gifting
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-light">
            Celebrate employee milestones, festival rewards, and client appreciation with custom-minted 24KT Gold & 999 Pure Silver coins.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Corporate Offerings (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-6 rounded-3xl border border-[#E8E3DA] shadow-luxury space-y-4">
              <h2 className="text-xl font-serif-title font-bold text-[#C8232A]">
                Corporate Gifting Benefits
              </h2>

              <ul className="space-y-3 text-xs text-gray-700">
                <li className="p-3 bg-[#FAF8F5] rounded-xl border border-gray-200 flex items-start gap-2">
                  <Coins className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#1A1A1A] block">Custom Logo Minting:</span>
                    <span className="text-gray-500">24KT Gold & 999 Silver coins with company logo laser embossing.</span>
                  </div>
                </li>
                <li className="p-3 bg-[#FAF8F5] rounded-xl border border-gray-200 flex items-start gap-2">
                  <Gift className="w-5 h-5 text-[#C8232A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#1A1A1A] block">Prepaid Digital Gift Vouchers:</span>
                    <span className="text-gray-500">Instant digital vouchers redeemable at Durgapur Bazar & City Centre Showrooms.</span>
                  </div>
                </li>
                <li className="p-3 bg-[#FAF8F5] rounded-xl border border-gray-200 flex items-start gap-2">
                  <Award className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#1A1A1A] block">GST Input Tax Credit:</span>
                    <span className="text-gray-500">Complete corporate tax invoices with 3% GST Input Tax Credit compliance.</span>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          {/* Inquiry Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E8E3DA] shadow-luxury space-y-6">
              <div>
                <h2 className="text-2xl font-serif-title font-bold text-[#1A1A1A]">Request Corporate Quote</h2>
                <p className="text-xs text-gray-500 mt-1">Submit your bulk order requirement for special corporate tier pricing.</p>
              </div>

              {submitted ? (
                <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-lg font-serif-title font-bold text-emerald-900">Corporate Request Received!</h3>
                  <p className="text-xs text-emerald-700 max-w-md mx-auto">
                    Thank you. Our B2B corporate sales manager will send you a tailored quotation within 2 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 bg-[#C8232A] text-white text-xs font-semibold py-2 px-6 rounded-lg"
                  >
                    Submit Another Quote
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-700 block">Company Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="GrowGlobal Pvt Ltd"
                        className="w-full text-xs bg-gray-50 border border-gray-300 p-3 rounded-xl focus:outline-none focus:border-[#C8232A]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-700 block">Contact Person Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        placeholder="Souvik Basu"
                        className="w-full text-xs bg-gray-50 border border-gray-300 p-3 rounded-xl focus:outline-none focus:border-[#C8232A]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-700 block">Corporate Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="corporate@growglobal.com"
                        className="w-full text-xs bg-gray-50 border border-gray-300 p-3 rounded-xl focus:outline-none focus:border-[#C8232A]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-700 block">Phone Number *</label>
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
                      <label className="text-xs font-semibold text-gray-700 block">Product Interest</label>
                      <select
                        value={formData.productType}
                        onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                        className="w-full text-xs bg-gray-50 border border-gray-300 p-3 rounded-xl focus:outline-none focus:border-[#C8232A]"
                      >
                        <option value="Custom Gold/Silver Coins">Custom Gold / Silver Coins</option>
                        <option value="Corporate Gift Cards">Corporate Gift Cards</option>
                        <option value="Festival Silver Utensils">Festive Silver Utensils</option>
                        <option value="Executive Gold Jewellery">Executive Gold Jewellery</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-700 block">Estimated Quantity</label>
                      <select
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full text-xs bg-gray-50 border border-gray-300 p-3 rounded-xl focus:outline-none focus:border-[#C8232A]"
                      >
                        <option value="10-50 Pieces">10 - 50 Pieces</option>
                        <option value="50-100 Pieces">50 - 100 Pieces</option>
                        <option value="100-500 Pieces">100 - 500 Pieces</option>
                        <option value="500+ Bulk Order">500+ Bulk Order</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700 block">Corporate Order Requirements</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify coin weight (e.g. 5g Gold / 50g Silver) or custom branding notes..."
                      className="w-full text-xs bg-gray-50 border border-gray-300 p-3 rounded-xl focus:outline-none focus:border-[#C8232A]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#C8232A] hover:bg-[#B81D24] text-white font-semibold text-sm py-3.5 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Corporate Quote Request</span>
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
