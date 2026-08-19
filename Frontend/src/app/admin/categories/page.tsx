"use client";

import React, { useState } from "react";
import {
  FolderTree,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  XCircle,
  X,
  Loader2,
  Package,
  ArrowUpDown,
} from "lucide-react";
import toast from "react-hot-toast";

import { PRODUCTS_CATALOG } from "@/data/siteData";

interface Category {
  id: string;
  name: string;
  slug: string;
  itemCount: number;
  status: "Active" | "Hidden";
  rank: number;
  description: string;
}

const INITIAL_CATEGORIES: Category[] = [
  { id: "cat-1", name: "Gold Bangles & Bala", slug: "bangles", itemCount: PRODUCTS_CATALOG.filter((p: any) => p.categorySlug === "bangles").length, status: "Active", rank: 1, description: "Authentic 22KT gold bangles and traditional Bengali kadas." },
  { id: "cat-2", name: "Necklaces & Sitahar", slug: "necklaces", itemCount: PRODUCTS_CATALOG.filter((p: any) => p.categorySlug === "necklaces").length, status: "Active", rank: 2, description: "Bridal necklaces, sitahars, and choker sets." },
  { id: "cat-3", name: "Earrings & Jhumkas", slug: "earrings", itemCount: PRODUCTS_CATALOG.filter((p: any) => p.categorySlug === "earrings").length, status: "Active", rank: 3, description: "Lightweight studs, traditional jhumkas, and drop earrings." },
  { id: "cat-4", name: "Rings & Solitaires", slug: "rings", itemCount: PRODUCTS_CATALOG.filter((p: any) => p.categorySlug === "rings").length, status: "Active", rank: 4, description: "Engagement rings, daily wear gold bands, and diamond solitaires." },
  { id: "cat-5", name: "Nose Pins & Rings", slug: "nose-pins", itemCount: PRODUCTS_CATALOG.filter((p: any) => p.categorySlug === "nose-pins").length, status: "Active", rank: 5, description: "Traditional Bengali nath and diamond nose pins." },
  { id: "cat-6", name: "925 Silver Ornaments", slug: "silver", itemCount: PRODUCTS_CATALOG.filter((p: any) => p.categorySlug === "silver").length, status: "Active", rank: 6, description: "Pure 925 sterling silver gift items and jewellery." },
  { id: "cat-7", name: "Gold Coins & Bars", slug: "coins", itemCount: PRODUCTS_CATALOG.filter((p: any) => p.categorySlug === "coins").length, status: "Active", rank: 7, description: "24KT 999 purity gold coins for investment." },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"Active" | "Hidden">("Active");

  const openAddModal = () => {
    setEditingCategory(null);
    setName("");
    setSlug("");
    setDescription("");
    setStatus("Active");
    setIsModalOpen(true);
  };

  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description);
    setStatus(cat.status);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter a category name.");
      return;
    }

    const autoSlug = slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    if (editingCategory) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id
            ? { ...c, name: name.trim(), slug: autoSlug, description: description.trim(), status }
            : c
        )
      );
      toast.success("Category updated successfully!");
    } else {
      const newCat: Category = {
        id: `cat-${Date.now()}`,
        name: name.trim(),
        slug: autoSlug,
        itemCount: 0,
        status,
        rank: categories.length + 1,
        description: description.trim(),
      };
      setCategories((prev) => [...prev, newCat]);
      toast.success("New category added!");
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    setCategories((prev) => prev.filter((c) => c.id !== id));
    toast.success("Category removed.");
  };

  const toggleStatus = (id: string) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: c.status === "Active" ? "Hidden" : "Active" } : c))
    );
    toast.success("Category status updated.");
  };

  const filteredCategories = categories.filter(
    (c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-[1400px] mx-auto flex flex-col gap-6 text-left">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-2xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Category & Collection Manager
            </h1>
            <span className="bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800/50">
              {categories.length} Collections
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Organize gold, silver, and diamond product categories, display hierarchy, and catalog filters.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-[#C8232A] hover:bg-[#A81B21] text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Main Table Card */}
      <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-2xl shadow-xs overflow-hidden">
        {/* Search Bar */}
        <div className="p-4 border-b border-[#EAEFF5] dark:border-gray-800 flex items-center justify-between flex-wrap gap-3">
          <div className="relative flex items-center w-full sm:w-80">
            <Search className="absolute left-3.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search category name or slug..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-[#F7F9FC] dark:bg-[#1A1D23] text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#C8232A]"
            />
          </div>
          <span className="text-xs text-gray-400">Showing {filteredCategories.length} categories</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAFBFD] dark:bg-[#16181C] border-b border-[#EAEFF5] dark:border-gray-800 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                <th className="py-3.5 px-5">RANK</th>
                <th className="py-3.5 px-5">CATEGORY NAME</th>
                <th className="py-3.5 px-5">SLUG</th>
                <th className="py-3.5 px-5">PRODUCT COUNT</th>
                <th className="py-3.5 px-5">STATUS</th>
                <th className="py-3.5 px-5 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEFF5] dark:divide-gray-800/60">
              {filteredCategories.map((cat) => (
                <tr key={cat.id} className="hover:bg-[#FAFBFD] dark:hover:bg-[#16181C]/50 transition-colors">
                  <td className="py-4 px-5 font-mono text-gray-400">#{cat.rank}</td>
                  <td className="py-4 px-5">
                    <div className="font-semibold text-gray-900 dark:text-white">{cat.name}</div>
                    <div className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">{cat.description}</div>
                  </td>
                  <td className="py-4 px-5 font-mono text-gray-500 dark:text-gray-400">/{cat.slug}</td>
                  <td className="py-4 px-5">
                    <span className="inline-flex items-center gap-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-[10px] font-bold px-2.5 py-1 rounded-full">
                      <Package className="w-3 h-3 text-blue-600" />
                      {cat.itemCount} Items
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <button
                      onClick={() => toggleStatus(cat.id)}
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full cursor-pointer transition-all ${
                        cat.status === "Active"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                          : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      {cat.status === "Active" ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {cat.status}
                    </button>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEditModal(cat)}
                        className="p-1.5 text-gray-500 hover:text-[#C8232A] hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                        title="Edit Category"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                        title="Delete Category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121417] border border-[#EAEFF5] dark:border-gray-800 rounded-2xl p-6 w-full max-w-[500px] shadow-2xl text-left flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                {editingCategory ? "Edit Category" : "Add New Category"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-700 dark:hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-700 dark:text-gray-300">Category Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Gold Bangles & Bala"
                  className="px-3.5 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-gray-900 dark:text-white focus:outline-none focus:border-[#C8232A]"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-700 dark:text-gray-300">URL Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. bangles"
                  className="px-3.5 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-gray-900 dark:text-white focus:outline-none focus:border-[#C8232A]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-700 dark:text-gray-300">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description for collection page..."
                  className="px-3.5 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-gray-900 dark:text-white focus:outline-none focus:border-[#C8232A]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-700 dark:text-gray-300">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="px-3.5 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1A1D23] text-gray-900 dark:text-white focus:outline-none"
                >
                  <option value="Active">Active (Visible)</option>
                  <option value="Hidden">Hidden (Draft)</option>
                </select>
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C8232A] text-white text-xs font-semibold rounded-xl hover:bg-[#A81B21]"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
