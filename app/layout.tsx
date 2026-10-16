import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Young_Serif, Figtree } from "next/font/google";
import { CartProvider, CartLink } from "@/components/cart";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const youngSerif = Young_Serif({ weight: "400", subsets: ["latin"], variable: "--font-young-serif" });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" });

export const metadata: Metadata = {
  title: "Yarnberry | Custom crochet by Faiqa",
  description: "Custom crocheted gloves, bags, keychains and baby sets. Send your colours and sizes and we make it for you.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${youngSerif.variable} ${figtree.variable} motion-safe:scroll-smooth`}>
      <body className="bg-blush font-sans leading-relaxed text-maroon antialiased">
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
        <Footer/>
      </body>
    </html>
  );
}
