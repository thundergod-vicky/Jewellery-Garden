import toast from "react-hot-toast";
import { PRODUCTS_CATALOG } from "@/data/siteData";

export interface CartItem {
  id: string;
  product: any;
  quantity: number;
  size?: string;
}

export const getCartItems = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem("jg-cart-items");
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return parsed.map((item: any) => {
      const match = PRODUCTS_CATALOG.find((p) => p.id === (item.product?.id || item.id));
      return {
        id: item.product?.id || item.id,
        quantity: item.quantity || 1,
        size: item.size || "14",
        product: item.product || match || {
          id: item.id || "item-1",
          name: "Jewellery Item",
          price: 12500,
          image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
        },
      };
    });
  } catch (e) {
    return [];
  }
};

export const addToCart = (product: any, quantity: number = 1, size: string = "14") => {
  if (typeof window === "undefined" || !product) return;

  try {
    const cart = getCartItems();
    const existingIndex = cart.findIndex(
      (item) => (item.product?.id || item.id) === (product.id || product.sku)
    );

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id || product.sku,
        product,
        quantity,
        size,
      });
    }

    localStorage.setItem("jg-cart-items", JSON.stringify(cart));
    window.dispatchEvent(new Event("jg-cart-updated"));
    toast.success(`${product.name || "Item"} added to your cart! 🛍️`, {
      duration: 3500,
    });
  } catch (e) {
    console.error("Error adding item to cart:", e);
  }
};

export const removeFromCart = (productId: string) => {
  if (typeof window === "undefined") return;
  try {
    const cart = getCartItems().filter(
      (item) => (item.product?.id || item.id) !== productId
    );
    localStorage.setItem("jg-cart-items", JSON.stringify(cart));
    window.dispatchEvent(new Event("jg-cart-updated"));
    toast.success("Item removed from cart");
  } catch (e) {}
};

export const updateCartQuantity = (productId: string, quantity: number) => {
  if (typeof window === "undefined") return;
  try {
    let cart = getCartItems();
    if (quantity <= 0) {
      cart = cart.filter((item) => (item.product?.id || item.id) !== productId);
    } else {
      const idx = cart.findIndex((item) => (item.product?.id || item.id) === productId);
      if (idx !== -1) {
        cart[idx].quantity = quantity;
      }
    }
    localStorage.setItem("jg-cart-items", JSON.stringify(cart));
    window.dispatchEvent(new Event("jg-cart-updated"));
  } catch (e) {}
};

export const getWishlistIds = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem("jg-wishlist-items");
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return parsed.map((item: any) => (typeof item === "object" ? item.id : item));
  } catch (e) {
    return [];
  }
};

export const toggleWishlist = (product: any) => {
  if (typeof window === "undefined" || !product) return false;
  const productId = product.id || product;

  try {
    const currentIds = getWishlistIds();
    let updated: string[];
    let isAdded = false;

    if (currentIds.includes(productId)) {
      updated = currentIds.filter((id) => id !== productId);
      toast.success("Removed from your wishlist.");
    } else {
      updated = [...currentIds, productId];
      isAdded = true;
      toast.success(`${product.name || "Item"} added to your wishlist! ❤️`, {
        duration: 3500,
      });
    }

    localStorage.setItem("jg-wishlist-items", JSON.stringify(updated));
    window.dispatchEvent(new Event("jg-wishlist-updated"));
    return isAdded;
  } catch (e) {
    return false;
  }
};
