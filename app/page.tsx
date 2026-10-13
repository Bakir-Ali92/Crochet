import Link from "next/link";
import { AddToCart } from "@/components/cart";
import { products, rs } from "@/lib/products";

const BRAND = "Loop & Knot";
const INSTAGRAM = "https://instagram.com/yourhandle";
const WHATSAPP = "923001234567"; // country code + number, no + or spaces

const steps = [
  { title: "Tell us what you want", text: "Use the order form: describe the piece, colours and the date you need it." },
  { title: "Approve the plan", text: "We confirm the price and send a yarn colour photo. Pay half to start." },
  { title: "We crochet", text: "Most pieces take 3 to 10 days. You get progress photos." },
  { title: "Delivery", text: "Pay the balance and we ship across Pakistan." },
];

export default function Home() {
  return (
    <>
      <main id="top">
        <section className="hero">
          <h1>Made one stitch at a time, for you.</h1>
          <p>Bags, toys and wearables crocheted by hand. Order something ready to ship or ask for your own colours.</p>
          <div className="actions">
            <a className="btn" href="#shop">See what&rsquo;s available</a>
            <Link className="btn ghost" href="/checkout">Order a custom piece</Link>
          </div>
          <div className="chain" aria-hidden="true" />
        </section>

        <section id="shop" className="section">
          <h2>Ready to ship</h2>
          <div className="grid">
            {products.map((p) => (
              <article key={p.id} className="card">
                <div className="swatch" style={{ background: p.color }} aria-hidden="true" />
                <h3>{p.name}</h3>
                <p className="note">{p.note}</p>
                <div className="row">
                  <strong>{rs(p.price)}</strong>
                  <AddToCart id={p.id} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="custom" className="section tint">
          <h2>How custom orders work</h2>
          <ol className="steps">
            {steps.map((s, i) => (
              <li key={s.title}>
                <span className="num">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="actions" style={{ marginTop: "2rem" }}>
            <Link className="btn" href="/checkout">Start a custom order</Link>
          </div>
        </section>

        <section id="about" className="section about">
          <h2>About {BRAND}</h2>
          <p>
            Every piece is crocheted by hand from soft, durable yarn and checked before it ships. Write a few
            lines here about who you are, how you started and what you love making.
          </p>
        </section>
      </main>

      <footer className="footer">
        <span>&copy; {new Date().getFullYear()} {BRAND}</span>
        <span>
          <a href={`https://wa.me/${WHATSAPP}`}>WhatsApp</a> &nbsp; <a href={INSTAGRAM}>Instagram</a>
        </span>
      </footer>
    </>
  );
}
