import { ProjectsGallery } from "@/components/ProjectsGallery";
import type { GalleryPhoto } from "@/components/ProjectsGallery";

import img01i from "@/images/01-i.jpg";
import img01p from "@/images/01-p.jpg";
import img02i from "@/images/02-i.jpg";
import img03i from "@/images/03-i.jpg";
import img04i from "@/images/04-i.jpg";
import heroI from "@/images/hero-i.jpg";

const PROJECT_PHOTOS: GalleryPhoto[] = [
  { src: img01i.src, width: img01i.width, height: img01i.height, alt: "Project 1" },
  { src: img01p.src, width: img01p.width, height: img01p.height, alt: "Project 2" },
  { src: img02i.src, width: img02i.width, height: img02i.height, alt: "Project 3" },
  { src: img03i.src, width: img03i.width, height: img03i.height, alt: "Project 4" },
  { src: img04i.src, width: img04i.width, height: img04i.height, alt: "Project 5" },
  { src: heroI.src, width: heroI.width, height: heroI.height, alt: "Project 6" },
];

export const metadata = {
  title: "Projects | Quality Furniture Ltd",
  description: "Our previous projects and case studies. Browse our portfolio of commercial, hospitality and residential furniture.",
};

export default function ProjectsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="mb-10">
        <h1 className="text-3xl lg:text-4xl font-bold text-primary uppercase tracking-tight mb-4">
          Our Projects
        </h1>
        <div className="h-0.5 w-16 bg-gold mb-6" aria-hidden />
        <p className="text-stone-600 max-w-2xl text-lg">
          We have a vast past project portfolio and are happy to provide references upon request. Our team has worked with many venues nationwide, from large international chains to single installations.
        </p>
        <p className="text-stone-600 max-w-2xl mt-4">
          Contact us to discuss your project or to view our showroom and production process.
        </p>
      </div>

      <ProjectsGallery photos={PROJECT_PHOTOS} />

      <div className="mt-12 pt-8 border-t border-stone-200">
        <a
          href="/#contact"
          className="inline-block px-6 py-3 bg-gold text-primary hover:bg-gold-light font-medium uppercase tracking-wide text-sm transition-colors"
        >
          Contact us
        </a>
      </div>
    </div>
  );
}
