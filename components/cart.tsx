"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { products } from "@/lib/products";
import { btnSm } from "@/lib/ui";
import { Plus, Minus } from "lucide-react";

type Line = { id: string; qty: number };
type Ctx = {
  lines: Line[]; count: number; total: number;
  add: (id: string) => void; setQty: (id: string, qty: number) => void; clear: () => void;
};

const CartCtx = createContext<Ctx | null>(null);

export const useCart = () => {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cart");
      if (saved) setLines(JSON.parse(saved));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem("cart", JSON.stringify(lines)); } catch {}
  }, [lines, ready]);

  const add = (id: string) =>
    setLines((l) => (l.some((x) => x.id === id) ? l.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x)) : [...l, { id, qty: 1 }]));
  const setQty = (id: string, qty: number) =>
    setLines((l) => (qty <= 0 ? l.filter((x) => x.id !== id) : l.map((x) => (x.id === id ? { ...x, qty: Math.min(qty, 20) } : x))));
  const clear = () => setLines([]);

  const count = lines.reduce((n, l) => n + l.qty, 0);
  const total = lines.reduce((n, l) => n + l.qty * (products.find((p) => p.id === l.id)?.price ?? 0), 0);
  
  return <CartCtx.Provider value={{ lines, count, total, add, setQty, clear }}>{children}</CartCtx.Provider>;
}

// ✅ Updated to accept the new className prop
export function AddToCart({ id, className = "" }: { id: string; className?: string }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  
  return (
    <button
      className={`${btnSm} ${className}`.trim()}
      onClick={() => { add(id); setAdded(true); setTimeout(() => setAdded(false), 1200); }}
    >
      {added ? "Added" : "Add to cart"}
    </button>
  );
}

export function CartLink() {
  const { count } = useCart();
  return (
    <Link href="/checkout" className="flex items-center gap-1.5 font-semibold">
      Cart
      <span className="grid h-6 min-w-6 place-items-center rounded-full bg-rose px-1.5 text-sm">{count}</span>
    </Link>
  );
}

export function AddToCartWithQty({ id, className = "" }: { id: string; className?: string }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    // Loop to add the correct quantity
    for (let i = 0; i < qty; i++) {
      add(id);
    }
    setAdded(true);
    // Increased timeout to 2000ms (2 seconds) so it stays visible a bit longer
    setTimeout(() => setAdded(false), 2000); 
    setQty(1); // Reset back to 1 after adding
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Quantity Selector */}
      <div className="flex items-center justify-between bg-white border-2 border-maroon/10 rounded-xl px-4 py-2 sm:w-1/3">
        <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-1 text-maroon/60 hover:text-rose transition-colors">
          <Minus size={20} />
        </button>
        <span className="font-bold text-xl text-maroon">{qty}</span>
        <button onClick={() => setQty(Math.min(20, qty + 1))} className="p-1 text-maroon/60 hover:text-rose transition-colors">
          <Plus size={20} />
        </button>
      </div>
      
      {/* Add to Cart Button */}
      <button
        onClick={handleAdd}
        disabled={added} // Optional: prevents clicking multiple times while showing "Product added"
        className={`sm:w-2/3 ${className} ${added ? "bg-rose border-rose" : ""}`.trim()}
      >
        {added ? "Product added" : "Add to cart"}
      </button>
    </div>
  );
}