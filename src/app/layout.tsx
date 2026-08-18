import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

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
  title: "Thoram Group — AI Agents, Web Platforms & Mobile Apps",
  description:
    "A product studio building AI agents, web platforms, and mobile apps that generate measurable revenue. 100% source code ownership. Scoped proposals in 48 hours.",
  keywords: [
    "product studio",
    "software engineering",
    "AI agents",
    "mobile app development",
    "Flutter iOS Android",
    "Next.js web platforms",
    "digital automation",
    "technology consulting",
  ],
  openGraph: {
    title: "Thoram Group — AI Agents, Web Platforms & Mobile Apps",
    description:
      "We build software that moves real numbers. AI agents, web platforms, and mobile apps — you own 100% of what we build.",
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
      <body className="font-body antialiased bg-[#070709] text-zinc-100 min-h-screen overflow-x-hidden flex flex-col justify-between">
        <AuthProvider>
          <Navbar />
          <div className="flex-grow">{children}</div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
