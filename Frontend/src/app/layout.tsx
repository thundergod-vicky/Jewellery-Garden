import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jewellery Garden Pvt Ltd | Authentic Gold, Diamond & Silver Jewellery",
  description:
    "Discover exquisite Indian & Bengali Bridal Jewellery, Gold Rings, Diamond Necklaces, and Sterling Silver at Jewellery Garden Pvt Ltd. Visit our Durgapur Bazar & City Centre Showrooms.",
  keywords: [
    "Jewellery Garden Pvt Ltd",
    "Jewellery Garden",
    "Gold Jewellery",
    "Diamond Jewellery",
    "Bengali Bridal Jewellery",
    "Silver Showroom Durgapur",
    "Durgapur City Centre Showroom",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans antialiased selection:bg-[#C8232A] selection:text-white">
        {children}
      </body>
    </html>
  );
}
