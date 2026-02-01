"use client";

import { useState, useCallback } from "react";
import { RowsPhotoAlbum } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "react-photo-album/rows.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";

export interface GalleryPhoto {
  src: string;
  width: number;
  height: number;
  alt?: string;
}

interface ProjectsGalleryProps {
  photos: GalleryPhoto[];
}

export function ProjectsGallery({ photos }: ProjectsGalleryProps) {
  const [index, setIndex] = useState(-1);

  const openLightbox = useCallback(({ index: i }: { index: number }) => {
    setIndex(i);
  }, []);

  const closeLightbox = useCallback(() => setIndex(-1), []);

  const slides = photos.map((p) => ({ src: p.src, alt: p.alt }));

  return (
    <div className="projects-gallery">
      <RowsPhotoAlbum
        photos={photos}
        targetRowHeight={280}
        spacing={12}
        padding={4}
        onClick={openLightbox}
        rowConstraints={{ maxPhotos: 4, minPhotos: 1 }}
        componentsProps={{
          container: {
            style: { marginBottom: 0 },
          },
        }}
      />
      <Lightbox
        slides={slides}
        open={index >= 0}
        index={index}
        close={closeLightbox}
        plugins={[Slideshow, Counter]}
        slideshow={{ autoplay: false, delay: 3000 }}
        styles={{
          container: { backgroundColor: "rgba(0,0,0,.92)" },
          button: { filter: "none", color: "#faf8f5" },
        }}
        animation={{ swipe: 300 }}
        carousel={{ finite: false }}
        render={{
          buttonPrev: photos.length <= 1 ? () => null : undefined,
          buttonNext: photos.length <= 1 ? () => null : undefined,
        }}
      />
    </div>
  );
}
