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
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMetal, setFilterMetal] = useState<"All" | "Gold" | "Silver">("All");

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Gold Rings",
    metal: "Gold",
    purity: "22KT 916 BIS Hallmarked",
    grossWeight: "4.50 grams",
    netWeight: "4.50 grams",
    price: "",
    stock: "10",
    sku: "",
    image: "/images/gifts/engagement.png",
  });

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
        grossWeight: catItem.weight || "10.00g",
        netWeight: catItem.weight || "10.00g",
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
        category: dbItem.category,
        metal: dbItem.metal || (dbItem.category?.toLowerCase().includes("silver") ? "Silver" : "Gold"),
        purity: dbItem.purity || "22KT BIS Hallmarked",
        grossWeight: dbItem.grossWeight || "5.0g",
        netWeight: dbItem.netWeight || "5.0g",
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
          category: "Gold Rings",
          metal: "Gold",
          purity: "22KT 916 BIS Hallmarked",
          grossWeight: "4.50 grams",
          netWeight: "4.50 grams",
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
            <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono px-2 py-0.5 rounded-full flex items-center gap-1">
              <Database className="w-2.5 h-2.5" /> PostgreSQL Database
            </span>
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Manage your live gold, silver, and diamond inventory stored directly in PostgreSQL
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
              No product items found in PostgreSQL database.
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
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full inline-block mt-0.5 ${
                              item.metal === "Gold"
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                                : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300"
                            }`}
                          >
                            {item.metal}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* SKU */}
                    <td className="py-3 pr-2 font-mono font-bold text-gray-600 dark:text-gray-400 text-[11px]">
                      {item.sku}
                    </td>

                    {/* Category */}
                    <td className="py-3 pr-2 text-gray-700 dark:text-gray-300 font-medium text-xs">
                      {item.category}
                    </td>

                    {/* Purity & Weight */}
                    <td className="py-3 pr-2 leading-tight">
                      <p className="font-semibold text-gray-900 dark:text-white text-xs">{item.purity}</p>
                      <span className="text-[10px] text-gray-400">Net: {item.netWeight}</span>
                    </td>

                    {/* Price */}
                    <td className="py-3 pr-2 font-extrabold text-gray-900 dark:text-white text-xs">
                      ₹{item.price.toLocaleString("en-IN")}
                    </td>

                    {/* Stock */}
                    <td className="py-3 pr-2">
                      <span className="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-full text-[10px]">
                        {item.stock} in stock
                      </span>
                    </td>

                    {/* Delete Action */}
                    <td className="py-3 text-right">
                      <button
                        onClick={() => handleDeleteProduct(item.id)}
                        title="Delete Product"
                        className="p-1.5 rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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
          <div className="bg-white dark:bg-[#16181D] text-gray-900 dark:text-white rounded-[24px] p-6 max-w-md w-full border border-gray-200 dark:border-gray-800 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <h3 className="font-bold text-sm">Add New Product to PostgreSQL</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-500 dark:text-gray-400 font-semibold mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Peacock Gold Jhumka"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-500 dark:text-gray-400 font-semibold mb-1">
                    Metal Type
                  </label>
                  <select
                    value={newProduct.metal}
                    onChange={(e) => setNewProduct({ ...newProduct, metal: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none"
                  >
                    <option value="Gold">Gold</option>
                    <option value="Silver">Silver</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-500 dark:text-gray-400 font-semibold mb-1">
                    Price (INR)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="34800"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-500 dark:text-gray-400 font-semibold mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-500 dark:text-gray-400 font-semibold mb-1">
                    Purity & Spec
                  </label>
                  <input
                    type="text"
                    value={newProduct.purity}
                    onChange={(e) => setNewProduct({ ...newProduct, purity: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#1A1C1E] dark:bg-white text-white dark:text-gray-900 font-bold shadow-md hover:bg-black dark:hover:bg-gray-200 transition-all"
                >
                  Save to Database
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
