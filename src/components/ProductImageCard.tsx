import Link from "next/link";

interface ProductImageCardProps {
  href: string;
  imageUrl: string;
  alt: string;
}

export function ProductImageCard({ href, imageUrl, alt }: ProductImageCardProps) {
  return (
    <Link
      href={href}
      className="group block relative aspect-[4/3] overflow-hidden bg-gray-200"
    >
      <img
        src={imageUrl}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-gold/10 transition-colors" aria-hidden />
    </Link>
  );
}
