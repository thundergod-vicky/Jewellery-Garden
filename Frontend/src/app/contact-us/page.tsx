"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import TopBar from "@/components/header/TopBar";
import MainHeader from "@/components/header/MainHeader";
import CategoryMenu from "@/components/header/CategoryMenu";
import MainFooter from "@/components/footer/MainFooter";
import SeoFooter from "@/components/footer/SeoFooter";
import FloatingActions from "@/components/common/FloatingActions";
import { SITE_DATA } from "@/data/siteData";

export default function ContactUsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    showroom: "Durgapur Bazar Showroom",
    subject: "General Enquiry",
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
          <span className="font-semibold text-gray-800">Contact Us</span>
        </div>

        {/* Hero Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C8232A] bg-red-50 py-1 px-3.5 rounded-full">
            Customer Support & Showrooms
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif-title font-bold text-[#1A1A1A]">
            Contact Jewellery Garden
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-light">
            We are here to assist you with gold purity queries, order tracking, and live trial bookings at our Durgapur showrooms.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Contact Info & Showrooms (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Box */}
            <div className="bg-white p-6 rounded-3xl border border-[#E8E3DA] shadow-luxury space-y-4">
              <h2 className="text-lg font-serif-title font-bold text-[#C8232A]">
                Customer Helpline
              </h2>

              <div className="space-y-3 text-xs sm:text-sm text-gray-700">
                <a href={`tel:${SITE_DATA.contactPhone}`} className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF8F5] border border-gray-200 hover:border-[#C8232A] transition-colors">
                  <Phone className="w-5 h-5 text-[#C8232A] shrink-0" />
                  <div>
                    <span className="text-[11px] text-gray-400 block">Toll-Free Phone:</span>
                    <span className="font-bold text-[#1A1A1A]">{SITE_DATA.contactPhone}</span>
                  </div>
                </a>

                <a href={`https://wa.me/${SITE_DATA.whatsappPhone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 hover:border-emerald-500 transition-colors">
                  <MessageSquare className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="text-[11px] text-emerald-700 block">WhatsApp Support:</span>
                    <span className="font-bold text-emerald-900">{SITE_DATA.whatsappPhone}</span>
                  </div>
                </a>

                <a href={`mailto:${SITE_DATA.supportEmail}`} className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF8F5] border border-gray-200 hover:border-[#C8232A] transition-colors">
                  <Mail className="w-5 h-5 text-[#C8232A] shrink-0" />
                  <div>
                    <span className="text-[11px] text-gray-400 block">Email Us:</span>
                    <span className="font-bold text-[#1A1A1A]">{SITE_DATA.supportEmail}</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Showrooms List */}
            <div className="space-y-4">
              <h3 className="font-serif-title font-bold text-base text-[#1A1A1A]">Our Durgapur Showrooms</h3>
              {SITE_DATA.showrooms.map((showroom) => (
                <div key={showroom.id} className="bg-white p-5 rounded-2xl border border-[#E8E3DA] shadow-sm space-y-2 text-xs text-gray-600">
                  <h4 className="font-serif-title font-bold text-sm text-[#C8232A]">{showroom.name}</h4>
                  <p className="flex items-start gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#C8232A] shrink-0 mt-0.5" />{showroom.address}</p>
                  <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#C8232A] shrink-0" />{showroom.phone}</p>
                  <p className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />{showroom.timing}</p>
                </div>
              ))}
            </div>

          </div>

          {/* Right: Interactive Inquiry Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E8E3DA] shadow-luxury space-y-6">
              <div>
                <h2 className="text-2xl font-serif-title font-bold text-[#1A1A1A]">Send an Inquiry</h2>
                <p className="text-xs text-gray-500 mt-1">Fill out the form below and our Jewellery Garden representatives will respond within 2 hours.</p>
              </div>

              {submitted ? (
                <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-lg font-serif-title font-bold text-emerald-900">Inquiry Submitted Successfully!</h3>
                  <p className="text-xs text-emerald-700 max-w-md mx-auto">
                    Thank you for reaching out to Jewellery Garden Pvt Ltd. Our customer care advisor will call you back shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 bg-[#C8232A] text-white text-xs font-semibold py-2 px-6 rounded-lg"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-700 block">Your Full Name *</label>
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
                      <label className="text-xs font-semibold text-gray-700 block">Preferred Showroom</label>
                      <select
                        value={formData.showroom}
                        onChange={(e) => setFormData({ ...formData, showroom: e.target.value })}
                        className="w-full text-xs bg-gray-50 border border-gray-300 p-3 rounded-xl focus:outline-none focus:border-[#C8232A]"
                      >
                        <option value="Durgapur Bazar Showroom">Durgapur Bazar Showroom</option>
                        <option value="Durgapur City Centre Showroom">Durgapur City Centre Showroom</option>
                        <option value="Online Store">Online E-Store Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700 block">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Gold Purity Trial / Custom Order"
                      className="w-full text-xs bg-gray-50 border border-gray-300 p-3 rounded-xl focus:outline-none focus:border-[#C8232A]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700 block">Message Details *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we assist you with your gold or silver purchase?"
                      className="w-full text-xs bg-gray-50 border border-gray-300 p-3 rounded-xl focus:outline-none focus:border-[#C8232A]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#C8232A] hover:bg-[#B81D24] text-white font-semibold text-sm py-3.5 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
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
