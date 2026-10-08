import { Suspense } from "react";
import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "বাজার দর - প্রতিদিনের বাজার দরের নির্ভরযোগ্য তথ্য",
  description:
    "নিত্যপ্রয়োজনীয় চাল, ডাল, তেল, সবজি, মাছ, মাংস ও মসলার সঠিক বাজার দর, গড় মূল্য এবং বাজারভিত্তিক তুলনা।",
  keywords: ["বাজার দর", "Bazar Dor", "চাল ডাল সবজি", "বাংলাদেশ বাজার দর"],
  icons: {
    icon: "/logo-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} ${hindSiliguri.className}`}>
      <body className={`${hindSiliguri.className} min-h-screen flex flex-col bg-[#fafcfa] text-[#1d271f] antialiased`}>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: "#1d271f",
              color: "#ffffff",
              borderRadius: "12px",
              fontFamily: "var(--font-hind-siliguri), sans-serif",
              fontSize: "14px",
            },
            success: {
              iconTheme: {
                primary: "#05893e",
                secondary: "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#d03739",
                secondary: "#ffffff",
              },
            },
          }}
        />
        <Suspense fallback={<div className="h-28 bg-white border-b border-[#e1e8e1]" />}>
          <Navbar />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
