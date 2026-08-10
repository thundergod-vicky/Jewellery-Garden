export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  metal: "Gold" | "Silver";
  purity: string;
  grossWeight: string;
  netWeight: string;
  metalColor: string;
  price: number;
  originalPrice?: number;
  goldValue?: number;
  makingCharges?: number;
  makingDiscount?: number;
  gstAmount?: number;
  image: string;
  images: string[];
  rating: number;
  reviewsCount: number;
  express: boolean;
  badge?: string;
  description: string;
  sku: string;
}

export interface Showroom {
  id: string;
  name: string;
  address: string;
  phone: string;
  timing: string;
  image: string;
  googleMapsUrl: string;
}

export const PRODUCTS_CATALOG: Product[] = [
  {
    id: "p0",
    slug: "splendid-flower-diamond-nose-pin",
    name: "Splendid Flower Diamond Nose Pin",
    category: "Gold Nosepin",
    categorySlug: "gold-nosepin",
    metal: "Gold",
    purity: "18KT Gold with Certified Diamond",
    grossWeight: "0.85 grams",
    netWeight: "0.80 grams",
    metalColor: "Yellow Gold",
    price: 12796,
    originalPrice: 14200,
    goldValue: 8900,
    makingCharges: 3200,
    makingDiscount: 640,
    gstAmount: 376,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.9,
    reviewsCount: 184,
    express: true,
    badge: "Trending Nosepin",
    sku: "DN-D000123787",
    description: "This diamond nose pin is beautifully crafted in 18KT gold with a floral design, carrying just enough glamour to brighten up your daily work attire.",
  },
  {
    id: "p1",
    slug: "crescent-wave-gold-ring",
    name: "Crescent Wave 22KT Gold Ring",
    category: "Gold Rings",
    categorySlug: "gold-rings",
    metal: "Gold",
    purity: "22KT 916 BIS Hallmarked",
    grossWeight: "3.40 grams",
    netWeight: "3.40 grams",
    metalColor: "Yellow Gold",
    price: 12521,
    originalPrice: 14500,
    goldValue: 9800,
    makingCharges: 2350,
    makingDiscount: 470,
    gstAmount: 365,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.8,
    reviewsCount: 142,
    express: true,
    badge: "Best Seller",
    sku: "GR-G00098231",
    description: "Crafted in pure 22KT hallmarked yellow gold, the Crescent Wave Ring combines delicate Bengali filigree with modern wave curves.",
  },
  {
    id: "p2",
    slug: "royal-peacock-gold-jhumka",
    name: "Royal Peacock 22KT Gold Jhumka Earrings",
    category: "Gold Earrings",
    categorySlug: "gold-earrings",
    metal: "Gold",
    purity: "22KT 916 BIS Hallmarked",
    grossWeight: "8.65 grams",
    netWeight: "8.65 grams",
    metalColor: "Yellow Gold",
    price: 34800,
    originalPrice: 38900,
    goldValue: 27500,
    makingCharges: 6200,
    makingDiscount: 1240,
    gstAmount: 1013,
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.9,
    reviewsCount: 98,
    express: true,
    badge: "22KT BIS",
    sku: "ER-J00088192",
    description: "Intricately detailed peacock motif Jhumkas handcrafted by Bengali master artisans in 22KT yellow gold.",
  },
  {
    id: "p3",
    slug: "bengali-traditional-sitahar-gold-necklace",
    name: "Bengali Traditional Sitahar Gold Bridal Necklace",
    category: "Gold Necklaces",
    categorySlug: "gold-necklaces",
    metal: "Gold",
    purity: "22KT 916 BIS Hallmarked",
    grossWeight: "24.15 grams",
    netWeight: "24.15 grams",
    metalColor: "Yellow Gold",
    price: 89500,
    originalPrice: 96000,
    goldValue: 71200,
    makingCharges: 15600,
    makingDiscount: 3120,
    gstAmount: 2606,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 5.0,
    reviewsCount: 64,
    express: false,
    badge: "Bridal Special",
    sku: "NC-S00077281",
    description: "A majestic multi-layer Sitahar bridal necklace crafted in pure 22KT yellow gold, designed for royal Bengali weddings.",
  },
  {
    id: "p5",
    slug: "handcrafted-925-sterling-silver-bangle",
    name: "Handcrafted 925 Sterling Silver Bangle Pair",
    category: "Silver Bangles",
    categorySlug: "silver-bangles",
    metal: "Silver",
    purity: "925 Sterling Silver",
    grossWeight: "28.50 grams",
    netWeight: "28.50 grams",
    metalColor: "Antique Silver",
    price: 4850,
    originalPrice: 5600,
    goldValue: 3200,
    makingCharges: 1500,
    makingDiscount: 300,
    gstAmount: 141,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.8,
    reviewsCount: 88,
    express: true,
    badge: "925 Pure",
    sku: "SB-B00066123",
    description: "Solid 925 sterling silver bangles featuring antique oxidation filigree work. Tarnish resistant coating applied.",
  },
];

