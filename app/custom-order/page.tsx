"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Sparkles, Palette, Ruler, Camera, Send, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "923001234567"; // Replace with your actual number
const pad = "px-6 sm:px-[8vw] lg:px-20";

// Reusable FadeIn Component
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

export default function CustomOrderPage() {
  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    itemType: "Sweater / Cardigan",
    colors: "",
    measurements: "",
    referenceLink: "",
    details: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Build the formatted WhatsApp message for a custom order
    let message = `*✨ New Custom Order Request* 🧶\n\n`;
    message += `*Customer Details:*\n`;
    message += `👤 Name: ${formData.name}\n`;
    message += `📱 Phone: ${formData.phone}\n\n`;
    
    message += `*Order Details:*\n`;
    message += `🧶 Item: ${formData.itemType}\n`;
    message += `🎨 Colors: ${formData.colors}\n`;
    message += `📏 Measurements/Size: ${formData.measurements}\n`;
    if (formData.referenceLink) {
      message += `🔗 Reference Image Link: ${formData.referenceLink}\n`;
    }
    message += `📝 Additional Notes:\n${formData.details}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    setTimeout(() => {
      setStatus("success");
      // Reset form
      setFormData({
        name: "", phone: "", itemType: "Sweater / Cardigan", colors: "", measurements: "", referenceLink: "", details: ""
      });
    }, 1000);
  };

  return (
    <div className="bg-[#fffafa] min-h-screen text-maroon font-sans selection:bg-rose selection:text-white pt-24 sm:pt-32 pb-20">
      
      {/* Page Header */}
      <section className={`mb-12 sm:mb-20 ${pad}`}>
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <span className="text-sm font-bold tracking-widest text-rose uppercase mb-4 flex items-center justify-center gap-2">
              <Sparkles size={16} fill="currentColor" /> Bring your vision to life
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-maroon mb-6">
              Request a Custom Piece
            </h1>
            <p className="text-base sm:text-lg text-maroon/70 font-medium leading-relaxed">
              Have a dream design in mind? Fill out the details below. We'll review your request and get back to you with a price quote and timeline.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main Layout */}
      <section className={`${pad}`}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: The Form */}
          <div className="lg:col-span-7">
            <FadeIn delay={100} className="bg-white p-6 sm:p-10 rounded-[2.5rem] shadow-xl border border-maroon/5">
              
              {status === "success" ? (
                <div className="bg-petal/30 border border-rose/20 rounded-2xl p-8 text-center my-10">
                  <div className="size-16 bg-white text-rose rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <MessageCircle size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-maroon mb-2">Request Sent to WhatsApp!</h3>
                  <p className="text-maroon/70 font-medium mb-6">Hit send in your WhatsApp app to deliver your custom request to us.</p>
                  <button 
                    onClick={() => setStatus("idle")}
                    className="text-sm font-bold text-rose hover:text-maroon transition-colors uppercase tracking-wider"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="text-2xl font-serif text-maroon mb-6">Your Details</h2>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-maroon/80 mb-2 pl-2">Name</label>
                      <input 
                        type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-petal/30 border border-maroon/10 rounded-xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-rose focus:bg-white transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-maroon/80 mb-2 pl-2">WhatsApp Number</label>
                      <input 
                        type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-petal/30 border border-maroon/10 rounded-xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-rose focus:bg-white transition-colors"
                        placeholder="e.g. 03001234567"
                      />
                    </div>
                  </div>

                  <div className="h-px w-full bg-maroon/10 my-8"></div>
                  <h2 className="text-2xl font-serif text-maroon mb-6">Design Details</h2>

                  <div>
                    <label className="block text-sm font-bold text-maroon/80 mb-2 pl-2">What are we making?</label>
                    <select 
                      value={formData.itemType} onChange={(e) => setFormData({...formData, itemType: e.target.value})}
                      className="w-full bg-petal/30 border border-maroon/10 rounded-xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-rose focus:bg-white transition-colors appearance-none"
                    >
                      <option value="Sweater / Cardigan">Sweater / Cardigan</option>
                      <option value="Bag / Tote">Bag / Tote</option>
                      <option value="Gloves / Mittens">Gloves / Mittens</option>
                      <option value="Amigurumi / Plushie">Amigurumi / Plushie</option>
                      <option value="Other">Other (Describe below)</option>
                    </select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-maroon/80 mb-2 pl-2 flex items-center gap-2">
                        <Palette size={16} /> Preferred Colors
                      </label>
                      <input 
                        type="text" required value={formData.colors} onChange={(e) => setFormData({...formData, colors: e.target.value})}
                        className="w-full bg-petal/30 border border-maroon/10 rounded-xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-rose focus:bg-white transition-colors"
                        placeholder="e.g. Sage green and cream"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-maroon/80 mb-2 pl-2 flex items-center gap-2">
                        <Ruler size={16} /> Size / Measurements
                      </label>
                      <input 
                        type="text" required value={formData.measurements} onChange={(e) => setFormData({...formData, measurements: e.target.value})}
                        className="w-full bg-petal/30 border border-maroon/10 rounded-xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-rose focus:bg-white transition-colors"
                        placeholder="e.g. Medium, or exact inches"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-maroon/80 mb-2 pl-2 flex items-center gap-2">
                      <Camera size={16} /> Reference Image Link (Optional)
                    </label>
                    <input 
                      type="url" value={formData.referenceLink} onChange={(e) => setFormData({...formData, referenceLink: e.target.value})}
                      className="w-full bg-petal/30 border border-maroon/10 rounded-xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-rose focus:bg-white transition-colors"
                      placeholder="Link to Pinterest, Instagram, or Google Image"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-maroon/80 mb-2 pl-2">Description & Notes</label>
                    <textarea 
                      required rows={4} value={formData.details} onChange={(e) => setFormData({...formData, details: e.target.value})}
                      className="w-full bg-petal/30 border border-maroon/10 rounded-xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-rose focus:bg-white transition-colors resize-none"
                      placeholder="Describe exactly how you want it to look, fit, and feel..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit" disabled={status === "loading"}
                    className="w-full py-4 mt-4 bg-maroon text-white rounded-xl hover:bg-rose transition-all font-bold shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {status === "loading" ? "Processing..." : (
                      <>Get Custom Quote via WhatsApp <Send size={18} /></>
                    )}
                  </button>
                </form>
              )}
            </FadeIn>
          </div>

          {/* Right Column: Information & Inspiration */}
          <div className="lg:col-span-5 space-y-8">
            <FadeIn delay={200}>
              <h3 className="text-2xl font-serif text-maroon mb-6">How it works</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="size-10 rounded-full bg-petal text-rose font-bold flex items-center justify-center shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-maroon mb-1">Submit your request</h4>
                    <p className="text-sm text-maroon/70 font-medium leading-relaxed">Fill out the form with your design ideas, colors, and sizes. The more details, the better!</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="size-10 rounded-full bg-petal text-rose font-bold flex items-center justify-center shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-maroon mb-1">We confirm & quote</h4>
                    <p className="text-sm text-maroon/70 font-medium leading-relaxed">We will review your request and reply on WhatsApp with a price and estimated timeline. Pay a 50% deposit to begin.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="size-10 rounded-full bg-petal text-rose font-bold flex items-center justify-center shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-maroon mb-1">Creation & Delivery</h4>
                    <p className="text-sm text-maroon/70 font-medium leading-relaxed">We'll crochet your piece and send progress updates. Pay the balance upon completion and we ship it to you!</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={300} className="relative aspect-square w-full rounded-[2.5rem] rounded-br-none overflow-hidden shadow-xl border-4 border-white mt-8">
              <Image 
                src="/sweater.jpg" // A great inspirational image
                alt="Custom Crochet Example" 
                fill 
                className="object-cover" 
              />
            </FadeIn>
          </div>

        </div>
      </section>
    </div>
  );
}