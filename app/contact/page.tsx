"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Phone, MapPin, Heart, Send, MessageCircle } from "lucide-react";

// Update this to your actual WhatsApp number
const WHATSAPP_NUMBER = "923001234567";
const INSTAGRAM = "https://instagram.com/yourhandle";

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

export default function ContactPage() {
  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState({
    name: "",
    inquiryType: "General Question",
    message: ""
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Build the formatted WhatsApp message
    let message = `*New Inquiry: ${formData.inquiryType}* 🧶\n\n`;
    message += `*From:* ${formData.name}\n\n`;
    message += `*Message:*\n${formData.message}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", inquiryType: "General Question", message: "" });
    }, 1000);
  };

  return (
    <div className="bg-[#fffafa] min-h-screen text-maroon font-sans selection:bg-rose selection:text-white">
      {/* 
        Note: Be sure to import and add your <Navbar /> here 
        if you have extracted it to a separate component! 
      */}

      <main className="pt-24 sm:pt-32 pb-20">
        
        {/* Page Header */}
        <section className="px-6 sm:px-[8vw] lg:px-20 mb-16 sm:mb-24">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <span className="text-sm font-bold tracking-widest text-rose uppercase mb-4 block flex items-center justify-center gap-2">
                <Heart size={14} fill="currentColor" /> We'd love to hear from you
              </span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif tracking-tight text-maroon mb-6">
                Get in Touch
              </h1>
              <p className="text-lg text-maroon/70 font-medium leading-relaxed max-w-2xl mx-auto">
                Whether you have a question about a custom order, need help with sizing, or just want to say hello, we are here for you.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Contact Layout */}
        <section className="px-4 sm:px-[8vw] lg:px-20">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Contact Form */}
            <div className="lg:col-span-7">
              <FadeIn delay={100} className="bg-white p-6 sm:p-10 rounded-[2.5rem] shadow-xl border border-maroon/5">
                <h2 className="text-3xl font-serif text-maroon mb-2">Send a Message</h2>
                <p className="text-maroon/60 font-medium mb-8">We usually reply within a few hours on WhatsApp.</p>

                {status === "success" ? (
                  <div className="bg-petal/30 border border-rose/20 rounded-2xl p-8 text-center">
                    <div className="size-16 bg-white text-rose rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <MessageCircle size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-maroon mb-2">Redirected to WhatsApp!</h3>
                    <p className="text-maroon/70 font-medium mb-6">Hit send in your WhatsApp app to deliver your message to us.</p>
                    <button 
                      onClick={() => setStatus("idle")}
                      className="text-sm font-bold text-rose hover:text-maroon transition-colors uppercase tracking-wider"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSendMessage} className="space-y-5">
                    
                    <div>
                      <label className="block text-sm font-bold text-maroon/80 mb-2 pl-2">Your Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-petal/30 border border-maroon/10 rounded-xl px-5 py-4 text-sm font-medium focus:outline-none focus:border-rose focus:bg-white transition-colors"
                        placeholder="Jane Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-maroon/80 mb-2 pl-2">What is this regarding?</label>
                      <select 
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({...formData, inquiryType: e.target.value})}
                        className="w-full bg-petal/30 border border-maroon/10 rounded-xl px-5 py-4 text-sm font-medium focus:outline-none focus:border-rose focus:bg-white transition-colors appearance-none"
                      >
                        <option value="Custom Order Inquiry">Custom Order Inquiry</option>
                        <option value="Question about a Product">Question about a Product</option>
                        <option value="Order Status">Order Status</option>
                        <option value="General Question">General Question</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-maroon/80 mb-2 pl-2">Your Message</label>
                      <textarea 
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-petal/30 border border-maroon/10 rounded-xl px-5 py-4 text-sm font-medium focus:outline-none focus:border-rose focus:bg-white transition-colors resize-none"
                        placeholder="Hi! I wanted to ask about..."
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={status === "loading"}
                      className="w-full py-4 mt-2 bg-maroon text-white rounded-xl hover:bg-rose transition-all font-bold shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {status === "loading" ? "Opening WhatsApp..." : (
                        <>Send via WhatsApp <Send size={18} /></>
                      )}
                    </button>
                  </form>
                )}
              </FadeIn>
            </div>

            {/* Right Column: Contact Info & Image */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Direct Contact Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <FadeIn delay={200} className="bg-petal/50 p-6 rounded-[2rem] flex items-center gap-5 border border-maroon/5">
                  <div className="size-14 bg-white text-rose rounded-full flex items-center justify-center shadow-sm shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-maroon/60 uppercase tracking-wider mb-1">WhatsApp</h3>
                    <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="text-lg font-bold text-maroon hover:text-rose transition-colors">
                      +{WHATSAPP_NUMBER}
                    </a>
                  </div>
                </FadeIn>

                <FadeIn delay={300} className="bg-petal/50 p-6 rounded-[2rem] flex items-center gap-5 border border-maroon/5">
                  <div className="size-14 bg-white text-rose rounded-full flex items-center justify-center shadow-sm shrink-0">
                    <Heart size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-maroon/60 uppercase tracking-wider mb-1">Instagram</h3>
                    <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-maroon hover:text-rose transition-colors">
                      @yarnberry
                    </a>
                  </div>
                </FadeIn>

                <FadeIn delay={400} className="bg-petal/50 p-6 rounded-[2rem] flex items-center gap-5 border border-maroon/5 sm:col-span-2 lg:col-span-1">
                  <div className="size-14 bg-white text-rose rounded-full flex items-center justify-center shadow-sm shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-maroon/60 uppercase tracking-wider mb-1">Studio Location</h3>
                    <p className="text-lg font-bold text-maroon">
                      Lahore, Pakistan
                    </p>
                  </div>
                </FadeIn>
              </div>

              {/* Decorative Image */}
              <FadeIn delay={500} className="relative aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-white hidden sm:block">
                <Image 
                  src="/mascot.jpg" // Or any cozy studio/crochet picture you have
                  alt="Yarnberry Studio" 
                  fill 
                  className="object-cover" 
                />
              </FadeIn>
            </div>

          </div>
        </section>

      </main>

      {/* 
        Note: Import and add your <Footer /> here 
      */}
    </div>
  );
}