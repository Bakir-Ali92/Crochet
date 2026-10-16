import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle, ShieldCheck } from "lucide-react";
// Import the new AddToCartWithQty component instead of AddToCart
import { AddToCartWithQty } from "@/components/cart"; 
import { products, priceLabel } from "@/lib/products";

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.id,
  }));
}

export const instant = false;

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const product = products.find((p) => p.id === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-[#fffafa] min-h-screen text-maroon font-sans pt-24 sm:pt-32 pb-20 px-6 sm:px-[8vw] lg:px-20">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Navigation */}
        <Link href="/shop" className="inline-flex items-center gap-2 text-maroon/60 hover:text-rose font-bold text-sm uppercase tracking-wider mb-8 sm:mb-12 transition-colors">
          <ArrowLeft size={16} /> Back to Shop
        </Link>

        {/* Product Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Product Image */}
          <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden bg-gray-100 shadow-xl border border-maroon/5">
            <Image 
              src={product.image} 
              alt={product.name} 
              fill 
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover" 
              priority
            />
          </div>

          {/* Right Column: Product Details */}
          <div className="flex flex-col pt-4 lg:pt-10">
            <span className="text-sm font-bold tracking-widest text-rose uppercase mb-4 block">
              Handmade Collection
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-maroon mb-4">
              {product.name}
            </h1>
            
            <span className="text-3xl font-bold text-maroon mb-8 block">
              {priceLabel(product)}
            </span>

            <div className="h-px w-full bg-maroon/10 mb-8"></div>

            <p className="text-lg text-maroon/80 font-medium leading-relaxed mb-10">
              {product.note}
            </p>

            {/* Feature List */}
            <ul className="space-y-4 mb-10 text-maroon/70 font-medium">
              <li className="flex items-center gap-3">
                <CheckCircle size={20} className="text-rose" /> 
                100% Handcrafted by Faiqa
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={20} className="text-rose" /> 
                Premium quality yarn
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle size={20} className="text-rose" /> 
                Made to order with custom sizing available
              </li>
            </ul>

            {/* Add to Cart Actions with Quantity */}
            <div className="mt-auto">
              {/* Using the new component here */}
              <AddToCartWithQty 
                id={product.id} 
                className="w-full py-4 bg-maroon text-blush rounded-xl hover:bg-rose hover:text-white transition-all text-lg font-bold shadow-lg hover:-translate-y-1 hover:shadow-rose/30" 
              />
              
              <div className="mt-6 flex items-center justify-center gap-2 text-sm font-bold text-maroon/50 uppercase tracking-wider">
                <ShieldCheck size={18} /> Secure Checkout
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}