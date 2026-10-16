"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Heart, ShoppingCart, ShoppingBag, ArrowRight } from "lucide-react";
import { AddToCart } from "@/components/cart";
import { products, priceLabel } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

const pad = "px-6 sm:px-[8vw] lg:px-20";

// --- REUSABLE COMPONENTS ---
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// --- SHOP PAGE CONTENT ---
export default function Shop() {
  return (
    <div className="bg-[#fffafa] min-h-screen text-maroon font-sans selection:bg-rose selection:text-white overflow-x-hidden">
      
      
<main>
        {/* Shop Page Header */}
        <section className={`pt-40 pb-20 bg-petal rounded-b-[3rem] mx-3 sm:mx-6 shadow-sm mb-12 sm:mb-16 ${pad}`}>
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif tracking-tight text-maroon mb-6">
                Our Collection
              </h1>
              <p className="text-base sm:text-lg text-maroon/70 font-medium leading-relaxed max-w-2xl mx-auto">
                Explore our complete range of handcrafted, ready-to-ship pieces. From cozy baby wear to statement accessories, every item is made with love.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Full Shop Grid - 2 Columns on Mobile */}
        <section className={`py-12 ${pad}`}>
          <div className="max-w-7xl mx-auto">
           
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {products.map((p, i) => (
                    <ProductCard key={p.id} product={p} delay={(i % 4) * 100} />
                        ))}
                </div>
            
          </div>
        </section>

        {/* Custom Order Banner */}
        <section className={`py-12 sm:py-20 ${pad}`}>
          <FadeIn className="max-w-7xl mx-auto bg-maroon rounded-[2.5rem] p-8 sm:p-16 text-center text-blush shadow-xl relative overflow-hidden">
            {/* Decorative background blurs */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-rose/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-petal/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              <ShoppingBag size={40} className="mb-4 sm:mb-6 text-rose sm:w-12 sm:h-12" />
              <h2 className="text-3xl sm:text-5xl font-serif mb-4 sm:mb-6 leading-tight">Don't see what you're looking for?</h2>
              <p className="text-blush/80 text-sm sm:text-lg leading-relaxed mb-8 sm:mb-10 font-medium">
                We specialize in custom creations! Send us a reference photo, your preferred colours, and measurements, and we'll bring your vision to life.
              </p>
              <Link href="/checkout" className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-blush text-maroon px-8 sm:px-10 py-3 sm:py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-white transition-all shadow-md hover:-translate-y-1">
                Start a Custom Order <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
        </section>
      </main>


    </div>
  );
}