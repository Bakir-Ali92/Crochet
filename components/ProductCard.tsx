"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { priceLabel } from "@/lib/products";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  note: string;
};

export default function ProductCard({ product, delay = 0 }: { product: Product; delay?: number }) {
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
    <article 
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out group flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-xl border border-maroon/5 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {/* Clickable Image */}
      <Link href={`/shop/${product.id}`} className="relative aspect-[4/5] w-full bg-gray-100 overflow-hidden block">
        <Image 
          src={product.image} 
          alt={product.name} 
          fill 
          sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw" 
          className="object-cover transition-transform duration-700 group-hover:scale-105" 
        />
      </Link>
      
      {/* Card Content */}
      <div className="p-3 sm:p-5 flex flex-col flex-grow">
        {/* Clickable Title */}
        <Link href={`/shop/${product.id}`} className="hover:text-rose transition-colors">
          <h3 className="text-sm sm:text-lg font-bold text-maroon leading-tight mb-1">
            {product.name}
          </h3>
        </Link>
        
        <span className="text-sm sm:text-lg font-bold text-rose mb-2 sm:mb-3">
          {priceLabel(product)}
        </span>
        
        <p className="text-[11px] sm:text-sm text-maroon/60 mb-4 sm:mb-6 flex-grow font-medium leading-relaxed line-clamp-2">
          {product.note}
        </p>
        
        {/* Single View Product Action */}
        <div className="mt-auto">
          <Link 
            href={`/shop/${product.id}`} 
            className="block w-full py-2.5 sm:py-3 bg-maroon text-white text-center rounded-xl hover:bg-rose transition-colors text-xs sm:text-sm font-bold shadow-sm"
          >
            View Product
          </Link>
        </div>
      </div>
    </article>
  );
}