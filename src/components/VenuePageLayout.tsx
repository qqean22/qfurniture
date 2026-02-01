import Link from "next/link";
import { SectionHeader } from "./SectionHeader";

export interface VenueSection {
  heading: string;
  body: string;
  imagePlacement?: "left" | "right" | "full";
  imageUrl?: string;
}

interface VenuePageLayoutProps {
  title: string;
  tagline?: string;
  intro: string;
  bullets: string[];
  mainHeading?: string;
  mainBody?: string;
  mainBodyAfter?: string;
  sections?: VenueSection[];
  imageUrl?: string;
  imagePlaceholder?: string;
  showGallery?: boolean;
  children?: React.ReactNode;
}

export function VenuePageLayout({
  title,
  tagline,
  intro,
  bullets,
  mainHeading,
  mainBody,
  mainBodyAfter,
  sections = [],
  imageUrl,
  imagePlaceholder = "Image placeholder",
  showGallery = true,
  children,
}: VenuePageLayoutProps) {
  return (
    <div className="bg-white">
      {/* Full-width hero banner – title over image */}
      <section className="relative w-full min-h-[40vh] flex flex-col items-center justify-center text-center px-4 bg-teal overflow-hidden">
        {imageUrl && (
          <img
            src={imageUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
        )}
        <div className="absolute inset-0 bg-teal/80" aria-hidden />
        <div className="relative z-10 py-16 lg:py-24">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
            Quality Furniture Ltd
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white">
            {title}
          </h1>
          <div className="mt-4 mx-auto w-24 h-0.5 bg-gold" aria-hidden />
        </div>
      </section>

      {/* Intro: two-column – image left, text right (or stacked on mobile) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-2">
            <div className="aspect-[4/3] bg-warm overflow-hidden">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-400 text-sm uppercase tracking-wide">
                  {imagePlaceholder}
                </div>
              )}
            </div>
          </div>
          <div className="lg:col-span-3">
            {tagline && (
              <h2 className="text-xl font-bold text-teal uppercase tracking-wide mb-4">
                {tagline}
              </h2>
            )}
            <p className="text-stone-700 leading-relaxed text-lg">{intro}</p>
          </div>
        </div>
      </section>

      {/* Main section: heading + paragraph + bullets + paragraph */}
      {(mainHeading || mainBody || bullets.length > 0) && (
        <section className="bg-cream py-12 lg:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {mainHeading && (
              <h2 className="text-2xl lg:text-3xl font-bold text-primary uppercase tracking-tight mb-6">
                {mainHeading}
              </h2>
            )}
            {mainBody && (
              <p className="text-stone-700 leading-relaxed text-lg mb-6 max-w-4xl">
                {mainBody}
              </p>
            )}
            {bullets.length > 0 && (
              <ul className="list-disc list-inside text-stone-700 space-y-2 text-lg mb-6 max-w-2xl">
                {bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}
            {mainBodyAfter && (
              <p className="text-stone-700 leading-relaxed text-lg max-w-4xl">
                {mainBodyAfter}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Full-width image banner placeholder (between main and sections) */}
      <section className="w-full py-0">
        <div className="aspect-[21/9] max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 bg-warm-light flex items-center justify-center text-stone-400 text-sm uppercase tracking-wide">
          Banner image
        </div>
      </section>

      {/* Content sections (Restaurant seating bespoke, In-house design team, etc.) */}
      {sections.map((sec, i) => (
        <section
          key={i}
          className={`py-12 lg:py-16 ${i % 2 === 0 ? "bg-white" : "bg-cream"}`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`grid grid-cols-1 gap-8 items-start ${
                sec.imagePlacement === "right" ? "lg:grid-cols-5" : sec.imagePlacement === "left" ? "lg:grid-cols-5" : ""
              } ${sec.imagePlacement === "left" ? "" : ""}`}
            >
              {sec.imagePlacement === "left" && (
                <div className="lg:col-span-2 order-2 lg:order-1">
                  <div className="aspect-[4/3] bg-warm flex items-center justify-center text-stone-400 text-sm uppercase">
                    Image
                  </div>
                </div>
              )}
              <div
                className={
                  sec.imagePlacement === "left" || sec.imagePlacement === "right"
                    ? "lg:col-span-3 order-1 lg:order-2"
                    : ""
                }
              >
                <h3 className="text-xl font-bold text-primary uppercase tracking-tight mb-4">
                  {sec.heading}
                </h3>
                <div className="text-stone-700 leading-relaxed space-y-4 prose prose-stone max-w-none">
                  {sec.body.split("\n\n").map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </div>
              {sec.imagePlacement === "right" && (
                <div className="lg:col-span-2 order-2 lg:order-2">
                  <div className="aspect-[4/3] bg-warm flex items-center justify-center text-stone-400 text-sm uppercase">
                    Image
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* Our Previous Projects – image gallery */}
      {showGallery && (
        <section className="py-12 lg:py-16 bg-warm-light">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-primary uppercase tracking-tight mb-8">
              Our Previous Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-[4/3] bg-warm flex items-center justify-center text-stone-400 text-sm uppercase tracking-wide"
                >
                  Project {i}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <p className="text-stone-600 text-sm mb-6">
          We have an impressive client portfolio and are happy to provide further
          references upon request or visiting our factory and showroom to see our
          products and production process.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/#contact"
            className="inline-block px-6 py-3 bg-gold text-primary hover:bg-gold-light font-medium uppercase tracking-wide text-sm transition-colors"
          >
            Contact us
          </Link>
          <Link
            href="/catalogs"
            className="inline-block px-6 py-3 border-2 border-teal text-teal hover:bg-teal hover:text-white font-medium uppercase tracking-wide text-sm transition-colors"
          >
            Catalogs
          </Link>
        </div>
      </section>

      {children}
    </div>
  );
}
