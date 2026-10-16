export type Product = { id: string; name: string; price: number; from?: boolean; note: string; image: string };

// Prices are in rupees. Edit freely. "from" shows "From Rs ..." and the final price is confirmed with the customer.
export const products: Product[] = [
  { id: "spider-gloves", name: "Spider web gloves", price: 400, note: "Fingerless, one pair, in any colour you choose", image: "/gloves.jpg" },
  { id: "alphabet-keychain", name: "Alphabet keychain", price: 100, from: true, note: "Any letter in your colours. Rs 100 to 200 by size", image: "/keychains.jpg" },
  { id: "bucket-bag-set", name: "Bucket bag and scarf set", price: 3500, note: "Ruffled drawstring bag with a matching scarf", image: "/bag.jpg" },
  { id: "daisy-baby-set", name: "Daisy baby set", price: 6500, note: "Jumper and trousers, made to your size", image: "/sweater.jpg" },
];

export const rs = (n: number) => "Rs " + n.toLocaleString("en-PK");
export const priceLabel = (p: Product) => (p.from ? "From " : "") + rs(p.price);
