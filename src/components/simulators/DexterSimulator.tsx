import React, { useState } from 'react';
import { ShoppingBag, ExternalLink, Check, Filter, Sparkles } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  size: string[];
  tag: string;
}

const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Italian Linen Structured Blazer', category: 'Blazers', price: 129, size: ['38R', '40R', '42R'], tag: 'Trending' },
  { id: 'p2', name: 'Slim-Fit Oxford Cotton Shirt', category: 'Shirts', price: 49, size: ['S', 'M', 'L', 'XL'], tag: 'Bestseller' },
  { id: 'p3', name: 'Japanese Selvedge Raw Denim', category: 'Denim', price: 89, size: ['30', '32', '34'], tag: 'New Arrival' },
  { id: 'p4', name: 'Merino Wool Crewneck Sweater', category: 'Knitwear', price: 79, size: ['M', 'L', 'XL'], tag: 'Winter Edit' },
];

export const DexterSimulator: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [selectedSize, setSelectedSize] = useState<string>(PRODUCTS[0].size[0]);
  const [cartCount, setCartCount] = useState<number>(1);
  const [justAdded, setJustAdded] = useState<boolean>(false);

  const filtered = selectedCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === selectedCategory);

  const handleAddToCart = () => {
    setCartCount((c) => c + 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <div className="p-4 sm:p-5 bg-[#090b12] rounded-2xl border border-zinc-800 space-y-4">
      {/* Top Bar with Live App Link */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="font-bold text-white tracking-wide">DEXTER MEN'S WEAR</span>
          <span className="text-[10px] text-zinc-400 font-mono">REACT JS + VERCEL</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-xs">
            <ShoppingBag className="w-3.5 h-3.5 text-blue-400" />
            <span>Cart: {cartCount}</span>
          </div>

          <a
            href="https://dexter-style-elevation.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600/90 hover:bg-blue-500 text-white font-medium text-[11px] transition-colors cursor-pointer"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto text-[11px]">
        {['All', 'Blazers', 'Shirts', 'Denim', 'Knitwear'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-zinc-800 text-blue-400 font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Interactive Product Details Showcase */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-[#0e111d] p-3.5 rounded-xl border border-zinc-800/80">
        {/* Product Visual Mock */}
        <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950 p-4 flex flex-col justify-between border border-zinc-700/60 relative overflow-hidden">
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 z-10">
            <span className="px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-500/30">
              {selectedProduct.tag}
            </span>
            <span>REST API v2</span>
          </div>

          <div className="my-auto text-center z-10">
            <div className="text-3xl font-extrabold text-white tracking-tight">
              ${selectedProduct.price}
            </div>
            <div className="text-xs text-zinc-300 font-medium mt-1">
              {selectedProduct.name}
            </div>
          </div>

          <div className="text-[10px] font-mono text-zinc-400 z-10 flex justify-between">
            <span>Size: {selectedSize}</span>
            <span className="text-emerald-400">In Stock</span>
          </div>

          {/* Background decorative glow */}
          <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-blue-500/10 blur-xl rounded-full pointer-events-none" />
        </div>

        {/* Product Interactive Controls */}
        <div className="space-y-3">
          <div>
            <div className="text-[11px] text-zinc-400 font-mono">SELECTED SKU:</div>
            <div className="text-sm font-bold text-white">{selectedProduct.name}</div>
            <div className="text-xs text-blue-400 font-mono mt-0.5">${selectedProduct.price}.00 USD</div>
          </div>

          {/* Size Selectors */}
          <div className="space-y-1">
            <div className="text-[10px] text-zinc-400 font-mono">SELECT SIZE:</div>
            <div className="flex items-center gap-1.5">
              {selectedProduct.size.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-2 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
                    selectedSize === sz
                      ? 'bg-blue-600 text-white font-bold ring-1 ring-blue-400'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-blue-600 hover:bg-blue-500 text-white active:scale-95'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to React State Cart!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Bag (Instant State)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Other Products Mini Picker */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
        {filtered.map((prod) => (
          <button
            key={prod.id}
            onClick={() => {
              setSelectedProduct(prod);
              setSelectedSize(prod.size[0]);
            }}
            className={`p-2 rounded-lg text-left border transition-all cursor-pointer ${
              selectedProduct.id === prod.id
                ? 'bg-blue-950/40 border-blue-500/80 ring-1 ring-blue-500/30'
                : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <div className="text-[11px] font-bold text-zinc-200 truncate">{prod.name}</div>
            <div className="text-[10px] text-zinc-400 font-mono mt-0.5">${prod.price}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
