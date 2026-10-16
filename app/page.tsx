"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowRight, ShoppingBag, Heart, ShoppingCart, Mail, Phone, MapPin } from "lucide-react";
import { AddToCart } from "@/components/cart";
import { products, priceLabel } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
const BRAND = "Yarnberry";
const YEAR = 2026;
const INSTAGRAM = "https://instagram.com/yourhandle";
const WHATSAPP = "923001234567";

const services = [
  { name: "Alphabet keychains", price: "Rs 100 to 200 each" },
  { name: "Crocheted flowers", price: "Rs 80 to 100 each" },
  { name: "Fruit charms and face scribblies", price: "Rs 200 to 600" },
  { name: "Gloves and mittens", price: "Rs 400 to 600" },
  { name: "Socks and shoes", price: "Rs 400 to 600" },
  { name: "Shirts and high-necks", price: "Depends on pattern and size" },
  { name: "Sweaters and cardigans", price: "Depends on pattern and size" },
  { name: "Frocks and skirts", price: "Depends on pattern and size" },
  { name: "Bags and totes", price: "Depends on pattern and size" },
];

const steps = [
  { title: "Send your idea", text: "Share a reference photo, your colours and measurements in the order form." },
  { title: "Approve the plan", text: "We confirm the price and timeline. Pay half to start." },
  { title: "We crochet", text: "You get progress photos while your piece is made." },
  { title: "Delivery", text: "Pay the balance and we ship across Pakistan." },
];

const pad = "px-6 sm:px-[8vw] lg:px-20";

// Native FadeIn Reveal (No Framer Motion)
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



