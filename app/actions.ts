"use server";
import { products, rs } from "@/lib/products";

export type OrderState =
  | null
  | { ok: false; error: string }
  | { ok: true; ref: string; total: number; name: string };

export async function placeOrder(_prev: OrderState, form: FormData): Promise<OrderState> {
  const get = (k: string) => String(form.get(k) ?? "").trim().slice(0, 1000);
  const name = get("name"), phone = get("phone"), city = get("city"), address = get("address");
  const needBy = get("needBy"), payment = get("payment"), notes = get("notes"), custom = get("custom");

  let raw: { id: string; qty: number }[] = [];
  try { raw = JSON.parse(get("cart") || "[]"); } catch {}

  // Prices are recalculated here so the browser can never set its own price.
  const lines = raw
    .map((l) => ({ p: products.find((p) => p.id === l.id), qty: Math.min(Math.max(Math.floor(Number(l.qty)), 1), 20) }))
    .filter((l): l is { p: (typeof products)[number]; qty: number } => !!l.p);

  if (name.length < 2) return { ok: false, error: "Please enter your name." };
  if (!/^[+\d][\d\s-]{8,16}$/.test(phone)) return { ok: false, error: "Enter a valid phone number, e.g. 0300 1234567." };
  if (city.length < 2 || address.length < 6) return { ok: false, error: "Please enter your city and full delivery address." };
  if (!lines.length && custom.length < 10) return { ok: false, error: "Add an item to your cart or describe your custom piece." };

  const total = lines.reduce((n, l) => n + l.p.price * l.qty, 0);
  const ref = "LK-" + Date.now().toString(36).toUpperCase().slice(-6);

  const text = [
    `New order ${ref}`,
    `Customer: ${name} | ${phone}`,
    `Deliver to: ${address}, ${city}`,
    `Needed by: ${needBy || "no date given"} | Payment: ${payment}`,
    "",
    ...lines.map((l) => `${l.qty} x ${l.p.name} = ${rs(l.p.price * l.qty)}`),
    lines.length ? `Total: ${rs(total)} (plus delivery)` : "",
    custom ? `\nCustom request: ${custom}` : "",
    notes ? `Notes: ${notes}` : "",
  ].join("\n");

  // Sends an email to the shop owner. Without RESEND_API_KEY the order is only logged on the server.
  const key = process.env.RESEND_API_KEY, to = process.env.ORDER_EMAIL_TO;
  if (key && to) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: "Orders <onboarding@resend.dev>", to: [to], subject: `Order ${ref} from ${name}`, text }),
    });
    if (!res.ok) return { ok: false, error: "We couldn't send your order. Please try again or message us on WhatsApp." };
  } else {
    console.log(text);
  }
  return { ok: true, ref, total, name };
}
