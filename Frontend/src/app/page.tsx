import TopBar from "@/components/header/TopBar";
import MainHeader from "@/components/header/MainHeader";
import CategoryMenu from "@/components/header/CategoryMenu";
import HeroCarousel from "@/components/home/HeroCarousel";
import ExpressDeliveryStrip from "@/components/home/ExpressDeliveryStrip";
import CategoryGrid from "@/components/home/CategoryGrid";
import ShopByBudget from "@/components/home/ShopByBudget";
import DesignCollectionsReel from "@/components/home/DesignCollectionsReel";
import BentoCollections from "@/components/home/BentoCollections";
import GiftsSection from "@/components/home/GiftsSection";
import TopSellers from "@/components/home/TopSellers";
import BridalVivaahBanner from "@/components/home/BridalVivaahBanner";
import ShowroomsSection from "@/components/home/ShowroomsSection";
import AdvantageGuarantees from "@/components/home/AdvantageGuarantees";
import MainFooter from "@/components/footer/MainFooter";
import SeoFooter from "@/components/footer/SeoFooter";
import FloatingActions from "@/components/common/FloatingActions";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A]">
      {/* Section 1: Top Utility Bar */}
      <TopBar />

      {/* Section 2: Main Header & Search Navigation */}
      <MainHeader />

      {/* Section 3: Category Megamenu Bar */}
      <CategoryMenu />

      {/* Section 4: Main Hero Banner Carousel */}
      <HeroCarousel />

      {/* Section 5: Express Delivery Promo Strip */}
      <ExpressDeliveryStrip />

      {/* Section 6: Shop Jewellery by Category */}
      <CategoryGrid />

      {/* Section 7: Shop by Budget Cards */}
      <ShopByBudget />

      {/* Section 8: Our Jewellery Design Collections (3D Stack Reel) */}
      <DesignCollectionsReel />

      {/* Section 9: Explore our Collections Bento Grid */}
      <BentoCollections />

      {/* Section 10: A Perfect Gift (Gifts by Occasion) */}
      <GiftsSection />

      {/* Section 13 & 14: Top Sellers & Recommended Products */}
      <TopSellers />

      {/* Section 15: Bengali & Indian Bridal Vivaah Banner */}
      <BridalVivaahBanner />

      {/* Showrooms Section: Durgapur Bazar & City Centre Showrooms */}
      <ShowroomsSection />

      {/* Section 16: The Jewellery Garden Advantage Trust Pillars */}
      <AdvantageGuarantees />

      {/* Section 21: Main Footer Navigation */}
      <MainFooter />

      {/* Section 22: Popular Searches SEO Links Block */}
      <SeoFooter />

      {/* Section 23: Floating Actions (Back to Top & WhatsApp Chat) */}
      <FloatingActions />
    </main>
  );
}
