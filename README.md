<div align="center">

  <img src="https://jewellerygardenpvtltd.com/wp-content/uploads/2025/07/LOGO-FOR-WEBSITE-scaled.png" alt="Jewellery Garden Logo" width="380" />

  # 👑 SAAJ JEWELLERS / JEWELLERY GARDEN
  ### *Eastern India's Premier 22KT Gold & 925 Sterling Silver E-Commerce Platform*

  [![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Vercel AI SDK](https://img.shields.io/badge/Vercel_AI_SDK-4.0-black?style=for-the-badge&logo=vercel)](https://sdk.vercel.ai/)
  [![BIS Hallmark](https://img.shields.io/badge/BIS_Hallmark-22KT_916-gold?style=for-the-badge)](https://www.bis.gov.in/)
  [![925 Silver](https://img.shields.io/badge/925_Silver-Pure_Sterling-silver?style=for-the-badge)](https://jewellerygardenpvtltd.com/)

  ---

  <img src="https://jewellerygardenpvtltd.com/wp-content/uploads/2025/07/short-logo-300x300.png" alt="Jewellery Garden Emblem" width="120" />

</div>

<br />

## 📖 Executive Overview

**Saaj Jewellers / Jewellery Garden Pvt Ltd** is a full-stack, enterprise-grade e-commerce web platform designed for luxury gold, diamond, and sterling silver retail. 

Built with **Next.js 16 (App Router)**, **TypeScript**, **TailwindCSS**, and the **Vercel AI SDK**, this application replicates the premium digital shopping experience of leading Indian luxury jewelers (Senco Gold & Diamonds) with 100% authentic BIS 916 gold hallmarking, certified solitaire diamonds, 925 gossip silver, and interactive AI concierge chat.

---

## 🏛️ Monorepo Architecture

```text
Jewellery Garden/
├── 📁 Frontend/                # Next.js 16+ App Router Application (24 Routes)
│   ├── 📁 src/app/             # PDPs, Cart, Wishlist, 13 Legal Pages, AI Chat API
│   ├── 📁 src/components/      # Header Megamenus, 3D Stack Carousel, Elevated Slider
│   ├── 📁 src/data/            # Strict 22KT Gold & 925 Silver Catalog (siteData.ts)
│   └── 📄 README.md            # Frontend Specific Engineering Guide
│
├── 📁 Backend/                 # Server Architecture & Database API Services
│
└── 📁 Md_Files/                # System Specifications & UI Blueprints
    └── 📄 design.md            # Senco-Inspired Luxury Design System
```

---

## 🌟 Key Platform Capabilities

<table>
  <tr>
    <td width="50%">
      <h3>👑 22KT Gold & 925 Sterling Silver</h3>
      <ul>
        <li><b>100% BIS 916 Hallmarked Gold</b>: Every gold item is laser-stamped with government BIS Hallmark and 6-digit HUID code (verifiable on BIS Care App).</li>
        <li><b>925 Sterling Silver</b>: Gossip fashion bangles, anti-tarnish chains, and 999 pure silver coins & utensils.</li>
        <li><b>Certified Natural Diamonds</b>: Solitaires certified by international gemological institutes (IGLI / SGL) with 4Cs breakdown.</li>
      </ul>
    </td>
    <td width="50%">
      <h3>💎 Senco-Style Product Detail Pages</h3>
      <ul>
        <li><b>Multi-Image Gallery & Zoom</b>: High-res viewer with thumbnail carousel, Wishlist button, and Share canonical URL.</li>
        <li><b>Price Breakup Accordion</b>: Net weight, live gold rate, making charges (flat 20% discount), and 3% GST calculation.</li>
        <li><b>Express PIN Code Checker</b>: Delivery availability checker for 24-48 hr insured door pickup shipping.</li>
        <li><b>Showroom Live Trial</b>: Schedule appointments at <b>Durgapur Bazar</b> or <b>Durgapur City Centre</b> showrooms.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🎨 3D Motion UI Components</h3>
      <ul>
        <li><b>Senco 9-Column Megamenu</b>: Full-width dropdown for Gold Earrings, Pendants, Nosepins, Necklaces, Rings, Bangles, Bracelets, Mangalsutras, Chains.</li>
        <li><b>3D Reel Stack Carousel</b>: Perspective video reel stack (<i>Our Jewellery Design Collections</i>) with Framer Motion spring curves.</li>
        <li><b>5-Card Elevated Zoom Slider</b>: 3D forward zoom transformation (<i>Explore our Collections</i>) with gold border glow ring.</li>
      </ul>
    </td>
    <td width="50%">
      <h3>💬 AI Concierge Assistant</h3>
      <ul>
        <li><b>Vercel AI SDK (<code>ai</code> + <code>@ai-sdk/google</code>)</b>: Next.js App Router API Route (<code>/api/chat</code>) powered by Google Gemini.</li>
        <li><b>Conversational AI Engine</b>: Handles greetings, small talk, identity questions, BIS 916 gold purity, returns, and showroom timings.</li>
        <li><b>Direct WhatsApp Escalation</b>: Instant single-click WhatsApp support button (<code>+91 7605023222</code>).</li>
      </ul>
    </td>
  </tr>
</table>

---

## 🗺️ Complete Route Directory (24 Routes)

| Route Path | Description | Type |
| :--- | :--- | :--- |
| `/` | Main Luxury Homepage with Hero Banner, 3D Reel Stack & Bento Collections | `Static` |
| `/jewellery` | Product Catalog Page with Live Metal, Category & Price Filters | `Static` |
| `/jewellery/[category]/[slug]` | Unique Shareable PDP Drill-Down Page with Price Breakup | `Dynamic` |
| `/cart` | Shopping Bag with Item Quantity Controls & 3% GST Order Summary | `Static` |
| `/wishlist` | Saved Favorites Grid with Move-to-Bag & Share Wishlist | `Static` |
| `/api/chat` | Vercel AI SDK Streaming Endpoint (Google Gemini LLM) | `Dynamic` |
| `/contact-us` | Customer Helpline, Durgapur Showroom Maps & Inquiry Form | `Static` |
| `/payment-policy` | 256-Bit SSL Encryption, PCI DSS Compliance & Invoice Breakdown | `Static` |
| `/return-policy` | 15-Day Money-Back & Exchange Guarantee Policy | `Static` |
| `/corporate-sales` | B2B Custom 24KT Gold & 999 Silver Logo Coin Minting Quote Form | `Static` |
| `/about-us` | Brand Heritage, 100% BIS Hallmarking & Showroom Narrative | `Static` |
| `/board-of-directors` | Executive Leadership & Managing Director Profiles | `Static` |
| `/corporate-governance` | Ethical Gold Sourcing & ISO 27001 Security Standards | `Static` |
| `/investor-relations` | Financial Growth Highlights & Annual Report PDF Downloads | `Static` |
| `/csr-initiatives` | Karigar Artisan Welfare Fund, Girl Child Education & Solar Sourcing | `Static` |
| `/blog` | Gold Karat Purity Guide, Bengali Bridal Trends & Maintenance Tips | `Static` |
| `/faq` | Interactive Help Center Accordion Knowledge Base | `Static` |
| `/diamond-certificates` | Solitaire 4Cs Education & Certificate Serial Verification Tool | `Static` |
| `/jewellery-care-guide` | Cleaning 22KT Gold & Anti-Tarnish 925 Silver Storage Guide | `Static` |
| `/franchisee-enquiry` | Retail Expansion Franchise Application Form | `Static` |
| `/privacy-policy` | Data Encryption, Privacy Notice & Income Tax KYC Guidelines | `Static` |
| `/cookie-policy` | E-Commerce Cookies & Preference Management | `Static` |

---

## 🚀 Quick Start & Installation

### 1. Clone & Install
```bash
git clone https://github.com/your-username/saaj-jewellers.git
cd saaj-jewellers/Frontend
npm install
```

### 2. Configure Environment Variables
Create `.env.local` in the `Frontend/` folder:
```bash
cp .env.example .env.local
```

Add your Google Gemini API Key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
*(Note: If no API key is provided, the AI Assistant runs on an intelligent local streaming fallback engine).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) or [http://localhost:3005](http://localhost:3005) in your browser.

### 4. Build Production Bundle
```bash
npm run build
npm run start
```

---

<div align="center">

  <img src="https://jewellerygardenpvtltd.com/wp-content/uploads/2025/07/LOGO-FOR-WEBSITE-scaled.png" alt="Jewellery Garden Footer Logo" width="280" />

  <p><b>© 2026 JEWELLERY GARDEN PVT LTD / SAAJ JEWELLERS. ALL RIGHTS RESERVED.</b><br />
  <i>Durgapur Bazar Showroom • Durgapur City Centre Showroom • West Bengal, India</i></p>

</div>
