"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Package,
  Plus,
  Search,
  Trash2,
  Edit2,
  CheckCircle,
  XCircle,
  X,
  Sparkles,
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

  // New Product Form State
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

  useEffect(() => {
    // Fetch products from NestJS API
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.warn("Backend products fetch warn:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newForm),
      });

      if (res.ok) {
        const created = await res.json();
        setProducts([created, ...products]);
      } else {
        const localCreated: ProductItem = {
          id: `p-${Date.now()}`,
          ...newForm,
          image: newForm.metal === "Gold" ? "/images/gifts/engagement.png" : "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
          active: true,
        };
        setProducts([localCreated, ...products]);
      }
    } catch {
      const localCreated: ProductItem = {
        id: `p-${Date.now()}`,
        ...newForm,
        image: newForm.metal === "Gold" ? "/images/gifts/engagement.png" : "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
        active: true,
      };
      setProducts([localCreated, ...products]);
    } finally {
      setIsAddModalOpen(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this jewellery item from inventory?")) return;
    try {
      await fetch(`http://localhost:4000/api/products/${id}`, { method: "DELETE" });
    } catch (err) {
      console.warn("Delete endpoint warning:", err);
    }
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
    <div className="space-y-6 max-w-[1440px] mx-auto animate-in fade-in duration-300">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#E8E3DA] shadow-sm">
        <div>
          <h2 className="font-serif-title font-bold text-xl text-[#1A1A1A] flex items-center gap-2">
            <Package className="w-5 h-5 text-[#C8232A]" />
            <span>Product Inventory Management</span>
          </h2>
          <p className="text-xs text-gray-500">
            View, edit stock, manage live price rates, or add new 22KT gold & 925 silver designs.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#C8232A] hover:bg-[#B81D24] text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center gap-2 shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter & Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Product Name or SKU / HUID..."
            className="w-full text-xs pl-10 pr-4 py-2.5 bg-white border border-[#E8E3DA] rounded-xl focus:border-[#C8232A] focus:outline-none shadow-sm"
          />
        </div>

        {/* Metal Filter Pills */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-[#E8E3DA] shadow-sm text-xs font-medium">
          {(["All", "Gold", "Silver"] as const).map((metal) => (
            <button
              key={metal}
              onClick={() => setMetalFilter(metal)}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                metalFilter === metal
                  ? "bg-[#1A1A1A] text-white font-bold shadow"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {metal}
            </button>
          ))}
        </div>
      </div>

      {/* Minimalist Data Table */}
      <div className="bg-white rounded-3xl border border-[#E8E3DA] shadow-sm overflow-hidden text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#E8E3DA] text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="p-4">Item & SKU</th>
                <th className="p-4">Metal & Purity</th>
                <th className="p-4">Net Weight</th>
                <th className="p-4">Price (₹)</th>
                <th className="p-4">In Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/80 transition-colors">
                  {/* Item Details */}
                  <td className="p-4 flex items-center gap-3">
                    <div className="relative w-11 h-11 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden shrink-0">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 line-clamp-1">{p.name}</p>
                      <span className="text-[10px] text-gray-400 font-mono font-semibold">
                        SKU: {p.sku}
                      </span>
                    </div>
                  </td>

                  {/* Metal & Purity */}
                  <td className="p-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        p.metal === "Gold"
                          ? "bg-amber-50 text-amber-800 border-amber-200"
                          : "bg-slate-100 text-slate-700 border-slate-300"
                      }`}
                    >
                      {p.metal} • {p.purity}
                    </span>
                  </td>

                  {/* Net Weight */}
                  <td className="p-4 font-medium text-gray-700">{p.netWeight}</td>

                  {/* Price */}
                  <td className="p-4 font-bold text-gray-900">
                    ₹{p.price.toLocaleString("en-IN")}
                  </td>

                  {/* Stock Level */}
                  <td className="p-4">
                    <span
                      className={`font-semibold ${
                        p.stock > 10
                          ? "text-emerald-600"
                          : p.stock > 0
                          ? "text-amber-600"
                          : "text-red-600"
                      }`}
                    >
                      {p.stock} units
                    </span>
                  </td>

                  {/* Active Toggle */}
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <CheckCircle className="w-3 h-3" /> Active
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                      title="Delete Product"
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

      {/* Add Product Modal Dialog */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl border border-[#E8E3DA] animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="font-serif-title font-bold text-lg text-gray-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#C8232A]" /> Add New Jewellery Item
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700"
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
                  placeholder="e.g. Royal Bengali Sitahar Gold Necklace"
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:border-[#C8232A] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Metal</label>
                  <select
                    value={newForm.metal}
                    onChange={(e) => setNewForm({ ...newForm, metal: e.target.value as any })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none"
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
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none"
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
                  <label className="block font-bold text-gray-700 mb-1">Net Gold/Silver Weight</label>
                  <input
                    type="text"
                    required
                    value={newForm.netWeight}
                    onChange={(e) => setNewForm({ ...newForm, netWeight: e.target.value })}
                    placeholder="e.g. 5.40 grams"
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newForm.price}
                    onChange={(e) => setNewForm({ ...newForm, price: Number(e.target.value) })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#C8232A] hover:bg-[#B81D24] text-white font-bold shadow-md"
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
