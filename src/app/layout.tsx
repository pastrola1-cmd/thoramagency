import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thoram Group — Growth, Engineered.",
  description:
    "We combine AI, software, automation, and marketing to help ambitious companies generate more customers, increase revenue, and scale faster.",
  keywords: ["growth engineering", "AI marketing", "sales automation", "lead generation", "revenue growth"],
  openGraph: {
    title: "Thoram Group — Growth, Engineered.",
    description: "AI-powered growth engine for ambitious companies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${outfit.variable} ${inter.variable}`}>
      <body className="font-body antialiased bg-void text-ice min-h-screen overflow-x-hidden flex flex-col justify-between">
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

