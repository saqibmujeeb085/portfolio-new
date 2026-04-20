"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageLightbox } from "@/components/lightbox/image-lightbox";
import { Expand } from "lucide-react";

interface ProjectCoverProps {
  imageUrl: string;
  title: string;
  allImages: string[];
}

export function ProjectCover({
  imageUrl,
  title,
  allImages,
}: ProjectCoverProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setLightboxOpen(true)}
        className="group relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-[32px] border border-surface-border bg-secondary transition hover:border-foreground/20"
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          priority
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="100vw"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition duration-300 group-hover:bg-black/40">
          <div className="translate-y-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
              <Expand className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </button>

      {lightboxOpen && (
        <ImageLightbox
          images={allImages}
          initialIndex={0}
          onClose={() => setLightboxOpen(false)}
          alt={title}
        />
      )}
    </>
  );
}