export default function Home() {
  return (
    <div className="bg-[#fffafa] min-h-screen text-maroon font-sans selection:bg-rose selection:text-white overflow-x-hidden">
      
      
      <main>
        {/* Professional & Joyful Hero */}
{/* Full-width Background Image Hero Section */}
        <section className="relative min-h-[90vh] flex items-center pt-32 overflow-hidden">
          
          {/* Background Image & Overlays - HIDDEN ON MOBILE */}
          {/* Added 'hidden sm:block' so the image only appears on tablets and desktops */}
          <div className="absolute inset-0 z-0 hidden sm:block">
            <Image 
              src="/hero-bg.jpeg" 
              alt="Handmade crochet background"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Soft gradient fade: Solid off-white on the left fading to transparent on the right */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#fffafa] via-[#fffafa]/90 to-transparent z-10" />
            {/* Optional subtle color wash to tie the image into your brand colors */}
            <div className="absolute inset-0 bg-maroon/5 z-10 mix-blend-multiply" />
          </div>

          <div className={`w-full relative z-20 ${pad}`}>
            <div className="max-w-7xl mx-auto">
              <div className="max-w-2xl">
                <FadeIn className="space-y-8">
                  
                  {/* Glowing Badge */}
                  <div className="inline-flex items-center gap-2 bg-white/80 sm:bg-white/80 backdrop-blur-md border border-rose/20 text-rose font-bold px-5 py-2 rounded-full text-xs tracking-wider uppercase shadow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-rose"></span>
                    </span>
                    Handmade in Pakistan
                  </div>
                  
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif tracking-tight leading-[1.1] text-maroon drop-shadow-sm">
                    Handcrafted <br />
                    <span className="text-rose font-normal italic relative inline-block mt-2">
                      just for you.
                    </span>
                  </h1>

                  <p className="text-lg lg:text-xl text-maroon/80 leading-relaxed font-medium max-w-xl">
                    Bespoke gloves, bags, and accessories crocheted by Faiqa in Lahore, using the exact colors and measurements you choose.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <a 
                      href="#shop" 
                      className="group bg-maroon text-blush px-8 py-4 rounded-full text-sm font-bold hover:bg-rose hover:text-white transition-all duration-300 flex items-center justify-center gap-2.5 shadow-xl hover:-translate-y-1 hover:shadow-rose/30"
                    >
                      <span>Shop Collection</span>
                      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </a>
                    <Link 
                      href="#contact" 
                      className="bg-white sm:bg-white/60 sm:backdrop-blur-md text-maroon border-2 border-maroon/20 px-8 py-4 rounded-full text-sm font-bold hover:border-maroon hover:bg-petal transition-all duration-300 text-center flex items-center justify-center shadow-lg hover:-translate-y-1"
                    >
                      Contact Us
                    </Link>
                  </div>


                  
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

{/* Professional, Compact Shop Grid */}
        <section id="shop" className={`py-24 bg-petal rounded-[3rem] mx-3 sm:mx-6 shadow-sm ${pad}`}>
          <div className="max-w-7xl mx-auto">
            
            {/* Centered, Professional Heading */}
            <FadeIn className="flex flex-col items-center text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-serif tracking-tight text-maroon mb-4">
                Our Collection
              </h2>
              <p className="text-maroon/70 font-medium max-w-xl">
                Explore our handcrafted ready-to-ship pieces, made with premium yarn and meticulous attention to detail.
              </p>
            </FadeIn>
            
            {/* Compact Product Grid - 2 Columns on Mobile */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              
              {/* Loop through products using the reusable ProductCard component */}
              {products.map((p, i) => (
                <ProductCard key={p.id} product={p} delay={i * 50} />
              ))}

              {/* Custom Design Card */}
              <FadeIn delay={300} className="col-span-2 md:col-span-1 flex flex-col justify-center rounded-2xl bg-maroon p-6 sm:p-8 text-white shadow-lg relative overflow-hidden group min-h-[350px] w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-rose/20 to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-70"></div>
                <div className="relative z-10 flex flex-col h-full items-center text-center justify-center">
                  <ShoppingBag size={32} className="mb-4 text-rose" />
                  <h3 className="text-2xl font-serif mb-3 leading-tight">Your own <br/>custom design</h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-6 font-medium">
                    Send a reference photo, colours, and measurements for a custom quote.
                  </p>
                  <Link href="/checkout" className="inline-flex items-center justify-center w-full gap-2 bg-white text-maroon py-3 rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-rose hover:text-white transition-all shadow-md mt-auto">
                    Request Quote
                  </Link>
                </div>
              </FadeIn>
              
            </div>
          </div>
        </section>

        {/* Pricing & Steps */}
        <section className={`py-32 ${pad}`}>
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7">
              <FadeIn>
                <h2 className="text-4xl lg:text-5xl font-serif tracking-tight mb-4 text-maroon">What we crochet</h2>
                <p className="text-maroon/70 mb-12 max-w-md leading-relaxed font-medium">
                  Everything is completely customisable. Send your reference designs, colour choices and measurements.
                </p>
              </FadeIn>
              <div className="flex flex-col bg-white p-8 rounded-[2rem] shadow-sm border border-rose/10">
                {services.map((s, i) => (
                  <FadeIn key={s.name} delay={i * 50} className="flex items-center justify-between py-5 border-b border-rose/10 group last:border-0">
                    <dt className="text-lg font-medium text-maroon group-hover:text-rose transition-colors">{s.name}</dt>
                    <dd className="text-sm text-maroon/60 font-bold bg-petal px-3 py-1 rounded-lg">{s.price}</dd>
                  </FadeIn>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 lg:pl-10">
              <FadeIn>
                <h3 className="text-3xl font-serif mb-10 text-maroon">How it works</h3>
              </FadeIn>
              <div className="space-y-10">
                {steps.map((s, i) => (
                  <FadeIn key={s.title} delay={i * 100} className="relative pl-16 group">
                    <span className="absolute left-0 top-0 size-10 bg-petal text-rose rounded-full flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-maroon group-hover:text-blush transition-colors">
                      {i + 1}
                    </span>
                    <h4 className="text-xl font-bold mb-2 text-maroon">{s.title}</h4>
                    <p className="text-maroon/70 text-base leading-relaxed font-medium">{s.text}</p>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* New Contact Section */}
        <section id="contact" className={`py-24 bg-petal rounded-[3rem] mx-3 sm:mx-6 mb-12 shadow-sm ${pad}`}>
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-6xl font-serif tracking-tight text-maroon mb-4">Get in Touch</h2>
                <p className="text-lg text-maroon/80 font-medium">Have a special request or a question about an order? Reach out to us.</p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-8">
              <FadeIn delay={100} className="bg-white p-8 rounded-[2rem] flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="size-14 bg-petal rounded-full flex items-center justify-center mb-6 text-rose">
                  <Phone size={24} />
                </div>
                <h3 className="text-xl font-bold text-maroon mb-2">WhatsApp</h3>
                <p className="text-maroon/70 font-medium mb-4">Message us for quick replies.</p>
                <a href={`https://wa.me/${WHATSAPP}`} className="text-rose font-bold hover:text-maroon transition-colors">+{WHATSAPP}</a>
              </FadeIn>

              <FadeIn delay={200} className="bg-white p-8 rounded-[2rem] flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow border-2 border-rose/10">
                <div className="size-14 bg-maroon rounded-full flex items-center justify-center mb-6 text-blush shadow-md">
                  <Heart size={24} />
                </div>
                <h3 className="text-xl font-bold text-maroon mb-2">Instagram</h3>
                <p className="text-maroon/70 font-medium mb-4">Follow us for behind the scenes.</p>
                <a href={INSTAGRAM} className="text-rose font-bold hover:text-maroon transition-colors">@yourhandle</a>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}