import { Suspense } from "react";
import Link from "next/link";
import { searchProducts } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-primary mb-6">Search</h1>
      {!query ? (
        <p className="text-stone-600">Enter a search term in the header to find products.</p>
      ) : (
        <Suspense fallback={<p className="text-stone-500">Searching...</p>}>
          <SearchResults query={query} />
        </Suspense>
      )}
    </div>
  );
}

async function SearchResults({ query }: { query: string }) {
  const products = await searchProducts(query);

  return (
    <>
      <p className="text-stone-600 mb-8">
        {products.length === 0
          ? `No products found for "${query}".`
          : `Found ${products.length} result${products.length === 1 ? "" : "s"} for "${query}".`}
      </p>
      {products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
