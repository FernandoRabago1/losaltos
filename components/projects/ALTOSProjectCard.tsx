'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/lib/types';
import { motion } from 'framer-motion';
import { type Locale } from '@/lib/i18n/config';
import { translateTypology, translations } from '@/lib/i18n/translations';

interface ALTOSProjectCardProps {
  project: Project;
  index?: number;
  locale: Locale;
}

export default function ALTOSProjectCard({ project, index = 0, locale }: ALTOSProjectCardProps) {
  const t = translations[locale];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1] // Custom easing for smooth animation
      }}
      className="group relative cursor-pointer"
    >
      <Link href={`/${locale}/projects/${project.slug}`} className="block relative overflow-hidden">
        {/* Image Container with specific aspect ratio */}
        <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100">
          <Image
            src={project.featuredImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Dark gradient overlay - always present but subtle */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Project Info - Below image by default */}
        <div className="pt-4 pb-2">
          <h3 className="text-lg font-medium text-zinc-900 group-hover:text-zinc-600 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-sm text-zinc-500 mt-1">
            {project.location} · {project.year}
          </p>
        </div>

        {/* Hover Overlay - Slides up from bottom on hover */}
        <div className="absolute bottom-0 left-0 right-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <div className="p-6">
            {/* Project Type Badge */}
            <div className="mb-3">
              <span className="inline-block px-3 py-1 bg-zinc-100 text-zinc-700 text-xs uppercase tracking-wider rounded-full">
                {translateTypology(project.typology, locale)}
              </span>
            </div>

            {/* Title and Location */}
            <h3 className="text-xl font-semibold text-zinc-900 mb-2">
              {project.title}
            </h3>
            <p className="text-sm text-zinc-600 mb-3">
              {project.location} · {project.year}
            </p>

            {/* Description */}
            <p className="text-sm text-zinc-600 line-clamp-3 mb-4">
              {project.shortDescription}
            </p>

            {/* View Project Link */}
            <div className="flex items-center gap-2 text-sm font-medium text-zinc-900">
              <span>{t.home.viewProject}</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}