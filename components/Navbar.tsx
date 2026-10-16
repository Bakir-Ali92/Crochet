"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart, Menu, X } from "lucide-react";
import { useCart } from "@/components/cart"; 

const pad = "px-6 sm:px-[8vw] lg:px-20";
const BRAND = "Yarnberry";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { count } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-maroon py-3 shadow-lg" : "bg-transparent py-6"}`}>
      <div className={`flex items-center justify-between ${pad}`}>
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className={`relative size-10 overflow-hidden rounded-full border-2 transition-colors duration-300 shadow-sm ${scrolled ? "border-blush/30 group-hover:border-blush" : "border-rose/30 group-hover:border-rose"}`}>
            <Image src="/logo.jpg" alt="Yarnberry Logo" fill className="object-cover" />
          </div>
          <span className={`font-serif text-2xl font-bold tracking-tight transition-colors ${scrolled ? "text-blush" : "text-maroon group-hover:text-rose"}`}>
            {BRAND}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className={`hidden md:flex items-center gap-10 text-sm font-bold tracking-wide transition-colors ${scrolled ? "text-blush/90" : "text-maroon/80"}`}>
          <Link href="/" className={`transition-colors ${scrolled ? "hover:text-white" : "hover:text-rose"}`}>HOME</Link>
          <Link href="/shop" className={`transition-colors ${scrolled ? "hover:text-white" : "hover:text-rose"}`}>SHOP</Link>
          <Link href="/#contact" className={`transition-colors ${scrolled ? "hover:text-white" : "hover:text-rose"}`}>CONTACT</Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/checkout" className={`relative flex items-center justify-center transition-transform hover:scale-110 ${scrolled ? "text-blush hover:text-white" : "text-maroon hover:text-rose"}`}>
            <ShoppingCart size={24} />
            <span className={`absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full text-[10px] font-bold shadow-sm transition-colors ${scrolled ? "bg-white text-maroon" : "bg-maroon text-white"}`}>
              {count}
            </span>
          </Link>

          <Link href="/checkout" className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:-translate-y-0.5 ${scrolled ? "bg-blush text-maroon hover:bg-white" : "bg-maroon text-blush hover:bg-rose hover:text-white"}`}>
            <Heart size={16} /> Custom Order
          </Link>
        </div>

        {/* Mobile Actions (Always visible cart + Menu Toggle) */}
        <div className="flex md:hidden items-center gap-5">
          {/* Always-visible Mobile Cart */}
          <Link href="/checkout" className={`relative flex items-center justify-center transition-transform hover:scale-110 ${scrolled ? "text-blush hover:text-white" : "text-maroon hover:text-rose"}`}>
            <ShoppingCart size={24} />
            <span className={`absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full text-[10px] font-bold shadow-sm transition-colors ${scrolled ? "bg-white text-maroon" : "bg-maroon text-white"}`}>
              {count}
            </span>
          </Link>

          {/* Hamburger Menu */}
          <button className={`transition-colors ${scrolled ? "text-blush" : "text-maroon"}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`absolute top-full left-0 right-0 bg-[#fffafa] border-b border-rose/20 md:hidden flex flex-col px-6 py-6 gap-4 transition-all duration-300 origin-top shadow-xl ${mobileMenuOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"}`}>
        <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-maroon text-lg font-medium hover:text-rose py-2">Home</Link>
        <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="text-maroon text-lg font-medium hover:text-rose py-2">Shop</Link>
        <Link href="/#contact" onClick={() => setMobileMenuOpen(false)} className="text-maroon text-lg font-medium hover:text-rose py-2">Contact</Link>
        
        <div className="mt-4">
          <Link href="/checkout" onClick={() => setMobileMenuOpen(false)} className="flex w-full items-center justify-center gap-2 bg-maroon text-blush px-5 py-4 rounded-2xl text-base font-bold shadow-md hover:bg-rose transition-colors">
            Custom Order <Heart size={18} />
          </Link>
        </div>
      </div>
    </header>
  );
}