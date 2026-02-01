"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { searchProducts } from "@/lib/data";
import type { Product } from "@/types";

interface SearchBarProps {
  onClose: () => void;
}

export function SearchBar({ onClose }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const router = useRouter();

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    setSearched(true);
    try {
      const data = await searchProducts(q);
      setResults(data);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-start justify-center pt-20 px-4">
      <div className="bg-white  shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        <form onSubmit={handleSubmit} className="p-4 border-b flex gap-2">
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              doSearch(e.target.value);
            }}
            placeholder="Search products..."
            className="flex-1 px-4 py-3 border border-stone-300  focus:ring-2 focus:ring-accent focus:border-transparent"
            autoFocus
          />
          <button type="submit" className="px-4 py-3 bg-gold text-primary  hover:bg-gold-light font-medium">
            Search
          </button>
          <button type="button" onClick={onClose} className="px-4 py-3 text-stone-600 hover:bg-stone-100 ">
            Close
          </button>
        </form>
        <div className="overflow-auto flex-1 p-4">
          {loading && <p className="text-stone-500">Searching...</p>}
          {!loading && searched && query.trim() && (
            <>
              {results.length === 0 ? (
                <p className="text-stone-500">No products found. Try a different search.</p>
              ) : (
                <ul className="space-y-2">
                  {results.slice(0, 10).map((product) => (
                    <li key={product.id}>
                      <Link
                        href={`/products/${product.slug}`}
                        onClick={onClose}
                        className="block p-3 hover:bg-stone-50 border border-transparent hover:border-stone-200"
                      >
                        <span className="font-medium">{product.name}</span>
                        {product.short_description && (
                          <span className="text-sm text-stone-500 block mt-1">{product.short_description}</span>
                        )}
                        {product.price != null && (
                          <span className="text-sm text-gold font-medium">£{product.price.toFixed(2)}</span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
