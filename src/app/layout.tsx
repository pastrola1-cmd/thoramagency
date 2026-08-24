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
  title: "Thoram Group — Product Engineering & Technology Studio",
  description:
    "Thoram Group designs, builds, and scales high-performance digital products for businesses ready to move faster — from business systems and customer platforms to mobile applications and automation.",
  keywords: [
    "product engineering",
    "product studio",
    "business systems",
    "SaaS engineering",
    "mobile app development",
    "Flutter iOS Android",
    "automation AI",
    "system architecture",
  ],
  openGraph: {
    title: "Thoram Group — Product Engineering & Technology Studio",
    description:
      "We build the software that moves businesses forward. From business systems and customer platforms to mobile apps and automation.",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${outfit.variable} ${inter.variable}`}>
      <body className="font-body antialiased bg-white text-zinc-900 min-h-screen overflow-x-hidden flex flex-col justify-between">
        <AuthProvider>
          <Navbar />
          <div className="flex-grow">{children}</div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
