"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageLightbox } from "@/components/lightbox/image-lightbox";
import { Expand } from "lucide-react";

interface ProjectGalleryProps {
  images: string[];
  projectTitle: string;
}

export function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  if (images.length === 0) return null;

  return (
    <>
      <div className="space-y-4">
        {images.map((imageUrl, index) => (
          <button
            key={`gallery-${index}`}
            onClick={() => openLightbox(index)}
            className="group relative aspect-[4/3] w-full overflow-hidden rounded-[28px] border border-surface-border bg-secondary transition hover:border-foreground/20"
          >
            <Image
              src={imageUrl}
              alt={`${projectTitle} gallery image ${index + 1}`}
              fill
              className="object-cover transition duration-300 group-hover:scale-105"
              sizes="(max-width: 1280px) 100vw, 50vw"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition duration-300 group-hover:bg-black/40">
              <div className="translate-y-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                  <Expand className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {lightboxOpen && (
        <ImageLightbox
          images={images}
          initialIndex={selectedIndex}
          onClose={() => setLightboxOpen(false)}
          alt={projectTitle}
        />
      )}
    </>
  );
}
