import Link from "next/link";

const VENUE_IMAGES: Record<string, string> = {
  hospitality: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
  commercial: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
  residential: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
};

const VENUE_ICONS: Record<string, React.ReactNode> = {
  hospitality: (
    <svg className="w-12 h-12 sm:w-14 sm:h-14 text-white stroke-[2] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8v8m-16-8v8M4 12h16" />
    </svg>
  ),
  commercial: (
    <svg className="w-12 h-12 sm:w-14 sm:h-14 text-white stroke-[2] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  residential: (
    <svg className="w-12 h-12 sm:w-14 sm:h-14 text-white stroke-[2] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
};

interface VenueTypeCardProps {
  name: string;
  slug: string;
}

export function VenueTypeCard({ name, slug }: VenueTypeCardProps) {
  const imageUrl = VENUE_IMAGES[slug] ?? "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800";
  const icon = VENUE_ICONS[slug] ?? VENUE_ICONS.hospitality;

  return (
    <Link
      href={`/venue/${slug}`}
      className="group block relative aspect-[4/3] sm:aspect-[3/4] overflow-hidden bg-stone-200"
    >
      <img
        src={imageUrl}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" aria-hidden />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
        <span className="flex items-center justify-center mb-3" aria-hidden>{icon}</span>
        <span className="text-white font-bold text-lg sm:text-xl uppercase tracking-wide drop-shadow-md">
          {name}
        </span>
      </div>
    </Link>
  );
}
