"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PRODUCTS_CATALOG } from "@/data/siteData";
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
  Loader2,
  Database,
  Pencil,
} from "lucide-react";

interface ProductItem {
  id: string;
  name: string;
  category: string;
  metal: "Gold" | "Silver";
  purity: string;
  grossWeight: string;
  netWeight: string;
  stoneWeight?: string;
  tokenNumber?: string;
  makingCharges?: string;
  otherCharges?: string;
  description?: string;
  modelNumber?: string;
  price: number;
  stock: number;
  sku: string;
  image: string;
  active: boolean;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMetal, setFilterMetal] = useState<"All" | "Gold" | "Silver">("All");

  // Add Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    modelNumber: "",
    tokenNumber: "",
    category: "Gold Rings",
    metal: "Gold",
    purity: "22KT 916 BIS Hallmarked",
    grossWeight: "4.50 grams",
    netWeight: "4.00 grams",
    stoneWeight: "0.50 grams",
    makingCharges: "",
    otherCharges: "",
    description: "",
    price: "",
    stock: "10",
    sku: "",
    image: "/images/gifts/engagement.png",
  });

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<ProductItem | null>(null);

  // Fetch 100% Dynamic Data from PostgreSQL Database via NestJS API & Catalog Sync
  const fetchProducts = async () => {
    setIsLoading(true);
    let apiProds: ProductItem[] = [];
    try {
      const res = await fetch("http://localhost:4000/api/products");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) apiProds = data;
      }
    } catch (e) {
      console.error("Error fetching live products from PostgreSQL database:", e);
    }

    const prodMap = new Map<string, ProductItem>();

    // Load storefront catalog fallback items first
    PRODUCTS_CATALOG.forEach((catItem: any) => {
      const skuKey = catItem.sku || `SKU-${catItem.id}`;
      prodMap.set(skuKey, {
        id: catItem.id,
        name: catItem.name,
        category: catItem.category || "Jewellery",
        metal: catItem.categorySlug === "silver" ? "Silver" : "Gold",
        purity: catItem.badge || "22KT BIS Hallmarked",
        grossWeight: catItem.weight || catItem.grossWeight || "10.00g",
        netWeight: catItem.netWeight || catItem.weight || "10.00g",
        price: catItem.price,
        stock: 20,
        sku: skuKey,
        image: catItem.image || catItem.images?.[0] || "/images/gifts/wedding.png",
        active: true,
      });
    });

    // Overwrite with live PostgreSQL items
    apiProds.forEach((dbItem: any) => {
      const skuKey = dbItem.sku || `SKU-${dbItem.id}`;
      prodMap.set(skuKey, {
        id: dbItem.id,
        name: dbItem.name,
        modelNumber: dbItem.modelNumber || "",
        tokenNumber: dbItem.tokenNumber || "",
        category: dbItem.category,
        metal: dbItem.metal || (dbItem.category?.toLowerCase().includes("silver") ? "Silver" : "Gold"),
        purity: dbItem.purity || "22KT BIS Hallmarked",
        grossWeight: dbItem.grossWeight || "5.0g",
        netWeight: dbItem.netWeight || "5.0g",
        stoneWeight: dbItem.stoneWeight || "",
        makingCharges: dbItem.makingCharges || "",
        otherCharges: dbItem.otherCharges || "",
        description: dbItem.description || "",
        price: dbItem.price,
        stock: dbItem.stock ?? 10,
        sku: skuKey,
        image: dbItem.image || "/images/gifts/wedding.png",
        active: dbItem.active !== false,
      });
    });

    const combined = Array.from(prodMap.values());
    setProducts(combined);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    try {
      const res = await fetch("http://localhost:4000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newProduct,
          price: Number(newProduct.price),
          stock: Number(newProduct.stock),
        }),
      });
      if (res.ok) {
        setIsAddModalOpen(false);
        setNewProduct({
          name: "",
          modelNumber: "",
          tokenNumber: "",
          category: "Gold Rings",
          metal: "Gold",
          purity: "22KT 916 BIS Hallmarked",
          grossWeight: "4.50 grams",
          netWeight: "4.00 grams",
          stoneWeight: "0.50 grams",
          makingCharges: "",
          otherCharges: "",
          description: "",
          price: "",
          stock: "10",
          sku: "",
          image: "/images/gifts/engagement.png",
        });
        fetchProducts();
      }
    } catch (err) {
      console.error("Error creating product:", err);
    }
  };

  const handleOpenEditModal = (item: ProductItem) => {
    setEditProduct({ ...item });
    setIsEditModalOpen(true);
  };

  const handleSaveEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProduct || !editProduct.name || !editProduct.price) return;

    try {
      const targetId = editProduct.id || editProduct.sku;
      const res = await fetch(`http://localhost:4000/api/products/${targetId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editProduct,
          price: Number(editProduct.price),
          stock: Number(editProduct.stock),
        }),
      });
      if (res.ok) {
        setIsEditModalOpen(false);
        setEditProduct(null);
        fetchProducts();
      }
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:4000/api/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchProducts();
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const filteredProducts = products.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMetal = filterMetal === "All" || item.metal === filterMetal;
    return matchesSearch && matchesMetal;
  });

  return (
    <div className="space-y-5 max-w-[1440px] mx-auto font-sans pb-6">
      
      {/* Top Title Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-[#16181D] p-5 rounded-[24px] border border-[#EBEFF5] dark:border-gray-800 shadow-sm transition-colors duration-500">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-[#C8232A]" />
            <span>Product Catalog</span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Database className="w-2.5 h-2.5" /> Live Inventory
            </span>
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Manage your gold, silver, and diamond product catalog in real-time
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#1A1C1E] dark:bg-white text-white dark:text-gray-900 text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-md hover:bg-black dark:hover:bg-gray-200 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Main Table Container */}
      <div className="bg-white dark:bg-[#16181D] border border-[#EBEFF5] dark:border-gray-800 rounded-[28px] p-5 shadow-sm dark:shadow-xl space-y-4 transition-colors duration-500">
        
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search SKU, Product Name, Category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-2 bg-[#EEF1F5] dark:bg-gray-800 text-gray-800 dark:text-white rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          {/* Metal Filter Pills */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#EEF1F5] dark:bg-gray-800 p-1 rounded-full text-xs">
              {(["All", "Gold", "Silver"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setFilterMetal(m)}
                  className={`px-3 py-1 rounded-full font-medium transition-all ${
                    filterMetal === m
                      ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-2xs font-bold"
                      : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <button className="p-2 bg-[#EEF1F5] dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Data Table */}
        <div className="w-full overflow-x-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16 text-xs text-gray-400">
              No product items found.
            </div>
          ) : (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="text-[9px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
                  <th className="pb-3 pr-2">PRODUCT</th>
                  <th className="pb-3 pr-2">SKU</th>
                  <th className="pb-3 pr-2">CATEGORY</th>
                  <th className="pb-3 pr-2">PURITY & WEIGHT</th>
                  <th className="pb-3 pr-2">PRICE</th>
                  <th className="pb-3 pr-2">STOCK</th>
                  <th className="pb-3 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800/60">
                {filteredProducts.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors">
                    
                    {/* Name & Thumbnail */}
                    <td className="py-3 pr-2">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white text-xs leading-tight">
                            {item.name}
                          </h4>
                          <div className="flex items-center gap-1 mt-0.5">
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full inline-block ${
                                item.metal === "Gold"
                                  ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                                  : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300"
                              }`}
                            >
                              {item.metal}
                            </span>
                            {item.modelNumber && (
                              <span className="text-[9px] font-mono text-gray-400">
                                Mod: {item.modelNumber}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* SKU & Token */}
                    <td className="py-3 pr-2 leading-tight">
                      <p className="font-mono font-bold text-gray-600 dark:text-gray-400 text-[11px]">{item.sku}</p>
                      {item.tokenNumber && (
                        <p className="text-[9px] font-mono text-amber-600 dark:text-amber-400">Tkn: {item.tokenNumber}</p>
                      )}
                    </td>

                    {/* Category */}
                    <td className="py-3 pr-2 text-gray-700 dark:text-gray-300 font-medium text-xs">
                      {item.category}
                    </td>

                    {/* Purity & Weight */}
                    <td className="py-3 pr-2 leading-tight">
                      <p className="font-semibold text-gray-900 dark:text-white text-xs">{item.purity}</p>
                      <p className="text-[10px] text-gray-400 flex flex-wrap gap-x-1.5 mt-0.5">
                        <span>Gross: {item.grossWeight}</span>
                        <span>| Net: {item.netWeight}</span>
                        {item.stoneWeight && <span>| Stone: {item.stoneWeight}</span>}
                      </p>
                    </td>

                    {/* Price & Charges */}
                    <td className="py-3 pr-2 leading-tight">
                      <p className="font-extrabold text-gray-900 dark:text-white text-xs">
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>
                      {(item.makingCharges || item.otherCharges) && (
                        <p className="text-[9px] text-gray-400 mt-0.5">
                          {item.makingCharges && <span>Making: {item.makingCharges} </span>}
                          {item.otherCharges && <span>Misc: {item.otherCharges}</span>}
                        </p>
                      )}
                    </td>

                    {/* Stock */}
                    <td className="py-3 pr-2">
                      <span className="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-full text-[10px]">
                        {item.stock} in stock
                      </span>
                    </td>

                    {/* Action Buttons: Edit & Delete */}
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          title="Edit Product"
                          className="p-1.5 rounded-full text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-all cursor-pointer"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(item.id)}
                          title="Delete Product"
                          className="p-1.5 rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white dark:bg-[#16181D] text-gray-900 dark:text-white rounded-[24px] p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-800 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <div>
                <h3 className="font-bold text-base">Add New Product</h3>
                <p className="text-xs text-gray-400">Enter complete product specs, weight breakdown & charges</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
              
              {/* Product Name */}
              <div>
                <label className="block text-gray-500 dark:text-gray-400 font-semibold mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Peacock Gold Jhumka"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {/* Model Number & Token Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-500 dark:text-gray-400 font-semibold mb-1">
                    Model Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. MOD-8842"
                    value={newProduct.modelNumber}
                    onChange={(e) => setNewProduct({ ...newProduct, modelNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-500 dark:text-gray-400 font-semibold mb-1">
                    Token Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. TKN-1024"
                    value={newProduct.tokenNumber}
                    onChange={(e) => setNewProduct({ ...newProduct, tokenNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Metal Type, Price, Stock & Purity */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-500 dark:text-gray-400 font-semibold mb-1">
                    Metal Type
                  </label>
                  <select
                    value={newProduct.metal}
                    onChange={(e) => setNewProduct({ ...newProduct, metal: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="Gold">Gold</option>
                    <option value="Silver">Silver</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-500 dark:text-gray-400 font-semibold mb-1">
                    Price (INR) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="34800"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-500 dark:text-gray-400 font-semibold mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Purity & Spec */}
              <div>
                <label className="block text-gray-500 dark:text-gray-400 font-semibold mb-1">
                  Purity & Spec
                </label>
                <input
                  type="text"
                  placeholder="e.g. 22KT 916 BIS Hallmarked"
                  value={newProduct.purity}
                  onChange={(e) => setNewProduct({ ...newProduct, purity: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {/* Weight Details: Gross Weight, Net Weight, Stone Weight */}
              <div className="pt-1">
                <p className="font-bold text-gray-700 dark:text-gray-300 text-[11px] mb-2 uppercase tracking-wide">
                  Weight Details
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-gray-500 dark:text-gray-400 font-semibold mb-1">
                      Gross Weight
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 4.50 grams"
                      value={newProduct.grossWeight}
                      onChange={(e) => setNewProduct({ ...newProduct, grossWeight: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-500 dark:text-gray-400 font-semibold mb-1">
                      Net Weight
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 4.00 grams"
                      value={newProduct.netWeight}
                      onChange={(e) => setNewProduct({ ...newProduct, netWeight: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-500 dark:text-gray-400 font-semibold mb-1">
                      Stone Weight
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 0.50 grams"
                      value={newProduct.stoneWeight}
                      onChange={(e) => setNewProduct({ ...newProduct, stoneWeight: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Charges Breakdown */}
              <div className="pt-1">
                <p className="font-bold text-gray-700 dark:text-gray-300 text-[11px] mb-2 uppercase tracking-wide">
                  Charges & Fees
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-500 dark:text-gray-400 font-semibold mb-1">
                      Making Charges
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ₹2,500"
                      value={newProduct.makingCharges}
                      onChange={(e) => setNewProduct({ ...newProduct, makingCharges: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-500 dark:text-gray-400 font-semibold mb-1">
                      Other Charges (Misc & Hallmark)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ₹500 (Misc & Hallmark)"
                      value={newProduct.otherCharges}
                      onChange={(e) => setNewProduct({ ...newProduct, otherCharges: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Product Description */}
              <div>
                <label className="block text-gray-500 dark:text-gray-400 font-semibold mb-1">
                  Product Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter detailed description of design, craftsmanship, gemstone details..."
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#1A1C1E] dark:bg-white text-white dark:text-gray-900 font-bold shadow-md hover:bg-black dark:hover:bg-gray-200 transition-all cursor-pointer"
                >
                  Save to Database
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {isEditModalOpen && editProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white dark:bg-[#16181D] text-gray-900 dark:text-white rounded-[24px] p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-800 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <div>
                <h3 className="font-bold text-base flex items-center gap-2">
                  <Pencil className="w-4 h-4 text-blue-500" />
                  <span>Edit Product</span>
                </h3>
                <p className="text-xs text-gray-400 font-mono">SKU: {editProduct.sku}</p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditProduct} className="space-y-4 text-xs">
              
              {/* Product Name */}
              <div>
                <label className="block text-gray-500 dark:text-gray-400 font-semibold mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Peacock Gold Jhumka"
                  value={editProduct.name}
                  onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Model Number & Token Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-500 dark:text-gray-400 font-semibold mb-1">
                    Model Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. MOD-8842"
                    value={editProduct.modelNumber || ""}
                    onChange={(e) => setEditProduct({ ...editProduct, modelNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-500 dark:text-gray-400 font-semibold mb-1">
                    Token Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. TKN-1024"
                    value={editProduct.tokenNumber || ""}
                    onChange={(e) => setEditProduct({ ...editProduct, tokenNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Metal Type, Price, Stock & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-500 dark:text-gray-400 font-semibold mb-1">
                    Metal Type
                  </label>
                  <select
                    value={editProduct.metal}
                    onChange={(e) => setEditProduct({ ...editProduct, metal: e.target.value as "Gold" | "Silver" })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Gold">Gold</option>
                    <option value="Silver">Silver</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-500 dark:text-gray-400 font-semibold mb-1">
                    Price (INR) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="34800"
                    value={editProduct.price}
                    onChange={(e) => setEditProduct({ ...editProduct, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-500 dark:text-gray-400 font-semibold mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={editProduct.stock}
                    onChange={(e) => setEditProduct({ ...editProduct, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Purity & Spec */}
              <div>
                <label className="block text-gray-500 dark:text-gray-400 font-semibold mb-1">
                  Purity & Spec
                </label>
                <input
                  type="text"
                  placeholder="e.g. 22KT 916 BIS Hallmarked"
                  value={editProduct.purity}
                  onChange={(e) => setEditProduct({ ...editProduct, purity: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Weight Details: Gross Weight, Net Weight, Stone Weight */}
              <div className="pt-1">
                <p className="font-bold text-gray-700 dark:text-gray-300 text-[11px] mb-2 uppercase tracking-wide">
                  Weight Details
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-gray-500 dark:text-gray-400 font-semibold mb-1">
                      Gross Weight
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 4.50 grams"
                      value={editProduct.grossWeight}
                      onChange={(e) => setEditProduct({ ...editProduct, grossWeight: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-500 dark:text-gray-400 font-semibold mb-1">
                      Net Weight
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 4.00 grams"
                      value={editProduct.netWeight}
                      onChange={(e) => setEditProduct({ ...editProduct, netWeight: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-500 dark:text-gray-400 font-semibold mb-1">
                      Stone Weight
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 0.50 grams"
                      value={editProduct.stoneWeight || ""}
                      onChange={(e) => setEditProduct({ ...editProduct, stoneWeight: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Charges Breakdown */}
              <div className="pt-1">
                <p className="font-bold text-gray-700 dark:text-gray-300 text-[11px] mb-2 uppercase tracking-wide">
                  Charges & Fees
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-500 dark:text-gray-400 font-semibold mb-1">
                      Making Charges
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ₹2,500"
                      value={editProduct.makingCharges || ""}
                      onChange={(e) => setEditProduct({ ...editProduct, makingCharges: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-500 dark:text-gray-400 font-semibold mb-1">
                      Other Charges (Misc & Hallmark)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ₹500 (Misc & Hallmark)"
                      value={editProduct.otherCharges || ""}
                      onChange={(e) => setEditProduct({ ...editProduct, otherCharges: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Product Description */}
              <div>
                <label className="block text-gray-500 dark:text-gray-400 font-semibold mb-1">
                  Product Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter detailed description..."
                  value={editProduct.description || ""}
                  onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md transition-all cursor-pointer"
                >
                  Update Product
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
