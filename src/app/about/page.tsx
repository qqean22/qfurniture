import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Quality Furniture Ltd",
  description: "Quality Furniture Ltd is a market leader in the manufacturing, design, and installation of seating and interior solutions for the hospitality sector.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <h1 className="text-3xl font-bold text-primary mb-8">About Us</h1>
      <p className="text-xl text-stone-600 mb-8">Do You Want To Know Us?</p>

      <div className="prose prose-stone max-w-none space-y-8">
        <p className="text-stone-700 leading-relaxed">
          Quality Furniture Ltd is a market leader in the manufacturing, design, and installation of seating and interior solutions for the hospitality sector.
        </p>
        <p className="text-stone-700 leading-relaxed">
          With decades of experience and a reputation as a trusted partner for customers, the company has established itself as a preferred supplier for a wide range of clients, from large international chains to single installations.
        </p>

        <h2 className="text-2xl font-bold text-primary mt-12">Quality Furniture Ltd (QF)</h2>
        <p className="text-stone-700 leading-relaxed">
          Quality Furniture Ltd specializes in creating bespoke booth seating to match any colour or size requirement for shisha places. With a wide range of fabrics, stitching, and leather options, we can provide a unique design that complements your workplace.
        </p>
        <p className="text-stone-700 leading-relaxed">
          Our bench seating option is perfect for creating a comfortable and relaxed setting in restaurants, shisha lounges, nightclubs, and hotel lobbies. Our in-house designer can provide a unique design that matches the theme of your venue.
        </p>
        <p className="text-stone-700 leading-relaxed">
          Our back-to-back seating is a great solution for fitting more people comfortably into a limited space. This option is commonly used in restaurants, shisha lounges, cafes, nightclubs, and live music venues.
        </p>
        <p className="text-stone-700 leading-relaxed">
          Our Chesterfield seating option is perfect for creating a VIP section in your venue and providing further privacy for special occasions and events. This option is also suitable for bars and restaurants that want to match the design to their interests.
        </p>

        <h2 className="text-2xl font-bold text-primary mt-12">With an in-house design team</h2>
        <p className="text-stone-700 leading-relaxed">
          Quality Furniture Ltd is able to offer clients a more streamlined and efficient process, as well as a unique design approach that emphasizes longevity and sustainability. The company&apos;s experts can provide a variety of services, including free site surveys, internal designer proposals, and full installation.
        </p>
        <p className="text-stone-700 leading-relaxed">
          The company&apos;s state-of-the-art manufacturing process is closely monitored to ensure that finished products meet the highest standards and exceed customer expectations. Each customer is assigned their own project manager, who ensures a consistently high level of customer service throughout the production process.
        </p>
        <p className="text-stone-700 leading-relaxed">
          Quality Furniture Ltd offers a wide variety of seating options, including booth seating, bench seating, back-to-back seating, Chesterfield seating, and banquette seating. Each option is tailored to the specific needs and preferences of clients, and can be customized to match the interior design of any space.
        </p>

        <h2 className="text-2xl font-bold text-primary mt-12">The company&apos;s booth seating is a popular choice for branded restaurants</h2>
        <p className="text-stone-700 leading-relaxed">
          The company&apos;s booth seating is a popular choice for branded restaurants, as it creates an intimate ambience and makes efficient use of space for groups. Bench seating is a great option for hotel lobbies, hotel bars, general bars, restaurants, shisha lounges, and nightclubs, creating a relaxed and comfortable atmosphere.
        </p>
      </div>
    </div>
  );
}
