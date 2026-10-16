import Image from "next/image";
import Link from "next/link";

const pad = "px-6 sm:px-[8vw] lg:px-20";
const BRAND = "Yarnberry";
const YEAR = 2026;
const INSTAGRAM = "https://instagram.com/yourhandle";
const WHATSAPP = "923001234567";

export default function Footer() {
    return(
        <footer className={`bg-maroon text-blush rounded-t-[3rem] mx-3 sm:mx-6 mt-12 pt-16 pb-8 ${pad} shadow-inner-top`}>
        <div className="max-w-7xl mx-auto">
          
          {/* Main Footer Content */}
          {/* Changed to grid-cols-2 for mobile side-by-side layout */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 lg:gap-8 mb-16">
            
            {/* Column 1: Brand Info (Spans 2 columns on mobile & desktop) */}
            <div className="col-span-2 flex flex-col items-start lg:pr-12">
              <Link href="/" className="flex items-center gap-3 mb-6 group">
                <div className="relative size-12 bg-petal rounded-full border-2 border-blush/30 overflow-hidden group-hover:border-blush transition-colors">
                   <Image src="/logo.jpg" alt={`${BRAND} Logo`} fill className="object-cover" />
                </div>
                <span className="font-serif text-2xl tracking-tight font-bold">{BRAND}</span>
              </Link>
              <p className="text-blush/70 text-sm leading-relaxed font-medium max-w-md">
                Bespoke crochet wearables and accessories, handcrafted with love and meticulous attention to detail in Lahore, Pakistan.
              </p>
            </div>

            {/* Column 2: Quick Links (Takes 1 column on mobile) */}
            <div className="col-span-1">
              <h4 className="text-lg font-serif font-bold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-4 text-sm font-medium text-blush/80">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="#shop" className="hover:text-white transition-colors">Shop</Link></li>
                <li><Link href="#contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Column 3: Connect (Takes 1 column on mobile) */}
            <div className="col-span-1">
              <h4 className="text-lg font-serif font-bold mb-6 text-white">Connect</h4>
              <ul className="space-y-4 text-sm font-medium text-blush/80">
                <li>
                  <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar: Copyright Only */}
          <div className="pt-8 border-t border-blush/10 flex items-center justify-center text-center text-xs font-medium text-blush/50">
            <p>&copy; {YEAR} {BRAND}. All rights reserved.</p>
          </div>

        </div>
      </footer>
    )
}