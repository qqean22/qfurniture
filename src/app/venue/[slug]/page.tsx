import { notFound } from "next/navigation";
import { getVenueTypes } from "@/lib/data";
import { VenuePageLayout } from "@/components/VenuePageLayout";
import type { VenueSection } from "@/components/VenuePageLayout";

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface VenueContent {
  title: string;
  tagline?: string;
  intro: string;
  imageUrl?: string;
  mainHeading?: string;
  mainBody?: string;
  mainBodyAfter?: string;
  bullets: string[];
  sections?: VenueSection[];
}

const venueCopy: Record<string, VenueContent> = {
  hospitality: {
    title: "Hospitality",
    tagline: "Market leading in Manufacture & Design, build and fitted of commercial, hospitality and Residential banquette seating",
    intro: "We are an expert supplier of contract upholstery and commercial furniture, operating from Perivale, Greenford. Our experts are pass and ISO9001 accredited with asbestos awareness and through health and safety training. Specialising in hospitality projects with decades of experience in bespoke contract furniture, our service has been used by many venues nationwide, which includes:",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200",
    mainHeading: "Hospitality",
    mainBody: "We are one of the UK leading manufacturer of contract seating and restaurants bespoke furniture for the hospitality, leisure and retail sectors. Our team has over 25 years of experience and will work with many upholstery designers for your restaurants at your exact specifications, no matter where you are in the UK.",
    bullets: [
      "Shopping mall and food court area design and seating",
      "Student and future student accommodation furniture",
      "Airports",
      "University, schools & colleges",
      "Hotels and B&Bs",
      "Healthcare",
      "Hospitals",
      "Holiday parks",
      "Shop fitters and joiners",
      "Office refurbishment",
      "Hospitality pubs, clubs & restaurant",
    ],
    sections: [
      {
        heading: "Restaurant seating bespoke",
        body: "One of the market leading supplying, manufacturing and designing all type of restaurant bespoke furniture in UK from variety ranges of seating such as booth seating, banquette seating and long bench seating to matching chairs and tables tops with tables base.\n\nWe can provide the entire project from interior designing plan to manufacturing and providing all types of restaurant seating and table and chairs.\n\nPlease refer to our other types of booth seating for more info details. Over decades we have worked all over UK for many restaurants chains. Even though each venue has different design but we ensure each has its own touch idea.\n\nWe have a vast past project and happy to provide for your reference upon request.",
        imagePlacement: "right",
      },
      {
        heading: "With an in-house design team",
        body: "Quality Furniture Ltd is able to offer clients a more streamlined and efficient process, as well as a unique design approach that emphasizes longevity and sustainability. Our experts can provide a variety of services, including free site surveys, internal designer proposals, and full installation.\n\nThe company's state-of-the-art manufacturing process is closely monitored to ensure that finished products meet the highest standards and exceed customer expectations. Each customer is assigned their own project manager, who ensures a consistently high level of customer service throughout the production process.\n\nQuality Furniture Ltd offers a wide variety of seating options, including booth seating, bench seating, back-to-back seating, Chesterfield seating, and banquette seating. Each option is tailored to the specific needs and preferences of clients, and can be customized to match the interior design of any space.",
        imagePlacement: "left",
      },
      {
        heading: "The company's booth seating is a popular choice for branded restaurants",
        body: "The company's booth seating is a popular choice for branded restaurants, as it creates an intimate ambience and makes efficient use of space for groups. Bench seating is a great option for hotel lobbies, hotel bars, general bars, restaurants, shisha lounges, and nightclubs, creating a relaxed and comfortable atmosphere.",
      },
    ],
  },
  commercial: {
    title: "Commercial",
    tagline: "Market leading in Manufacture & Design, build and fitted of commercial, hospitality and Residential banquette seating",
    intro: "We are one of the UK leading manufacturer of contract seating and restaurants bespoke furniture for the hospitality, leisure and retail sectors. Our team has over 25 years of experience and will work with many upholstery designers for your restaurants at your exact specifications, no matter where you are in the UK.",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200",
    mainHeading: "Commercial",
    mainBody: "Quality Furniture Ltd provide wide ranges of commercial bespoke furniture for clients such as architects, designers and large profile clients through our workshop and delivering UK nationwide services. We provide commercial bespoke furniture for the following industries:",
    mainBodyAfter: "Also our in-house designer team will provide whatever you need to bring your idea into a real life touch. You outline what you need and we can produce designs and CAD drawing 3D plus providing free samples and site visit before approving your commercial furniture bespoke.",
    bullets: [
      "Shop front counter / reception desk",
      "Office furniture",
      "Wall panelling",
      "Cinema lounges",
      "Hotels lobby",
      "Shop fitting",
      "Restaurant bar",
    ],
    sections: [
      {
        heading: "Restaurant seating bespoke",
        body: "One of the market leading supplying, manufacturing and designing all type of restaurant bespoke furniture in UK from variety ranges of seating such as booth seating, banquette seating and long bench seating to matching chairs and tables tops with tables base.\n\nWe can provide the entire project from interior designing plan to manufacturing and providing all types of restaurant seating and table and chairs.\n\nPlease refer to our other types of booth seating for more info details. Over decades we have worked all over UK for many restaurants chains. Even though each venue has different design but we ensure each has its own touch idea.\n\nWe have a vast past project and happy to provide for your reference upon request.",
        imagePlacement: "right",
      },
      {
        heading: "With an in-house design team",
        body: "Quality Furniture Ltd is able to offer clients a more streamlined and efficient process, as well as a unique design approach that emphasizes longevity and sustainability. Our experts can provide a variety of services, including free site surveys, internal designer proposals, and full installation.\n\nThe company's state-of-the-art manufacturing process is closely monitored to ensure that finished products meet the highest standards and exceed customer expectations. Each customer is assigned their own project manager, who ensures a consistently high level of customer service throughout the production process.\n\nQuality Furniture Ltd offers a wide variety of seating options, including booth seating, bench seating, back-to-back seating, Chesterfield seating, and banquette seating. Each option is tailored to the specific needs and preferences of clients, and can be customized to match the interior design of any space.",
        imagePlacement: "left",
      },
      {
        heading: "The company's booth seating is a popular choice for branded restaurants",
        body: "The company's booth seating is a popular choice for branded restaurants, as it creates an intimate ambience and makes efficient use of space for groups. Bench seating is a great option for hotel lobbies, hotel bars, general bars, restaurants, shisha lounges, and nightclubs, creating a relaxed and comfortable atmosphere.",
      },
    ],
  },
  residential: {
    title: "Residential",
    tagline: "Made-to-measure seating and furniture for homes and residential developments",
    intro: "From private homes to residential developments, we offer made-to-measure seating and furniture that combines style with durability. Our residential range includes banquette seating, bench seating, and bespoke solutions for living spaces.",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200",
    mainHeading: "Residential",
    mainBody: "We provide bespoke furniture for living spaces, including:",
    mainBodyAfter: "Our in-house design team will work with you to bring your ideas to life, with free samples and site visits available.",
    bullets: [
      "Living room seating",
      "Dining and kitchen banquettes",
      "Home office furniture",
      "Bespoke upholstery",
    ],
    sections: [
      {
        heading: "With an in-house design team",
        body: "Quality Furniture Ltd is able to offer clients a more streamlined and efficient process, as well as a unique design approach that emphasizes longevity and sustainability. Our experts can provide a variety of services, including free site surveys, internal designer proposals, and full installation.",
        imagePlacement: "right",
      },
    ],
  },
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const copy = venueCopy[slug];
  return {
    title: copy ? `${copy.title} | Quality Furniture Ltd` : "Venue | Quality Furniture Ltd",
  };
}

export default async function VenuePage({ params }: PageProps) {
  const { slug } = await params;
  const venueTypes = await getVenueTypes();
  const venue = venueTypes.find((v) => v.slug === slug);
  const copy = venueCopy[slug];
  if (!venue && !copy) notFound();

  const content = copy ?? {
    title: venue!.name,
    intro: venue!.description ?? "",
    bullets: [],
  };

  return (
    <VenuePageLayout
      title={content.title}
      tagline={content.tagline}
      intro={content.intro}
      bullets={content.bullets}
      mainHeading={content.mainHeading}
      mainBody={content.mainBody}
      mainBodyAfter={content.mainBodyAfter}
      sections={content.sections}
      imageUrl={content.imageUrl}
      imagePlaceholder={`${content.title} – hero image`}
      showGallery={true}
    />
  );
}
