import Link from "next/link";
import { getVenueTypes, getProducts, getSeatingCategories } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { ContactForm } from "@/components/ContactForm";
import { VenueTypeCard } from "@/components/VenueTypeCard";
import { SectionHeader } from "@/components/SectionHeader";
import { ProductImageCard } from "@/components/ProductImageCard";

import img01 from "@/images/01-i.jpg";
import img02 from "@/images/02-i.jpg";
import img03 from "@/images/03-i.jpg";
import img04 from "@/images/04-i.jpg";

const OUR_PROJECTS_IMAGES = [
  { href: "/projects", imageUrl: img01.src, alt: "Project 1" },
  { href: "/projects", imageUrl: img02.src, alt: "Project 2" },
  { href: "/projects", imageUrl: img03.src, alt: "Project 3" },
  { href: "/projects", imageUrl: img04.src, alt: "Project 4" },
];

export default async function HomePage() {
  const [venueTypes, products, seatingCategories] = await Promise.all([
    getVenueTypes(),
    getProducts({ limit: 9 }),
    getSeatingCategories(),
  ]);

  return (
    <div>
      {/* Hero section - matches reference: large hero with interior-style background, centered QFURNITURE + underline */}
      <section
        className="relative min-h-[75vh] flex flex-col items-center justify-center text-center px-4 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "linear-gradient(180deg, rgba(232,224,220,0.92) 0%, rgba(212,200,194,0.9) 40%, rgba(45,45,45,0.85) 75%, rgba(26,26,26,0.9) 100%), url(https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920)",
        }}
      >
        <div className="absolute inset-0 bg-black/25" aria-hidden />
        <div className="relative z-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-white drop-shadow-md">
            QFurniture
          </h1>
          <div className="mt-4 mx-auto w-40 h-0.5 bg-gold" aria-hidden />
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-teal/10 border-b border-teal/20 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center gap-6 text-sm text-teal">
          <span className="font-medium">Trusted by Thousands</span>
          <span>Excellent Customer Support</span>
          <span>12 Months Warranty</span>
          <span>Exclusive Online Deals</span>
          <span>Worldwide Free Shipping</span>
        </div>
      </section>

      {/* Venue types – reference: centered header, accent line, three large image cards with overlay + icon + label */}
      <section className="py-12 lg:py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Venue Types" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {venueTypes.map((venue) => (
              <VenueTypeCard key={venue.id} name={venue.name} slug={venue.slug} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Projects – reference: centered header, accent line, four image cards */}
      <section className="py-12 lg:py-16 bg-teal/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Our Projects" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {OUR_PROJECTS_IMAGES.map((item, i) => (
              <ProductImageCard key={i} href={item.href} imageUrl={item.imageUrl} alt={item.alt} />
            ))}
          </div>
        </div>
      </section>

      {/* About snippet */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-primary mb-6 uppercase tracking-tight">Quality Furniture Ltd</h2>
          <p className="max-w-3xl text-gray-700 leading-relaxed mb-6">
            Quality Furniture Ltd is a furniture maker in Perivale, England. We design and manufacture made-to-measure contract furniture from our premises in Greenford, offering a nationwide service and all types of restaurant booths, benches, and upholstered seating solutions for commercial, hospitality, and residential clients.
          </p>
          <p className="max-w-3xl text-gray-700 leading-relaxed mb-8">
            We are one of the UK leading manufacturers of contract seating and restaurant bespoke furniture for the hospitality, leisure and retail sectors. Our team has over 25 years of experience and will work with many upholstery designers for your restaurants at your exact specifications, no matter where you are in the UK.
          </p>
          <ul className="flex flex-wrap gap-4 text-sm text-teal mb-8">
            <li>Free site visit</li>
            <li>Free 3D actual plan</li>
            <li>Free samples provided</li>
          </ul>
          <Link href="/about" className="inline-block px-6 py-3 bg-gold text-primary hover:bg-gold-light font-medium uppercase tracking-wide text-sm">
            About us
          </Link>
        </div>
      </section>

      {/* Inspiration products */}
      <section className="py-12 lg:py-16 bg-teal/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-2 uppercase tracking-tight">Inspiration Products</h2>
          <div className="h-0.5 w-16 bg-gold mt-2 mb-8" aria-hidden />
          <p className="text-gray-600 mb-8">Discover our range of stylish and functional furniture.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/tables" className="inline-block px-6 py-3 border-2 border-gold text-gold hover:bg-gold hover:text-primary font-medium uppercase tracking-wide text-sm transition-colors">
              Load more products
            </Link>
          </div>
        </div>
      </section>

      {/* Type of seating */}
      <section className="py-12 lg:py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-primary mb-4 uppercase tracking-tight">Type of Seating</h2>
          <div className="h-0.5 w-16 bg-gold mb-8" aria-hidden />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {seatingCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/seating/${cat.slug}`}
                className="group block p-6 border border-gray-200 bg-white hover:border-gold hover:shadow-lg transition-all text-center"
              >
                <div className="w-16 h-16 mx-auto mb-3 bg-teal/10 group-hover:bg-teal/15 flex items-center justify-center rounded">
                  <span className="text-xl font-bold text-teal">{cat.name.charAt(0)}</span>
                </div>
                <h3 className="font-semibold text-primary group-hover:text-teal uppercase tracking-wide">{cat.name}</h3>
                <span className="text-sm text-gold mt-2 inline-block font-medium">View more</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-12 lg:py-16 bg-teal/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4 uppercase tracking-tight">Send us a message</h2>
              <ContactForm />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4 uppercase tracking-tight">Contact information</h2>
              <address className="not-italic text-gray-700 space-y-3">
                <p>Unit 4, Middlesex<br />Perivale, Greenford UB6 7JD</p>
                <p><a href="tel:07599173535" className="text-teal hover:text-gold transition-colors">07599 173535</a></p>
                <p className="text-sm text-gray-600">Open · Mon-Thu 10am - 7 pm, Saturday/Sunday 9am - 6pm, 
Friday CLOSED</p>
                <p><a href="mailto:info@qualityfurniture.co.uk" className="text-teal hover:text-gold transition-colors">info@qualityfurniture.co.uk</a></p>
                <p><a href="mailto:support@qualityfurniture.co.uk" className="text-teal hover:text-gold transition-colors">support@qualityfurniture.co.uk</a></p>
              </address>
              <p className="mt-6 text-gray-600 text-sm">
                Do you have questions about how we can help your company? Send us an email and we&apos;ll get in touch shortly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
///