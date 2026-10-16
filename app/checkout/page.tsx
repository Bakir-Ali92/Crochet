"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Trash2, Plus, Minus, ShieldCheck, Banknote } from "lucide-react";
import { useCart } from "@/components/cart";
import { products, priceLabel } from "@/lib/products";

// Add your WhatsApp number here (Country code + number, no plus or spaces)
const WHATSAPP_NUMBER = "923361465057"; 

export default function CheckoutPage() {
  const { lines, setQty, total, clear } = useCart();
  const [status, setStatus] = useState("idle");
  
  // State to hold the form inputs
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    address: ""
  });

  // Calculate dynamic totals
  const shippingCost = total > 0 ? 200 : 0;
  const finalTotal = total + shippingCost;

  // Match the IDs in the cart to the actual product details
  const cartItems = lines.map((line) => {
    const product = products.find((p) => p.id === line.id);
    return { ...line, product };
  }).filter((item) => item.product !== undefined); 

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    // 1. Build the beautifully formatted WhatsApp message
    let message = `*New Order (Cash on Delivery)* 🧶\n\n`;
    
    message += `*Customer Details:*\n`;
    message += `👤 Name: ${formData.name}\n`;
    message += `📱 Phone: ${formData.phone}\n`;
    message += `🏙️ City: ${formData.city}\n`;
    message += `📍 Address: ${formData.address}\n\n`;
    
    message += `*Order Summary:*\n`;
    cartItems.forEach(({ qty, product }) => {
      message += `▪️ ${qty}x ${product!.name} - Rs ${(product!.price * qty).toLocaleString()}\n`;
    });
    
    message += `\n*Subtotal:* Rs ${total.toLocaleString()}`;
    message += `\n*Shipping:* Rs ${shippingCost}`;
    message += `\n*Total Due:* Rs ${finalTotal.toLocaleString()}`;

    // 2. Encode the message for a URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // 3. Open WhatsApp in a new tab/window
    window.open(whatsappUrl, "_blank");

    // 4. Clear the cart and show success screen
    setTimeout(() => {
      clear(); 
      setStatus("success");
    }, 1000);
  };

  if (status === "success") {
    return (
      <div className="min-h-screen bg-[#fffafa] flex flex-col items-center justify-center p-6 text-center">
        <div className="size-20 bg-petal text-rose rounded-full flex items-center justify-center mb-6">
          <ShieldCheck size={40} />
        </div>
        <h1 className="text-4xl font-serif text-maroon mb-4">Order Sent!</h1>
        <p className="text-maroon/70 mb-8 max-w-md">
          Thank you! You should have been redirected to WhatsApp to send us your order details. We will reply shortly to confirm.
        </p>
        <Link href="/shop" className="bg-maroon text-white px-8 py-3 rounded-full font-bold hover:bg-rose transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fffafa] min-h-screen text-maroon font-sans pt-24 sm:pt-32 pb-20 px-4 sm:px-[8vw] lg:px-20">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl lg:text-5xl font-serif tracking-tight text-maroon mb-8 sm:mb-12">
          Your Cart
        </h1>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Cart Items */}
          <div className="lg:col-span-7 space-y-6">
            {cartItems.length === 0 ? (
              <div className="bg-white p-8 sm:p-10 rounded-3xl text-center shadow-sm border border-maroon/5">
                <p className="text-maroon/60 font-medium mb-6">Your cart is currently empty.</p>
                <Link href="/shop" className="inline-flex bg-maroon text-white px-8 py-3 rounded-full font-bold hover:bg-rose transition-colors">
                  Browse Collection
                </Link>
              </div>
            ) : (
              cartItems.map(({ id, qty, product }) => (
                <div key={id} className="flex gap-4 sm:gap-6 bg-white p-4 rounded-3xl shadow-sm border border-maroon/5 items-center">
                  
                  {/* Product Image */}
                  <div className="relative size-24 sm:size-32 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image src={product!.image} alt={product!.name} fill className="object-cover" />
                  </div>
                  
                  {/* Product Info & Controls */}
                  <div className="flex flex-col flex-grow py-1 sm:py-2">
                    <div className="flex justify-between items-start mb-1 sm:mb-2">
                      <h3 className="text-sm sm:text-lg font-bold text-maroon leading-tight pr-2">{product!.name}</h3>
                      <button onClick={() => setQty(id, 0)} className="text-maroon/40 hover:text-rose transition-colors p-1 flex-shrink-0">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <span className="text-sm sm:text-base text-rose font-bold mb-auto">{priceLabel(product!)}</span>
                    
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3 sm:gap-4 mt-3 sm:mt-4 bg-petal w-fit rounded-full px-2 py-1">
                      <button onClick={() => setQty(id, qty - 1)} className="p-1 text-maroon hover:text-rose transition-colors">
                        <Minus size={14} className="sm:w-4 sm:h-4" />
                      </button>
                      <span className="font-bold text-xs sm:text-sm w-4 text-center">{qty}</span>
                      <button onClick={() => setQty(id, qty + 1)} className="p-1 text-maroon hover:text-rose transition-colors">
                        <Plus size={14} className="sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Column: Checkout Form */}
          <div className="lg:col-span-5">
            <div className="bg-white p-5 sm:p-8 rounded-[2rem] shadow-xl border border-maroon/5 sticky top-32">
              <h2 className="text-2xl font-serif mb-6 text-maroon">Order Summary</h2>
              
              {/* Highlighted Pricing Block */}
              <div className="bg-petal/30 p-5 rounded-2xl border border-maroon/10 mb-8">
                <div className="flex justify-between items-center mb-3 text-maroon/80 font-medium text-sm sm:text-base">
                  <span>Subtotal ({lines.reduce((n, l) => n + l.qty, 0)} items)</span>
                  <span>Rs {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-4 text-maroon/80 font-medium text-sm sm:text-base">
                  <span>Shipping</span>
                  <span className="font-medium text-maroon">Rs {shippingCost}</span>
                </div>
                
                <div className="h-px w-full bg-maroon/10 mb-4"></div>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-maroon">Total</span>
                  <span className="text-xl sm:text-2xl font-bold text-rose">Rs {finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <form onSubmit={handleCheckout} className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-petal/50 border border-maroon/10 rounded-xl px-4 py-3 sm:py-4 text-sm font-medium focus:outline-none focus:border-rose focus:bg-white transition-colors"
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number (e.g. 03001234567)" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-petal/50 border border-maroon/10 rounded-xl px-4 py-3 sm:py-4 text-sm font-medium focus:outline-none focus:border-rose focus:bg-white transition-colors"
                />
                <input 
                  type="text" 
                  placeholder="City" 
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="w-full bg-petal/50 border border-maroon/10 rounded-xl px-4 py-3 sm:py-4 text-sm font-medium focus:outline-none focus:border-rose focus:bg-white transition-colors"
                />
                <textarea 
                  placeholder="Complete Delivery Address" 
                  rows={3}
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full bg-petal/50 border border-maroon/10 rounded-xl px-4 py-3 sm:py-4 text-sm font-medium focus:outline-none focus:border-rose focus:bg-white transition-colors resize-none"
                ></textarea>
                
                {/* Explicit COD Selection Block */}
                <div className="bg-petal/30 border border-maroon/10 rounded-xl p-4 flex items-start gap-3 mt-4">
                  <Banknote size={20} className="text-rose shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-maroon/80 font-medium">
                    <strong className="text-maroon block mb-1">Cash on Delivery (COD)</strong>
                    You will pay the total amount in cash when the order arrives at your doorstep.
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={cartItems.length === 0 || status === "loading"}
                  className="w-full py-4 mt-6 bg-maroon text-white rounded-xl hover:bg-rose transition-all font-bold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Processing..." : `Place Order • Rs ${finalTotal.toLocaleString()}`}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}