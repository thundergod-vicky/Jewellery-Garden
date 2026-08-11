"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Package,
  Plus,
  Search,
  Trash2,
  CheckCircle,
  X,
  Sparkles,
  Download,
  Filter,
} from "lucide-react";

interface ProductItem {
  id: string;
  name: string;
  category: string;
  metal: "Gold" | "Silver";
  purity: string;
  grossWeight: string;
  netWeight: string;
  price: number;
  stock: number;
  sku: string;
  image: string;
  active: boolean;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([
    {
      id: "p0",
      name: "Splendid Flower Diamond Nose Pin",
      category: "Gold Nosepin",
      metal: "Gold",
      purity: "18KT Gold with Certified Diamond",
      grossWeight: "0.85 grams",
      netWeight: "0.80 grams",
      price: 12796,
      stock: 14,
      sku: "DN-D000123787",
      image: "/images/gifts/birthday.png",
      active: true,
    },
    {
      id: "p1",
      name: "Crescent Wave 22KT Gold Ring",
      category: "Gold Rings",
      metal: "Gold",
      purity: "22KT 916 BIS Hallmarked",
      grossWeight: "3.40 grams",
      netWeight: "3.40 grams",
      price: 12521,
      stock: 22,
      sku: "GR-G00098231",
      image: "/images/gifts/engagement.png",
      active: true,
    },
    {
      id: "p2",
      name: "Royal Peacock 22KT Gold Jhumka Earrings",
      category: "Gold Earrings",
      metal: "Gold",
      purity: "22KT 916 BIS Hallmarked",
      grossWeight: "8.65 grams",
      netWeight: "8.65 grams",
      price: 34800,
      stock: 8,
      sku: "ER-J00088192",
      image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80",
      active: true,
    },
    {
      id: "p3",
      name: "Bengali Traditional Sitahar Gold Bridal Necklace",
      category: "Gold Necklaces",
      metal: "Gold",
      purity: "22KT 916 BIS Hallmarked",
      grossWeight: "24.15 grams",
      netWeight: "24.15 grams",
      price: 89500,
      stock: 5,
      sku: "NC-S00077281",
      image: "/images/gifts/wedding.png",
      active: true,
    },
    {
      id: "p5",
      name: "Handcrafted 925 Sterling Silver Bangle Pair",
      category: "Silver Bangles",
      metal: "Silver",
      purity: "925 Sterling Silver",
      grossWeight: "28.50 grams",
      netWeight: "28.50 grams",
      price: 4850,
      stock: 35,
      sku: "SB-B00066123",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
      active: true,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [metalFilter, setMetalFilter] = useState<"All" | "Gold" | "Silver">("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newForm, setNewForm] = useState({
    name: "",
    category: "Gold Rings",
    metal: "Gold" as "Gold" | "Silver",
    purity: "22KT 916 BIS Hallmarked",
    grossWeight: "4.50 grams",
    netWeight: "4.50 grams",
    price: 18500,
    stock: 10,
    sku: `JG-G${Math.floor(100000 + Math.random() * 900000)}`,
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const localCreated: ProductItem = {
      id: `p-${Date.now()}`,
      ...newForm,
      image: newForm.metal === "Gold" ? "/images/gifts/engagement.png" : "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
      active: true,
    };
    setProducts([localCreated, ...products]);
    setIsAddModalOpen(false);
  };

  const handleDeleteProduct = (id: string) => {
    if (!confirm("Are you sure you want to remove this item?")) return;
    setProducts(products.filter((p) => p.id !== id));
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMetal = metalFilter === "All" || p.metal === metalFilter;
    return matchesSearch && matchesMetal;
  });

  return (
    <div className="space-y-6 max-w-[1440px] mx-auto animate-in fade-in duration-300 text-[#1A1C1E]">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-[28px] border border-[#EBEFF5] shadow-sm">
        <div>
          <h2 className="font-serif-title font-bold text-xl text-gray-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-[#1A1C1E]" />
            <span>Products & Inventory</span>
          </h2>
          <p className="text-xs text-gray-400">
            View stock, adjust 22KT gold & 925 silver pricing, or add new catalog items.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#1A1C1E] hover:bg-black text-white font-semibold text-xs py-2.5 px-4 rounded-full flex items-center gap-2 shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter & Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Product Name or SKU..."
            className="w-full text-xs pl-10 pr-4 py-2.5 bg-[#EEF1F5] rounded-full focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 bg-white p-1.5 rounded-full border border-[#EBEFF5] shadow-2xs text-xs font-medium">
          {(["All", "Gold", "Silver"] as const).map((metal) => (
            <button
              key={metal}
              onClick={() => setMetalFilter(metal)}
              className={`px-4 py-1.5 rounded-full transition-all ${
                metalFilter === metal
                  ? "bg-[#1A1C1E] text-white font-bold shadow"
                  : "text-gray-600 hover:bg-[#EEF1F5]"
              }`}
            >
              {metal}
            </button>
          ))}
        </div>
      </div>

      {/* Data Table Container */}
      <div className="bg-white rounded-[28px] border border-[#EBEFF5] shadow-sm overflow-hidden text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#EBEFF5] text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="p-4">Item & SKU</th>
                <th className="p-4">Metal & Purity</th>
                <th className="p-4">Net Weight</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden shrink-0">
                      <Image src={p.image} alt={p.name} fill className="object-cover" unoptimized />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 line-clamp-1">{p.name}</p>
                      <span className="text-[10px] text-gray-400 font-mono font-semibold">
                        {p.sku}
                      </span>
                    </div>
                  </td>

                  <td className="p-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold border ${
                        p.metal === "Gold"
                          ? "bg-amber-50 text-amber-800 border-amber-200"
                          : "bg-slate-100 text-slate-700 border-slate-300"
                      }`}
                    >
                      {p.metal} • {p.purity}
                    </span>
                  </td>

                  <td className="p-4 font-medium text-gray-700">{p.netWeight}</td>
                  <td className="p-4 font-bold text-gray-900">₹{p.price.toLocaleString("en-IN")}</td>

                  <td className="p-4 font-semibold text-gray-700">{p.stock} units</td>

                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-[#E3F9ED] text-[#12B76A] px-3 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3" /> Active
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] max-w-lg w-full p-6 space-y-6 shadow-2xl border border-gray-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="font-serif-title font-bold text-lg text-gray-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#12B76A]" /> Add New Jewellery Item
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newForm.name}
                  onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
                  placeholder="e.g. Royal Sitahar Gold Necklace"
                  className="w-full p-2.5 bg-[#EEF1F5] rounded-2xl focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Metal</label>
                  <select
                    value={newForm.metal}
                    onChange={(e) => setNewForm({ ...newForm, metal: e.target.value as any })}
                    className="w-full p-2.5 bg-[#EEF1F5] rounded-2xl focus:outline-none"
                  >
                    <option value="Gold">22KT / 18KT Gold</option>
                    <option value="Silver">925 Sterling Silver</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Category</label>
                  <select
                    value={newForm.category}
                    onChange={(e) => setNewForm({ ...newForm, category: e.target.value })}
                    className="w-full p-2.5 bg-[#EEF1F5] rounded-2xl focus:outline-none"
                  >
                    <option value="Gold Rings">Gold Rings</option>
                    <option value="Gold Earrings">Gold Earrings</option>
                    <option value="Gold Necklaces">Gold Necklaces</option>
                    <option value="Gold Nosepin">Gold Nosepin</option>
                    <option value="Silver Bangles">Silver Bangles</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Net Weight</label>
                  <input
                    type="text"
                    required
                    value={newForm.netWeight}
                    onChange={(e) => setNewForm({ ...newForm, netWeight: e.target.value })}
                    placeholder="e.g. 5.40 grams"
                    className="w-full p-2.5 bg-[#EEF1F5] rounded-2xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newForm.price}
                    onChange={(e) => setNewForm({ ...newForm, price: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#EEF1F5] rounded-2xl"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-[#1A1C1E] hover:bg-black text-white font-bold shadow-md"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
