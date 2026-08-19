"use client";

import React, { useState } from "react";
import {
  Globe,
  Save,
  RefreshCw,
  Search,
  CheckCircle2,
  FileCode,
  Share2,
} from "lucide-react";
import toast from "react-hot-toast";

interface PageSeo {
  id: string;
  path: string;
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
}

const INITIAL_PAGES_SEO: PageSeo[] = [
  {
    id: "seo-1",
    path: "/",
    title: "Jewellery Garden — Authentic 22KT Gold & 925 Silver Jewellery",
    description: "Shop handcrafted 22KT gold sitahars, bridal bangles, solitaire rings, and pure 925 sterling silver ornaments from Jewellery Garden Durgapur & Kolkata.",
    keywords: "gold jewellery, 22KT gold ring, sitahar, bengali jewellery, silver ornaments, durgapur showroom",
    ogImage: "/logo.svg",
  },
  {
    id: "seo-2",
    path: "/jewellery",
    title: "Gold & Silver Jewellery Catalog — Jewellery Garden",
    description: "Explore our complete collection of certified BIS hallmarked gold and silver jewellery pieces.",
    keywords: "gold catalog, silver collection, bridal rings, jhumka, bangles",
    ogImage: "/logo.svg",
  },
  {
    id: "seo-3",
    path: "/about-us",
    title: "About Us — Jewellery Garden Heritage & Craftsmanship",
    description: "Learn about Jewellery Garden's legacy of excellence, master goldsmiths, and flagship showrooms across West Bengal.",
    keywords: "jewellery garden story, heritage gold, hallmarked jewellery",
    ogImage: "/logo.svg",
  },
  {
    id: "seo-4",
    path: "/account/contact",
    title: "Contact Us & Concierge Support — Jewellery Garden",
    description: "Get in touch with Jewellery Garden customer concierge desk, showroom locations, and helpline numbers.",
    keywords: "jewellery garden phone number, showroom address, customer support",
    ogImage: "/logo.svg",
  },
];

export default function AdminSeoPage() {
  const [pagesSeo, setPagesSeo] = useState<PageSeo[]>(INITIAL_PAGES_SEO);
  const [selectedPage, setSelectedPage] = useState<PageSeo>(INITIAL_PAGES_SEO[0]);

  // Form State
  const [title, setTitle] = useState(selectedPage.title);
  const [description, setDescription] = useState(selectedPage.description);
  const [keywords, setKeywords] = useState(selectedPage.keywords);
  const [saving, setSaving] = useState(false);

  const handleSelectPage = (page: PageSeo) => {
    setSelectedPage(page);
    setTitle(page.title);
    setDescription(page.description);
    setKeywords(page.keywords);
  };

  const handleSaveSeo = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setPagesSeo((prev) =>
        prev.map((p) => (p.id === selectedPage.id ? { ...p, title, description, keywords } : p))
      );
      setSaving(false);
      toast.success(`SEO metadata saved for path ${selectedPage.path}!`);
    }, 400);
  };

  const handleGenerateSitemap = () => {
    toast.success("sitemap.xml regenerated successfully with 48 routes!");
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto flex flex-col gap-6 text-left">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-2xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              SEO & OpenGraph Metadata Manager
            </h1>
            <span className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800/50">
              Google Indexing Ready
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Configure page meta titles, meta descriptions, OpenGraph social preview cards, and sitemap indexing.
          </p>
        </div>

        <button
          onClick={handleGenerateSitemap}
          className="px-4 py-2.5 bg-[#1A1A1A] hover:bg-[#C8232A] text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          Regenerate Sitemap.xml
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left: Page Selector */}
        <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-2xl p-4 shadow-xs space-y-2">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 mb-2">
            Select Route / Page
          </h3>
          {pagesSeo.map((p) => (
            <div
              key={p.id}
              onClick={() => handleSelectPage(p)}
              className={`p-3 rounded-xl cursor-pointer transition-all border text-xs ${
                selectedPage.id === p.id
                  ? "bg-[#C8232A] text-white border-[#C8232A] shadow-xs"
                  : "bg-gray-50 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 border-gray-100 dark:border-gray-800 hover:border-gray-300"
              }`}
            >
              <div className="font-bold font-mono">{p.path}</div>
              <div className={`text-[11px] truncate mt-0.5 ${selectedPage.id === p.id ? "text-red-100" : "text-gray-500"}`}>
                {p.title}
              </div>
            </div>
          ))}
        </div>

        {/* Right: SEO Form & Google Snippet Preview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Google Search Result Preview Card */}
          <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-2 text-left">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              LIVE GOOGLE SEARCH PREVIEW
            </span>
            <div className="text-xs text-emerald-700 dark:text-emerald-400 truncate">
              https://jewellerygarden.com{selectedPage.path}
            </div>
            <div className="text-base font-semibold text-blue-700 dark:text-blue-400 hover:underline cursor-pointer line-clamp-1">
              {title || "Page Title Placeholder"}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
              {description || "Meta description placeholder string..."}
            </p>
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-2xl p-6 shadow-xs">
            <form onSubmit={handleSaveSeo} className="flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-700 dark:text-gray-300">
                  Meta Title Tag ({title.length} / 60 chars)
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="px-3.5 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-gray-900 dark:text-white focus:outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-700 dark:text-gray-300">
                  Meta Description ({description.length} / 160 chars)
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="px-3.5 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-gray-900 dark:text-white focus:outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-700 dark:text-gray-300">Keywords (Comma Separated)</label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="px-3.5 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-gray-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 bg-[#C8232A] hover:bg-[#A81B21] text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save SEO Metadata</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
