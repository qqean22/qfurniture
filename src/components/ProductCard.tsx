import Link from "next/link";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const categoryName = product.category && typeof product.category === "object" ? (product.category as { name?: string }).name : null;

  return (
    <Link href={`/products/${product.slug}`} className="group block rounded-xl border border-gray-200 bg-white overflow-hidden hover:border-gold hover:shadow-lg transition-all">
      <div className="aspect-square bg-teal/5 flex items-center justify-center">
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-4xl text-teal/30 font-bold">{product.name.charAt(0)}</span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-primary group-hover:text-teal">{product.name}</h3>
        {categoryName && <p className="text-sm text-gray-600 mt-1">{categoryName}</p>}
        {product.short_description && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.short_description}</p>}
        {product.price != null && <p className="mt-2 font-medium text-gold">£{Number(product.price).toFixed(2)}</p>}
      </div>
    </Link>
  );
}
