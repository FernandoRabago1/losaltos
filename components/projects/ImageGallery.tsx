'use client';

import Image from 'next/image';
import { translations } from '@/lib/i18n/translations';
import type { Locale } from '@/lib/i18n/config';

interface ImageGalleryProps {
  images: string[];
  title: string;
  locale: Locale;
}

export default function ImageGallery({ images, title, locale }: ImageGalleryProps) {
  const t = translations[locale];

  return (
    <section className="relative py-16" style={{ backgroundColor: '#D6D2C7' }}>
      <div className="px-4 sm:px-6">
        {/* Gallery Title Card */}
        <div className="flex justify-center mb-12">
          <div className="inline-block bg-white/80 backdrop-blur-md rounded-xl px-8 py-4 shadow-lg border border-white/40">
            <h2 className="text-2xl md:text-3xl font-light text-zinc-900">
              {t.project.galleryTitle}
            </h2>
          </div>
        </div>

        {/* Vertical Grid of Images */}
        <div className="space-y-6 w-full md:w-[80vw] mx-auto">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative w-full overflow-hidden rounded-2xl"
              style={{ border: '3px solid white' }}
            >
              <Image
                src={image}
                alt={`${title} - Image ${index + 1}`}
                width={1600}
                height={900}
                className="w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}