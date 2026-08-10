<div align="center">

  <img src="https://jewellerygardenpvtltd.com/wp-content/uploads/2025/07/LOGO-FOR-WEBSITE-scaled.png" alt="Jewellery Garden Logo" width="380" />

  # 💎 SAAJ JEWELLERS / JEWELLERY GARDEN - FRONTEND

  [![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Vercel AI SDK](https://img.shields.io/badge/Vercel_AI_SDK-4.0-black?style=for-the-badge&logo=vercel)](https://sdk.vercel.ai/)
  [![BIS Hallmark](https://img.shields.io/badge/BIS_Hallmark-22KT_916-gold?style=for-the-badge)](https://www.bis.gov.in/)

</div>

<br />

## 🛠️ Frontend Architecture

The frontend application is built using Next.js 16 (App Router), TypeScript, TailwindCSS, and the Vercel AI SDK.

```text
src/
├── app/
│   ├── api/chat/route.ts          # Vercel AI SDK Streaming Endpoint
│   ├── jewellery/                 # Product Listing & Live Search Page
│   │   └── [category]/[slug]/     # Unique PDP Drill-Down Pages
│   ├── cart/                      # Shopping Bag & GST Order Summary
│   ├── wishlist/                  # Wishlist Saved Designs
│   ├── contact-us/                # Contact Helpline & Inquiry Form
│   ├── payment-policy/            # Payment Security Policy
│   ├── return-policy/             # 15-Day Return Guarantee Policy
│   ├── corporate-sales/           # B2B Corporate Gold Coin Minting
│   ├── about-us/                  # Brand Heritage & Showroom Story
│   ├── board-of-directors/        # Leadership Profiles
│   ├── blog/                      # Jewellery Care & Karat Guides
│   ├── faq/                       # Accordion Knowledge Base
│   ├── diamond-certificates/      # Solitaire 4Cs & Certificate Checker
│   └── layout.tsx                 # Global Layout (Poppins Font, Providers)
├── components/
│   ├── header/                    # MainHeader, CategoryMenu, TopBar
│   ├── home/                      # DesignCollectionsReel, BentoCollections, Hero
│   ├── footer/                    # MainFooter, SeoFooter
│   └── common/                    # FloatingActions (Interactive AI Chatbot)
└── data/
    └── siteData.ts                # Strict Gold & Silver Products Catalog
```

---

## ⚡ Features Summary

- **Senco-Style PDP Layout**: Multi-image thumbnail gallery, shareable URL structure, collapsible price breakup (Net Weight, Live Rate, 20% Off Making Charges, 3% GST), and PIN code delivery checker.
- **3D Card Stack Reel Carousel**: Perspective video reel stack (`Our Jewellery Design Collections`) powered by Framer Motion spring bezier curves.
- **5-Card Elevated Zoom Slider**: 3D forward zoom transformation (`Explore our Collections`) with gold ring highlights.
- **Vercel AI SDK Concierge**: Server-side App Router endpoint (`/api/chat`) using Google Gemini LLM with streaming fallback and WhatsApp support escalation.
- **24 Production Routes**: Built cleanly with `npm run build` in 2.0 seconds with 0 TypeScript errors.

---

## 🚀 Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build production bundle
npm run build

# Start production server
npm run start
```

<div align="center">
  <img src="https://jewellerygardenpvtltd.com/wp-content/uploads/2025/07/short-logo-300x300.png" alt="Jewellery Garden Emblem" width="100" />
</div>