export const SITE_DATA = {
  brandName: "Jewellery Garden Pvt Ltd",
  tagline: "Flat 20% Off Making Charges + Free Insured Shipping | Rated 4.8 Out Of 5",
  logoUrl: "https://jewellerygardenpvtltd.com/wp-content/uploads/2025/07/LOGO-FOR-WEBSITE-scaled.png",
  shortLogoUrl: "https://jewellerygardenpvtltd.com/wp-content/uploads/2025/07/short-logo-300x300.png",
  contactPhone: "1800-103-0017",
  whatsappPhone: "+917605023222",
  supportEmail: "support@jewellerygardenpvtltd.com",

  heroSlides: [
    {
      id: "slide-1",
      title: "Beautiful Gold & Silver Jewellery Collections ♥️",
      subtitle: "Bengali & Indian Bridal Gold Collections",
      description: "Discover handcrafted 22KT Gold and 925 Sterling Silver, featuring classic designs and intricate Bengali Bridal Jewellery.",
      image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1920&q=80",
      ctaText: "Shop Bridal Gold",
      ctaLink: "/jewellery?metal=Gold",
    },
    {
      id: "slide-2",
      title: "Classy & Dazzling Gold Solitaires",
      subtitle: "BIS 22KT & 18KT Certified Gold Diamonds",
      description: "Authentic artistry for your biggest moments. Step into a garden of certified gold & diamond rings.",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1920&q=80",
      ctaText: "Explore Gold Solitaires",
      ctaLink: "/jewellery?metal=Gold",
    },
    {
      id: "slide-3",
      title: "Best Sterling Silver Showroom in Durgapur",
      subtitle: "925 Pure Handcrafted Sterling Silver",
      description: "Blending tradition and modern style. Handcrafted sterling silver bangles, chains, and utensils you can trust.",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1920&q=80",
      ctaText: "Discover Silver",
      ctaLink: "/jewellery?metal=Silver",
    },
  ],

  categories: [
    { id: "gold-earrings", title: "Gold Earrings", count: "450+ Designs", image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80", link: "/jewellery?category=gold-earrings" },
    { id: "gold-rings", title: "Gold Rings", count: "620+ Designs", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80", link: "/jewellery?category=gold-rings" },
    { id: "silver-bangles", title: "Silver Bangles & Jewelry", count: "310+ Designs", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80", link: "/jewellery?category=silver-bangles" },
    { id: "gold-nosepin", title: "Gold & Diamond Nosepin", count: "150+ Designs", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80", link: "/jewellery?category=gold-nosepin" },
    { id: "gold-necklaces", title: "Bridal Gold Necklaces", count: "190+ Sets", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80", link: "/jewellery?category=gold-necklaces" },
    { id: "silver-utensils", title: "Pure Silver Coins & Utensils", count: "999 Pure Silver", image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=600&q=80", link: "/jewellery?metal=Silver" },
  ],

  budgetRanges: [
    { label: "Under ₹10,000", maxPrice: 10000, link: "/jewellery?maxPrice=10000", image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=500&q=80" },
    { label: "₹10,000 - ₹25,000", minPrice: 10000, maxPrice: 25000, link: "/jewellery?minPrice=10000&maxPrice=25000", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=500&q=80" },
    { label: "₹25,000 - ₹50,000", minPrice: 25000, maxPrice: 50000, link: "/jewellery?minPrice=25000&maxPrice=50000", image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=500&q=80" },
    { label: "Above ₹50,000", minPrice: 50000, maxPrice: 200000, link: "/jewellery?minPrice=50000", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=500&q=80" },
  ],

  bentoCollections: [
    { title: "925 Gossip Silver", desc: "Trendy daily wear fashion silver jewellery", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80" },
    { title: "22KT Gold Bands", desc: "Classic hallmarked engagement gold bands", img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80" },
    { title: "Pure Silver Utensils", desc: "Authentic handcrafted puja & dining silver", img: "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80" },
    { title: "Diamond Gold Solitaires", desc: "Certified natural solitaires set in pure gold", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80" },
  ],

  showrooms: [
    {
      id: "durgapur-bazar",
      name: "Durgapur Bazar Showroom",
      address: "Bazar Road, Near Central Bus Stand, Durgapur, West Bengal 713201",
      phone: "+91 98321 00000 / 0343 2548888",
      timing: "Open Daily: 10:30 AM - 8:30 PM",
      image: "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=800&q=80",
      googleMapsUrl: "https://maps.google.com/?q=Durgapur+Bazar",
    },
    {
      id: "durgapur-city-centre",
      name: "Durgapur City Centre Showroom",
      address: "Ground Floor, Junction Mall Road, City Centre, Durgapur, West Bengal 713216",
      phone: "+91 98322 11111 / 0343 2549999",
      timing: "Open Daily: 11:00 AM - 9:00 PM",
      image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80",
      googleMapsUrl: "https://maps.google.com/?q=Durgapur+City+Centre",
    },
  ] as Showroom[],

  trustPillars: [
    { title: "BIS 100% Hallmarked Gold", desc: "Guaranteed purity with laser-inscribed government hallmark." },
    { title: "Certified Diamonds", desc: "Every diamond comes with IGLI / SGL international certificates." },
    { title: "Free & Insured Shipping", desc: "Safe, encrypted door delivery across all PIN codes in India." },
    { title: "Complete Transparency", desc: "Detailed bill breakup of gold/silver weight, karat purity, making charges & GST." },
  ],
};

export function getProductBySlug(categorySlug: string, slug: string): Product | undefined {
  return PRODUCTS_CATALOG.find(
    (p) => p.slug === slug || p.id === slug || (p.categorySlug === categorySlug && p.slug === slug)
  );
}

export function getProductsByCategory(categorySlug: string): Product[] {
  if (categorySlug === "all") return PRODUCTS_CATALOG;
  return PRODUCTS_CATALOG.filter((p) => p.categorySlug === categorySlug);
}
