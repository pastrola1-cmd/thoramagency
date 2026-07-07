import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="dark">
      <body className="font-body antialiased bg-void text-ice min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
